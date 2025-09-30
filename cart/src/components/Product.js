import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { numberFormat } from "../services/numberFormat";

export const Product = ({ name, price, image, onPress }) => {
	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			<Image
				style={styles.thumb}
				source={image}
        resizeMode="cover"
			/>
			<View style={styles.infoContainer}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.price}>{numberFormat(price)}</Text>
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 16,
		shadowOpacity: 0.2,
		shadowRadius: 4,
		shadowColor: "black",
		shadowOffset: {
			height: 0,
			width: 0,
		},
		elevation: 1,
		marginVertical: 20,
	},
	thumb: {
		width: "100%",
		aspectRatio: 4/3, // Proporção 4:3 (landscape)
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		backgroundColor: "#f5f5f5", // Cor de fundo enquanto carrega
	},
	infoContainer: {
		padding: 16,
	},
	name: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 4,
	},
	price: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		color: "#007acc", // Cor azul para preço
	},
	imageWarning: {
		fontSize: 12,
		color: "#ff6b6b",
		fontStyle: "italic",
		marginTop: 4,
	},
});
