import { RegistratorConfig } from "./types";
import { AccountName } from "../eos/types";
declare class Registrator {
    config: RegistratorConfig | null;
    constructor(config: RegistratorConfig | null);
    setConfig(config: RegistratorConfig): void;
    getUrl(path: string): string;
    post(path: string, data: any): Promise<any>;
    get(path: string, params?: any): Promise<any>;
    setAccount(username: AccountName, pub: string, ownerpub: string, email: string, referer: string | null, callback: string, accountType: string, meta: String): Promise<any>;
    checkEmail(email: string): Promise<any>;
}
export default Registrator;
//# sourceMappingURL=registrator.d.ts.map