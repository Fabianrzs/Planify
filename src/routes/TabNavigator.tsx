import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Scream1, Scream2, Scream3} from 'views';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Scream1" component={Scream1} />
      <Tab.Screen name="Scream2" component={Scream2} />
      <Tab.Screen name="Scream3" component={Scream3} />
    </Tab.Navigator>
  );
}
