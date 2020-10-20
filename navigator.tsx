import { ChangeLocationView } from "./src/components";
import { Main } from "./src/Main";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const Navigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
        >
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ChangeLocation" component={ChangeLocationView} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};
