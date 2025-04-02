import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

export default function SugarGraph({ array }) {
  const { theme } = useTheme();

  // Preprocesamos los datos de glucosa
  const glucoseData = array.length
    ? array.map((entry) => parseInt(entry.glucosa))
    : [0];
  const horarios = array.length
    ? array.map((entry) => entry.horario)
    : ["Sin datos"];

  // Función para asignar color según el nivel de glucosa
  const getColorForGlucose = (glucoseLevel) => {
    if (glucoseLevel < 80) {
      return "black"; // Niveles bajos en negro
    } else if (glucoseLevel >= 80 && glucoseLevel <= 150) {
      return "green"; // Niveles normales en verde
    } else {
      return "red"; // Niveles altos en rojo
    }
  };

  // Generar el conjunto de datos con colores dinámicos
  const dataset = glucoseData.map((level) => ({
    value: level,
    color: getColorForGlucose(level),
  }));

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.card.colorTitle }]}>
        Últimas 24hs:
      </Text>

      <LineChart
        data={{
          labels: horarios,
          datasets: [
            {
              data: glucoseData,
              color: (opacity = 1) => theme.chart.lineColor, // Línea del gráfico
              strokeWidth: 2,
            },
          ],
        }}
        width={340}
        height={220}
        yAxisLabel="mg/dL"
        chartConfig={{
          backgroundColor: theme.chart.backgroundGradientFrom,
          backgroundGradientFrom: theme.chart.backgroundGradientFrom,
          backgroundGradientTo: theme.chart.backgroundGradientTo,
          decimalPlaces: 0,
          color: (opacity = 1) => theme.chart.labelColor,
          labelColor: (opacity = 1) => theme.chart.labelColor,
          style: { borderRadius: 16 },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: theme.chart.dotBorderColor,
          },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
        // Modificar los puntos para que tengan los colores correctos
        propsForDots={(point) => {
          if (!dataset[point.index]) return {};
          const color = getColorForGlucose(dataset[point.index].value);
          return { fill: color };
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
