/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';

enableScreens();
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
