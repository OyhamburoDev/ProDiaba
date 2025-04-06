import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../context/ThemeContext";
import { database } from "../config/fb";
import { addDoc, collection } from "firebase/firestore";

export default function GlucoseMonitor2({ array, setArray }) {
  // Para estilos
  const { theme } = useTheme();

  // Para los datos del glucometro
  const [newItem, setNewItem] = useState({
    valorGlucemico: "",
    createAt: new Date(),
    comentario: "",
  });

  const onSend = async () => {
    await addDoc(collection(database, "monitorGlucose"), newItem);
    setNewItem({
      valorGlucemico: "",
      createAt: new Date(),
      comentario: "",
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card.background }]}>
        <Text style={[styles.title, { color: theme.card.colorTitle }]}>
          Registro de Glucosa
        </Text>

        <Text style={{ color: theme.card.colorSubtitle }}>
          Nivel de Glucosa:
        </Text>
        <TextInput
          value={String(newItem.valorGlucemico)}
          onChangeText={(number) =>
            setNewItem({ ...newItem, valorGlucemico: Number(number) })
          }
          placeholder="Ej: 110"
          style={styles.input}
          keyboardType="numeric"
        />

        <Text style={{ color: theme.card.colorSubtitle }}>
          Comentario (opcional):
        </Text>
        <TextInput
          value={String(newItem.comentario)}
          onChangeText={(text) => setNewItem({ ...newItem, comentario: text })}
          placeholder="Añadir comentario"
          style={styles.input}
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.card.btnPrimario }]}
            onPress={onSend}
          >
            <Text style={styles.buttonText}>Nuevo guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dark: { backgroundColor: "#1E1E1E" },
  light: { backgroundColor: "white" },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 8,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  timePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  timeText: {
    color: "#555",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
