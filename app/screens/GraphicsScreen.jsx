import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useRoute } from "@react-navigation/native";

export default function GraphicsScreen() {
  const route = useRoute();
  const { array } = route.params;

  // Preprocesamos los datos de glucosa
  const glucoseData = array.map((entry) => parseInt(entry.glucosa)); // Solo los valores de glucosa
  const horarios = array.map((entry) => entry.horario); // Obtenemos los horarios del array

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
      <Text style={styles.title}>Gráfico de Glucosa</Text>

      <LineChart
        data={{
          labels: horarios, // Ahora las etiquetas son los horarios
          datasets: [
            {
              data: glucoseData, // Datos de glucosa
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color de los puntos (se manipula más abajo)
              strokeWidth: 2,
            },
          ],
        }}
        width={340} // Ancho del gráfico
        height={220} // Alto del gráfico
        yAxisLabel="mg/dL"
        chartConfig={{
          backgroundColor: "#f8f8f8",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#e2e2e2",
          decimalPlaces: 0, // No queremos decimales
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6", // Tamaño de los puntos
            strokeWidth: "2",
            stroke: "#ffa726", // Color de borde de los puntos
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        // Modificar los puntos para que tengan los colores correctos
        propsForDots={(point) => {
          const color = getColorForGlucose(dataset[point.index].value);
          return {
            r: "6", // Tamaño de los puntos
            strokeWidth: "2",
            stroke: "#ffa726", // Color de borde de los puntos
            fill: color, // Aquí asignamos el color del punto según el nivel de glucosa
          };
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
