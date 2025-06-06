import { StatusBar, View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import Navigator from "./app/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./app/store/index";
import { useSelector } from "react-redux";
import useTheme from "./app/hooks/useTheme";
import userRepository from "./app/dataBases/userDao";
import { setUser } from "./app/features/userSlice";

export default function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = useTheme();

  useEffect(() => {
    // Primera vez que se inicia la app ejecuta la base de datos
    const initDB = async () => {
      try {
        await userRepository.init();
        //  ¿Hay un usuario guardado en la db?
        const user = await userRepository.getUser();
        if (user) {
          // Si existe ---> guardarlo en redux
          store.dispatch(
            setUser({
              user: user.email,
              token: user.token,
              refreshToken: user.refreshToken,
              localId: user.localId,
            })
          );
        }
      } catch (error) {
        console.error("Error al iniciar la base datos local", error);
      }
    };
    initDB();
  }, []);

  // Fuentes
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
