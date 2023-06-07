import authService from '../service/authService';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setUser, unSetUser} from '../reducer/user/AuthReducer';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default function () {
  const {
    singInAnonimous,
    signInGoogle,
    sigInEmailAndPassword,
    signOut,
    currentUser,
  } = authService();

  const dispatch = useDispatch();

  const dispatchUser = (user: FirebaseAuthTypes.User) => {
    const {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      phoneNumber,
      photoURL,
      uid,
    } = user;
    dispatch(
      setUser({
        displayName,
        email,
        emailVerified,
        isAnonymous,
        phoneNumber,
        photoURL,
        uid,
      } as FirebaseAuthTypes.User),
    );
  };

  useEffect(() => {
    checkSession().then();
  }, []);

  const checkSession = async () => {
    currentUser && dispatchUser(currentUser);
    console.log(currentUser);
    /*const {uid, displayName, email, photoURL, phoneNumber} = currentUser;
    console.log('ID de usuario:', uid);
    console.log('Nombre de usuario:', displayName);
    console.log('Correo electrónico:', email);
    console.log('Numero de telefono:', phoneNumber);
    console.log('URL de la foto de perfil:', photoURL);*/
  };

  const Anonimous = async () => {
    const user = await singInAnonimous();
    user && dispatchUser(user.user);
  };

  const Google = async () => {
    const user = await signInGoogle();
    user && dispatchUser(user.user);
  };

  const EmailAndPassword = async ({email, password}: any) => {
    const user = await sigInEmailAndPassword({email, password});
    user && dispatchUser(user.user);
  };

  const Out = async () => {
    signOut().then(() => {
      dispatch(unSetUser());
    });
  };

  return {
    Anonimous,
    Google,
    EmailAndPassword,
    Out,
  };
}
