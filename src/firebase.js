import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

   

const firebaseConfig = {
  apiKey: "AIzaSyDfP1BI60vLUSWKo7MRqMur-bJVhopeQEk",
  authDomain: "emilia-pottery.firebaseapp.com",
  projectId: "emilia-pottery",
  storageBucket: "emilia-pottery.appspot.com",
  messagingSenderId: "1047927258046",
  appId: "1:1047927258046:web:8ca100039478ea591ad7ef",
  measurementId: "G-7SBVLB5P98"
};

   const firebaseApp = initializeApp(firebaseConfig);
   export const storage = getStorage(firebaseApp);