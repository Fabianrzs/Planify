import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {MD2DarkTheme, MD2LightTheme} from 'styles/themes';
import store from './store';
import {Provider} from 'react-redux';
import StackNavigator from 'routes/StackNavigator';

const App = () => {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark' ? {...MD2DarkTheme} : {...MD2LightTheme};

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider theme={paperTheme}>
          {/*<DrawerNavigator />*/}
          <StackNavigator />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
