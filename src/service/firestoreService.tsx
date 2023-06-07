export default function () {
  return {};
}

/*const loadUsers = async () => {
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
};*/
