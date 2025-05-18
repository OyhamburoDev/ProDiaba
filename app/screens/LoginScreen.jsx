import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import InputForm from "../components/InputForm";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../../api/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [signIn, { isLoading, error }] = useSignInMutation();
  const dispatch = useDispatch();

  const handleErrorFirebase = (err) => {
    let errorCode = err?.data?.error?.message || "unknown";

    const errorMessages = {
      INVALID_LOGIN_CREDENTIALS: "Correo o contraseña incorrectos",
    };
    return errorMessages[errorCode] || "Ocurrio un error inesperado.";
  };

  const onSubmit = async () => {
    setErrorEmail("");
    setErrorPassword("");

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

    try {
      const respuesta = await signIn({
        email,
        password,
        returnSecureToken: true,
      }).unwrap();

      dispatch(
        setUser({
          user: respuesta.email,
          token: respuesta.idToken,
        })
      );

      console.log("Login exitoso:", respuesta);
    } catch (err) {
      console.log("Error al registrarse:", JSON.stringify(err, null, 2));
      const errorMessage = handleErrorFirebase(err);
      Alert.alert("Error al iniciar sesion", errorMessage);
    }
  };

  return (
    <LinearGradient colors={["#C1C8E4", "#F7D9E3"]} style={styles.gradient}>
      <View style={styles.cntLogin}>
        <Text style={styles.title}>Bienvenido</Text>
        <BlurView intensity={25} tint="light" style={styles.glassCard}>
          <Image
            source={require("../../assets/hands-login-blue.png")}
            style={styles.imageOverlay}
          />
          <InputForm label={"Email"} onchange={setEmail} error={errorEmail} />
          <InputForm
            label={"Contraseña"}
            onchange={setPassword}
            error={errorPassword}
            isSecure={true}
          />

          <SubmitButton
            onPress={onSubmit}
            title="Ingresar"
            isLoading={isLoading}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿No tenés cuenta?</Text>
            <Pressable
              onPress={() => navigation.navigate("Signup")}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              <Text style={styles.footerLink}>Crear cuenta</Text>
            </Pressable>
          </View>
        </BlurView>
      </View>
    </LinearGradient>
  );
};

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
    backgroundColor: "rgba(255, 255, 255, 0.13)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  imageOverlay: {
    position: "relative",
    bottom: 0, // Ajustá esto según tu diseño
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

export default LoginScreen;
