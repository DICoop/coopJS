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
        this.offset = 0;
        this.balancingMode = balancingMode || 'random-once';
        this.apis = [];
        if (!apiConfigs || apiConfigs.length === 0) {
            throw (0, ono_1.default)(new errors_1.RpcEndpointsEmptyError(`rpcEndpoints is empty (chain=${chainName})`));
        }
        for (const { protocol, host, port } of apiConfigs) {
            const rpcEndpointString = `${protocol}://${host}:${port}`;
            this.apis.push(new eosjs_api_1.default({ httpEndpoint: rpcEndpointString }));
        }
        if (this.balancingMode === 'random-once' && this.apis.length > 1) {
            this.offset = Math.floor(Math.random() * this.apis.length);
        }
    }
    getInstance() {
        if (this.apis.length < 2) {
            return this.apis[0];
        }
        let offset = this.offset;
        if (this.balancingMode === 'random') {
            offset = Math.floor(Math.random() * this.apis.length);
        }
        const api = this.apis[offset];
        if (this.balancingMode === 'round-robin') {
            this.offset++;
            if (this.offset >= this.apis.length) {
                this.offset = 0;
            }
        }
        return api;
    }
    getTableRows(code, scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position) {
        const instance = this.getInstance();
        return instance.getTableRows(true, code, scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position);
    }
}
exports.default = ReadApi;
//# sourceMappingURL=readApi.js.map