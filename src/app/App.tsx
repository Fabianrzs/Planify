import React from 'react';
import StackNavigator from '../routes/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import store from './store';
import {Provider} from 'react-redux';

const App = () => {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark' ? {...MD3DarkTheme} : {...MD3LightTheme};

  return (
    <Provider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
