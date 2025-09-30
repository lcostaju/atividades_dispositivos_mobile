import { useEffect, useState } from "react";
import { Text, Image, View, ScrollView, Button, StyleSheet } from "react-native";
import { getProduct } from "../services/productsService";
import { numberFormat } from "../services/numberFormat";

export const ProductDetails = ({ route, addItemToCart }) => {
	const { productId } = route.params;
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	useEffect(() => {
		const loadProduct = async () => {
			try {
				setLoading(true);
				const productData = await getProduct(productId);
				setProduct(productData || {});
			} catch (error) {
				console.error("Erro ao carregar produto:", error);
			} finally {
				setLoading(false);
			}
		};

		loadProduct();
	}, [productId]);

	function onAddToCart() {
		addItemToCart(product.id);
	}

	return (
		<View>
			<ScrollView>
				<Image style={styles.image} source={product.image} resizeMode="contain" />
				<View style={styles.infoContainer}>
					<Text style={styles.name}>{product.name}</Text>
					<Text style={styles.price}>{numberFormat(product.price)}</Text>
					<Text style={styles.description}>{product.description}</Text>
					<Button color={"red"} onPress={onAddToCart} title="Comprar" />
				</View>
			</ScrollView>
		</View>
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
	image: {
		width: "100%",
		aspectRatio: 16 / 9, // Proporção 16:9 (widescreen)
		backgroundColor: "#f5f5f5", // Cor de fundo enquanto carrega
	},
	infoContainer: {
		padding: 16,
	},
	name: {
		fontSize: 22,
		fontWeight: "bold",
	},
	price: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		fontWeight: "400",
		color: "#787878",
		marginBottom: 16,
	},
	imageWarning: {
		fontSize: 12,
		color: "#ff6b6b",
		fontStyle: "italic",
		marginBottom: 8,
	},
});
