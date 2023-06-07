import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Login';
import useAuth from '../hook/useAuth';
import {useSelector} from 'react-redux';

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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
