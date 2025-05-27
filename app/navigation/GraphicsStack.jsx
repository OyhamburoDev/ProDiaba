import { createStackNavigator } from "@react-navigation/stack";
import GraphicsScreen from "../screens/GraphicsScreen";

const Stack = createStackNavigator();

export default function RecordsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DetalleGrafico" component={GraphicsScreen} />
    </Stack.Navigator>
  );
}
