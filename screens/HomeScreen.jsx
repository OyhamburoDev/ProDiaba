import { StyleSheet, ScrollView } from "react-native";
import GlucoseMonitor from "../components/GlucoseMonitor";
import Glucose3D from "../components/Glucose3D";
import SugarGraph from "../components/SugarGraph";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [array, setArray] = useState([]);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <GlucoseMonitor setArray={setArray} array={array} />
      <Glucose3D array={array} navigation={navigation} />
      <SugarGraph array={array} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
