import {
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import useThemeNew from "../hooks/useTheme";
import { useGetControlesQuery } from "../../api/services";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { BlurView } from "expo-blur";
import { useSelector } from "react-redux";

export default function DetailScreen() {
  const navigation = useNavigation();
  const theme = useThemeNew();
  const localId = useSelector((state) => state.auth.localId);
  const { data } = useGetControlesQuery(localId);

  const fechas = data
    ? Object.keys(data).sort((a, b) => new Date(b) - new Date(a))
    : [];
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDatePress = (day) => {
    setSelectedDate(day.dateString);
    if (data[day.dateString]) {
      const controles = Object.values(data[day.dateString]);
      navigation.navigate("ItemScreen", {
        controles,
        fecha: day.dateString,
      });
    }
  };

  // Para marcar fechas que tienen controles
  const markedDates = fechas.reduce((acc, fecha) => {
    acc[fecha] = { marked: true, dotColor: "#6c5ce7" };
    return acc;
  }, {});

  return (
    <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
      {/* Header personalizado */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>
          Historial de glucosa
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <BlurView intensity={25} tint="light" style={styles.cardContainer}>
            <View style={styles.calendarCard}>
              <Calendar
                onDayPress={handleDatePress}
                markedDates={markedDates}
                theme={{
                  backgroundColor: "transparent",
                  calendarBackground: "transparent",
                  dayTextColor: "#000",
                  monthTextColor: theme.text,
                  arrowColor: theme.text,
                  todayTextColor: "#0984e3",
                  selectedDayTextColor: "#fff",
                  dotColor: "#6c5ce7",
                  textMonthFontFamily: "balooBold",
                }}
                style={{ width: 300 }}
              />
            </View>
          </BlurView>

          <Text style={[styles.subtitleText, { color: theme.text }]}>
            Fechas con registros
          </Text>

          {fechas.map((item) => (
            <Pressable
              key={item}
              style={styles.card}
              onPress={() => {
                const controles = Object.values(data[item]);
                navigation.navigate("ItemScreen", {
                  controles,
                  fecha: item,
                });
              }}
            >
              <Text style={styles.fecha}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerText: {
    fontSize: 25,
    fontFamily: "balooSemi",
    color: "#fff",
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 120, // espacio suficiente para que el TabBar no tape nada
  },
  cardContainer: {
    width: "95%", // más angosto
    maxWidth: 340,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 12, // menos padding
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.13)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  calendarCard: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleText: {
    fontSize: 20,
    fontFamily: "balooSemi",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 30,
  },
  fecha: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});
