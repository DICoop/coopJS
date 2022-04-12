"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eosjs_api_1 = __importDefault(require("eosjs-api"));
const ono_1 = __importDefault(require("@jsdevtools/ono"));
const errors_1 = require("./errors");
class ReadApi {
    constructor(chainName, apiConfigs, balancingMode) {
        this.getKeyAccounts = (...args) => {
            const instance = this.getInstance();
            return instance.getKeyAccounts(...args);
        };
        this.getAccount = (...args) => {
            const instance = this.getInstance();
            return instance.getAccount(...args);
        };
        this.getCurrencyBalance = (...args) => {
            const instance = this.getInstance();
            return instance.getCurrencyBalance(...args);
        };
        this.offset = 0;
        this.balancingMode = balancingMode || 'random-once';
        this.apis = [];
        this.endpoints = [];
        if (!apiConfigs || apiConfigs.length === 0) {
            throw (0, ono_1.default)(new errors_1.RpcEndpointsEmptyError(`rpcEndpoints is empty (chain=${chainName})`));
        }
        for (const { protocol, host, port } of apiConfigs) {
            const rpcEndpointString = `${protocol}://${host}:${port}`;
            this.endpoints.push(rpcEndpointString);
            this.apis.push(new eosjs_api_1.default({ httpEndpoint: rpcEndpointString }));
        }
        if (this.balancingMode === 'random-once' && this.apis.length > 1) {
            this.offset = Math.floor(Math.random() * this.apis.length);
        }
    }
    getBalancedItemByOffset(currentOffset, items, balancingMode) {
        if (items.length < 2) {
            return {
                result: items[0],
                offset: 0,
            };
        }
        let nextOffset = currentOffset;
        if (balancingMode === 'random') {
            nextOffset = Math.floor(Math.random() * items.length);
        }
        const instance = items[nextOffset];
        if (balancingMode === 'round-robin') {
            nextOffset++;
            if (nextOffset >= items.length) {
                nextOffset = 0;
            }
        }
        return {
            result: instance,
            offset: nextOffset,
        };
    }
    getBalancedItem(collection) {
        const { result, offset, } = this.getBalancedItemByOffset(this.offset, collection, this.balancingMode);
        this.offset = offset;
        return result;
    }
    getInstance() {
        return this.getBalancedItem(this.apis);
    }
    getEndpoint() {
        return this.getBalancedItem(this.endpoints);
    }
    async getUserBalance(account, symbol) {
        const [balance] = await this.getCurrencyBalance("eosio.token", account, symbol);
        return `${(parseFloat(balance || '0') || 0).toFixed(4)} ${symbol}`;
    }
    async getPermissionKeyByName(accountName, name) {
        const account = await this.getAccount(accountName);
        const permission = account.permissions.find(el => el.perm_name === name);
        return permission === null || permission === void 0 ? void 0 : permission.required_auth.keys[0].key;
    }
    getTableRows(code, scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position) {
        const instance = this.getInstance();
        return instance.getTableRows(true, code, scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position);
    }
}
exports.default = ReadApi;
//# sourceMappingURL=readApi.js.map