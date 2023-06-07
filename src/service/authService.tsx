import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '426388272963-809a7iqjd02qtabq2995npclhr9cvgeu.apps.googleusercontent.com',
});

type userCredencial = Promise<FirebaseAuthTypes.UserCredential | undefined>;

export default function () {
  const {currentUser} = auth();

  const singInAnonimous: () => userCredencial = async () => {
    try {
      console.log('sing in anonikous');
      return await auth().signInAnonymously();
    } catch (error: any) {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
      console.error(error);
      return undefined;
    }
  };

  const sigInEmailAndPassword: ({
    email,
    password,
  }: any) => userCredencial = async ({email, password}: any) => {
    try {
      console.log('sigIn Email And Password');
      return await auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          console.log('That email address is already in use!');
          break;
        case 'auth/invalid-email':
          console.log('That email address is invalid!');
          break;
        default:
          console.error(error);
          break;
      }
      return undefined;
    }
  };

  const signInGoogle: () => userCredencial = async () => {
    try {
      console.log('sing in google');
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('SIGN_IN_CANCELLED');
          break;
        case statusCodes.IN_PROGRESS:
          console.log('IN_PROGRESS');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('PLAY_SERVICES_NOT_AVAILABLE');
          break;
        default:
          console.log(error);
          break;
      }
      return undefined;
    }
  };

  const signOut = async () => {
    console.log('Saliendo ');
    await auth().signOut();
  };

  return {
    singInAnonimous,
    sigInEmailAndPassword,
    signInGoogle,
    signOut,
    auth,
    currentUser,
  };
}
