import { useState } from "react";
import {
        Text,
        TextInput,
        Pressable,
        StyleSheet,
        Alert,
        KeyboardAvoidingView,
        Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
        const [email, setEmail] = useState("");
        const [senha, setSenha] = useState("");
        const [loading, setLoading] = useState(false);
        const navigation = useNavigation();

        async function handleLogin() {
                if (!email || !senha)
                        return Alert.alert(
                                "Atenção",
                                "Preencha e-mail e senha."
                        );
                try {
                        setLoading(true);
                        await signInWithEmailAndPassword(
                                auth,
                                email.trim(),
                                senha
                        );
                        // A navegação acontecerá automaticamente via onAuthStateChanged
                        console.log("Login bem-sucedido");
                } catch (e) {
                        Alert.alert("Erro ao entrar", traduzErroFirebase(e));
                } finally {
                        setLoading(false);
                }
        }

        function traduzErroFirebase(e) {
                const msg = String(e?.code || e?.message || e);
                if (msg.includes("auth/invalid-email"))
                        return "E-mail inválido.";
                if (msg.includes("auth/user-not-found"))
                        return "Usuário não encontrado.";
                if (msg.includes("auth/wrong-password"))
                        return "Senha incorreta.";
                if (msg.includes("auth/too-many-requests"))
                        return "Muitas tentativas. Tente novamente em instantes.";
                return "Não foi possível realizar o login.";
        }

        return (
                <KeyboardAvoidingView
                        style={styles.container}
                        behavior={
                                Platform.OS === "ios" ? "padding" : "height"
                        }>
                        <Text style={styles.titulo}>Entrar</Text>

                        <TextInput
                                style={styles.input}
                                placeholder="E-mail"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="username"
                        />

                        <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry
                                autoCapitalize="none"
                                textContentType="password"
                        />

                        <Pressable
                                style={[
                                        styles.botao,
                                        loading && styles.botaoDisabled,
                                ]}
                                onPress={handleLogin}
                                disabled={loading}>
                                <Text style={styles.botaoTexto}>
                                        {loading ? "Entrando..." : "Entrar"}
                                </Text>
                        </Pressable>

                        <Pressable
                                onPress={() => navigation.navigate("Register")}>
                                <Text style={styles.link}>
                                        Não tem conta? Cadastre-se
                                </Text>
                        </Pressable>
                </KeyboardAvoidingView>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                padding: 24,
                justifyContent: "center",
        },
        titulo: {
                fontSize: 28,
                fontWeight: "700",
                marginBottom: 16,
                textAlign: "center",
        },
        input: {
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 12,
                padding: 12,
                fontSize: 16,
                marginBottom: 12,
        },
        botao: {
                backgroundColor: "#1e40af",
                paddingVertical: 14,
                borderRadius: 12,
                marginTop: 4,
                marginBottom: 8,
        },
        botaoDisabled: { opacity: 0.7 },
        botaoTexto: {
                color: "#fff",
                fontWeight: "700",
                textAlign: "center",
                fontSize: 16,
        },
        link: {
                color: "#1e40af",
                textAlign: "center",
                marginTop: 8,
                textDecorationLine: "underline",
        },
});