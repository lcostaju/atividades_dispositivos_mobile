# 🛒 Implementação do Carrinho de Compras

> **Disciplina:** Projeto Aplicação para Dispositivos Móveis  
> **Instituição:** IFTM - Período 4  
> **Autor:** Lucio Costa  

## 🎯 Sobre esta Implementação

Este documento descreve a **implementação da funcionalidade do carrinho de compras** que foi adicionada ao projeto existente. O desenvolvimento foi feito de forma incremental em 6 etapas, com commits organizados para apresentação acadêmica.

### ✨ Funcionalidades Implementadas

- 🛒 **Tela do carrinho** funcional
- 📱 **Listagem de itens** com imagens e informações
- 💰 **Cálculos automáticos** de subtotal e total
- ❌ **Remoção de produtos** com confirmação
- 🎨 **Interface profissional** com formatação monetária brasileira

## � Código Implementado

### � **Arquivos Modificados/Criados**

#### `src/screens/Cart.js` - **ARQUIVO PRINCIPAL IMPLEMENTADO**
```javascript
// Componente completo do carrinho implementado do zero
export const Cart = ({ items, getTotalPrice, removeItemFromCart }) => {
  // Renderização de itens, cálculos e interface
}
```

#### `App.js` - **Funções Adicionadas**
```javascript
// Função para remover itens do carrinho
const removeItemFromCart = (id) => {
  setItensCarrinho((prevItems) => {
    return prevItems.filter((item) => item.id != id);
  });
};

// Função addItemToCart corrigida para ser assíncrona
const addItemToCart = async (id) => {
  const product = await getProduct(id);
  // Lógica de adição ao carrinho
};
```

#### `src/screens/ProductDetails.js` - **Correção**
```javascript
// Função onAddToCart atualizada para aguardar carregamento
async function onAddToCart() {
  await addItemToCart(product.id);
}
```

## 🔄 Desenvolvimento em Etapas

### **Etapa 1: Estrutura Básica**
```javascript
// Criação do componente Cart com estado vazio
export const Cart = ({ items, getTotalPrice }) => {
  if (!items || items.length === 0) {
    return <Text>Seu carrinho está vazio</Text>;
  }
  return <Text>Você tem {items.length} tipo(s) de produto(s) no carrinho</Text>;
};
```

### **Etapa 2: Listagem de Itens**
```javascript
// Adição de FlatList para exibir produtos
<FlatList
  data={items}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderCartItem}
/>
```

### **Etapa 3: Interface com Imagens**
```javascript
// Layout horizontal com imagem + detalhes
<View style={styles.itemContainer}>
  <Image source={item.product.image} style={styles.productImage} />
  <View style={styles.productDetails}>
    <Text>{item.product.name}</Text>
    <Text>Qty: {item.qty}</Text>
  </View>
</View>
```

### **Etapa 4: Cálculos e Total**
```javascript
// Subtotal por item e total geral
const subtotal = item.product.price * item.qty;
<Text>{numberFormat(getTotalPrice())}</Text>
```

### **Etapa 5: Remoção de Produtos**
```javascript
// Botão de remoção com confirmação
<TouchableOpacity onPress={() => handleRemoveItem(item)}>
  <Text>✕</Text>
</TouchableOpacity>
```

## 📱 Como Funciona

### **Adicionar ao Carrinho**
- Na tela de detalhes do produto, clique em "Comprar"
- O produto é adicionado ao estado do carrinho no App.js

### **Visualizar Carrinho**
- Clique no botão "Carrinho(X)" no header
- A tela Cart.js renderiza todos os itens adicionados

### **Remover Produtos**
- Clique no botão **✕** vermelho em cada item
- Confirme a remoção no alert que aparece

## 📊 Commits Realizados

```bash
# Implementação incremental
git commit -m "feat: implementa estrutura básica do componente Cart"
git commit -m "feat: implementa listagem básica dos itens no carrinho"  
git commit -m "feat: aplica estilização avançada aos itens do carrinho"
git commit -m "feat: implementa cálculos de subtotal e total geral"
git commit -m "feat: aplica melhorias finais na interface do carrinho"
git commit -m "feat: adiciona remoção de produtos e melhora exibição"
git commit -m "fix: corrige carregamento de produtos e exibição de imagens"
```

---

## 👨‍💻 Desenvolvedor

**Lucio Costa**  
🎓 IFTM - Período 4 - Projeto Aplicação para Dispositivos Móveis

---

> **� Nota:** Esta implementação foi desenvolvida de forma incremental com commits organizados para facilitar a avaliação acadêmica e demonstrar a evolução do código.