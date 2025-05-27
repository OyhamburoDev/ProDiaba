import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../../api/services";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import useThemeNew from "../hooks/useTheme";
import store from "../store";
import userRepository from "../dataBases/userDao";
import { clearUser } from "../features/userSlice";

const MyProfileScreen = ({ navigation }) => {
  const { imageCamera, localId } = useSelector((state) => state.auth);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);
  const theme = useThemeNew();

  const defaultImage = "../../assets/miPerfil.jpg";

  const launchCamera = () => {
    navigation.navigate("ImageSelectorScreen");
  };

  const handleGoToLocation = () => {
    navigation.navigate("ListAdressScreen");
  };

  const handleLogOut = () => {
    // cerrar sesion en la app
    // en redux
    store.dispatch(clearUser());
    // y en db
    userRepository.deleteUser();
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.gradient}>
      {/* Header personalizado */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>Perfil</Text>
      </View>
      <View style={styles.container}>
        {imageFromBase || imageCamera ? (
          <Image
            source={{ uri: imageFromBase?.image || imageCamera }}
            style={styles.imgProfile}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require(defaultImage)}
            style={styles.imgProfile}
            resizeMode="cover"
          />
        )}

        <Pressable style={styles.button} onPress={launchCamera}>
          <Text style={styles.buttonText}>Mi foto de perfil</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleGoToLocation}>
          <Text style={styles.buttonText}>Mi dirección</Text>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={handleLogOut}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    paddingTop: 60, // Ajusta según necesidad (50-60 para iOS, 20-30 para Android)
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerText: {
    fontSize: 25,
    fontFamily: "balooSemi",
    color: "#fff",
    textAlign: "center",
  },
  container: {
    padding: 10,
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imgProfile: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000", // sombra para ios
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6, // sombra para android
  },
  button: {
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 5,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  logoutButton: {
    width: "80%",
    backgroundColor: "#F87171",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 5,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
