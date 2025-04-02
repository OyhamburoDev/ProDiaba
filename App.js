import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import GraphicsScreen from "./screens/GraphicsScreen";
import { useTheme } from "./context/ThemeContext";
import { darkTheme } from "./styles/styles";

const Stack = createStackNavigator();

export default function App() {
  const { toggleTheme, theme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={theme === darkTheme ? "light-content" : "dark-content"}
        backgroundColor={theme.header.background}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: theme.header.background,
              borderBottomWidth: 1,
              borderBottomColor: theme.header.borderBottomColor,
              ...(theme === darkTheme && {
                shadowColor: theme.header.shadow, // Sombra en iOS
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 6, // Sombra en Android
              }),
            },
            headerTintColor: theme.header.text,
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            options={{
              title: "ProDiaba",
              headerRight: () => (
                <TouchableOpacity
                  onPress={toggleTheme}
                  style={{ marginRight: 20 }}
                >
                  <Text style={{ fontSize: 18 }}>
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
