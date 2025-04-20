import { StyleSheet, Text, View } from "react-native";

export default function GraphicsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico de Glucosa</Text>

      <Text style={{ marginTop: 20 }}>Cargando gráfico...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
