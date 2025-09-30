import { View, Text, StyleSheet } from "react-native";

export const CartIcon = ({ navigation, getItemsCount }) => {
  const quantidade = getItemsCount();
  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        onPress={() => {
          navigation.navigate("Cart");
        }}
      >
        Carrinho({quantidade})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: "orange",
    height: 32,
    padding: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
