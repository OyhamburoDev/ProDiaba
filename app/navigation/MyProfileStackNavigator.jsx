import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import MyProfileScreen from "../screens/MyProfileScreen";
import ImageSelectorScreen from "../screens/ImageSelectorScreen";
import LocationSelectorScreen from "../screens/LocationSelectorScreen";
import useThemeNew from "../hooks/useTheme";

const Stack = createNativeStackNavigator();

const MyProfileStackNavigator = () => {
  const theme = useThemeNew();
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="MyProfileScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
        <Stack.Screen
          name="ImageSelectorScreen"
          component={ImageSelectorScreen}
        />
        <Stack.Screen
          name="LocationSelectorScreen"
          component={LocationSelectorScreen}
        />
      </Stack.Navigator>
    </View>
  );
};

export default MyProfileStackNavigator;
