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

export default function GlucoseMonitor({ array, setArray }) {
  const { theme } = useTheme();
  const [glucosa, setGlucosa] = useState("");
  const [horario, setHorario] = useState("");
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (glucosa && horario) {
      const today = new Date().toISOString().split("T")[0];
      const newEntry = { glucosa, horario, comentario, fecha: today };
      setArray((prevArray) => [...prevArray, newEntry]);
      setGlucosa("");
      setHorario("");
      setComentario("");
      setError("");
    } else {
      setError("Completa los campos de glucosa y horario");
    }
  };

  const navigateToDetailScreen = () => {
    navigation.navigate("DetailScreen", { array });
  };

  const onChangeTime = (event, selectedDate) => {
    if (selectedDate) {
      setShowPicker(false);
      setSelectedTime(selectedDate);
      setHorario(
        selectedDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
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
          value={glucosa}
          onChangeText={setGlucosa}
          keyboardType="numeric"
          placeholder="Ej: 110"
          style={styles.input}
        />

        <Text style={{ color: theme.card.colorSubtitle }}>Horario:</Text>
        <TouchableOpacity
          style={styles.timePicker}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.timeText}>
            {horario || "Seleccionar horario"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}

        <Text style={{ color: theme.card.colorSubtitle }}>
          Comentario (opcional):
        </Text>
        <TextInput
          value={comentario}
          onChangeText={setComentario}
          placeholder="Añadir comentario"
          style={styles.input}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.card.btnPrimario }]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Guardar</Text>
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
