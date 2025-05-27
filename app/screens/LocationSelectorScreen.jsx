import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setAddress } from "../features/locationSlice";
import { useEffect, useState } from "react";
import { usePostUserLocationMutation } from "../../api/services";
import { LinearGradient } from "expo-linear-gradient";
import useThemeNew from "../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { MapViewComponent } from "../components/MapViewComponent";
import { GOOGLE_MAPS_KEY } from "../dataBases/googleMaps";

export default function LocationSelectorScreen({ navigation }) {
  const dispatch = useDispatch();
  const [postUserLocation] = usePostUserLocationMutation();
  const address = useSelector((state) => state.location.address);
  const { localId } = useSelector((state) => state.auth);
  const theme = useThemeNew();

  const [tempLocation, setTempLocation] = useState(null);

  // Obtener ubicación al cargar
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      console.log("📍 Nueva ubicación tomada:", latitude, longitude);
      setTempLocation({ latitude, longitude });
    })();
  }, []);

  // Obtener dirección formateada
  useEffect(() => {
    const fetchAddress = async () => {
      if (!tempLocation?.latitude || !tempLocation?.longitude) return;
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${tempLocation.latitude},${tempLocation.longitude}&key=${GOOGLE_MAPS_KEY}`
        );
        const data = await response.json();
        const formattedAddress = data?.results?.[0]?.formatted_address;
        console.log("📬 Dirección seteada:", formattedAddress);
        dispatch(setAddress({ address: formattedAddress }));
      } catch (err) {
        console.error("Error al obtener la dirección:", err);
      }
    };

    fetchAddress();
  }, [tempLocation]);

  // Confirmar y guardar ubicación
  const confirmarUbicacion = async () => {
    if (!tempLocation) return;
    dispatch(setLocation(tempLocation));
    await postUserLocation({
      localId,
      location: {
        ...tempLocation,
        address,
      },
    });
    Alert.alert("Ubicación guardada");
    navigation.goBack();
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.screenGradient}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.header.text }]}>
          Localización del Usuario:
        </Text>
        {tempLocation ? (
          <>
            <Text style={[styles.addressText, { color: theme.header.text }]}>
              {address}
            </Text>
            <MapViewComponent
              latitude={tempLocation.latitude}
              longitude={tempLocation.longitude}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmarUbicacion}
            >
              <Text style={styles.deleteButtonText}>Confirmar ubicación</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{ color: theme.text }}>Cargando ubicación...</Text>
        )}
      </View>
    </LinearGradient>
  );
}

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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  container: {
    alignContent: "center",
    alignItems: "center",
  },
  addressText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: "#4f6edc",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
