import { Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useThemeNew from "../hooks/useTheme";
import { BlurView } from "expo-blur";

export default function CardCategory({ title, navigation, tabTitle }) {
  const iconName = title === "Registros" ? "schedule" : "bar-chart";
  const theme = useThemeNew();
  return (
    <BlurView intensity={25} tint="light" style={styles.cardCnt}>
      <Pressable
        onPress={() => navigation.navigate(tabTitle, { categoria: title })}
        style={styles.pressable}
      >
        <MaterialIcons
          name={iconName}
          size={28}
          color="black"
          style={{ color: theme.text }}
        />
        <Text style={[styles.text, { color: theme.text }]}>{title}</Text>
      </Pressable>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  cardCnt: {
    borderRadius: 28,
    justifyContent: "center",
    padding: 25,
    paddingLeft: 20,
    paddingRight: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.29)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
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
