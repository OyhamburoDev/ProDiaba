import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../config/fb";
import useThemeNew from "../hooks/useTheme";

export default function GlucoseMonitor2({ array, setArray }) {
  const pepe = useThemeNew();
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
    <View style={styles.container}>
      <Text style={[styles.title, { color: pepe.text }]}>Glucose Monitor</Text>
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
        ]}
      >
        <View style={styles.cardLeft}>
          <TextInput
            value={String(newItem.valorGlucemico)}
            onChangeText={(number) =>
              setNewItem({ ...newItem, valorGlucemico: Number(number) })
            }
            placeholder="Nivel de glucosa (mg/dL)"
            placeholderTextColor={pepe.text}
            style={[
              styles.input1,
              { borderColor: pepe.card.borderColor, color: pepe.text },
            ]}
            keyboardType="numeric"
          />

          <TextInput
            value={newItem.comentario}
            onChangeText={(text) =>
              setNewItem({ ...newItem, comentario: text })
            }
            placeholder="Comentario opcional"
            placeholderTextColor={pepe.text}
            style={[
              styles.input2,
              { borderColor: pepe.card.borderColor, color: pepe.text },
            ]}
          />

          <TouchableOpacity style={[styles.saveButton]} onPress={onSend}>
            <Text style={styles.saveText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.15)", // translúcido
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,

    shadowColor: "rgba(255, 255, 255, 0.75)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
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
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12, // un poco más de espacio
    fontSize: 14,
    fontFamily: "baloo",
    textAlign: "center",
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
  },
  saveButton: {
    backgroundColor: "#F87171",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    alignItems: "center",
    width: "185",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "baloo",
    fontWeight: "bold",
  },
  dropImage: {
    width: 80,
    height: 80,
    marginLeft: 15,
    resizeMode: "contain",
  },
});
