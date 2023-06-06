import {Text, TouchableOpacity, View} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '426388272963-809a7iqjd02qtabq2995npclhr9cvgeu.apps.googleusercontent.com',
});

export default function () {
  const [user, setUser] = useState({});
  useEffect(() => {}, [user]);
  const singOut = async () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  const sigInEmailAndPassword = async () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

    } catch (error: any) {
      console.log(error);
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
        <Text>LOGIN GOOGLE</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => sigInEmailAndPassword()}>
        <Text>LOGIN USER AND PASSWORD</Text>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => singOut()}>
        <Text>SALIR</Text>
      </TouchableOpacity>

      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}
