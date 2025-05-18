import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, clearLocation } from "../features/locationSlice";
import { useEffect } from "react";
import { useGetUserLocationQuery } from "../../api/services";
import { usePostUserLocationMutation } from "../../api/services";
import { LinearGradient } from "expo-linear-gradient";
import useThemeNew from "../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

export default function LocationComp({ navigation }) {
  const dispatch = useDispatch(); // REdux
  const [postUserLocation] = usePostUserLocationMutation(); // Firebase
  const longitude = useSelector((state) => state.location.longitude); // redux
  const latitude = useSelector((state) => state.location.latitude); // redux
  const { localId } = useSelector((state) => state.auth);
  const { data: locationFromBase } = useGetUserLocationQuery(localId); // trae de firebase
  const theme = useThemeNew();

  useEffect(() => {
    if (locationFromBase?.coords) {
      const { latitude, longitude } = locationFromBase.coords;
      dispatch(setLocation({ latitude, longitude }));
    }
  }, [locationFromBase, dispatch]);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denedago");
      return false;
    }
    return true;
  };

  // Tomar localizacion
  const takeLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      const location = await Location.getCurrentPositionAsync({});

      console.log("esta es la localizacion:", location);
      let longitude = location.coords.longitude;
      let latitude = location.coords.latitude;
      dispatch(setLocation({ longitude, latitude }));
      await postUserLocation({ localId, location });
      Alert.alert("Localización exitosamente");
    } catch (error) {
      Alert.alert("Error", "No se obtener los datos");
    }
  };

  // Eliminar la localización
  const deteleLocation = () => {
    dispatch(clearLocation());
  };

  return (
    <>
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
          <Text>Localización del Usuario:</Text>
          {longitude && latitude ? (
            <>
              <Text>Longitude:{longitude}</Text>
              <Text>Latitude: {latitude}</Text>
              <Button title="Eliminar Localización" onPress={deteleLocation} />
            </>
          ) : (
            <>
              <Button title="Tomar Localización" onPress={takeLocation} />
            </>
          )}
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  screenGradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50, // Ajusta según necesidad (iOS/Android)
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  backButton: {
    padding: 8,
  },
  container: {
    alignContent: "center",
    alignItems: "center",
  },
});
