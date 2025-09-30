import { View, Text, FlatList, Image, StyleSheet } from "react-native";

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
        <Image 
          source={item.product.image} 
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.productPrice}>
            R$ {item.product.price.toFixed(2)} cada
          </Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>Quantidade: {item.qty}</Text>
          </View>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  quantityContainer: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
  },
});
