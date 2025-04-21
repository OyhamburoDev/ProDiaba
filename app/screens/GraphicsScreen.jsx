import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GraphicsScreen() {
  return (
    <LinearGradient colors={["#C1C8E4", "#F7D9E3"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Gráfico de Glucosa</Text>

        <Text style={{ marginTop: 20 }}>Cargando gráfico...</Text>
      </View>
    </LinearGradient>
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
