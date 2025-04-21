import { Text, View, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ItemScreen({ route }) {
  const { controles, fecha } = route.params;

  return (
    <LinearGradient colors={["#C1C8E4", "#F7D9E3"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Registros del {fecha}</Text>
        <FlatList
          data={controles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.hora}>{item.hora}</Text>
              <Text style={styles.glucemia}>
                Glucemia: {item.glucemia} mg/dL
              </Text>
              <Text style={styles.comentario}>{item.comentario}</Text>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#5B3E0B",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  hora: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6A00FF",
  },
  glucemia: {
    fontSize: 16,
    marginTop: 4,
    color: "#333333",
  },
  comentario: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 4,
    color: "#666666",
  },
});
