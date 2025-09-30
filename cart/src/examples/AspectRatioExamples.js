// Exemplo de uso de aspectRatio em diferentes layouts
// ==================================================

import React from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";

export const AspectRatioExamples = () => {
	const sampleImage = { uri: "https://via.placeholder.com/400x300/007acc/ffffff?text=Produto" };

	return (
		<ScrollView style={styles.container}>
			{/* Layout em Grade - Quadrado */}
			<Text style={styles.sectionTitle}>🔲 Layout em Grade (1:1)</Text>
			<View style={styles.gridContainer}>
				<Image style={styles.gridImage} source={sampleImage} resizeMode="cover" />
				<Image style={styles.gridImage} source={sampleImage} resizeMode="cover" />
				<Image style={styles.gridImage} source={sampleImage} resizeMode="cover" />
				<Image style={styles.gridImage} source={sampleImage} resizeMode="cover" />
			</View>

			{/* Lista de Produtos - 4:3 */}
			<Text style={styles.sectionTitle}>📱 Lista de Produtos (4:3)</Text>
			<View style={styles.productCard}>
				<Image style={styles.productImage} source={sampleImage} resizeMode="cover" />
				<View style={styles.productInfo}>
					<Text style={styles.productName}>Bicicleta Elétrica</Text>
					<Text style={styles.productPrice}>R$ 2.999,90</Text>
				</View>
			</View>

			{/* Banner Principal - 21:9 */}
			<Text style={styles.sectionTitle}>🖼️ Banner Principal (21:9)</Text>
			<Image style={styles.bannerImage} source={sampleImage} resizeMode="cover" />

			{/* Detalhes do Produto - 16:9 */}
			<Text style={styles.sectionTitle}>🔍 Detalhes do Produto (16:9)</Text>
			<Image style={styles.detailImage} source={sampleImage} resizeMode="contain" />

			{/* Produtos Verticais - 3:4 */}
			<Text style={styles.sectionTitle}>👕 Produtos Verticais (3:4)</Text>
			<View style={styles.verticalContainer}>
				<Image style={styles.verticalImage} source={sampleImage} resizeMode="cover" />
				<Image style={styles.verticalImage} source={sampleImage} resizeMode="cover" />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f5f5f5",
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: 16,
		color: "#333",
	},

	// Grade 2x2 (Quadrado 1:1)
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	gridImage: {
		width: "48%",
		aspectRatio: 1, // 1:1 - Quadrado
		borderRadius: 8,
		marginBottom: 8,
		backgroundColor: "#e0e0e0",
	},

	// Card de produto (4:3)
	productCard: {
		backgroundColor: "white",
		borderRadius: 12,
		overflow: "hidden",
		marginBottom: 16,
		elevation: 2,
	},
	productImage: {
		width: "100%",
		aspectRatio: 4 / 3, // 4:3 - Paisagem tradicional
		backgroundColor: "#e0e0e0",
	},
	productInfo: {
		padding: 16,
	},
	productName: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 4,
	},
	productPrice: {
		fontSize: 14,
		color: "#007acc",
		fontWeight: "600",
	},

	// Banner ultra-wide (21:9)
	bannerImage: {
		width: "100%",
		aspectRatio: 21 / 9, // 21:9 - Ultra wide
		borderRadius: 12,
		backgroundColor: "#e0e0e0",
		marginBottom: 16,
	},

	// Imagem de detalhe (16:9)
	detailImage: {
		width: "100%",
		aspectRatio: 16 / 9, // 16:9 - Widescreen
		borderRadius: 12,
		backgroundColor: "#e0e0e0",
		marginBottom: 16,
	},

	// Container para produtos verticais
	verticalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	verticalImage: {
		width: "48%",
		aspectRatio: 3 / 4, // 3:4 - Vertical (roupas, livros)
		borderRadius: 8,
		backgroundColor: "#e0e0e0",
	},
});

/* 
RESUMO DE ASPECT RATIOS:

📐 Cálculo simples:
aspectRatio = largura / altura

🔢 Ratios comuns:
- 1:1 = 1      (Quadrado - Instagram)
- 4:3 = 1.33   (Tradicional - produtos)
- 3:2 = 1.5    (Fotografia clássica)
- 16:9 = 1.78  (Widescreen - vídeos)
- 21:9 = 2.33  (Ultra-wide - banners)
- 3:4 = 0.75   (Vertical - roupas)

💡 Dicas de uso:
- Thumbnails: 1:1 ou 4:3
- Detalhes: 16:9
- Banners: 21:9
- Roupas: 3:4
- Eletrônicos: 16:9

🎯 Vantagens:
✅ Layout consistente
✅ Responsivo
✅ Performance melhor
✅ Menos bugs visuais
✅ Código mais limpo
*/
