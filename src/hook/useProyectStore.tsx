import firestoreService from 'service/firestoreService';
import {useEffect, useState} from 'react';

const coleccionName = 'Proyects';

export default function () {
  const [proyects, setProyects] = useState<any[]>([]);
  const {
    saveDocument,
    getCollection,
    getDocument,
    updateDocument,
    deleteDocument,
  } = firestoreService();

  useEffect(() => {
    getProyects().then((data: any[]) => {
      setProyects(data);
    });
  });

  const saveProyect = async () => {
    const response = await saveDocument(coleccionName, {
      name: 'Planify',
      duration: 20,
      price: 50000,
    });
    console.log(response);
  };

  const getProyects = async () => {
    return await getCollection(coleccionName);
  };

  const getProyect = async () => {
    const response = await getDocument(coleccionName, 'm1wch7lGcYBiKCFmDbIA');
    console.log(response);
  };

  const updateProyect = async () => {
    const response = await updateDocument(
      coleccionName,
      'LrHaNMSoWV1oHULExm31',
      {
        name: 'Planify',
        duration: 20,
        price: 100000,
      },
    );
    console.log(response);
  };

  const deleteProyect = async () => {
    const response = await deleteDocument(
      coleccionName,
      'm1wch7lGcYBiKCFmDbIA',
    );
    console.log(response);
  };

  return {
    saveProyect,
    getProyects,
    getProyect,
    updateProyect,
    deleteProyect,
    proyects,
  };
}

//crear un estado local para el manejo de mensaje de alertas,
// eso recibe un title un cuerpo y un tipo de alerta, que indicara info error y susses
