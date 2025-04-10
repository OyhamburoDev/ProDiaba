// Nuevo diseño visual inspirado en tus pantallas con gotita
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../config/fb";
import cameraIcon from "../../assets/icon-camera.png"; // Icono ficticio, asegurate de tenerlo
import bloodDrop from "../../assets/drop-monitor.png"; // Usar el mismo estilo visual

export default function GlucoseMonitor2({ array, setArray }) {
  const { theme } = useTheme();
  const [newItem, setNewItem] = useState({
    valorGlucemico: "",
    createAt: new Date(),
    comentario: "",
  });

  const onSend = async () => {
    await addDoc(collection(database, "monitorGlucose"), newItem);
    setNewItem({ valorGlucemico: "", createAt: new Date(), comentario: "" });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.card}>
        <Text style={styles.title}>Glucose Monitor</Text>
        <Image source={bloodDrop} style={styles.image} />

        <TextInput
          value={String(newItem.valorGlucemico)}
          onChangeText={(number) =>
            setNewItem({ ...newItem, valorGlucemico: Number(number) })
          }
          placeholder="Nivel de glucosa (mg/dL)"
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          value={String(newItem.comentario)}
          onChangeText={(text) => setNewItem({ ...newItem, comentario: text })}
          placeholder="Comentario opcional"
          style={styles.input}
        />

        <TouchableOpacity style={styles.cameraButton}>
          <Image source={cameraIcon} style={styles.cameraIcon} />
          <Text style={styles.cameraText}>Usar cámara</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={onSend}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff8dc",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: "balooExtra",
    color: "#3A2F18",
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0c989",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fffef8",
    fontSize: 16,
    fontFamily: "baloo",
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdd066",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  cameraIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  cameraText: {
    fontFamily: "baloo",
    fontSize: 16,
    color: "#3A2F18",
  },
  saveButton: {
    backgroundColor: "#F87171",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "baloo",
  },
});
