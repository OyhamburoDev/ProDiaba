import { StatusBar, View, StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "./app/context/ThemeContext";
import { darkTheme } from "./app/styles/styles";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import TabsNavigator from "./app/navigation/TabsNavigator";
import ItemScreen from "./app/screens/ItemScreen";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
const Stack = createStackNavigator();

export default function App() {
  const { theme } = useTheme();

  // FUENTES
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
      <StatusBar
        barStyle={theme === darkTheme ? "light-content" : "dark-content"}
        backgroundColor="#C1C8E4"
      />

      <View style={{ flex: 1 }}>
        {/* Navegación encima del fondo */}
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerStyle: {
                backgroundColor: "transparent",
                elevation: 0,
                shadowColor: "transparent",
                borderBottomWidth: 0,
              },
              headerTintColor: theme.header.text,
              headerTitleAlign: "left",
            }}
          >
            <Stack.Screen name="Welcome" options={{ headerShown: false }}>
              {(props) => <WelcomeScreen {...props} onLayout={onLayout} />}
            </Stack.Screen>

            <Stack.Screen
              name="Main"
              component={TabsNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="ItemScreen"
              component={ItemScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}
