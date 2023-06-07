import {Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import useAuth from '../hook/useAuth';

export default function () {
  const {Out, Google, EmailAndPassword, Anonimous} = useAuth();

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

  return (
    <View>
      <TouchableOpacity onPress={Google}>
        <Text>LOGIN GOOGLE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Anonimous}>
        <Text>Anonimous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          EmailAndPassword({
            email: 'jane.doe@example.com',
            password: 'SuperSecretPassword!',
          }).then(data => console.log(data))
        }>
        <Text>LOGIN USER AND PASSWORD</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={Out}>
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
