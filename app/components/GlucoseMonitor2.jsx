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
import AntDesign from "@expo/vector-icons/AntDesign";

import bloodDrop from "../../assets/drop-monitor.png";

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

  const isDark = theme.background === "#1C1E26";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.card}>
        <Text style={[styles.title, { color: theme.text }]}>Glucose</Text>
        <Text style={[styles.title, { color: theme.text }]}>Monitor</Text>

        <Image source={bloodDrop} style={styles.image} />

        <TextInput
          value={String(newItem.valorGlucemico)}
          onChangeText={(number) =>
            setNewItem({ ...newItem, valorGlucemico: Number(number) })
          }
          placeholder="Nivel de glucosa (mg/dL)"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#2C2F36" : "#fffef8",
              color: theme.text,
              borderColor: isDark ? "#444" : "#e0c989",
            },
          ]}
          keyboardType="numeric"
        />

        <TextInput
          value={newItem.comentario}
          onChangeText={(text) => setNewItem({ ...newItem, comentario: text })}
          placeholder="Comentario opcional"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#2C2F36" : "#fffef8",
              color: theme.text,
              borderColor: isDark ? "#444" : "#e0c989",
            },
          ]}
        />

        <TouchableOpacity
          style={[
            styles.cameraButton,
            {
              backgroundColor: isDark ? "#3A3D46" : "#fdd066",
            },
          ]}
        >
          <AntDesign name="camera" size={24} color={theme.text} />
          <Text
            style={[
              styles.cameraText,
              { color: isDark ? theme.text : "#3A2F18" },
            ]}
          >
            Usar cámara
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: isDark ? "#F87171" : "#F87171" },
          ]}
          onPress={onSend}
        >
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
  },
  card: {
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontFamily: "balooExtra",
    lineHeight: 52,
    marginBottom: -10,
  },
  image: {
    width: 155,
    height: 130,
    marginVertical: 20,
    resizeMode: "cover",
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: "baloo",
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    width: "100%",
    justifyContent: "center",
    gap: 6,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  cameraText: {
    fontFamily: "baloo",
    fontSize: 16,
  },
  saveButton: {
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
