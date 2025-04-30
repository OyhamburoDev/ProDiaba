import { FlatList, Text, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import useThemeNew from "../hooks/useTheme";
import { useGetControlesQuery } from "../../api/services";

export default function DetailScreen() {
  const navigation = useNavigation();
  const pepe = useThemeNew();
  const { data } = useGetControlesQuery();

  const fechas = data ? Object.keys(data) : [];

  return (
    <LinearGradient colors={pepe.gradient} style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={fechas}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => {
                const controles = Object.values(data[item]);
                navigation.navigate("ItemScreen", {
                  controles,
                  fecha: item,
                });
              }}
            >
              <Text style={styles.fecha}>{item}</Text>
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
