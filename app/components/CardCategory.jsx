import { View, Text, Card, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CardCategory({ title, navigation, tabTitle }) {
  const iconName = title === "Registros" ? "schedule" : "bar-chart";
  return (
    <View style={styles.cardCnt}>
      <Pressable
        onPress={() => navigation.navigate(tabTitle, { categoria: title })}
        style={styles.pressable}
      >
        <MaterialIcons
          name={iconName}
          size={28}
          color="#8E5E2A"
          style={styles.icon}
        />
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardCnt: {
    backgroundColor: "white",
    height: 80,
    width: 150,
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pressable: {
    flexDirection: "row", // 💡 clave para poner el ícono y texto en fila
    alignItems: "center",
    justifyContent: "center",
    gap: 8, // si no te toma esto, usá marginRight en el icono
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 18,
    color: "#5B3E0B",
    fontWeight: "500",
  },
});
