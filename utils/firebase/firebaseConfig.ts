import { initializeApp } from "firebase/app";
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};


export const app = initializeApp(firebaseConfig);


export const storage = getStorage(app)