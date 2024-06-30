import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddPostScreen from "../Screens/AddPostScreen";

const Stack = createStackNavigator();
export default function AddPostScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddPost-tab"
        component={AddPostScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
