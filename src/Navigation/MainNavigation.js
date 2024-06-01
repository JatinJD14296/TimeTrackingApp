import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SplashScreen from "../Screen/SplashScreen";
import LoginScreen from "../Screen/LoginScreen";
import SignUpScreen from "../Screen/SignUpScreen";
import HomeScreen from "../Screen/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingScreen from "../Screen/SettingScreen";
import AboutUsScreen from "../Screen/AboutUsScreen";
import { colors } from "../Helper/constant";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const DrawerNavigator = () => {
  const { lightTheme } = useSelector((state) => state?.appTheme);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: lightTheme
            ? colors?.lightModeBg
            : colors?.darkModeBg,
        },
        drawerStyle: {
          backgroundColor: lightTheme
            ? colors?.lightModeBg
            : colors?.darkModeBg,
        },
        drawerLabelStyle: {
          color: lightTheme ? colors?.lightModeFont : colors?.darkModeFont,
        },
        drawerActiveTintColor: colors?.appColor,

        headerTintColor: colors?.appColor,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
    </Drawer.Navigator>
  );
};

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeDrawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
