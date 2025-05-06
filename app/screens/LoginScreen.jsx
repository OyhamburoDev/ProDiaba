import react from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import InputForm from "../components/InputForm";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { useSignInMutation } from "../../api/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signIn, { isLoading, error }] = useSignInMutation();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const respuesta = await signIn({
        email,
        password,
        returnSecureToken: true,
      });

      console.info("Respuesta login --->", respuesta.data.email);
      console.info("Respuesta login --->", respuesta.data.idToken);

      dispatch(
        setUser({
          user: respuesta.data.email,
          token: respuesta.data.idToken,
        })
      );

      console.info("termina");
    } catch (error) {
      console.error("Catch en el login:", error);
    }
  };

  return (
    <View style={styles.cntLogin}>
      <View style={styles.secondCntLogin}>
        <Text style={styles.titleLogin}>LoginScreen</Text>
        <InputForm label={"email"} onchange={setEmail} error="" />
        <InputForm
          label={"password"}
          onchange={setPassword}
          error=""
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Send" />
        <Text style={styles.sub}>Not have a account?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

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
