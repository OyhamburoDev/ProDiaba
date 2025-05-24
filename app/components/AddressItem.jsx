import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteUserLocationMutation } from "../../api/services";
import { clearLocation } from "../features/locationSlice";
import { Ionicons } from "@expo/vector-icons";

const AddressItem = ({ navigation }) => {
  const address = useSelector((state) => state.location.address);
  const dispatch = useDispatch(); // REdux
  const [deleteUserLocation] = useDeleteUserLocationMutation();
  const { localId } = useSelector((state) => state.auth);

  const onChangeLocation = () => {
    navigation.navigate("LocationSelectorScreen");
  };

  // Eliminar la localización
  const deteleLocation = async () => {
    try {
      await deleteUserLocation(localId); // borra en Firebase
      dispatch(clearLocation()); // limpia en Redux
      Alert.alert("Localización eliminada");
    } catch (error) {
      console.error("Error al eliminar la localización:", error);
      Alert.alert("Error", "No se pudo eliminar la localización");
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Dirección guardada</Text>
      <Text style={styles.address}>{address}</Text>

      <TouchableOpacity style={styles.button} onPress={onChangeLocation}>
        <Ionicons name="location-outline" size={20} color="white" />
        <Text style={styles.buttonText}>Cambiar ubicación</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={deteleLocation}>
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressItem;
const styles = StyleSheet.create({
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
  address: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    width: "70%",
    backgroundColor: "#6c5ce7", // o el color que uses en tu app
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
  deleteButton: {
    width: "70%",
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,

    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
