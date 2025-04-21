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
          color="black"
          style={styles.icon}
        />
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardCnt: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 28,
    justifyContent: "center",
    shadowColor: "rgba(255, 255, 255, 0.75)",

    elevation: 8,
    padding: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  text: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
    fontFamily: "balooSemi",
  },
});
