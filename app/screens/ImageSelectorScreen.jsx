import { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { usePostProfileImageMutation } from "../../api/services";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePiker from "expo-image-picker";
import { setCameraImage } from "../features/userSlice";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import useThemeNew from "../hooks/useTheme";
import { useGetProfileImageQuery } from "../../api/services";
import { Ionicons } from "@expo/vector-icons";

const ImageSelectorScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [triggerPostImage, result] = usePostProfileImageMutation();
  const { localId } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetProfileImageQuery(localId);
  const dispatch = useDispatch();
  const theme = useThemeNew();

  const confirmImage = () => {
    try {
      dispatch(setCameraImage(image));
      triggerPostImage({ image, localId });
      navigation.goBack();
    } catch (err) {
      console.error("Error en confirmImage:", err);
    }
  };

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePiker.requestCameraPermissionsAsync();
    return granted;
  };

  const pickImage = async () => {
    try {
      const permissionCamera = await verifyCameraPermissions();
      if (permissionCamera) {
        let result = await ImagePiker.launchCameraAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 0.2,
        });
        if (!result.canceled) {
          const image = `data:image/jpeg;base64, ${result.assets[0].base64}`;
          setImage(image);
        }
      }
    } catch (err) {
      console.error("Error al tomar o procesar la imagen:", err);
    }
  };

  if (isLoading) return <Text>Cargando imagen...</Text>;
  if (error) return <Text>Error al cargar imagen</Text>;

  return (
    <LinearGradient colors={theme.gradient} style={styles.screenGradient}>
      {/* Header personalizado */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.image} />

            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Tomar otra foto</Text>
            </Pressable>

            <Pressable style={styles.logoutButton} onPress={confirmImage}>
              <LinearGradient
                colors={["#4f6edc", "#6174ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
              >
                <Text style={styles.logoutText}>Confirmar</Text>
              </LinearGradient>
            </Pressable>
          </>
        ) : data?.image ? (
          <>
            <Image source={{ uri: data.image }} style={styles.image} />

            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Tomar otra foto</Text>
            </Pressable>
            {/* No mostramos "Confirmar" acá porque no hay nada nuevo que confirmar */}
          </>
        ) : (
          <View style={styles.noPhotoContainer}>
            <Text style={styles.noPhotoText}>No hay foto para mostrar</Text>

            <Pressable style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Tomar una foto</Text>
            </Pressable>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default ImageSelectorScreen;

const styles = StyleSheet.create({
  screenGradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  backButton: {
    padding: 8,
  },
  container: {
    padding: 10,
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
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
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 5,
  },

  logoutButton: {
    width: "100%",
    borderRadius: 14,
    alignItems: "center",
  },
  gradient: {
    width: "80%",
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  noPhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  noPhotoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
