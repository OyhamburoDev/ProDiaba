import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useThemeNew from "../hooks/useTheme";

export default function GraphicsScreen() {
  const pepe = useThemeNew();
  return (
    <LinearGradient colors={pepe.gradient} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: pepe.header.text }]}>
          Gráfico de Glucosa
        </Text>

        <Text style={{ marginTop: 20, color: pepe.header.text }}>
          Cargando gráfico...
        </Text>
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
