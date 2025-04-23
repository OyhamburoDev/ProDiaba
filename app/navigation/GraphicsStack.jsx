import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "../screens/DetailScreen";
import ItemScreen from "../screens/ItemScreen";
import GraphicsScreen from "../screens/GraphicsScreen";

const Stack = createStackNavigator();

export default function RecordsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Graficos" component={GraphicsScreen} />
    </Stack.Navigator>
  );
}
