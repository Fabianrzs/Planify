import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import TabNavigator from 'routes/TabNavigator';
import Setting from 'views/Setting';
import {StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        unmountOnBlur: true,
        headerTransparent: true,
        drawerStatusBarAnimation: 'fade',
        drawerStyle: StyleSheet.absoluteFill,
      }}>
      <Drawer.Screen name="tabs" component={TabNavigator} />
      <Drawer.Screen name="setting" component={Setting} />
    </Drawer.Navigator>
  );
}
const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* Contenido del Drawer */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
