import { PersonalDataConfig } from "./types";
declare class PersonalData {
    config: PersonalDataConfig | null;
    constructor(config: PersonalDataConfig | null);
    setConfig(config: PersonalDataConfig): void;
    getUrl(path: string): string;
    post(path: string, data: any): Promise<any>;
    get(path: string, params?: any): Promise<any>;
    sendPersonalData(dataBundle: {
        senderPub: string;
        recipientPub: string;
        senderData: string;
        recipientData: string;
    }, signature: string): Promise<any>;
    getPersonalDataAsRecipient(dataBundle: {
        recipientPub: string;
        ids: string[];
    }, signature: string): Promise<any>;
    getPersonalDataAsSender(dataBundle: {
        senderPub: string;
        ids: string[];
    }, signature: string): Promise<any>;
}
export default PersonalData;
//# sourceMappingURL=personalData.d.ts.map