"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
class EosioContract extends base_1.default {
    constructor(api, tableCodeConfig) {
        super(api, tableCodeConfig, 'eosio');
    }
    getGlobalData() {
        return this.getSingleTableRow({
            table: 'global',
        });
    }
}
exports.default = EosioContract;
//# sourceMappingURL=eosio.js.map