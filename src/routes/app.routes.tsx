import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Today from "../screens/Today/Today";
import { Dimensions, Platform } from "react-native";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

export type AppRouterParamList = {
  Today: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<AppRouterParamList>();

export function AppRoutes() {
  const theme = useTheme();

  const { height } = Dimensions.get('window');

  return (
    <Navigator 
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: {display: "none"},
        tabBarLabelPosition: "beside-icon",
        tabBarLabelStyle: {
          fontFamily: theme.fonts.bold,
          fontSize: RFValue(16),
        },
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.background,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          paddingVertical: Platform.OS === 'ios' ? 15 : 0,
          borderTopLeftRadius: height * 0.02, 
          borderTopRightRadius: height * 0.02,
          position: 'absolute'
        },
      }}>
      <Screen name="Today" component={Today}/>
    </Navigator>
  )
}