import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import useAuth from 'hook/useAuth';
import React from 'react';

export default function () {
  const {Out} = useAuth();

  return (
    <>
      <View>
        <Text>Bienvenido bebecito</Text>
        <TouchableOpacity onPress={Out}>
          <Text>SALIR</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
