import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from 'views/Home';
import {useWindowDimensions} from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const {width} = useWindowDimensions();

  return (
    // @ts-ignore
    <Drawer.Navigator drawerType={width >= 768 ? 'permanent' : 'front'}>
      <Drawer.Screen name="Home" options={{title: 'Home'}} component={Home} />
    </Drawer.Navigator>
  );
}
