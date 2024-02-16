import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { DocumentSnapshot, collection, doc, getDoc, getFirestore, setDoc,getDocs, deleteDoc, updateDoc, Firestore } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable} from "@firebase/storage";





export class FirebaseServices {
  static instance: FirebaseServices = new FirebaseServices();

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
  firestore:Firestore = getFirestore(this.app);
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

  async deleteDoc(colName: string, docName: string) {
    try {
    const col = collection(this.firestore, colName);
    await deleteDoc(doc(col, docName));
    } catch (error) {
      console.log(
         `You have an error in delete ${colName}/${docName} data\nThis is your error: `,
         error
       );
    }
  }

  async getDocs(colName: string) {
    try {
    let response = [];
    const col = await collection(this.firestore, colName);
    const request=await getDocs(col);
    request.forEach((data)=>{response.push(data.data())})
    
    return response;
    } catch (error) {
      console.log(
         `You have an error in get ${colName} data\nThis is your error: `,
         error
       );
    }
  }

  async updateDocument(colName:string,docName:string,data:any){
    const col = collection(this.firestore, colName);
    const docRef = doc(col,docName);
    await updateDoc(docRef,data);
  }

  async setImageToStorage(imageAsBase64:string,refId:string,folderName:string):Promise<string>{
    const decodedData = Buffer.from(imageAsBase64, 'base64').toString('binary');
    const imageDataAsUint8List = Buffer.from(decodedData,'binary');
    const storageRef = ref(
        this.storage,
        `${folderName}/` + `${refId}.jpg`
      );
      await uploadBytesResumable(storageRef, imageDataAsUint8List);
      return await getDownloadURL(storageRef);
  }

  async deleteImageFromStorage(refId:string,folderName:string){
    const storageRef = ref(
        this.storage,
        `${folderName}/` + `${refId}.jpg`
      );
     await deleteObject(storageRef);
  }


}
