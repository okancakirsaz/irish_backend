import { DocumentSnapshot, Firestore } from "firebase/firestore";
export declare class FirebaseServices {
    static instance: FirebaseServices;
    firebaseConfig: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };
    private app;
    auth: import("@firebase/auth").Auth;
    firestore: Firestore;
    storage: import("@firebase/storage").FirebaseStorage;
    setData(data: any, colName: string, docName: string): Promise<void>;
    getDoc(colName: string, docName: string): Promise<DocumentSnapshot<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
    deleteDoc(colName: string, docName: string): Promise<void>;
    getDocs(colName: string): Promise<any[]>;
    updateDocument(colName: string, docName: string, data: any): Promise<void>;
    setImageToStorage(imageAsBase64: string, refId: string, folderName: string): Promise<string>;
    deleteImageFromStorage(refId: string, folderName: string): Promise<void>;
}
