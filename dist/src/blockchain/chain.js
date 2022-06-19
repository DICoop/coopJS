"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const ono_1 = __importDefault(require("@jsdevtools/ono"));
const btoa_1 = __importDefault(require("btoa"));
const atob_1 = __importDefault(require("atob"));
const unescape_1 = __importDefault(require("core-js-pure/stable/unescape"));
const escape_1 = __importDefault(require("core-js-pure/stable/escape"));
const eosio_1 = __importDefault(require("./contracts/eosio"));
const core_1 = __importDefault(require("./contracts/core"));
const partners_1 = __importDefault(require("./contracts/partners"));
const p2p_1 = __importDefault(require("./contracts/p2p"));
const nft_1 = __importDefault(require("./contracts/nft"));
const readApi_1 = __importDefault(require("./readApi"));
const errors_1 = require("./errors");
const baseCrypt_1 = __importDefault(require("./baseCrypt"));
const wallet_1 = __importDefault(require("./wallet"));
const JsSignatureProviderMaker = ((wif) => Promise.resolve(new eosjs_jssig_1.JsSignatureProvider([wif])));
class Chain {
    constructor(chainConfig, tableCodeConfig, authKeySearchCallback, signatureProviderMaker, chainCrypt) {
        this.name = chainConfig.name;
        this.tableCodeConfig = { ...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {}) };
        this.readApi = new readApi_1.default(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode);
        this.rpcByEndpoint = {};
        this.authKeyType = chainConfig.authKeyType || 'plain-auth-key';
        this.authKeySearchCallback = authKeySearchCallback;
        this.signatureProviderMaker = signatureProviderMaker || JsSignatureProviderMaker;
        this.chainCrypt = chainCrypt || new baseCrypt_1.default();
        this.eosioContract = this.applyContract(eosio_1.default);
        this.coreContract = this.applyContract(core_1.default);
        this.partnersContract = this.applyContract(partners_1.default);
        this.p2pContract = this.applyContract(p2p_1.default);
        this.nftContract = this.applyContract(nft_1.default);
        this.wallets = (chainConfig.wallets || []).map(walletConfig => new wallet_1.default(walletConfig, this.readApi));
    }
    get walletsSymbols() {
        return this.wallets.map(wallet => wallet.symbol);
    }
    getWalletBySymbol(symbol) {
        return this.wallets.find(wallet => wallet.symbol === symbol);
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
    getAuthKey(authKeyQuery, authKeyType) {
        const localAuthKeyType = authKeyType || this.authKeyType;
        if (localAuthKeyType === 'plain-auth-key') {
            return authKeyQuery;
        }
        if (localAuthKeyType === 'auth-key-search-callback') {
            if (!this.authKeySearchCallback) {
                throw (0, ono_1.default)(new Error('For authKeyType=wif-search-callback wifSearchCallback need to define'));
            }
            return this.authKeySearchCallback(authKeyQuery);
        }
        throw (0, ono_1.default)(new errors_1.NotImplementedError('Not implemented authKeyType'));
    }
    async transactByAuthKey(authKey, transaction, config) {
        const eos = await this.makeEosInstance(authKey);
        return eos.transact(transaction, config);
    }
    async transact(authKeyQuery, transaction, config, authKeyType) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType);
        if (!authKey) {
            throw (0, ono_1.default)(new Error('authKey cannot be empty'));
        }
        return this.transactByAuthKey(authKey, transaction, config);
    }
    async encryptMessage(authKeyQuery, publicKey, message, memo, authKeyType) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType);
        if (!authKey) {
            throw (0, ono_1.default)(new Error('authKey cannot be empty'));
        }
        const permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "active");
        if (!permissionKey) {
            throw (0, ono_1.default)(new Error('permissionKey cannot be empty'));
        }
        const preparedMessage = (0, btoa_1.default)((0, unescape_1.default)(encodeURIComponent(message)));
        return this.chainCrypt.encrypt(authKey, permissionKey, preparedMessage, memo);
    }
    async decryptMessage(authKeyQuery, publicKey, message, memo, authKeyType) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType);
        if (!authKey) {
            throw (0, ono_1.default)(new Error('authKey cannot be empty'));
        }
        let permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "gateway");
        if (!permissionKey) {
            permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "active");
        }
        if (!permissionKey) {
            throw (0, ono_1.default)(new Error('permissionKey cannot be empty'));
        }
        const decryptedMessage = await this.chainCrypt.decrypt(authKey, permissionKey, message, memo);
        return decodeURIComponent((0, escape_1.default)((0, atob_1.default)(decryptedMessage)));
    }
}
exports.default = Chain;
//# sourceMappingURL=chain.js.map