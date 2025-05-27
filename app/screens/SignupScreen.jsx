import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useSignUpMutation } from "../../api/authServices";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmP, setErrorConfirmp] = useState("");

  const [signUp, { isLoading }] = useSignUpMutation();

  const handleFirebaseError = (error) => {
    let errorCode = error?.data?.error?.message || "unknown";

    const errorMessages = {
      EMAIL_EXISTS: "El correo ya está registrado.",
      INVALID_EMAIL: "El formato del correo es inválido.",
      NETWORK_REQUEST_FAILED: "Error de red. Verifica tu conexión.",
    };

    return errorMessages[errorCode] || "Ocurrió un error inesperado.";
  };

  const onSubmit = async () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmp("");

    if (email === "") {
      setErrorEmail("Debe completar el Email");
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      setErrorEmail("El email debe tener un @ o un .");
      return;
    }

    if (password === "" || password.length < 6) {
      setErrorPassword("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setErrorConfirmp("Las contraseñas deben coincidir");
      return;
    }

    try {
      const result = await signUp({
        email,
        password,
        returnSecureToken: true,
      }).unwrap();

      Alert.alert("¡Éxito!", "El registro fue completado", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error al registrarse:", err);
      const errorMessage = handleFirebaseError(err);
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <LinearGradient colors={["#C1C8E4", "#F7D9E3"]} style={styles.gradient}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.cntLogin}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Signup</Text>
            <BlurView intensity={25} tint="light" style={styles.glassCard}>
              <Image
                source={require("../../assets/hands-login-blue.png")}
                style={styles.imageOverlay}
              />
              <InputForm
                label={"Email"}
                onchange={setEmail}
                error={errorEmail}
              />
              <InputForm
                label={"Password"}
                onchange={setPassword}
                error={errorPassword}
                isSecure={true}
              />
              <InputForm
                label={"Confirm password"}
                onchange={setConfirmPassword}
                error={errorConfirmP}
                isSecure={true}
              />
              <SubmitButton
                onPress={onSubmit}
                title="Send"
                isLoading={isLoading}
              />
              <View style={styles.footer}>
                <Text style={styles.footerText}>¿Ya tenés cuenta?</Text>
                <Pressable
                  onPress={() => navigation.navigate("Login")}
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                >
                  <Text style={styles.footerLink}>Login</Text>
                </Pressable>
              </View>
            </BlurView>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  cntLogin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  glassCard: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  imageOverlay: {
    position: "relative",
    bottom: 0,
    right: 0,
    width: 300,
    height: 290,
    zIndex: 2,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#4A4A6A",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#6B6B8A",
  },
  footerLink: {
    fontSize: 14,
    color: "#4f6edc",
    fontWeight: "600",
    marginTop: 5,
  },
});
