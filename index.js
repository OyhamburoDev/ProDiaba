import { registerRootComponent } from "expo";
import App from "./App";
import { ThemeProvider } from "./app/context/ThemeContext";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./app/store/index";

registerRootComponent(() => (
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
));
