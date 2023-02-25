import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBCdWpL7HSfpnYVHeMzUw2ZCrFemH-2Tzo",
  authDomain: "web-chat-62bb0.firebaseapp.com",
  projectId: "web-chat-62bb0",
  storageBucket: "web-chat-62bb0.appspot.com",
  messagingSenderId: "439776499001",
  appId: "1:439776499001:web:dc788c1f1e5042d83604e8"
};

export const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
