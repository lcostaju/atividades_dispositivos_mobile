import { View, Text, StyleSheet } from "react-native";

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

  // Por enquanto, apenas mostra quantos itens há no carrinho
  return (
    <View style={styles.container}>
      <Text style={styles.itemsCount}>
        Você tem {items.length} tipo(s) de produto(s) no carrinho
      </Text>
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
  },
});
