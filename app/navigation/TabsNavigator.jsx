import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Text, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import GraphicsScreen from "../screens/GraphicsScreen";
import { darkTheme } from "../styles/styles";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const { toggleTheme, theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: theme.header.background,
          elevation: 0, // 🔸 Android
          shadowColor: "transparent", // 🔸 iOS
          borderBottomWidth: 0, // 🔸 iOS también
        },
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: "balooSemi",
          color: theme.header.text,
        },
        headerTintColor: theme.header.text,
        headerTitleAlign: "left",

        tabBarStyle: {
          backgroundColor: theme.header.background,
          borderTopColor: "transparent",
        },
        tabBarActiveTintColor: theme.header.text,
        tabBarInactiveTintColor: "gray",

        headerRight: () =>
          route.name === "Inicio" && (
            <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 20 }}>
              {theme === darkTheme ? (
                <MaterialIcons
                  name="sunny"
                  size={23}
                  color={theme.header.text}
                />
              ) : (
                <Ionicons name="moon" size={23} color={theme.header.text} />
              )}
            </TouchableOpacity>
          ),
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          title: "ProDiaba",
          tabBarLabel: "Inicio",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require("../../assets/inicio-tab.png")}
              style={{
                width: 50,
                height: 50,
                opacity: focused ? 1 : 0.5,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Registros"
        component={DetailScreen}
        options={{
          title: "Últimos 10 días",
          tabBarLabel: "Registros",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require("../../assets/registros-tab.png")}
              style={{
                width: 50,
                height: 50,
                opacity: focused ? 1 : 0.5,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Graficos"
        component={GraphicsScreen}
        options={{
          title: "ProDiaba",
          tabBarLabel: "Gráficos",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require("../../assets/graficos-tab.png")}
              style={{
                width: 50,
                height: 50,
                opacity: focused ? 1 : 0.5,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
