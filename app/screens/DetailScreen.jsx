import { FlatList, Text, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import registros from "../../assets/data/registros.json";
import { LinearGradient } from "expo-linear-gradient";
import useThemeNew from "../hooks/useTheme";

export default function DetailScreen() {
  const navigation = useNavigation();
  const pepe = useThemeNew();

  return (
    <LinearGradient colors={pepe.gradient} style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={registros}
          keyExtractor={(item) => item.fecha}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate("ItemScreen", {
                  controles: item.controles,
                  fecha: item.fecha,
                })
              }
            >
              <Text style={styles.fecha}>{item.fecha}</Text>
            </Pressable>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  fecha: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});
