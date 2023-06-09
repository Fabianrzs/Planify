import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Login';
import useAuth from '../hook/useAuth';
import {useSelector} from 'react-redux';
import {Alert} from 'components/Alert';
import TabNavigator from 'routes/TabNavigator';
import {
  NotificationListener,
  requestUserPermission,
} from 'service/pushnotification_helper';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  // @ts-ignore
  const {isAuthenticated} = useSelector(state => state.auth);
  const {checkSession} = useAuth();

  useEffect(() => {
    console.log('State', isAuthenticated);
    checkSession().then();
  }, [isAuthenticated]);

  useEffect(() => {
    requestUserPermission().then();
    //GetFCMToken().then();
    NotificationListener().then();
  }, []);

  return (
    <>
      <Alert />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isAuthenticated === 'auth' ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </>
  );
}
