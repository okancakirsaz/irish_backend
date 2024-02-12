export declare class CurrentlyInIrishDto {
    name: string;
    gender: string;
    isAnonym: boolean;
    token: string;
    uid: string;
    timestamp: string;
    profileImage?: string;
    toJson(): Record<string, any>;
    fromJsonWithReturn(json: any): CurrentlyInIrishDto;
}
