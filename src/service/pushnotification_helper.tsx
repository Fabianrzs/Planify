import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}

async function GetFCMToken() {
  const fcmtoken = await messaging().getToken();
  if (fcmtoken) {
    try {
      console.log(fcmtoken, 'new token');
    } catch (error) {
      console.log(error, 'error in fcmtoken');
    }
  }
}

async function NotificationListener() {
  messaging().onNotificationOpenedApp(() => {});
  messaging()
    .getInitialNotification()
    .then(() => {});
  messaging().onMessage(() => {});
}

export {GetFCMToken, requestUserPermission, NotificationListener};
