import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyDOPqwOHohE6l36lqRJpxd_4i-9fD251DU",
  authDomain: "yccimcs.firebaseapp.com",
  projectId: "yccimcs",
  storageBucket: "yccimcs.appspot.com",
  messagingSenderId: "116397141417",
  appId: "1:116397141417:web:0d21580f8316139f4928b8",
});

export const db = getFirestore(app);
export const auth = getAuth(app);
