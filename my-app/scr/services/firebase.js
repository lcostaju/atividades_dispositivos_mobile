import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
        signOut,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
} from "firebase/auth";


const firebaseConfig = { apiKey: "AIzaSyDQwUQQrYyXzt6YrrVtfqTCD55oOR4hWFo",
  authDomain: "iftm-rn-aulas-2025-09-22.firebaseapp.com",
  projectId: "iftm-rn-aulas-2025-09-22",
  storageBucket: "iftm-rn-aulas-2025-09-22.firebasestorage.app",
  messagingSenderId: "174846509616",
  appId: "1:174846509616:web:eb461f7d23e0fac3bee3f5" };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const registrar = async (email, senha) => {
        try {
                await createUserWithEmailAndPassword(
                        auth,
                        email,
                        senha
                );
                alert("Usuário registrado com sucesso!");
        } catch (error) {
                alert("Erro: " + error.message);
        }
};

export const login = async (email, senha) => {
        try {
                await signInWithEmailAndPassword(auth, email, senha);
                alert("Login realizado!");
        } catch (error) {
                alert("Erro: " + error.message);
        }
};

export const logout = async () => {
        await signOut(auth);
};