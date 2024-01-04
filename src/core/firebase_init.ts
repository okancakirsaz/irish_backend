import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";

export class FirebaseInit{
    static instance:FirebaseInit = new FirebaseInit();
 

    firebaseConfig = {
        apiKey: "AIzaSyAH74ivDHm8-5wjXi7BRowY3BBj4vx8Ihk",
        authDomain: "irish-coffee-ceecd.firebaseapp.com",
        projectId: "irish-coffee-ceecd",
        storageBucket: "irish-coffee-ceecd.appspot.com",
        messagingSenderId: "615119038464",
        appId: "1:615119038464:web:b5495d6fd92889306e10e5",
        measurementId: "G-XK07CX0S6M"
      };
       private app:FirebaseApp = initializeApp(this.firebaseConfig);
       auth = getAuth(this.app);
       storage = getStorage(this.app);
}