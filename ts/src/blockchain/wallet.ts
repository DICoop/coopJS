import {WalletConfig} from "./types";
import ReadApi from "./readApi";
import {AccountName} from "../eos/types";

class Wallet {
    private readonly readApi: ReadApi
    readonly symbol: string;
    readonly contract: string;
    canTransfer: boolean;
    canDeposit: boolean;
    canWithdraw: boolean;
    canChange: boolean;
    routeForChange: string;

    constructor(config: WalletConfig, readApi: ReadApi) {
        this.symbol = config.symbol;
        this.contract = config.contract;
        this.canTransfer = config.canTransfer || false;
        this.canDeposit = config.canDeposit || false;
        this.canWithdraw = config.canWithdraw || false;
        this.canChange = config.canChange || false;
        this.routeForChange = config.routeForChange || "";
        this.readApi = readApi;
    }

    async getUserBalance(username: AccountName) {
        const result = await this.readApi.getCurrencyBalance(this.contract, username, this.symbol)

        return result[0] ? result[0] : '0.0000 ' + this.symbol
    }
}

export default Wallet