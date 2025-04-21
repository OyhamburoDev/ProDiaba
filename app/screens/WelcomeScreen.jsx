import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import glucometerDrop from "../../assets/drop-welcome.png";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen({ navigation, onLayout }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Inicia animación de fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Timer para ir al Home
    const timer = setTimeout(() => {
      navigation.replace("Main");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#C1C8E4", "#F7D9E3"]} style={{ flex: 1 }}>
      <View style={styles.container} onLayout={onLayout}>
        <Animated.View style={{ ...styles.innerContainer, opacity: fadeAnim }}>
          <Text style={styles.title}>¡Bienvenidos!</Text>
          <Image source={glucometerDrop} style={styles.image} />
          <Text style={styles.subtitle}>Comencemos a rastrear tu glucosa</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    color: "#5B3E0B",
    fontFamily: "balooExtra",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: width * 0.7,
    height: width * 0.6,
    resizeMode: "contain",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24, // Antes 30
    fontFamily: "baloo",
    color: "#4C3B0D",
    textAlign: "center",
    maxWidth: width * 0.8,
    lineHeight: 30,
    marginTop: 10,
  },
});
