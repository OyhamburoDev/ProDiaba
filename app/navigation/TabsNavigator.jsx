import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import HomeScreen from "../screens/HomeScreen";
import { darkTheme } from "../styles/styles";
import RecordsStack from "./RecordsStack";
import GraphicsStack from "./GraphicsStack";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { useSelector } from "react-redux";
import useThemeNew from "../hooks/useTheme";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const pepe = useThemeNew();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: pepe.header.background,
          elevation: 0,
          shadowColor: "transparent",
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: "balooSemi",
          color: pepe.header.text,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        headerTintColor: theme.header.text,
        headerTitleAlign: "left",

        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.75)",

          position: "absolute",
          height: 70,
          marginHorizontal: 20,
          marginBottom: 15,
          borderRadius: 20,
          shadowColor: "rgba(255, 255, 255, 0.75)",
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "balooSemi",
        },

        headerRight: () =>
          route.name === "Inicio" && (
            <TouchableOpacity
              onPress={() => dispatch(toggleTheme())}
              style={{ marginRight: 20 }}
            >
              {darkMode ? (
                <MaterialIcons
                  name="sunny"
                  size={23}
                  color={pepe.header.text}
                />
              ) : (
                <Ionicons name="moon" size={23} color={pepe.header.text} />
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Registros"
        component={RecordsStack}
        options={{
          title: "Últimos 10 días",
          tabBarLabel: "Registros",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Graficos"
        component={GraphicsStack}
        options={{
          title: "ProDiaba",
          tabBarLabel: "Gráficos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
