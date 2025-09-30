import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "./firebase";

// Cache local para produtos carregados
let cachedProducts = null;

/**
 * Carrega todos os produtos do Firebase
 * @returns {Promise<Array>} Array de produtos
 */
export const getProducts = async () => {
	// Retorna cache se disponível
	if (cachedProducts) {
		return cachedProducts;
	}

	// Busca produtos no Firestore
	const productsCollection = collection(db, "products");
	const productSnapshot = await getDocs(productsCollection);

	const products = productSnapshot.docs.map(doc => {
		const data = doc.data();
		console.log(`Produto carregado: ${data.name}, imageUrl: ${data.imageUrl}, data: ${JSON.stringify(data)}`);

		return {
			id: doc.id,
			...data,
			image: { uri: data.imageUrl },
		};
	});	

	// Cache os produtos carregados
	cachedProducts = products;
	console.log(`Total de produtos carregados: ${products.length}`);
	console.log('Produtos:', products);

	return products;
};

/**
 * Busca um produto específico por ID
 * @param {string} id - ID do produto
 * @returns {Promise<Object|null>} Produto encontrado ou null
 */
export const getProduct = async id => {
	// Primeiro tenta buscar no cache
	if (cachedProducts) {
		const product = cachedProducts.find(product => product.id === id || product.id == id);
		if (product) return product;
	}

	// Busca diretamente no Firestore
	const productDoc = doc(db, "products", id.toString());
	const productSnapshot = await getDoc(productDoc);

	if (productSnapshot.exists()) {
		const data = productSnapshot.data();
		console.log(`Produto específico carregado: ${data.name}, imageUrl: ${data.imageUrl}`);

		return {
			id: productSnapshot.id,
			...data,
			image: { uri: data.imageUrl },
		};
	}

	return null;
};

/**
 * Força o reload dos produtos do Firebase
 */
export const refreshProducts = () => {
	cachedProducts = null;
};
