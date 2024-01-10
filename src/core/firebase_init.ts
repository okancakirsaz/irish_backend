import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { DocumentSnapshot, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage, ref } from "@firebase/storage";

export class FirebaseInit {
  static instance: FirebaseInit = new FirebaseInit();

  firebaseConfig = {
    apiKey: "AIzaSyAH74ivDHm8-5wjXi7BRowY3BBj4vx8Ihk",
    authDomain: "irish-coffee-ceecd.firebaseapp.com",
    projectId: "irish-coffee-ceecd",
    storageBucket: "irish-coffee-ceecd.appspot.com",
    messagingSenderId: "615119038464",
    appId: "1:615119038464:web:b5495d6fd92889306e10e5",
    measurementId: "G-XK07CX0S6M",
  };
  private app: FirebaseApp = initializeApp(this.firebaseConfig);
  auth = getAuth(this.app);
  firestore = getFirestore(this.app);
  storage = getStorage(this.app);

  async setData(data, colName: string, docName: string) {
    try {
      const col = collection(this.firestore, colName);
      await setDoc(doc(col, docName), data);
    } catch (error) {
      console.log(
        `You have an error in write ${colName}/${docName} data\nThis is your error: `,
        error
      );
    }
  }

  async getDoc(colName: string, docName: string) {
    try {
    const col = collection(this.firestore, colName);
    const response:DocumentSnapshot=await getDoc(doc(col, docName));
    return response;
    } catch (error) {
      console.log(
         `You have an error in get ${colName}/${docName} data\nThis is your error: `,
         error
       );
    }
  }
}
