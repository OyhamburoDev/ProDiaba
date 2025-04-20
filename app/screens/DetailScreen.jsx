import { FlatList, Text, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import registros from "../../assets/data/registros.json";

export default function DetailScreen() {
  const navigation = useNavigation();

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
