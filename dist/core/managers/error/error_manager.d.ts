export declare class ErrorManager {
    static instance: ErrorManager;
    private readonly network;
    saveErrorLog(msg: string): Promise<void>;
}
