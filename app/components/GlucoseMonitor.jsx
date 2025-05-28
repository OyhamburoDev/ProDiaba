import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import useThemeNew from "../hooks/useTheme";
import {
  useAddNewControlMutation,
  useGetControlesQuery,
} from "../../api/services";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

export default function GlucoseMonitor() {
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const theme = useThemeNew();
  const localId = useSelector((state) => state.auth.localId);
  const [newItem, setNewItem] = useState({
    valorGlucemico: "",
    comentario: "",
  });

  const [addControl] = useAddNewControlMutation();
  const { refetch } = useGetControlesQuery(localId);

  const onSend = () => {
    const now = new Date();
    const fecha = now
      .toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
    const hora = now.toTimeString().slice(0, 5);

    const glucemia = Number(newItem.valorGlucemico);

    if (!newItem.valorGlucemico.trim()) {
      Alert.alert("Error", "El valor de glucosa no puede estar vacío");
      return;
    }

    if (isNaN(glucemia)) {
      Alert.alert("Error", "Ingresá un número válido");
      return;
    }

    if (glucemia <= 0) {
      Alert.alert("Error", "El número debe ser mayor a cero");
      return;
    }

    const controlFormateado = {
      glucemia,
      comentario: newItem.comentario,
      hora,
    };
    addControl({ fecha, control: controlFormateado, localId })
      .unwrap()
      .then(() => {
        refetch();
        setNewItem({
          valorGlucemico: "",
          comentario: "",
        });
        Alert.alert("Éxito", "Tu nivel de glucosa fue guardado correctamente");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        Control de glucemia
      </Text>
      <BlurView intensity={25} tint="light" style={styles.cardContainer}>
        <View style={styles.cardLeft}>
          <TextInput
            value={String(newItem.valorGlucemico)}
            onChangeText={(text) =>
              setNewItem({ ...newItem, valorGlucemico: text })
            }
            placeholder="Nivel de glucosa (mg/dL)"
            placeholderTextColor="rgba(0, 0, 0, 0.59)"
            onFocus={() => setFocus1(true)}
            onBlur={() => setFocus1(false)}
            style={[
              styles.input1,
              {
                color: theme.text,
                borderColor: focus1
                  ? "rgba(197, 202, 233, 0.8)"
                  : "rgba(255, 255, 255, 0)",
                backgroundColor: focus1
                  ? "rgba(255, 255, 255, 0.5)"
                  : "rgba(255, 255, 255, 0.83)",
              },
            ]}
            keyboardType="numeric"
          />

          <TextInput
            value={newItem.comentario}
            onChangeText={(text) =>
              setNewItem({ ...newItem, comentario: text })
            }
            placeholder="Comentario opcional"
            placeholderTextColor="rgba(0, 0, 0, 0.59)"
            onFocus={() => setFocus2(true)}
            onBlur={() => setFocus2(false)}
            style={[
              styles.input2,
              {
                color: theme.text,
                borderColor: focus2
                  ? "rgba(197, 202, 233, 0.8)"
                  : "rgba(255, 255, 255, 0)",
                backgroundColor: focus2
                  ? "rgba(255, 255, 255, 0.5)"
                  : "rgba(255, 255, 255, 0.83)",
              },
            ]}
          />

          <Pressable
            onPress={onSend}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={["#4f6edc", "#6174ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Text style={styles.saveText}>Guardar</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 30,
  },
  cardContainer: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.13)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  cardLeft: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: "balooExtra",
    marginBottom: 20,
    textAlign: "center",
  },
  input1: {
    width: "75%",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: "baloo",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.83)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0)",
  },
  input2: {
    width: "60%",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: "baloo",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.83)",
  },
  saveButton: {
    borderRadius: 14,
    marginTop: 6,
    width: "65%",
    overflow: "hidden",
  },

  gradient: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "baloo",
    fontWeight: "bold",
  },
});
