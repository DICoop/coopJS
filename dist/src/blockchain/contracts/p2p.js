"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
class P2PContract extends base_1.default {
    constructor(api, tableCodeConfig) {
        super(api, tableCodeConfig, 'p2p');
    }
    async getOrders() {
        const { rows } = await this.getTableRows({
            table: 'orders',
            lower_bound: 0,
            limit: 100,
            getAllRows: true,
        });
        return rows.map(row => {
            const res = { ...row };
            try {
                res.details = JSON.parse(res.details);
                res.root_remain_float = parseFloat(res.root_remain);
            }
            catch (e) {
                res.details = { address: res.details };
            }
            return res;
        });
    }
    getUSDRates() {
        return this.getTableRows({
            table: 'usdrates',
            lower_bound: 0,
            limit: 100,
            getAllRows: true,
        }).then(result => result.rows);
    }
    getRateFromRates(rates, symbol, precision) {
        const filter = `${(0).toFixed(precision)} ${symbol}`;
        const rate = rates.find(el => el.out_asset === filter);
        return rate ? rate.rate : '0';
    }
    async getUsdRate(symbol, precision) {
        const rates = await this.getUSDRates();
        return this.getRateFromRates(rates, symbol, precision);
    }
}
exports.default = P2PContract;
//# sourceMappingURL=p2p.js.map