import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import useThemeNew from "../hooks/useTheme";
import { useSelector } from "react-redux";
import AddressItem from "../components/AddressItem";
import { useGetUserLocationQuery } from "../../api/services";

const ListAdressScreen = ({ navigation }) => {
  const theme = useThemeNew();

  const { localId } = useSelector((state) => state.auth);
  const {
    data: locationFromBase,
    isLoading,
    isError,
  } = useGetUserLocationQuery(localId);

  const handleGoToLocation = () => {
    navigation.navigate("LocationSelectorScreen");
  };

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

      {isLoading ? (
        <Text style={{ color: theme.text }}>Cargando...</Text>
      ) : locationFromBase?.address ? (
        <AddressItem navigation={navigation} />
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>No hay dirección guardada</Text>
          <TouchableOpacity style={styles.button} onPress={handleGoToLocation}>
            <Ionicons name="location-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Tomar ubicación</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

export default ListAdressScreen;

const styles = StyleSheet.create({
  screenGradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 6,
  },
  button: {
    backgroundColor: "#6c5ce7",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 16,
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
    padding: 10,
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
