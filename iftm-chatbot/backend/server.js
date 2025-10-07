import express from 'express';
import cors from 'cors';
import fs from 'fs';
import cosine from 'cosine-similarity';
import { pipeline } from '@xenova/transformers';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const CHUNKS = JSON.parse(fs.readFileSync('./data/chunks.json', 'utf-8'));
const PORT = 3000;

const load = async () => {
  console.log('🚀 Carregando modelos...');
  const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  console.log('✅ Modelo de embedding carregado');
  
  const qa = await pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad');
  console.log('✅ Modelo de Q&A carregado');
  
  return { embedder, qa };
};

console.log('📚 Carregando chunks de dados...');
console.log(`📊 Total de chunks carregados: ${CHUNKS.length}`);

// Debug: verificar estrutura dos primeiros chunks
if (CHUNKS.length > 0) {
  console.log('🔍 Estrutura do primeiro chunk:', {
    id: CHUNKS[0].id,
    textType: typeof CHUNKS[0].text,
    textLength: CHUNKS[0].text?.length || 0,
    textPreview: typeof CHUNKS[0].text === 'string' ? CHUNKS[0].text.substring(0, 50) + '...' : 'não é string',
    hasEmbedding: Array.isArray(CHUNKS[0].embedding),
    embeddingLength: CHUNKS[0].embedding?.length || 0
  });
}

const { embedder, qa } = await load();
console.log('🎉 Servidor pronto para receber perguntas!');

const topK = (qEmb, k = 3) =>
  CHUNKS.map(c => ({ ...c, score: cosine(qEmb, c.embedding) }))
        .sort((a,b)=>b.score-a.score)
        .slice(0,k);

app.post('/ask', async (req, res) => {
  try {
    console.log('📝 Pergunta recebida:', req.body);
    
    const question = (req.body?.question || '').trim();
    if (question.length < 3) return res.status(400).json({ error: 'Pergunta muito curta.' });

    console.log('🤖 Processando embedding para:', question);
    const q = await embedder(question, { pooling: 'mean', normalize: true });
    const qEmb = Array.from(q.data);
    console.log('✅ Embedding gerado, tamanho:', qEmb.length);

    console.log('🔍 Buscando chunks similares...');
    const cands = topK(qEmb, 5); // Aumentar para 5 chunks para mais opções
    console.log('📊 Chunks encontrados:', cands.length);

    let best = { answer: '', score: -Infinity, source: null };
    for (const c of cands) {
      try {
        console.log(`🔎 Processando chunk ${c.id} (similaridade: ${c.score.toFixed(3)})`);
        console.log(`📄 Tipo do texto:`, typeof c.text, 'Conteúdo:', c.text?.substring?.(0, 100) + '...');
        
        // Garantir que c.text é uma string e limpar caracteres problemáticos
        let contextText = typeof c.text === 'string' ? c.text : String(c.text || '');
        
        // Limpar caracteres que podem causar problemas
        contextText = contextText
          .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove caracteres de controle
          .replace(/\s+/g, ' ') // Normaliza espaços
          .trim();
        
        if (!contextText) {
          console.log(`⚠️ Chunk ${c.id} tem texto vazio após limpeza, pulando...`);
          continue;
        }
        
        // Limitar o tamanho do contexto (aumentando para 1024 para mais contexto)
        if (contextText.length > 1024) {
          contextText = contextText.substring(0, 1024);
          console.log(`✂️ Texto do chunk ${c.id} foi truncado para 1024 caracteres`);
        }
        
        // Garantir que ambos são strings primitivas
        const cleanQuestion = String(question).trim();
        const cleanContext = String(contextText).trim();
        
        console.log(`🔧 Chamando Q&A:`);
        console.log(`   Pergunta (${typeof cleanQuestion}, length: ${cleanQuestion.length}): "${cleanQuestion}"`);
        console.log(`   Contexto (${typeof cleanContext}, length: ${cleanContext.length}): "${cleanContext.substring(0, 100)}..."`);
        
        // Tentar diferentes formas de chamar a API
        let out = null;
        
        try {
          // Segunda tentativa: formato mais simples
          console.log(`🔧 Tentando formato simples para chunk ${c.id}`);
          out = await qa(cleanQuestion, cleanContext);
          console.log(`✅ Formato simples funcionou!`);
        } catch (e2) {
          console.log(`⚠️ Formato simples falhou: ${e2.message}`);
          
          try {
            // Terceira tentativa: apenas a pergunta (sem contexto - fallback)
            console.log(`🔧 Tentando apenas pergunta para chunk ${c.id}`);
            out = await qa(cleanQuestion);
            console.log(`✅ Apenas pergunta funcionou!`);
          } catch (e3) {
            console.log(`⚠️ Apenas pergunta falhou: ${e3.message}`);
            
            // Se tudo falhar, criar uma resposta padrão
            out = { 
              answer: "(não foi possível processar este contexto)", 
              score: 0.0 
            };
            console.log(`🔄 Usando resposta padrão para chunk ${c.id}`);
          }
        }
        
        if (!out) {
          out = { answer: "(erro no processamento)", score: 0.0 };
        }
        
        console.log(`💡 Resposta gerada com score: ${out.score.toFixed(3)}`);
        if (out.score > best.score) {
          best = { answer: out.answer, score: out.score, source: c.id };
        }
        
      } catch (chunkError) {
        console.error(`❌ Erro ao processar chunk ${c.id}:`, chunkError.message);
        console.error(`   Chunk data:`, { 
          id: c.id, 
          textType: typeof c.text, 
          textLength: c.text?.length,
          textPreview: typeof c.text === 'string' ? c.text.substring(0, 50) : 'não é string'
        });
        // Continue para o próximo chunk
        continue;
      }
    }

    console.log('✅ Melhor resposta encontrada:', { answer: best.answer, score: best.score });

    // Se não encontrou uma resposta com score decente, tentar dar uma resposta mais útil
    let finalAnswer = best.answer || '(sem resposta encontrada)';
    
    if (best.score < 0.3 && best.score > 0 && cands.length > 0) {
      // Se o score é baixo, mas existe, mostrar o contexto mais relevante
      const bestChunk = cands.find(c => c.id === best.source) || cands[0];
      finalAnswer = `Baseado nos documentos disponíveis: ${bestChunk.text.substring(0, 200)}...
      
Essa informação foi encontrada no documento ${bestChunk.id} com ${(bestChunk.score * 100).toFixed(1)}% de similaridade com sua pergunta.`;
    } else if (best.score >= 0.3) {
      // Score bom, manter a resposta original
      finalAnswer = best.answer;
    }

    res.json({
      answer: finalAnswer,
      sources: cands.map(c => ({ id: c.id, sim: c.score.toFixed(3) })),
      score: best.score,
      debug: {
        totalChunks: CHUNKS.length,
        processedChunks: cands.length,
        bestSource: best.source
      }
    });
  } catch (e) {
    console.error('❌ ERRO DETALHADO:', e);
    console.error('Stack trace:', e.stack);
    res.status(500).json({ 
      error: 'Falha ao processar a pergunta.',
      details: e.message 
    });
  }
});

app.listen(PORT, () => console.log(`API em http://localhost:${PORT}`));