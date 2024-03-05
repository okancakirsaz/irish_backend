/// <reference types="node" />
export declare class NudityDetectorService {
    private model;
    constructor();
    private initializeModel;
    detectNudity(imageData: Buffer): Promise<boolean>;
}
