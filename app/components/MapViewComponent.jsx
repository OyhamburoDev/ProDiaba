import { View, Image, Text, StyleSheet } from "react-native";
import { GOOGLE_MAPS_KEY } from "../dataBases/googleMaps";

export const MapViewComponent = ({ latitude, longitude }) => {
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=600x300&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=${GOOGLE_MAPS_KEY}`;

  console.log("URL generada:", googleMapsUrl);
  return (
    <View style={styles.card}>
      <Image style={styles.mapImage} source={{ uri: googleMapsUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 220,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5, // Android sombra
    shadowColor: "#000", // iOS sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
