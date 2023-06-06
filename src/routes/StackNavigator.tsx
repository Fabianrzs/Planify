import React from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../views/Login";

const Stack = createNativeStackNavigator();

export default function StackNavigator(){
  return(
    <Stack.Navigator
      screenOptions={{
         headerShown: false,}}>
       <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}
