import { registerRootComponent } from "expo";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

registerRootComponent(() => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
));
