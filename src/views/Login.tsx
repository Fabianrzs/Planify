import {Text, TouchableOpacity, View} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '426388272963-809a7iqjd02qtabq2995npclhr9cvgeu.apps.googleusercontent.com',
});

export default function () {
  const loadUsers = async () => {
    try {
      const querySnapshot = await firestore().collection('Users').get();
      let usersF: any[] = [];

      querySnapshot.forEach(documentSnapshot => {
        const userData = documentSnapshot.data();
        usersF.push(userData);
      });

      console.log(usersF);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };
  const saveUsers = async () => {
    firestore()
      .collection('Users')
      .add({
        name: 'Ada Lovelace',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      });
  };
  const singOut = async () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  const singInAnonimous = async () => {
    auth()
      .signInAnonymously()
      .then(data => {
        console.log('user', data);
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
      });
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
      const usr = await auth().signInWithCredential(googleCredential);
      console.log(usr);
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
  /*const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    await auth().signInWithCredential(facebookCredential);
  };*/
  return (
    <View>
      <TouchableOpacity onPress={() => signInGoogle()}>
        <Text>LOGIN GOOGLE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => singInAnonimous()}>
        <Text>Anonimous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sigInEmailAndPassword()}>
        <Text>LOGIN USER AND PASSWORD</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => singOut()}>
        <Text>SALIR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => loadUsers()}>
        <Text>LOAD USERS</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => saveUsers()}>
        <Text>SAVE USER</Text>
      </TouchableOpacity>
    </View>
  );
}
