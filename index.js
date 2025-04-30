import { registerRootComponent } from "expo";
import App from "./App";

import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./app/store/index";

registerRootComponent(() => (
  <Provider store={store}>
    <App />
  </Provider>
));
