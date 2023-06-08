import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Login';
import useAuth from '../hook/useAuth';
import {useSelector} from 'react-redux';
import {Alert} from 'components/Alert';
import TabNavigator from 'routes/TabNavigator';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  // @ts-ignore
  const {isAuthenticated} = useSelector(state => state.auth);
  const {checkSession} = useAuth();

  useEffect(() => {
    console.log('State', isAuthenticated);
    checkSession().then();
  }, [isAuthenticated]);

  return (
    <>
      <Alert />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </>
  );
}
