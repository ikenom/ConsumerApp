import React from 'react';
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackParamList, HomeStackScreens } from "./HomeStack";

export type RootStackParamList = {
  Loading: undefined;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
}

export const RootStackScreens = () => {

  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="HomeStack"
        component={HomeStackScreens}
        options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}