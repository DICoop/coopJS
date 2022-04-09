"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ono_1 = __importDefault(require("@jsdevtools/ono"));
const chain_1 = __importDefault(require("./chain"));
const errors_1 = require("./errors");
class ChainsSingleton {
    constructor() {
        this.chainsByName = {};
        this.initialized = false;
        this.rootChain = 'unknown';
    }
    init(config, authKeySearchCallback, signatureProviderMaker) {
        if (this.initialized) {
            return;
        }
        for (const chain of config.chains) {
            this.chainsByName[chain.name] = new chain_1.default(chain, config.tableCodeConfig, authKeySearchCallback, signatureProviderMaker);
        }
        this.rootChain = config.ual.rootChain;
        this.initialized = true;
    }
    checkChainsIsInitialized() {
        if (!this.initialized) {
            throw (0, ono_1.default)(new errors_1.ChainsIsNotInitializedError('Chains is not initialized'));
        }
    }
    getChainByName(name) {
        this.checkChainsIsInitialized();
        const chain = this.chainsByName[name];
        if (!chain) {
            throw (0, ono_1.default)(new errors_1.UnknownChainError(`Chain "${name}" not found`));
        }
        return chain;
    }
    getRootChain() {
        return this.getChainByName(this.rootChain);
    }
}
exports.default = ChainsSingleton;
//# sourceMappingURL=chainsSingleton.js.map