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
    storage: import("@firebase/storage").FirebaseStorage;
}
