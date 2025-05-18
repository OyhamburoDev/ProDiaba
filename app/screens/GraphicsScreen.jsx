import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useThemeNew from "../hooks/useTheme";

export default function GraphicsScreen() {
  const theme = useThemeNew();
  return (
    <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.header.text }]}>
          Gráfico de Glucosa
        </Text>

        <Text style={{ marginTop: 20, color: theme.header.text }}>
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
