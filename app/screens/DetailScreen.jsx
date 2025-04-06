import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function DetailScreen() {
  const route = useRoute();
  const params = route.params || {}; // Protección contra undefined
  const safeArray = Array.isArray(params.glucoseData) ? params.glucoseData : [];

  console.log("Datos recibidos en DetailScreen:", safeArray);

  const groupedData = {};
  safeArray.forEach((item = {}) => {
    const fecha = item.fecha || "Sin fecha";
    groupedData[fecha] = groupedData[fecha] || [];
    groupedData[fecha].push({
      glucosa: item.glucosa || "N/A",
      horario: item.horario || "N/A",
      comentario: item.comentario || "Sin comentario",
    });
  });

  const navigation = useNavigation();
  const [activeDate, setActiveDate] = useState(null);

  const navigateToGraphicsScreen = () => {
    navigation.navigate("GraphicsScreen", { glucoseData: safeArray });
  };

  return (
    <SafeAreaView style={styles.container}>
      {safeArray.length === 0 ? (
        <Text style={styles.emptyMessage}>No hay datos disponibles</Text>
      ) : (
        <>
          <FlatList
            data={Object.keys(groupedData)}
            keyExtractor={(date) => date}
            renderItem={({ item: date }) => (
              <View style={styles.accordionContainer}>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() =>
                    setActiveDate(activeDate === date ? null : date)
                  }
                >
                  <Text style={styles.accordionTitle}>{date}</Text>
                </TouchableOpacity>

                {activeDate === date && (
                  <View style={styles.accordionContent}>
                    {groupedData[date].map((record, index) => (
                      <View key={index} style={styles.record}>
                        <Text>🩸 Glucosa: {record.glucosa}</Text>
                        <Text>⏱️ Horario: {record.horario}</Text>
                        <Text>📝 Comentario: {record.comentario}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  accordionContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  accordionHeader: {
    backgroundColor: "#4CAF50",
    padding: 12,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  accordionContent: {
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  record: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
