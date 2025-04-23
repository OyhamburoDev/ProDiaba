import { StatusBar, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import Navigator from "./app/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./app/store/index";
import { useSelector } from "react-redux";
import useTheme from "./app/hooks/useTheme";

export default function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = useTheme();

  //fuentes
  const [fontsLoaded] = useFonts({
    baloo: require("./assets/fonts/Baloo2-Bold.ttf"),
    balooExtra: require("./assets/fonts/Baloo2-ExtraBold.ttf"),
    balooSemi: require("./assets/fonts/Baloo2-SemiBold.ttf"),
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);
  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;

  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle={darkMode ? "light-content" : "dark-content"}
          backgroundColor={theme.header.background}
        />
        <View style={{ flex: 1 }} onLayout={onLayout}>
          <Navigator />
        </View>
      </Provider>
    </>
  );
}
