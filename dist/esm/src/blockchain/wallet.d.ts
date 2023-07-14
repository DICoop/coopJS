import { WalletConfig } from "./types";
import ReadApi from "./readApi";
import { AccountName } from "../eos/types";
declare class Wallet {
    private readonly readApi;
    readonly symbol: string;
    readonly contract: string;
    canTransfer: boolean;
    canDeposit: boolean;
    canWithdraw: boolean;
    canChange: boolean;
    routeForChange: string;
    constructor(config: WalletConfig, readApi: ReadApi);
    getUserBalance(username: AccountName): Promise<string>;
}
export default Wallet;
//# sourceMappingURL=wallet.d.ts.map