import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { numberFormat } from "../services/numberFormat";

export const ProductAdvanced = ({
	name,
	price,
	image,
	onPress,
	aspectRatio = 4 / 3, // Proporção padrão 4:3
	resizeMode = "cover", // Modo de redimensionamento
	category = "default", // Categoria do produto para aspectRatio automático
}) => {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		console.log(`❌ Erro ao carregar imagem do produto: ${name}`);
		setImageError(true);
	};

	const handleImageLoad = () => {
		console.log(`✅ Imagem carregada com sucesso: ${name}`);
		setImageError(false);
	};

	// Função para validar se a URI é válida
	const isValidImageUri = uri => {
		return (
			uri &&
			typeof uri === "string" &&
			uri.trim() !== "" &&
			(uri.startsWith("http://") || uri.startsWith("https://"))
		);
	};

	// Aspect ratio baseado na categoria do produto
	const getCategoryAspectRatio = () => {
		const ratios = {
			eletronicos: 16 / 9, // Widescreen para eletrônicos
			roupas: 3 / 4, // Vertical para roupas
			livros: 3 / 4, // Vertical para livros
			decoracao: 1, // Quadrado para decoração
			bicicletas: 4 / 3, // Paisagem para bicicletas
			default: aspectRatio, // Usa o prop ou padrão
		};

		return ratios[category] || ratios.default;
	};

	// Determinar qual imagem usar
	const getImageSource = () => {
		if (imageError || !isValidImageUri(image?.uri)) {
			const ratio = getCategoryAspectRatio();
			const width = 300;
			const height = Math.round(width / ratio);

			return {
				uri: `https://via.placeholder.com/${width}x${height}/cccccc/666666?text=Imagem+Indisponível`,
			};
		}
		return image;
	};

	// Estilo dinâmico da imagem
	const getImageStyle = () => ({
		...styles.thumb,
		aspectRatio: getCategoryAspectRatio(),
	});

	return (
		<TouchableOpacity style={styles.card} onPress={onPress}>
			<Image
				style={getImageStyle()}
				source={getImageSource()}
				resizeMode={resizeMode}
				onError={handleImageError}
				onLoad={handleImageLoad}
			/>
			<View style={styles.infoContainer}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.price}>{numberFormat(price)}</Text>
				{imageError && <Text style={styles.imageWarning}>⚠️ Imagem indisponível</Text>}
				<Text style={styles.categoryInfo}>
					Categoria: {category} | Ratio: {getCategoryAspectRatio().toFixed(2)}
				</Text>
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
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		backgroundColor: "#f5f5f5",
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
	imageWarning: {
		fontSize: 12,
		color: "#ff6b6b",
		fontStyle: "italic",
		marginBottom: 4,
	},
	categoryInfo: {
		fontSize: 10,
		color: "#999",
		fontStyle: "italic",
	},
});
