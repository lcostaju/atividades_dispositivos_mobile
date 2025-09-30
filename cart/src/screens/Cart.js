import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { numberFormat } from "../services/numberFormat";

export const Cart = ({ items, getTotalPrice, removeItemFromCart }) => {
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

  // Função para confirmar remoção do item
  const handleRemoveItem = (item) => {
    const productName = item.product?.name || "este produto";
    Alert.alert(
      "Remover produto",
      `Deseja remover "${productName}" do carrinho?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => removeItemFromCart(item.id)
        }
      ]
    );
  };

  // Função para renderizar cada item da lista
  const renderCartItem = ({ item }) => {
    // Verificações de segurança para dados do produto
    const product = item.product || {};
    const productName = product.name || "Produto sem nome";
    const productPrice = product.price || 0;
    const productImage = product.image || { uri: "" };
    const subtotal = productPrice * item.qty;
    
    return (
      <View style={styles.itemContainer}>
        <Image 
          source={productImage} 
          style={styles.productImage}
          resizeMode="contain"
          onError={(error) => {
            console.log('Erro ao carregar imagem:', productImage, error);
          }}
        />
        <View style={styles.productDetails}>
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{productName}</Text>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveItem(item)}
            >
              <Text style={styles.removeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.productPrice}>
            {numberFormat(productPrice)} cada
          </Text>
          <View style={styles.quantityRow}>
            <View style={styles.quantityContainer}>
              <Text style={styles.quantityText}>Qty: {item.qty}</Text>
            </View>
            <Text style={styles.subtotalText}>
              {numberFormat(subtotal)}
            </Text>
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      
      {/* Seção do Total Geral */}
      <View style={styles.totalContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.itemsSummary}>
            {items.length} {items.length === 1 ? 'produto' : 'produtos'} • {" "}
            {items.reduce((sum, item) => sum + item.qty, 0)} {" "}
            {items.reduce((sum, item) => sum + item.qty, 0) === 1 ? 'item' : 'itens'}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Geral:</Text>
          <Text style={styles.totalValue}>
            {numberFormat(getTotalPrice())}
          </Text>
        </View>
      </View>
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
  listContent: {
    paddingBottom: 8,
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
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  productDetails: {
    flex: 1,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: "#ff4757",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  quantityContainer: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
  },
  subtotalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  totalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 8,
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
  summaryRow: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemsSummary: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e74c3c",
  },
});
