import react, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useSignUpMutation } from "../../api/authServices";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmP, setErrorConfirmp] = useState("");

  const [signUp, { isLoading, error }] = useSignUpMutation();

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

    if (password != confirmPassword) {
      setErrorConfirmp("Las contrasenas deben coincidir");
      return;
    }

    try {
      const result = await signUp({
        email,
        password,
        returnSecureToken: true,
      }).unwrap();
      console.log("Usuario creado:", result);
      // En el siguiente paso guardamos esto en Redux
    } catch (err) {
      console.log("Error al registrarse:", err);
    }
  };

  return (
    <View style={styles.cntLogin}>
      <View style={styles.secondCntLogin}>
        <Text style={styles.titleLogin}>Signup</Text>
        <InputForm label={"Email"} onchange={setEmail} error={errorEmail} />
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
        <SubmitButton onPress={onSubmit} title="Send" />
        <Text style={styles.sub}>Ya tienes cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  cntLogin: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  secondCntLogin: {
    width: "80%",
    height: "40%",
    backgroundColor: "gray",
    alignItems: "center",
    borderRadius: 10,
  },
  titleLogin: {
    fontSize: 30,
    padding: 10,
  },
  sub: {
    fontSize: 14,
    color: "black",
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
});
