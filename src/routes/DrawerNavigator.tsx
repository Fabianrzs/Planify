import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from 'views/Home';
import {useWindowDimensions} from 'react-native';
import TabNavigator from 'routes/TabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const {width} = useWindowDimensions();

  return (
    // @ts-ignore
    <Drawer.Navigator drawerType={width >= 768 ? 'permanent' : 'front'}>
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="Home" options={{title: 'Home'}} component={Home} />
    </Drawer.Navigator>
  );
}
