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
    async getOrders(username, parent_id, order_id) {
        const q = {
            table: 'orders',
            lower_bound: 0,
            limit: 100,
            getAllRows: true,
        };
        if (typeof username !== 'undefined') {
            q.lower_bound = username;
            q.upper_bound = username;
            q.index_position = 5;
            q.key_type = 'i64';
        }
        else if (typeof parent_id !== 'undefined') {
            q.lower_bound = parent_id;
            q.upper_bound = parent_id;
            q.index_position = 3;
            q.key_type = 'i64';
        }
        else if (typeof order_id !== 'undefined') {
            q.lower_bound = order_id;
            q.upper_bound = order_id;
        }
        const { rows } = await this.getTableRows(q);
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
    async getOrder(order_id) {
        const [order] = await this.getOrders(undefined, undefined, order_id);
        return order;
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