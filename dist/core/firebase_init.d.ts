import { DocumentSnapshot } from "firebase/firestore";
export declare class FirebaseInit {
    static instance: FirebaseInit;
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
    firestore: import("@firebase/firestore").Firestore;
    storage: import("@firebase/storage").FirebaseStorage;
    setData(data: any, colName: string, docName: string): Promise<void>;
    getDoc(colName: string, docName: string): Promise<DocumentSnapshot<import("@firebase/firestore").DocumentData, import("@firebase/firestore").DocumentData>>;
}
