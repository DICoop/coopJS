import { AccountName } from "../eos/types";
declare class Explorer {
    baseUrl: string;
    constructor(baseUrl: string);
    getUrl(path: string): string;
    post(path: string, data: any): Promise<any>;
    get(path: string, params?: any): Promise<any>;
    getHistoryActions(username: AccountName, limit: number, skip: number): Promise<any>;
}
export default Explorer;
//# sourceMappingURL=explorer.d.ts.map