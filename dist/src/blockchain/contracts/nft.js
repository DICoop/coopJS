"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
class NftContract extends base_1.default {
    constructor(api, tableCodeConfig) {
        super(api, tableCodeConfig, 'nft');
    }
    async getObjectsByOwner(owner) {
        const q = {
            table: 'pieces',
            lower_bound: owner,
            upper_bound: owner,
            limit: 1000,
            index_position: 2,
            key_type: 'i64',
            getAllRows: true,
            parseMetaAsJson: true,
        };
        const { rows } = await this.getTableRows(q);
        return rows;
    }
    async getAllObjects() {
        const q = {
            table: 'objects',
            limit: 100,
            lower_bound: 0,
            getAllRows: true,
            parseMetaAsJson: true,
        };
        const { rows } = await this.getTableRows(q);
        return rows;
    }
    async getMarket() {
        const q = {
            table: 'market',
            limit: 1000,
            lower_bound: 0,
            getAllRows: true,
            parseMetaAsJson: true,
        };
        const { rows } = await this.getTableRows(q);
        return rows;
    }
    async fetchRequestsWithIndexPosition(username, indexPosition) {
        const q = {
            table: 'pieces',
            lower_bound: username,
            upper_bound: username,
            limit: 1000,
            index_position: indexPosition,
            key_type: 'i64',
            parseKeysAsJson: ['delivery_to'],
            getAllRows: true,
        };
        const { rows } = await this.getTableRows(q);
        return rows;
    }
    async fetchRequests(username) {
        const [asBuyer, asSeller] = await Promise.all([
            this.fetchRequestsWithIndexPosition(username, 2),
            this.fetchRequestsWithIndexPosition(username, 3),
        ]);
        return [...asBuyer, ...asSeller];
    }
}
exports.default = NftContract;
//# sourceMappingURL=nft.js.map