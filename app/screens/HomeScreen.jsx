import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import GlucoseMonitor from "../components/GlucoseMonitor";
import { useState } from "react";
import CardCategory from "../components/CardCategory";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "../hooks/useTheme";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [array, setArray] = useState([]);

  return (
    <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={theme.header.background}
        barStyle="light-content"
        translucent={false}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.glucoseWrapper}>
              <Image
                source={require("../../assets/ilustracion-tres.png")}
                style={styles.imageOverlay}
              />
              <GlucoseMonitor setArray={setArray} array={array} />
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
                tabTitle={"Graficos"}
                navigation={navigation}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    bottom: -42,
    right: -22,
    width: 180,
    height: 260,
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
    paddingTop: 0,
  },
});
