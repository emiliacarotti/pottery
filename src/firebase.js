import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

   

   const firebaseConfig = {
    apiKey: "AIzaSyCgREHvLWADPlUYWVg74hhjYrJS0x9Zx3E",
    authDomain: "beast-bazaar.firebaseapp.com",
    projectId: "beast-bazaar",
    storageBucket: "beast-bazaar.appspot.com",
    messagingSenderId: "563185874514",
    appId: "1:563185874514:web:ac047cb37c995b47a1518b",
    measurementId: "G-GFQ6BN7K8J"
   };

   const firebaseApp = initializeApp(firebaseConfig);
   export const storage = getStorage(firebaseApp);