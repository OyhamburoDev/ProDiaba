import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import GlucoseMonitor2 from "../components/GlucoseMonitor2";
import { useState, useEffect } from "react";

import CardCategory from "../components/CardCategory";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../hooks/useTheme";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [array, setArray] = useState([]);

  return (
    <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, paddingTop: 0 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.glucoseWrapper}>
            <Image
              source={require("../../assets/ilustracion-dos.png")}
              style={styles.imageOverlay}
            />
            <GlucoseMonitor2 setArray={setArray} array={array} />
          </View>
          <View>
            <Text style={[styles.titleOptions, { color: theme.text }]}>
              Opciones
            </Text>
          </View>

          <View style={styles.cntView}>
            <CardCategory
              title={"Registros"}
              tabTitle={"Registros"}
              navigation={navigation}
            />
            <CardCategory
              title={"Graficos"}
              tabTitle={"Gráficos"}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  cntView: {
    flexDirection: "row",
    justifyContent: "space-around",

    paddingHorizontal: 10,
    gap: 10,
  },
  glucoseWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  imageOverlay: {
    position: "absolute",
    bottom: -80, // Ajustá esto según tu diseño
    right: -90,
    width: 330,
    height: 330,
    zIndex: 2,
    resizeMode: "contain",
  },
  titleOptions: {
    fontSize: 25,
    fontFamily: "balooExtra",
    marginTop: 40,
    marginLeft: 14,
    marginBottom: 10,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0, // 👈 esto es clave
  },
});
