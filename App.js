import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import DetailScreen from "./app/screens/DetailScreen";
import GraphicsScreen from "./app/screens/GraphicsScreen";
import { useTheme } from "./app/context/ThemeContext";
import { darkTheme } from "./app/styles/styles";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";

const Stack = createStackNavigator();

export default function App() {
  const { toggleTheme, theme } = useTheme();
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
        backgroundColor={theme.header.background}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: theme.header.background,
              shadowColor: "transparent", // iOS
              shadowOffset: { width: 0, height: 0 }, // iOS
              shadowOpacity: 0, // iOS
              shadowRadius: 0, // iOS
              elevation: 0, // Android
            },
            headerTintColor: theme.header.text,
          }}
        >
          <Stack.Screen name="Welcome" options={{ headerShown: false }}>
            {(props) => <WelcomeScreen {...props} onLayout={onLayout} />}
          </Stack.Screen>
          <Stack.Screen
            name="HomeScreen"
            options={{
              title: "ProDiaba",
              headerTitleStyle: {
                fontSize: 25,
                fontFamily: "balooSemi",
                color: theme.header.text,
              },
              headerRight: () => (
                <TouchableOpacity
                  onPress={toggleTheme}
                  style={{ marginRight: 20 }}
                >
                  <Text style={{ fontSize: 20 }}>
                    {theme === darkTheme ? "☀️" : "🌙"}
                  </Text>
                </TouchableOpacity>
              ),
            }}
          >
            {(props) => <HomeScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="GraphicsScreen" component={GraphicsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
