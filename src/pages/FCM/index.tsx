import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAuJssKqIuXvzU3EEA2tSZi8ss_CexDwgE',
  authDomain: 'fanpool-4793d.firebaseapp.com',
  projectId: 'fanpool-4793d',
  storageBucket: 'fanpool-4793d.appspot.com',
  messagingSenderId: '394629578591',
  appId: '1:394629578591:web:a2237701e54c5c75c6c0ea',
  measurementId: 'G-P4LL243SQS',
};

const VAPID_KEY =
  'BClKWaVc65S9Ok6S_D1f-IppgaQTT2phijNKODvFbczK09fQB7sHikeqoLWF43wRBAb9vdYPOklw1L-iyn1HO08';

const initializeFirebase = () => {
  firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.getToken({ vapidKey: VAPID_KEY }).then(updateFCMToken);
};

const updateFCMToken = (issuedFCMToken: string) => {
  console.log(issuedFCMToken);
};

const useInitializeFCM = () => {
  initializeFirebase();
};

export default useInitializeFCM;
