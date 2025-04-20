import { StyleSheet, ScrollView, View } from "react-native";
import GlucoseMonitor from "../components/GlucoseMonitor";
import GlucoseMonitor2 from "../components/GlucoseMonitor2";
import Glucose3D from "../components/Glucose3D";
import SugarGraph from "../components/SugarGraph";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../config/fb";
import CardCategory from "../components/CardCategory";

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const [array, setArray] = useState([]);

  useEffect(() => {
    const q = query(
      collection(database, "monitorGlucose"),
      orderBy("createAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArray(datos);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <GlucoseMonitor2 setArray={setArray} array={array} />
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
        {/* <Glucose3D array={array} navigation={navigation} /> */}
        {/* <SugarGraph array={array} /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cntView: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
