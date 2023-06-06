import React from "react";
import StackNavigator from "../routes/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';

const App = () => {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme}
      : { ...MD3LightTheme};


  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
          <StackNavigator/>
      </NavigationContainer>
    </PaperProvider>
  )
};

export default App;
