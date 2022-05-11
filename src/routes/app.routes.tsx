import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useTheme } from "styled-components";

import Today from "../screens/Today/Today";

export type AppRouterParamList = {
  Today: undefined;
}

const { Navigator, Screen } = createMaterialTopTabNavigator<AppRouterParamList>();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator 
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: theme.fonts.bold,
          fontSize: RFValue(16),
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.text,
        },
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.shape_dark,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}>
      <Screen name="Today" component={Today}/>
    </Navigator>
  )
}