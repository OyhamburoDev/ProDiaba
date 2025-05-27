import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./TabsNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector } from "react-redux";

const Navigator = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <NavigationContainer>
      {!user ? <AuthStackNavigator /> : <TabsNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
