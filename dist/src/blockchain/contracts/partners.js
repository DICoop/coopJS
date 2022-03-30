"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
class PartnersContract extends base_1.default {
    constructor(api, tableCodeConfig) {
        super(api, tableCodeConfig, 'part');
    }
    getAccountPartner(accountName) {
        return this.getSingleTableRow({
            table: 'partners2',
            lower_bound: accountName,
            upper_bound: accountName,
            limit: 1,
            parseMetaAsJson: true,
        });
    }
}
exports.default = PartnersContract;
//# sourceMappingURL=partners.js.map