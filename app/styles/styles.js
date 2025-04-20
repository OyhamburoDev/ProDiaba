export const lightTheme = {
  background: "#FFF8DC",
  text: "#5B3E0B",
  buttonBg: "#f0f0f0",
  header: {
    // 🔹 Agregamos esta sección
    background: "#FFF8DC",
    text: "#5B3E0B",
    borderBottomColor: "#dcdcdc", // Línea sutil para separar el header
    shadow: "rgba(0, 0, 0, 0.1)", // Sombra más suave en light mode
  },
  card: {
    background: "white",
    colorTitle: "black",
    colorSubtitle: "black",
    btnPrimario: "#007AFF",
    btnSecundario: "#007AFF",
  },
  chart: {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#e2e2e2",
    labelColor: "#000000",
    lineColor: "#000000",
    dotBorderColor: "#ffa726",
  },
};

export const darkTheme = {
  background: "#1C1E26", // Fondo principal oscuro
  text: "#FDF2E9",
  buttonBg: "#333333",
  header: {
    background: "#1C1E26", // 🔹 Un poco más claro que el fondo para destacar
    text: "#FDF2E9",
  },
  card: {
    background: "#1E1E1E",
    colorTitle: "#E0E0E0",
    colorSubtitle: "#A8A8A8",
    btnPrimario: "#00C9A7",
    btnSecundario: "#FF4081",
  },
  chart: {
    backgroundGradientFrom: "#1E1E1E",
    backgroundGradientTo: "#121212",
    labelColor: "#E0E0E0",
    lineColor: "#00C9A7",
    dotBorderColor: "#FF4081",
  },
};
