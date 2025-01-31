// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJZ8hPz79m--4AwequW80jmyYPEmtRrgo",
  authDomain: "ud01-b39cc.firebaseapp.com",
  databaseURL: "https://ud01-b39cc-default-rtdb.firebaseio.com",
  projectId: "ud01-b39cc",
  storageBucket: "ud01-b39cc.firebasestorage.app",
  messagingSenderId: "365021914969",
  appId: "1:365021914969:web:72abe71f52fdc3f6154e48",
  measurementId: "G-441744J57P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
