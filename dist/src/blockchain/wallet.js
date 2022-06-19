"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Wallet {
    constructor(config, readApi) {
        this.symbol = config.symbol;
        this.contract = config.contract;
        this.canTransfer = config.canTransfer || false;
        this.canDeposit = config.canDeposit || false;
        this.canWithdraw = config.canWithdraw || false;
        this.readApi = readApi;
    }
    async getUserBalance(username) {
        const result = await this.readApi.getCurrencyBalance(this.contract, username, this.symbol);
        return result[0] ? result[0] : '0.0000 ' + this.symbol;
    }
}
exports.default = Wallet;
//# sourceMappingURL=wallet.js.map