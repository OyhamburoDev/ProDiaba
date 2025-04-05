import { registerRootComponent } from "expo";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "react-native-gesture-handler";

registerRootComponent(() => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
));
