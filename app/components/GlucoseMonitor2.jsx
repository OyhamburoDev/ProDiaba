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
        <Text style={styles.title}>Glucose</Text>
        <Text style={styles.title}>Monitor</Text>

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
          value={newItem.comentario}
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
    flex: 1,
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#FFF8DC", // color similar al diseño
  },
  card: {
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontFamily: "balooExtra",
    color: "#3A2F18",
    lineHeight: 52,
    marginBottom: -10,
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 20,
    resizeMode: "contain",
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#e0c989",
    borderRadius: 12,
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
    borderRadius: 12,
    marginBottom: 15,
    width: "100%",
    justifyContent: "center",
  },
  cameraIcon: {
    width: 20,
    height: 20,
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
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "baloo",
    fontWeight: "bold",
  },
});
