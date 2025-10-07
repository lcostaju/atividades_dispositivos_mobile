import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

const BASE_URL = 'http://10.0.2.2:3000';
const ALTERNATIVE_URLS = [
  'http://10.10.90.102:3000',   // Seu IP local detectado
  'http://192.168.56.1:3000',   // Seu IP alternativo
  'http://localhost:3000',      // Localhost direto
  'http://127.0.0.1:3000'       // IP local
];

console.log('ℹ️ Para encontrar seu IP local no Windows, execute: ipconfig | findstr IPv4');

export default function App() {
  const [history, setHistory] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('Verificando...');
  const listRef = useRef(null);

    // Testar conexão com múltiplas URLs
  const testConnection = async () => {
    setServerStatus('Testando...');
    
    const urlsToTest = [BASE_URL, ...ALTERNATIVE_URLS];
    
    for (const url of urlsToTest) {
      try {
        console.log('🔍 Testando conexão com:', url);
        const response = await fetch(`${url}/ask`, {
          method: 'POST',
          timeout: 5000,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: 'teste' })
        });
        
        console.log('📡 Status da resposta:', response.status, 'para', url);
        
        if (response.ok) {
          setServerStatus(`Conectado (${url})`);
          console.log('✅ Servidor conectado em:', url);
          return; // Para no primeiro que funcionar
        } else {
          console.log('❌ Erro na resposta:', response.status, 'para', url);
        }
      } catch (error) {
        console.log('❌ Erro na conexão com', url, ':', error.message);
      }
    }
    
    setServerStatus('Desconectado');
    console.log('❌ Nenhuma URL funcionou');
  };

  // Testar conexão ao iniciar
  useEffect(() => {
    testConnection();
  }, []);

  async function ask() {
    const question = q.trim();
    if (!question) return;
    setQ('');
    setHistory(h => [...h, { role: 'user', text: question }]);
    setLoading(true);
    try {
      console.log('🔗 Fazendo requisição para:', `${BASE_URL}/ask`);
      console.log('📝 Pergunta:', question);
      
      const r = await fetch(`${BASE_URL}/ask`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ question }) 
      });
      
      console.log('📡 Status da resposta:', r.status);
      console.log('📡 Response OK:', r.ok);
      
      if (!r.ok) {
        throw new Error(`HTTP ${r.status}: ${r.statusText}`);
      }
      
      const data = await r.json();
      console.log('✅ Dados recebidos:', data);
      
      const meta = data.sources?.map(s => `#${s.id} (sim=${s.sim})`).join('  ');
      setHistory(h => [...h, { role: 'bot', text: data.answer, meta }]);
    } catch (error) {
      console.error('❌ Erro detalhado:', error);
      const errorMessage = error.message || 'Erro desconhecido';
      setHistory(h => [...h, { 
        role: 'bot', 
        text: `Erro ao consultar: ${errorMessage}` 
      }]);
    } finally {
      setLoading(false);
      setTimeout(()=>listRef.current?.scrollToEnd({animated:true}), 100);
    }
  }

  const Bubble = ({ item }) => (
    <View style={{ alignSelf: item.role==='user'?'flex-end':'flex-start', maxWidth:'90%', marginVertical:6 }}>
      <View style={{ backgroundColor:item.role==='user'?'#2563eb':'#111827', padding:12, borderRadius:12 }}>
        <Text style={{ color:'white', fontSize:16 }}>{item.text}</Text>
        {!!item.meta && <Text style={{ color:'#9ca3af', marginTop:6, fontSize:12 }}>{item.meta}</Text>}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#0b1220' }}>
      <KeyboardAvoidingView style={{ flex:1 }} behavior={Platform.OS==='ios'?'padding':undefined}>
        {/* Status do servidor */}
        <View style={{ backgroundColor:'#1f2937', padding:8, alignItems:'center' }}>
          <Text style={{ color:'#9ca3af', fontSize:12 }}>
            Servidor: {serverStatus} | {BASE_URL}
          </Text>
          <Pressable 
            onPress={testConnection}
            style={{ backgroundColor:'#374151', padding:6, borderRadius:4, marginTop:4 }}
          >
            <Text style={{ color:'#9ca3af', fontSize:10 }}>Testar Conexão</Text>
          </Pressable>
        </View>
        
        <FlatList ref={listRef} style={{ flex:1, padding:12 }} data={history} keyExtractor={(_,i)=>String(i)} renderItem={Bubble} />
        <View style={{ flexDirection:'row', padding:10, gap:8, borderTopWidth:1, borderTopColor:'#1f2937' }}>
          <TextInput
            style={{ flex:1, backgroundColor:'#111827', color:'white', padding:12, borderRadius:10 }}
            placeholder="Pergunte algo do regulamento..."
            placeholderTextColor="#6b7280"
            value={q}
            onChangeText={setQ}
            onSubmitEditing={ask}
            returnKeyType="send"
          />
          <Pressable onPress={ask} disabled={loading} style={{ backgroundColor:'#22c55e', paddingHorizontal:16, borderRadius:10, justifyContent:'center' }}>
            {loading ? <ActivityIndicator color="black" /> : <Text style={{ color:'black', fontWeight:'700' }}>Enviar</Text>}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}