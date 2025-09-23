import { useState } from "react";
import {
        View,
        Text,
        TextInput,
        Pressable,
        StyleSheet,
        Alert,
        KeyboardAvoidingView,
        ScrollView,
        Platform,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
        const [email, setEmail] = useState("");
        const [senha, setSenha] = useState("");
        const [loading, setLoading] = useState(false);
        const navigation = useNavigation();

        async function handleRegister() {
                if (!email || !senha)
                        return Alert.alert(
                                "Atenção",
                                "Preencha e-mail e senha."
                        );
                if (senha.length < 6)
                        return Alert.alert(
                                "Atenção",
                                "A senha deve ter no mínimo 6 caracteres."
                        );

                try {
                        setLoading(true);
                        await createUserWithEmailAndPassword(
                                auth,
                                email.trim(),
                                senha
                        );
                        Alert.alert("Sucesso", "Usuário cadastrado!");
                } catch (e) {
                        Alert.alert(
                                "Erro ao cadastrar",
                                traduzErroFirebase(e)
                        );
                } finally {
                        setLoading(false);
                }
        }

        function traduzErroFirebase(e) {
                const msg = String(e?.code || e?.message || e);
                if (msg.includes("auth/email-already-in-use"))
                        return "E-mail já cadastrado.";
                if (msg.includes("auth/invalid-email"))
                        return "E-mail inválido.";
                if (msg.includes("auth/weak-password"))
                        return "Senha fraca (mínimo 6 caracteres).";
                return "Não foi possível concluir o cadastro.";
        }

        return (
                <KeyboardAvoidingView
                        style={styles.keyboardContainer}
                        behavior={
                                Platform.OS === "ios" ? "padding" : "height"
                        }>
                        <ScrollView
                                contentContainerStyle={styles.scrollContainer}
                                keyboardShouldPersistTaps="handled">
                                <View style={styles.container}>
                                        <Text style={styles.titulo}>Criar conta</Text>

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
                                                placeholder="Senha (mín. 6)"
                                                value={senha}
                                                onChangeText={setSenha}
                                                secureTextEntry
                                                autoCapitalize="none"
                                                textContentType="newPassword"
                                        />

                                        <Pressable
                                                style={[
                                                        styles.botao,
                                                        loading && styles.botaoDisabled,
                                                ]}
                                                onPress={handleRegister}
                                                disabled={loading}>
                                                <Text style={styles.botaoTexto}>
                                                        {loading ? "Cadastrando..." : "Cadastrar"}
                                                </Text>
                                        </Pressable>

                                        <Pressable onPress={() => navigation.goBack()}>
                                                <Text style={styles.link}>
                                                        Já tem conta? Entrar
                                                </Text>
                                        </Pressable>
                                </View>
                        </ScrollView>
                </KeyboardAvoidingView>
        );
}

const styles = StyleSheet.create({
        keyboardContainer: {
                flex: 1,
        },
        scrollContainer: {
                flexGrow: 1,
        },
        container: {
                flex: 1,
                padding: 24,
                justifyContent: "center",
                minHeight: 400,
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
                backgroundColor: "#16a34a",
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