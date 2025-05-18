import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState } from "react";
import useThemeNew from "../hooks/useTheme";
import { useAddNewControlMutation } from "../../api/services";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function GlucoseMonitor2({ array, setArray }) {
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const theme = useThemeNew();
  const [newItem, setNewItem] = useState({
    valorGlucemico: "",
    createAt: new Date(),
    comentario: "",
  });

  const [addControl] = useAddNewControlMutation();

  const onSend = () => {
    const fecha = newItem.createAt.toISOString().split("T")[0]; // ejemplo: "2025-04-30"
    const hora = newItem.createAt.toTimeString().slice(0, 5); // ejemplo: "14:30"

    const controlFormateado = {
      glucemia: newItem.valorGlucemico,
      comentario: newItem.comentario,
      hora: hora,
    };
    console.log("📤 Enviando a Firebase:", {
      fecha,
      control: controlFormateado,
    });
    addControl({ fecha, control: controlFormateado })
      .unwrap()
      .then(() => {
        console.log("✅ Control guardado");
        setNewItem({
          valorGlucemico: "",
          comentario: "",
          createAt: new Date(),
        });
      })
      .catch((err) => {
        console.error("❌ Error:", err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Glucose Monitor</Text>
      <BlurView intensity={25} tint="light" style={styles.cardContainer}>
        <View style={styles.cardLeft}>
          <TextInput
            value={String(newItem.valorGlucemico)}
            onChangeText={(number) =>
              setNewItem({ ...newItem, valorGlucemico: Number(number) })
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
    marginBottom: 20, // ⬅️ separa del card
    textAlign: "center",
  },
  input1: {
    width: "75%",

    borderRadius: 12,
    padding: 10,
    marginBottom: 12, // un poco más de espacio
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
    marginBottom: 12, // un poco más de espacio
    fontSize: 14,
    fontFamily: "baloo",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.83)",
  },
  saveButton: {
    borderRadius: 14,
    marginTop: 8,
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
