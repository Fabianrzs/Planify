import {Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import authService from '../service/authService';
import {useEffect} from 'react';

export default function () {
  const {
    singInAnonimous,
    signOut,
    signInGoogle,
    sigInEmailAndPassword,
    currentUser,
  } = authService();

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
  useEffect(() => {
    checkSession().then();
  }, []);

  const checkSession = async () => {
    if (currentUser) {
      // Extraer los datos del usuario
      const {uid, displayName, email, photoURL, phoneNumber} = currentUser;

      // Utilizar los datos según tus necesidades
      console.log('ID de usuario:', uid);
      console.log('Nombre de usuario:', displayName);
      console.log('Correo electrónico:', email);
      console.log('Numero de telefono:', phoneNumber);
      console.log('URL de la foto de perfil:', photoURL);
    } else {
      console.log('No hay usuario autenticado');
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={signInGoogle}>
        <Text>LOGIN GOOGLE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={singInAnonimous}>
        <Text>Anonimous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          sigInEmailAndPassword({
            email: 'jane.doe@example.com',
            password: 'SuperSecretPassword!',
          }).then(data => console.log(data))
        }>
        <Text>LOGIN USER AND PASSWORD</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signOut}>
        <Text>SALIR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={loadUsers}>
        <Text>LOAD USERS</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={saveUsers}>
        <Text>SAVE USER</Text>
      </TouchableOpacity>
    </View>
  );
}
