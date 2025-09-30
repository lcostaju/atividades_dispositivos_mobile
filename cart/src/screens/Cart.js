import { View, Text, FlatList, StyleSheet } from "react-native";

export const Cart = ({ items, getTotalPrice }) => {
  // Verifica se o carrinho está vazio
  if (!items || items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        <Text style={styles.emptySubtext}>
          Adicione alguns produtos para começar suas compras!
        </Text>
      </View>
    );
  }

  // Função para renderizar cada item da lista
  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.productName}>{item.product.name}</Text>
        <Text style={styles.productInfo}>Quantidade: {item.qty}</Text>
        <Text style={styles.productInfo}>
          Preço unitário: R$ {item.product.price.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.itemsCount}>
        Você tem {items.length} tipo(s) de produto(s) no carrinho
      </Text>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#f5f5f5",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  itemsCount: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});
