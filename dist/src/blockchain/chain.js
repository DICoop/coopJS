"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
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
        this.rpcByEndpoint = {};
        this.eosioContract = this.applyContract(eosio_1.default);
        this.coreContract = this.applyContract(core_1.default);
        this.partnersContract = this.applyContract(partners_1.default);
        this.p2pContract = this.applyContract(p2p_1.default);
    }
    applyContract(contract) {
        return new contract(this.readApi, this.tableCodeConfig);
    }
    getEosPassInstance(wif) {
        const endpoint = this.readApi.getEndpoint();
        if (!this.rpcByEndpoint[endpoint]) {
            this.rpcByEndpoint[endpoint] = new eosjs_1.JsonRpc(endpoint, { fetch: isomorphic_fetch_1.default });
        }
        const signatureProvider = new eosjs_jssig_1.JsSignatureProvider([wif]);
        return new eosjs_1.Api({
            rpc: this.rpcByEndpoint[endpoint],
            signatureProvider,
            // @ts-ignore
            textDecoder: new util_1.TextDecoder(),
            textEncoder: new util_1.TextEncoder(),
        });
    }
}
exports.default = Chain;
//# sourceMappingURL=chain.js.map