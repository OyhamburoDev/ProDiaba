import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import InputForm from "../components/InputForm";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../../api/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import userRepository from "../dataBases/userDao";

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
      // le pego a firebase
      const respuesta = await signIn({
        email,
        password,
        returnSecureToken: true,
      }).unwrap();

      // lo guardo en redux
      dispatch(
        setUser({
          user: respuesta.email,
          token: respuesta.idToken,
          localId: respuesta.localId,
        })
      );

      await userRepository.saveUser({
        email: respuesta.email,
        expired: respuesta.expiresIn,
        token: respuesta.idToken,
        kind: respuesta.kind,
        localId: respuesta.localId,
        refreshToken: respuesta.refreshToken,
        registered: true,
      });
    } catch (err) {
      console.error("Error al iniciar sesión:", JSON.stringify(err, null, 2));
      const errorMessage = handleErrorFirebase(err);
      Alert.alert("Error al iniciar sesion", errorMessage);
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
            <Text style={styles.title}>Bienvenido</Text>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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

export default LoginScreen;
