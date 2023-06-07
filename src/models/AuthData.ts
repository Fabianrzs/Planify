import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface AuthData {
  additionalUserInfo: {
    isNewUser: boolean;
  };
  user: FirebaseAuthTypes.UserCredential;
}
