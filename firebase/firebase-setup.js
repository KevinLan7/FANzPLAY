import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBXiQRz7VRYA2yf6l1hn7yxcLFRDZSKUnc",
  authDomain: "fanzplay-95bfa.firebaseapp.com",
  databaseURL: "https://fanzplay-95bfa-default-rtdb.firebaseio.com",
  projectId: "fanzplay-95bfa",
  storageBucket: "fanzplay-95bfa.appspot.com",
  messagingSenderId: "1016811467732",
  appId: "1:1016811467732:web:4a622ce3a12bf79c2a9c41",
  measurementId: "G-WQGDBY0PNT"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);