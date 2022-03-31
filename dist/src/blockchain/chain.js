"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eosio_1 = __importDefault(require("./contracts/eosio"));
const core_1 = __importDefault(require("./contracts/core"));
const partners_1 = __importDefault(require("./contracts/partners"));
const p2p_1 = __importDefault(require("./contracts/p2p"));
const readApi_1 = __importDefault(require("./readApi"));
class Chain {
    constructor(chainConfig, tableCodeConfig) {
        this.name = chainConfig.name;
        this.tableCodeConfig = { ...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {}) };
        this.readApi = new readApi_1.default(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode);
        this.eosioContract = this.applyContract(eosio_1.default);
        this.coreContract = this.applyContract(core_1.default);
        this.partnersContract = this.applyContract(partners_1.default);
        this.p2pContract = this.applyContract(p2p_1.default);
    }
    applyContract(contract) {
        return new contract(this.readApi, this.tableCodeConfig);
    }
}
exports.default = Chain;
//# sourceMappingURL=chain.js.map