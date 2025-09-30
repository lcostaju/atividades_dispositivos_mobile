import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase - substitua pelos seus dados do projeto
const firebaseConfig = {
	apiKey: "AIzaSyBlc_Rmm3CPxl7up7WSUnVcjAv7yuNijwU",
	authDomain: "comercio-eletronico-733e9.firebaseapp.com",
	projectId: "comercio-eletronico-733e9",
	storageBucket: "comercio-eletronico-733e9.firebasestorage.app",
	messagingSenderId: "952477633637",
	appId: "1:952477633637:web:fdf93e1ea1d8f5c23a4a8c",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);
