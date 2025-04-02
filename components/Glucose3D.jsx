import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Glucose3D({ navigation, array = [] }) {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [ultimosDias, setUltimosDias] = useState([]);

  useEffect(() => {
    const diasUnicos = [...new Set(array.map((item) => item.fecha))]
      .sort((a, b) => new Date(b) - new Date(a))
      .slice(0, 3);
    setUltimosDias(diasUnicos);
  }, [array]);

  const handleDayPress = (day) => {
    setSelectedDay(day);
    setFilteredData(array.filter((item) => item.fecha === day));
    setModalVisible(true);
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card.background }]}>
      <Text style={[styles.title, { color: theme.card.colorTitle }]}>
        Últimos Registros:
      </Text>
      <View style={styles.buttonsContainer}>
        {ultimosDias.map((dia, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleDayPress(dia)}
          >
            <Text style={{ color: "white" }}>{dia}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.btnVerM, { backgroundColor: theme.card.btnSecundario }]}
        onPress={() =>
          navigation.navigate("DetailScreen", { glucoseData: array })
        }
      >
        <Text style={styles.buttonText}>Ver más</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Información para {selectedDay}
            </Text>
            {filteredData.length === 0 ? (
              <Text>No hay registros para este día</Text>
            ) : (
              <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.record}>
                    <Text>🩸 Glucosa: {item.glucosa}</Text>
                    <Text>⏱️ Horario: {item.horario}</Text>
                    <Text>
                      📝 Comentario: {item.comentario || "Sin comentario"}
                    </Text>
                  </View>
                )}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  btnVerM: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  record: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
