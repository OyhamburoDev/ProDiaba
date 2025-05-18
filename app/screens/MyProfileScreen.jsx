import { View, Text, Image, StyleSheet, Button } from "react-native";
import ImageSelectorScreen from "./ImageSelectorScreen";
import { useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../../api/services";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";

const MyProfileScreen = ({ navigation }) => {
  const { imageCamera, localId } = useSelector((state) => state.auth);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);

  const defaultImage = "../../assets/miPerfil.jpg";

  const launchCamera = () => {
    navigation.navigate(ImageSelectorScreen);
  };

  return (
    <LinearGradient colors={["#C1C8E4", "#F7D9E3"]} style={styles.gradient}>
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
          <Text style={styles.buttonText}>Agregar foto de Perfil</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Mi dirección</Text>
        </Pressable>

        <Pressable style={styles.logoutButton}>
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
