import {Text, TouchableOpacity, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect, useState} from 'react';

export default function () {
  const [state, setState] = useState<{}>({});

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      console.log('User Info', {userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log('DEFAULT');
      }
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => signInGoogle()}>
        <Text>Hola login</Text>
      </TouchableOpacity>
    </View>
  );
}
