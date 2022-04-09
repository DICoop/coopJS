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
const ono_1 = __importDefault(require("@jsdevtools/ono"));
const errors_1 = require("./errors");
const JsSignatureProviderMaker = ((wif) => Promise.resolve(new eosjs_jssig_1.JsSignatureProvider([wif])));
class Chain {
    constructor(chainConfig, tableCodeConfig, authKeySearchCallback, signatureProviderMaker) {
        this.name = chainConfig.name;
        this.tableCodeConfig = { ...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {}) };
        this.readApi = new readApi_1.default(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode);
        this.rpcByEndpoint = {};
        this.authKeyType = chainConfig.authKeyType || 'plain-auth-key';
        this.authKeySearchCallback = authKeySearchCallback;
        this.signatureProviderMaker = signatureProviderMaker || JsSignatureProviderMaker;
        this.eosioContract = this.applyContract(eosio_1.default);
        this.coreContract = this.applyContract(core_1.default);
        this.partnersContract = this.applyContract(partners_1.default);
        this.p2pContract = this.applyContract(p2p_1.default);
    }
    applyContract(contract) {
        return new contract(this.readApi, this.tableCodeConfig);
    }
    getCachedRpc() {
        const endpoint = this.readApi.getEndpoint();
        if (!this.rpcByEndpoint[endpoint]) {
            this.rpcByEndpoint[endpoint] = new eosjs_1.JsonRpc(endpoint, { fetch: isomorphic_fetch_1.default });
        }
        return this.rpcByEndpoint[endpoint];
    }
    getEosInstanceBySignatureProvider(signatureProvider) {
        const rpc = this.getCachedRpc();
        return new eosjs_1.Api({
            rpc,
            signatureProvider,
            // @ts-ignore
            textDecoder: new util_1.TextDecoder(),
            textEncoder: new util_1.TextEncoder(),
        });
    }
    /**
     * @deprecated since version 1.0.2
     */
    getEosPassInstance(wif) {
        const signatureProvider = new eosjs_jssig_1.JsSignatureProvider([wif]);
        return this.getEosInstanceBySignatureProvider(signatureProvider);
    }
    async makeEosInstance(authKey) {
        const signatureProvider = await this.signatureProviderMaker(authKey);
        return this.getEosInstanceBySignatureProvider(signatureProvider);
    }
    async transactByAuthKey(authKey, transaction, config) {
        const eos = await this.makeEosInstance(authKey);
        return eos.transact(transaction, config);
    }
    async transact(authKey, transaction, config, authKeyType) {
        const localAuthKeyType = authKeyType || this.authKeyType;
        if (localAuthKeyType === 'plain-auth-key') {
            return this.transactByAuthKey(authKey, transaction, config);
        }
        if (localAuthKeyType === 'auth-key-search-callback') {
            if (!this.authKeySearchCallback) {
                throw (0, ono_1.default)(new Error('For authKeyType=wif-search-callback wifSearchCallback need to define'));
            }
            const wif = await this.authKeySearchCallback(authKey);
            if (!wif) {
                throw (0, ono_1.default)(new Error('WIF cannot be empty'));
            }
            return this.transactByAuthKey(wif, transaction, config);
        }
        throw (0, ono_1.default)(new errors_1.NotImplementedError('Not implemented authKeyType'));
    }
}
exports.default = Chain;
//# sourceMappingURL=chain.js.map