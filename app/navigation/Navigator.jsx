import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./TabsNavigator";

const Navigator = () => {
  return (
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
