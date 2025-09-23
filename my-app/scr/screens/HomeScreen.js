import { useState } from "react";
import {
        View,
        Text,
        Pressable,
        StyleSheet,
        Alert,
} from "react-native";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

export default function HomeScreen( ) {
        const { email } = auth.currentUser || {};

        async function handleLogout() {
                try {
                        await signOut(auth);
                } catch (e) {
                        Alert.alert("Erro", "Não foi possível sair.");
                }
        }

        return (
                <View style={styles.container}>
                        <Text style={styles.titulo}>Bem-vindo!</Text>
                        <Text style={styles.subtitulo}>
                                Usuário autenticado:
                        </Text>
                        <Text style={styles.email}>{email}</Text>

                        <Pressable
                                style={styles.botao}
                                onPress={handleLogout}>
                                <Text style={styles.botaoTexto}>Logout</Text>
                        </Pressable>
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                padding: 24,
                justifyContent: "center",
                alignItems: "center",
        },
        titulo: {
                fontSize: 28,
                fontWeight: "800",
                marginBottom: 8,
        },
        subtitulo: { fontSize: 16, opacity: 0.7 },
        email: {
                fontSize: 18,
                marginTop: 4,
                marginBottom: 24,
                fontWeight: "600",
        },
        botao: {
                backgroundColor: "#ef4444",
                paddingVertical: 14,
                paddingHorizontal: 28,
                borderRadius: 12,
        },
        botaoTexto: {
                color: "#fff",
                fontWeight: "700",
                fontSize: 16,
        },
});