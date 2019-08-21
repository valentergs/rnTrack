import React from "react";
import { View, Text } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";

// a base to Navigation Design vai ser o switchNavigator
const switchNavigator = createSwitchNavigator({
  // quando entrar do app a primeira tela será sobre autenticação (loginFlow)
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  // o segundo flow terá o BottomTabNav (mainFlow)
  mainFlow: createBottomTabNavigator({
    // aqui haverão 3 opções de tab
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
});

export default createAppContainer(switchNavigator);
