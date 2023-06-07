import firestore from '@react-native-firebase/firestore';
import authService from 'service/authService';

export default function () {
  const {currentUser} = authService();
  const saveDocument = async <T,>(collectionName: string, documentData: T) => {
    try {
      if (currentUser) {
        const documentRef = firestore().collection(collectionName).doc();

        await documentRef.set({
          ...documentData,
          userId: currentUser.uid,
        });

        return documentRef.id;
      } else {
        throw new Error('No hay usuario actualmente autenticado');
      }
    } catch (error) {
      console.error('Error al guardar el documento:', error);
      throw error;
    }
  };

  const getCollection = async (collectionName: string) => {
    try {
      if (currentUser) {
        const querySnapshot = await firestore()
          .collection(collectionName)
          .where('userId', '==', currentUser.uid)
          .get();

        const documents: any[] = [];
        querySnapshot.forEach((documentSnapshot: any) => {
          documents.push({id: documentSnapshot.id, ...documentSnapshot.data()});
        });

        return documents;
      } else {
        throw new Error('No hay usuario actualmente autenticado');
      }
    } catch (error) {
      console.error('Error al obtener la colección:', error);
      throw error;
    }
  };

  const getDocument = async (collectionName: string, documentId: string) => {
    try {
      if (currentUser) {
        const documentRef = firestore()
          .collection(collectionName)
          .doc(documentId);

        const documentSnapshot = await documentRef.get();

        if (documentSnapshot.exists) {
          const documentData = documentSnapshot.data();

          if (documentData && documentData.userId === currentUser.uid) {
            return {id: documentSnapshot.id, ...documentData};
          } else {
            throw new Error('El documento no pertenece al usuario actual');
          }
        } else {
          throw new Error('El documento no existe');
        }
      } else {
        throw new Error('No hay usuario actualmente autenticado');
      }
    } catch (error) {
      console.error('Error al obtener el documento:', error);
      throw error;
    }
  };

  const updateDocument = async <T,>(
    collectionName: string,
    documentId: string,
    documentData: Partial<T>,
  ) => {
    try {
      if (currentUser) {
        const documentRef = firestore()
          .collection(collectionName)
          .doc(documentId);

        const documentSnapshot = await documentRef.get();

        if (documentSnapshot.exists) {
          const documentUserData = documentSnapshot.data();

          if (documentUserData && documentUserData.userId === currentUser.uid) {
            await documentRef.update(documentData);
            return true;
          } else {
            throw new Error('El documento no pertenece al usuario actual');
          }
        } else {
          throw new Error('El documento no existe');
        }
      } else {
        throw new Error('No hay usuario actualmente autenticado');
      }
    } catch (error) {
      console.error('Error al actualizar el documento:', error);
      throw error;
    }
  };

  const deleteDocument = async (collectionName: string, documentId: string) => {
    try {
      if (currentUser) {
        const documentRef = firestore()
          .collection(collectionName)
          .doc(documentId);

        const documentSnapshot = await documentRef.get();

        if (documentSnapshot.exists) {
          const documentUserData = documentSnapshot.data();

          if (documentUserData && documentUserData.userId === currentUser.uid) {
            await documentRef.delete();
            return true;
          } else {
            throw new Error('El documento no pertenece al usuario actual');
          }
        } else {
          throw new Error('El documento no existe');
        }
      } else {
        throw new Error('No hay usuario actualmente autenticado');
      }
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
      throw error;
    }
  };

  return {
    saveDocument,
    getCollection,
    getDocument,
    updateDocument,
    deleteDocument,
  };
}

/*const saveCollection = async (collectionName: string, documentData: any) => {
    try {
      const collectionRef = await firestore()
        .collection(collectionName)
        .add(documentData);
      return collectionRef.id;
    } catch (error) {
      console.error('Error al Guardar la colección:', error);
      throw error;
    }
  };*/

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
