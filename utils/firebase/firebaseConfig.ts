import { initializeApp } from "firebase/app";
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDRq-j6YHcIwugtDKBP524tTv8T77rGz6o",
  authDomain: "diyetas-c1ad4.firebaseapp.com",
  projectId: "diyetas-c1ad4",
  storageBucket: "diyetas-c1ad4.appspot.com",
  messagingSenderId: "1094216577942",
  appId: "1:1094216577942:web:66df89b3631129a2fce3b7",
  measurementId: "G-RXKR3FF12P"
};


export const app = initializeApp(firebaseConfig);


export const storage = getStorage(app)