import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LocationListScreen from "./screens/LocationListScreen";
import AddLocationScreen from "./screens/AddLocationScreen";
import MapScreen from "./screens/MapScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="LocationList" component={LocationListScreen} />
        <Stack.Screen name="AddLocation" component={AddLocationScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}