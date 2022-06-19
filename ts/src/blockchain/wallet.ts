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

    constructor(config: WalletConfig, readApi: ReadApi) {
        this.symbol = config.symbol;
        this.contract = config.contract;
        this.canTransfer = config.canTransfer || false;
        this.canDeposit = config.canDeposit || false;
        this.canWithdraw = config.canWithdraw || false;
        this.readApi = readApi;
    }

    getUserBalance(username: AccountName) {
        return this.readApi.getCurrencyBalance(this.contract, username, this.symbol)
    }
}

export default Wallet