import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import useThemeNew from "../hooks/useTheme";

const ListAdressScreen = ({ navigation }) => {
  const theme = useThemeNew();

  const handleGoToLocation = () => {
    navigation.navigate("LocationSelectorScreen");
  };

  return (
    <LinearGradient colors={theme.gradient} style={styles.screenGradient}>
      {/* Header personalizado */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleGoToLocation}
          style={styles.backButton}
        >
          <Text>Location</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ListAdressScreen;

const styles = StyleSheet.create({
  screenGradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50, // Ajusta según necesidad (iOS/Android)
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  backButton: {
    padding: 8,
  },
  container: {
    padding: 10,
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
