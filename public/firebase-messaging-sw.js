nes (7 sloc)  341 Bytes

// Import and configure the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';
import { getFirebaseConfig } from './firebase-config';

const firebaseApp = initializeApp(getFirebaseConfig());
getMessaging(firebaseApp);
console.info('Firebase messaging service worker is set up');


//can be deleted if not using push notification
