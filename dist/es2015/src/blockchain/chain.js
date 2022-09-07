var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TextDecoder, TextEncoder } from 'text-encoding';
import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'isomorphic-fetch';
import ono from "@jsdevtools/ono";
import btoa from 'btoa';
import atob from 'atob';
import unescape from 'core-js-pure/stable/unescape';
import escape from 'core-js-pure/stable/escape';
import EosioContract from './contracts/eosio';
import CoreContract from './contracts/core';
import PartnersContract from './contracts/partners';
import P2PContract from './contracts/p2p';
import NftContract from './contracts/nft';
import ReadApi from './readApi';
import { NotImplementedError } from './errors';
import BaseCrypt from "./baseCrypt";
import Wallet from "./wallet";
import Explorer from "./explorer";
const JsSignatureProviderMaker = ((wif) => Promise.resolve(new JsSignatureProvider([wif])));
class Chain {
    constructor(chainConfig, tableCodeConfig, personalData, authKeySearchCallback, signatureProviderMaker, chainCrypt, textDecoder, textEncoder) {
        this.name = chainConfig.name;
        this.tableCodeConfig = Object.assign(Object.assign({}, tableCodeConfig), (chainConfig.tableCodeConfigOverride || {}));
        this.readApi = new ReadApi(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode);
        this.explorer = new Explorer(chainConfig.explorerApiUrl);
        this.rpcByEndpoint = {};
        this.authKeyType = chainConfig.authKeyType || 'plain-auth-key';
        this.authKeySearchCallback = authKeySearchCallback;
        this.signatureProviderMaker = signatureProviderMaker || JsSignatureProviderMaker;
        this.chainCrypt = chainCrypt || new BaseCrypt();
        this.textDecoder = textDecoder;
        this.textEncoder = textEncoder;
        this.coreSymbol = chainConfig.coreSymbol;
        this.personalData = personalData;
        this.eosioContract = this.applyContract(EosioContract);
        this.coreContract = this.applyContract(CoreContract);
        this.partnersContract = this.applyContract(PartnersContract);
        this.p2pContract = this.applyContract(P2PContract);
        this.nftContract = this.applyContract(NftContract);
        this.wallets = (chainConfig.wallets || []).map(walletConfig => new Wallet(walletConfig, this.readApi));
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
            this.rpcByEndpoint[endpoint] = new JsonRpc(endpoint, { fetch });
        }
        return this.rpcByEndpoint[endpoint];
    }
    getEosInstanceBySignatureProvider(signatureProvider) {
        const rpc = this.getCachedRpc();
        return new Api({
            rpc,
            signatureProvider,
            // @ts-ignore
            textDecoder: new (this.textDecoder || TextDecoder)(),
            textEncoder: new (this.textEncoder || TextEncoder)(),
        });
    }
    /**
     * @deprecated since version 1.0.2
     */
    getEosPassInstance(wif) {
        const signatureProvider = new JsSignatureProvider([wif]);
        return this.getEosInstanceBySignatureProvider(signatureProvider);
    }
    makeEosInstance(authKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const signatureProvider = yield this.signatureProviderMaker(authKey);
            return this.getEosInstanceBySignatureProvider(signatureProvider);
        });
    }
    getAuthKey(authKeyQuery, authKeyType) {
        const localAuthKeyType = authKeyType || this.authKeyType;
        if (localAuthKeyType === 'plain-auth-key') {
            return authKeyQuery;
        }
        if (localAuthKeyType === 'auth-key-search-callback') {
            if (!this.authKeySearchCallback) {
                throw ono(new Error('For authKeyType=wif-search-callback wifSearchCallback need to define'));
            }
            return this.authKeySearchCallback(authKeyQuery);
        }
        throw ono(new NotImplementedError('Not implemented authKeyType'));
    }
    transactByAuthKey(authKey, transaction, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const eos = yield this.makeEosInstance(authKey);
            return eos.transact(transaction, config);
        });
    }
    transact(authKeyQuery, transaction, config, authKeyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const authKey = yield this.getAuthKey(authKeyQuery, authKeyType);
            if (!authKey) {
                throw ono(new Error('authKey cannot be empty'));
            }
            return this.transactByAuthKey(authKey, transaction, config);
        });
    }
    encryptMessage(authKeyQuery, publicKey, message, memo, authKeyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const authKey = yield this.getAuthKey(authKeyQuery, authKeyType);
            if (!authKey) {
                throw ono(new Error('authKey cannot be empty'));
            }
            const preparedMessage = btoa(unescape(encodeURIComponent(message)));
            return this.chainCrypt.encrypt(authKey, publicKey, preparedMessage, memo);
        });
    }
    decryptMessage(authKeyQuery, publicKey, message, memo, authKeyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const authKey = yield this.getAuthKey(authKeyQuery, authKeyType);
            if (!authKey) {
                throw ono(new Error('authKey cannot be empty'));
            }
            const decryptedMessage = yield this.chainCrypt.decrypt(authKey, publicKey, message, memo);
            return decodeURIComponent(escape(atob(decryptedMessage)));
        });
    }
    makeValueAsStr(value) {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined) {
            return String(value);
        }
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                return value.map(item => this.makeValueAsStr(item)).join(',');
            }
            const keys = Object.keys(value).sort();
            return keys.map(key => `${key}=${this.makeValueAsStr(value[key])}`).join('&');
        }
        throw ono(new Error('Unsupported value type'));
    }
    objToStableMessage(dict) {
        return this.makeValueAsStr(dict);
    }
    btoaEscape(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }
    signMessage(authKeyQuery, publicKey, message, authKeyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const authKey = yield this.getAuthKey(authKeyQuery, authKeyType);
            if (!authKey) {
                throw ono(new Error('authKey cannot be empty'));
            }
            const preparedMessage = this.btoaEscape(message);
            return this.chainCrypt.sign(authKey, preparedMessage);
        });
    }
    verifyMessage(publicKey, message, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            const preparedMessage = this.btoaEscape(message);
            return this.chainCrypt.verify(publicKey, signature, preparedMessage);
        });
    }
    signObject(authKeyQuery, publicKey, dict, authKeyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.objToStableMessage(dict);
            return this.signMessage(authKeyQuery, publicKey, message, authKeyType);
        });
    }
    verifyObject(publicKey, dict, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.objToStableMessage(dict);
            return this.verifyMessage(publicKey, message, signature);
        });
    }
    sendPersonalData(authKeyQuery, senderAccountName, recipientAccountName, data, authKeyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const senderPub = yield this.readApi.getPermissionKeyByName(senderAccountName, "active");
            const recipientPub = yield this.readApi.getPermissionKeyByName(recipientAccountName, "active");
            if (!senderPub || !recipientPub) {
                throw ono(new Error('senderPub or recipientPub cannot be empty'));
            }
            const jsonMessage = JSON.stringify(data);
            const encryptedToSender = yield this.encryptMessage(authKeyQuery, senderPub, jsonMessage, undefined, authKeyType);
            const encryptedToRecipient = yield this.encryptMessage(authKeyQuery, recipientPub, jsonMessage, undefined, authKeyType);
            const dataBundle = {
                senderPub,
                recipientPub,
                senderData: encryptedToSender,
                recipientData: encryptedToRecipient,
            };
            const signature = yield this.signObject(authKeyQuery, senderPub, dataBundle, authKeyType);
            return this.personalData.sendPersonalData(dataBundle, signature);
        });
    }
    parseEncryptedPersonalData(authKeyQuery, data, authKeyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            for (const item of data) {
                try {
                    const jsonMessage = yield this.decryptMessage(authKeyQuery, item.senderPub, item.data, undefined, authKeyType);
                    const data = JSON.parse(jsonMessage);
                    result.push({
                        id: item.id,
                        data,
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }
            return result;
        });
    }
    getPersonalAsRecipient(authKeyQuery, recipientAccountName, ids, authKeyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipientPub = yield this.readApi.getPermissionKeyByName(recipientAccountName, "active");
            if (!recipientPub) {
                throw ono(new Error('recipientPub cannot be empty'));
            }
            const dataBundle = {
                recipientPub,
                ids,
            };
            const signature = yield this.signObject(authKeyQuery, recipientPub, dataBundle, authKeyType);
            const result = yield this.personalData.getPersonalDataAsRecipient(dataBundle, signature);
            if (!result.ok) {
                return [];
            }
            return this.parseEncryptedPersonalData(authKeyQuery, result.result, authKeyType);
        });
    }
    getPersonalAsSender(authKeyQuery, senderAccountName, ids, authKeyType) {
        return __awaiter(this, void 0, void 0, function* () {
            const senderPub = yield this.readApi.getPermissionKeyByName(senderAccountName, "active");
            if (!senderPub) {
                throw ono(new Error('senderPub cannot be empty'));
            }
            const dataBundle = {
                senderPub,
                ids,
            };
            const signature = yield this.signObject(authKeyQuery, senderPub, dataBundle, authKeyType);
            const result = yield this.personalData.getPersonalDataAsSender(dataBundle, signature);
            if (!result.ok) {
                return [];
            }
            return this.parseEncryptedPersonalData(authKeyQuery, result.result, authKeyType);
        });
    }
}
export default Chain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9jaGFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUNuQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUczRCxPQUFPLEtBQUssTUFBTSxrQkFBa0IsQ0FBQTtBQUNwQyxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sUUFBUSxNQUFNLDhCQUE4QixDQUFBO0FBQ25ELE9BQU8sTUFBTSxNQUFNLDRCQUE0QixDQUFBO0FBRS9DLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFBO0FBQzdDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFBO0FBQzNDLE9BQU8sZ0JBQWdCLE1BQU0sc0JBQXNCLENBQUE7QUFDbkQsT0FBTyxXQUFXLE1BQU0saUJBQWlCLENBQUE7QUFDekMsT0FBTyxXQUFXLE1BQU0saUJBQWlCLENBQUE7QUFTekMsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFBO0FBRS9CLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBQzlCLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQU9sQyxNQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxDQUFD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QXlCOztZQUV6QixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDeEYsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDWixNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUE7YUFDcEQ7WUFDRCxNQUFNLFVBQVUsR0FBRztnQkFDZixTQUFTO2dCQUNULEdBQUc7YUFDTixDQUFBO1lBRUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1lBRXpGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUE7WUFFckYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7Z0JBQ1osT0FBTyxFQUFFLENBQUE7YUFDWjtZQUVELE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQ3BGLENBQUM7S0FBQTtDQUNKO0FBRUQsZUFBZSxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RleHREZWNvZGVyLCBUZXh0RW5jb2Rlcn0gZnJvbSAndGV4dC1lbmNvZGluZyc7XG5pbXBvcnQge0FwaSwgSnNvblJwY30gZnJvbSAnZW9zanMnO1xuaW1wb3J0IHtKc1NpZ25hdHVyZVByb3ZpZGVyfSBmcm9tICdlb3Nqcy9kaXN0L2Vvc2pzLWpzc2lnJztcbmltcG9ydCB7U2lnbmF0dXJlUHJvdmlkZXIsIFRyYW5zYWN0Q29uZmlnLCBUcmFuc2FjdGlvbiwgVHJhbnNhY3RSZXN1bHR9IGZyb20gJ2Vvc2pzL2Rpc3QvZW9zanMtYXBpLWludGVyZmFjZXMnO1xuaW1wb3J0IHtQdXNoVHJhbnNhY3Rpb25BcmdzLCBSZWFkT25seVRyYW5zYWN0UmVzdWx0fSBmcm9tICdlb3Nqcy9kaXN0L2Vvc2pzLXJwYy1pbnRlcmZhY2VzJztcbmltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLWZldGNoJ1xuaW1wb3J0IG9ubyBmcm9tIFwiQGpzZGV2dG9vbHMvb25vXCI7XG5pbXBvcnQgYnRvYSBmcm9tICdidG9hJztcbmltcG9ydCBhdG9iIGZyb20gJ2F0b2InO1xuaW1wb3J0IHVuZXNjYXBlIGZyb20gJ2NvcmUtanMtcHVyZS9zdGFibGUvdW5lc2NhcGUnXG5pbXBvcnQgZXNjYXBlIGZyb20gJ2NvcmUtanMtcHVyZS9zdGFibGUvZXNjYXBlJ1xuXG5pbXBvcnQgRW9zaW9Db250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9lb3NpbydcbmltcG9ydCBDb3JlQ29udHJhY3QgZnJvbSAnLi9jb250cmFjdHMvY29yZSdcbmltcG9ydCBQYXJ0bmVyc0NvbnRyYWN0IGZyb20gJy4vY29udHJhY3RzL3BhcnRuZXJzJ1xuaW1wb3J0IFAyUENvbnRyYWN0IGZyb20gJy4vY29udHJhY3RzL3AycCdcbmltcG9ydCBOZnRDb250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9uZnQnXG5pbXBvcnQge1xuICAgIEF1dGhLZXlTZWFyY2hDYWxsYmFjayxcbiAgICBBdXRoS2V5VHlwZSxcbiAgICBDaGFpbkNvbmZpZyxcbiAgICBDaGFpbkNyeXB0LFxuICAgIFNpZ25hdHVyZVByb3ZpZGVyTWFrZXIsXG4gICAgVGFibGVDb2RlQ29uZmlnXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgUmVhZEFwaSBmcm9tICcuL3JlYWRBcGknXG5pbXBvcnQgQmFzZUNvbnRyYWN0IGZyb20gXCIuL2NvbnRyYWN0cy9iYXNlXCI7XG5pbXBvcnQge05vdEltcGxlbWVudGVkRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCBCYXNlQ3J5cHQgZnJvbSBcIi4vYmFzZUNyeXB0XCI7XG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuL3dhbGxldFwiO1xuaW1wb3J0IEV4cGxvcmVyIGZyb20gXCIuL2V4cGxvcmVyXCI7XG5pbXBvcnQgUGVyc29uYWxEYXRhIGZyb20gXCIuL3BlcnNvbmFsRGF0YVwiO1xuXG5pbnRlcmZhY2UgUnBjc0J5RW5kcG9pbnRzIHtcbiAgICBba2V5OiBzdHJpbmddOiBKc29uUnBjXG59XG5cbmNvbnN0IEpzU2lnbmF0dXJlUHJvdmlkZXJNYWtlciA9ICgod2lmOiBzdHJpbmcpID0+IFByb21pc2UucmVzb2x2ZShuZXcgSnNTaWduYXR1cmVQcm92aWRlcihbd2lmXSkpKVxuXG5jbGFzcyBDaGFpbiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBuYW1lOiBzdHJpbmdcbiAgICBwdWJsaWMgcmVhZEFwaTogUmVhZEFwaVxuICAgIHB1YmxpYyBleHBsb3JlcjogRXhwbG9yZXJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRhYmxlQ29kZUNvbmZpZzogVGFibGVDb2RlQ29uZmlnXG4gICAgcHJpdmF0ZSByZWFkb25seSBycGNCeUVuZHBvaW50OiBScGNzQnlFbmRwb2ludHNcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF1dGhLZXlUeXBlOiBBdXRoS2V5VHlwZVxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXV0aEtleVNlYXJjaENhbGxiYWNrPzogQXV0aEtleVNlYXJjaENhbGxiYWNrXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaWduYXR1cmVQcm92aWRlck1ha2VyOiBTaWduYXR1cmVQcm92aWRlck1ha2VyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjaGFpbkNyeXB0OiBDaGFpbkNyeXB0XG4gICAgcHJpdmF0ZSB0ZXh0RGVjb2Rlcj86IHR5cGVvZiBUZXh0RGVjb2RlclxuICAgIHByaXZhdGUgdGV4dEVuY29kZXI/OiB0eXBlb2YgVGV4dEVuY29kZXJcbiAgICBwcml2YXRlIHBlcnNvbmFsRGF0YTogUGVyc29uYWxEYXRhXG5cbiAgICBwdWJsaWMgZW9zaW9Db250cmFjdDogRW9zaW9Db250cmFjdFxuICAgIHB1YmxpYyBjb3JlQ29udHJhY3Q6IENvcmVDb250cmFjdFxuICAgIHB1YmxpYyBwYXJ0bmVyc0NvbnRyYWN0OiBQYXJ0bmVyc0NvbnRyYWN0XG4gICAgcHVibGljIHAycENvbnRyYWN0OiBQMlBDb250cmFjdFxuICAgIHB1YmxpYyBuZnRDb250cmFjdDogTmZ0Q29udHJhY3RcblxuICAgIHB1YmxpYyB3YWxsZXRzOiBXYWxsZXRbXVxuICAgIHB1YmxpYyByZWFkb25seSBjb3JlU3ltYm9sPzogc3RyaW5nXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY2hhaW5Db25maWc6IENoYWluQ29uZmlnLFxuICAgICAgICB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZyxcbiAgICAgICAgcGVyc29uYWxEYXRhOiBQZXJzb25hbERhdGEsXG4gICAgICAgIGF1dGhLZXlTZWFyY2hDYWxsYmFjaz86IEF1dGhLZXlTZWFyY2hDYWxsYmFjayxcbiAgICAgICAgc2lnbmF0dXJlUHJvdmlkZXJNYWtlcj86IFNpZ25hdHVyZVByb3ZpZGVyTWFrZXIsXG4gICAgICAgIGNoYWluQ3J5cHQ/OiBDaGFpbkNyeXB0LFxuICAgICAgICB0ZXh0RGVjb2Rlcj86IHR5cGVvZiBUZXh0RGVjb2RlcixcbiAgICAgICAgdGV4dEVuY29kZXI/OiB0eXBlb2YgVGV4dEVuY29kZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IGNoYWluQ29uZmlnLm5hbWVcbiAgICAgICAgdGhpcy50YWJsZUNvZGVDb25maWcgPSB7Li4udGFibGVDb2RlQ29uZmlnLCAuLi4oY2hhaW5Db25maWcudGFibGVDb2RlQ29uZmlnT3ZlcnJpZGUgfHwge30pfVxuICAgICAgICB0aGlzLnJlYWRBcGkgPSBuZXcgUmVhZEFwaSh0aGlzLm5hbWUsIGNoYWluQ29uZmlnLnJwY0VuZHBvaW50cywgY2hhaW5Db25maWcuYmFsYW5jaW5nTW9kZSlcbiAgICAgICAgdGhpcy5leHBsb3JlciA9IG5ldyBFeHBsb3JlcihjaGFpbkNvbmZpZy5leHBsb3JlckFwaVVybClcbiAgICAgICAgdGhpcy5ycGNCeUVuZHBvaW50ID0ge31cbiAgICAgICAgdGhpcy5hdXRoS2V5VHlwZSA9IGNoYWluQ29uZmlnLmF1dGhLZXlUeXBlIHx8ICdwbGFpbi1hdXRoLWtleSdcbiAgICAgICAgdGhpcy5hdXRoS2V5U2VhcmNoQ2FsbGJhY2sgPSBhdXRoS2V5U2VhcmNoQ2FsbGJhY2tcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQcm92aWRlck1ha2VyID0gc2lnbmF0dXJlUHJvdmlkZXJNYWtlciB8fCBKc1NpZ25hdHVyZVByb3ZpZGVyTWFrZXJcbiAgICAgICAgdGhpcy5jaGFpbkNyeXB0ID0gY2hhaW5DcnlwdCB8fCBuZXcgQmFzZUNyeXB0KClcbiAgICAgICAgdGhpcy50ZXh0RGVjb2RlciA9IHRleHREZWNvZGVyXG4gICAgICAgIHRoaXMudGV4dEVuY29kZXIgPSB0ZXh0RW5jb2RlclxuICAgICAgICB0aGlzLmNvcmVTeW1ib2wgPSBjaGFpbkNvbmZpZy5jb3JlU3ltYm9sXG4gICAgICAgIHRoaXMucGVyc29uYWxEYXRhID0gcGVyc29uYWxEYXRhXG5cbiAgICAgICAgdGhpcy5lb3Npb0NvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KEVvc2lvQ29udHJhY3QpXG4gICAgICAgIHRoaXMuY29yZUNvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KENvcmVDb250cmFjdClcbiAgICAgICAgdGhpcy5wYXJ0bmVyc0NvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KFBhcnRuZXJzQ29udHJhY3QpXG4gICAgICAgIHRoaXMucDJwQ29udHJhY3QgPSB0aGlzLmFwcGx5Q29udHJhY3QoUDJQQ29udHJhY3QpXG4gICAgICAgIHRoaXMubmZ0Q29udHJhY3QgPSB0aGlzLmFwcGx5Q29udHJhY3QoTmZ0Q29udHJhY3QpXG5cbiAgICAgICAgdGhpcy53YWxsZXRzID0gKGNoYWluQ29uZmlnLndhbGxldHMgfHwgW10pLm1hcCh3YWxsZXRDb25maWcgPT4gbmV3IFdhbGxldCh3YWxsZXRDb25maWcsIHRoaXMucmVhZEFwaSkpXG4gICAgfVxuXG4gICAgZ2V0IHdhbGxldHNTeW1ib2xzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxsZXRzLm1hcCh3YWxsZXQgPT4gd2FsbGV0LnN5bWJvbClcbiAgICB9XG5cbiAgICBnZXRXYWxsZXRCeVN5bWJvbChzeW1ib2w6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxsZXRzLmZpbmQod2FsbGV0ID0+IHdhbGxldC5zeW1ib2wgPT09IHN5bWJvbClcbiAgICB9XG5cbiAgICBhcHBseUNvbnRyYWN0PFQgZXh0ZW5kcyBCYXNlQ29udHJhY3Q+KGNvbnRyYWN0OiB7IG5ldyguLi5hcmdzOiBhbnlbXSk6IFQ7IH0pOiBUIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb250cmFjdCh0aGlzLnJlYWRBcGksIHRoaXMudGFibGVDb2RlQ29uZmlnKVxuICAgIH1cblxuICAgIGdldENhY2hlZFJwYygpIHtcbiAgICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLnJlYWRBcGkuZ2V0RW5kcG9pbnQoKVxuICAgICAgICBpZiAoIXRoaXMucnBjQnlFbmRwb2ludFtlbmRwb2ludF0pIHtcbiAgICAgICAgICAgIHRoaXMucnBjQnlFbmRwb2ludFtlbmRwb2ludF0gPSBuZXcgSnNvblJwYyhlbmRwb2ludCwge2ZldGNofSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5ycGNCeUVuZHBvaW50W2VuZHBvaW50XVxuICAgIH1cblxuICAgIGdldEVvc0luc3RhbmNlQnlTaWduYXR1cmVQcm92aWRlcihzaWduYXR1cmVQcm92aWRlcjogU2lnbmF0dXJlUHJvdmlkZXIpIHtcbiAgICAgICAgY29uc3QgcnBjID0gdGhpcy5nZXRDYWNoZWRScGMoKVxuXG4gICAgICAgIHJldHVybiBuZXcgQXBpKHtcbiAgICAgICAgICAgIHJwYyxcbiAgICAgICAgICAgIHNpZ25hdHVyZVByb3ZpZGVyLFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGV4dERlY29kZXI6IG5ldyAodGhpcy50ZXh0RGVjb2RlciB8fCBUZXh0RGVjb2RlcikoKSxcbiAgICAgICAgICAgIHRleHRFbmNvZGVyOiBuZXcgKHRoaXMudGV4dEVuY29kZXIgfHwgVGV4dEVuY29kZXIpKCksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMS4wLjJcbiAgICAgKi9cbiAgICBnZXRFb3NQYXNzSW5zdGFuY2Uod2lmOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUHJvdmlkZXIgPSBuZXcgSnNTaWduYXR1cmVQcm92aWRlcihbd2lmXSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVvc0luc3RhbmNlQnlTaWduYXR1cmVQcm92aWRlcihzaWduYXR1cmVQcm92aWRlcik7XG4gICAgfVxuXG4gICAgYXN5bmMgbWFrZUVvc0luc3RhbmNlKGF1dGhLZXk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaWduYXR1cmVQcm92aWRlciA9IGF3YWl0IHRoaXMuc2lnbmF0dXJlUHJvdmlkZXJNYWtlcihhdXRoS2V5KVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFb3NJbnN0YW5jZUJ5U2lnbmF0dXJlUHJvdmlkZXIoc2lnbmF0dXJlUHJvdmlkZXIpO1xuICAgIH1cblxuICAgIGdldEF1dGhLZXkoYXV0aEtleVF1ZXJ5OiBzdHJpbmcsIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUpIHtcbiAgICAgICAgY29uc3QgbG9jYWxBdXRoS2V5VHlwZSA9IGF1dGhLZXlUeXBlIHx8IHRoaXMuYXV0aEtleVR5cGVcblxuICAgICAgICBpZiAobG9jYWxBdXRoS2V5VHlwZSA9PT0gJ3BsYWluLWF1dGgta2V5Jykge1xuICAgICAgICAgICAgcmV0dXJuIGF1dGhLZXlRdWVyeVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvY2FsQXV0aEtleVR5cGUgPT09ICdhdXRoLWtleS1zZWFyY2gtY2FsbGJhY2snKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0aEtleVNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignRm9yIGF1dGhLZXlUeXBlPXdpZi1zZWFyY2gtY2FsbGJhY2sgd2lmU2VhcmNoQ2FsbGJhY2sgbmVlZCB0byBkZWZpbmUnKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dGhLZXlTZWFyY2hDYWxsYmFjayhhdXRoS2V5UXVlcnkpXG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBvbm8obmV3IE5vdEltcGxlbWVudGVkRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCBhdXRoS2V5VHlwZScpKVxuICAgIH1cblxuICAgIGFzeW5jIHRyYW5zYWN0QnlBdXRoS2V5KFxuICAgICAgICBhdXRoS2V5OiBzdHJpbmcsXG4gICAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgICAgY29uZmlnPzogVHJhbnNhY3RDb25maWdcbiAgICApOiBQcm9taXNlPFRyYW5zYWN0UmVzdWx0IHwgUmVhZE9ubHlUcmFuc2FjdFJlc3VsdCB8IFB1c2hUcmFuc2FjdGlvbkFyZ3M+IHtcbiAgICAgICAgY29uc3QgZW9zID0gYXdhaXQgdGhpcy5tYWtlRW9zSW5zdGFuY2UoYXV0aEtleSlcbiAgICAgICAgcmV0dXJuIGVvcy50cmFuc2FjdCh0cmFuc2FjdGlvbiwgY29uZmlnKVxuICAgIH1cblxuICAgIGFzeW5jIHRyYW5zYWN0KFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgICAgICBjb25maWc/OiBUcmFuc2FjdENvbmZpZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApOiBQcm9taXNlPFRyYW5zYWN0UmVzdWx0IHwgUmVhZE9ubHlUcmFuc2FjdFJlc3VsdCB8IFB1c2hUcmFuc2FjdGlvbkFyZ3M+IHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0QnlBdXRoS2V5KGF1dGhLZXksIHRyYW5zYWN0aW9uLCBjb25maWcpXG4gICAgfVxuXG4gICAgYXN5bmMgZW5jcnlwdE1lc3NhZ2UoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBtZW1vPzogc3RyaW5nLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICkge1xuICAgICAgICBjb25zdCBhdXRoS2V5ID0gYXdhaXQgdGhpcy5nZXRBdXRoS2V5KGF1dGhLZXlRdWVyeSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgaWYgKCFhdXRoS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdhdXRoS2V5IGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJlcGFyZWRNZXNzYWdlID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQobWVzc2FnZSkpKVxuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbkNyeXB0LmVuY3J5cHQoYXV0aEtleSwgcHVibGljS2V5LCBwcmVwYXJlZE1lc3NhZ2UsIG1lbW8pXG4gICAgfVxuXG4gICAgYXN5bmMgZGVjcnlwdE1lc3NhZ2UoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBtZW1vPzogc3RyaW5nLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICkge1xuICAgICAgICBjb25zdCBhdXRoS2V5ID0gYXdhaXQgdGhpcy5nZXRBdXRoS2V5KGF1dGhLZXlRdWVyeSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgaWYgKCFhdXRoS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdhdXRoS2V5IGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVjcnlwdGVkTWVzc2FnZSA9IGF3YWl0IHRoaXMuY2hhaW5DcnlwdC5kZWNyeXB0KGF1dGhLZXksIHB1YmxpY0tleSwgbWVzc2FnZSwgbWVtbylcblxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShhdG9iKGRlY3J5cHRlZE1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBtYWtlVmFsdWVBc1N0cih2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5tYXAoaXRlbSA9PiB0aGlzLm1ha2VWYWx1ZUFzU3RyKGl0ZW0pKS5qb2luKCcsJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSkuc29ydCgpXG4gICAgICAgICAgICByZXR1cm4ga2V5cy5tYXAoa2V5ID0+IGAke2tleX09JHt0aGlzLm1ha2VWYWx1ZUFzU3RyKHZhbHVlW2tleV0pfWApLmpvaW4oJyYnKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdmFsdWUgdHlwZScpKVxuICAgIH1cblxuICAgIG9ialRvU3RhYmxlTWVzc2FnZShkaWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1ha2VWYWx1ZUFzU3RyKGRpY3QpXG4gICAgfVxuXG4gICAgYnRvYUVzY2FwZShzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpXG4gICAgfVxuXG4gICAgYXN5bmMgc2lnbk1lc3NhZ2UoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICkge1xuICAgICAgICBjb25zdCBhdXRoS2V5ID0gYXdhaXQgdGhpcy5nZXRBdXRoS2V5KGF1dGhLZXlRdWVyeSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgaWYgKCFhdXRoS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdhdXRoS2V5IGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJlcGFyZWRNZXNzYWdlID0gdGhpcy5idG9hRXNjYXBlKG1lc3NhZ2UpXG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluQ3J5cHQuc2lnbihhdXRoS2V5LCBwcmVwYXJlZE1lc3NhZ2UpXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5TWVzc2FnZShcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHByZXBhcmVkTWVzc2FnZSA9IHRoaXMuYnRvYUVzY2FwZShtZXNzYWdlKVxuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbkNyeXB0LnZlcmlmeShwdWJsaWNLZXksIHNpZ25hdHVyZSwgcHJlcGFyZWRNZXNzYWdlKVxuICAgIH1cblxuICAgIGFzeW5jIHNpZ25PYmplY3QoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgZGljdDogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMub2JqVG9TdGFibGVNZXNzYWdlKGRpY3QpXG4gICAgICAgIHJldHVybiB0aGlzLnNpZ25NZXNzYWdlKGF1dGhLZXlRdWVyeSwgcHVibGljS2V5LCBtZXNzYWdlLCBhdXRoS2V5VHlwZSlcbiAgICB9XG5cbiAgICBhc3luYyB2ZXJpZnlPYmplY3QoXG4gICAgICAgIHB1YmxpY0tleTogc3RyaW5nLFxuICAgICAgICBkaWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICAgICAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMub2JqVG9TdGFibGVNZXNzYWdlKGRpY3QpXG4gICAgICAgIHJldHVybiB0aGlzLnZlcmlmeU1lc3NhZ2UocHVibGljS2V5LCBtZXNzYWdlLCBzaWduYXR1cmUpXG4gICAgfVxuXG4gICAgYXN5bmMgc2VuZFBlcnNvbmFsRGF0YShcbiAgICAgICAgYXV0aEtleVF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIHNlbmRlckFjY291bnROYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlY2lwaWVudEFjY291bnROYW1lOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IGFueSxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3Qgc2VuZGVyUHViID0gYXdhaXQgdGhpcy5yZWFkQXBpLmdldFBlcm1pc3Npb25LZXlCeU5hbWUoc2VuZGVyQWNjb3VudE5hbWUsIFwiYWN0aXZlXCIpXG4gICAgICAgIGNvbnN0IHJlY2lwaWVudFB1YiA9IGF3YWl0IHRoaXMucmVhZEFwaS5nZXRQZXJtaXNzaW9uS2V5QnlOYW1lKHJlY2lwaWVudEFjY291bnROYW1lLCBcImFjdGl2ZVwiKVxuICAgICAgICBpZiAoIXNlbmRlclB1YiB8fCAhcmVjaXBpZW50UHViKSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdzZW5kZXJQdWIgb3IgcmVjaXBpZW50UHViIGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpzb25NZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkVG9TZW5kZXIgPSBhd2FpdCB0aGlzLmVuY3J5cHRNZXNzYWdlKGF1dGhLZXlRdWVyeSwgc2VuZGVyUHViLCBqc29uTWVzc2FnZSwgdW5kZWZpbmVkLCBhdXRoS2V5VHlwZSlcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkVG9SZWNpcGllbnQgPSBhd2FpdCB0aGlzLmVuY3J5cHRNZXNzYWdlKGF1dGhLZXlRdWVyeSwgcmVjaXBpZW50UHViLCBqc29uTWVzc2FnZSwgdW5kZWZpbmVkLCBhdXRoS2V5VHlwZSlcbiAgICAgICAgY29uc3QgZGF0YUJ1bmRsZSA9IHtcbiAgICAgICAgICAgIHNlbmRlclB1YixcbiAgICAgICAgICAgIHJlY2lwaWVudFB1YixcbiAgICAgICAgICAgIHNlbmRlckRhdGE6IGVuY3J5cHRlZFRvU2VuZGVyLFxuICAgICAgICAgICAgcmVjaXBpZW50RGF0YTogZW5jcnlwdGVkVG9SZWNpcGllbnQsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCB0aGlzLnNpZ25PYmplY3QoYXV0aEtleVF1ZXJ5LCBzZW5kZXJQdWIsIGRhdGFCdW5kbGUsIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBlcnNvbmFsRGF0YS5zZW5kUGVyc29uYWxEYXRhKGRhdGFCdW5kbGUsIHNpZ25hdHVyZSlcbiAgICB9XG5cbiAgICBhc3luYyBwYXJzZUVuY3J5cHRlZFBlcnNvbmFsRGF0YShcbiAgICAgICAgYXV0aEtleVF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IHtpZDogc3RyaW5nLCBzZW5kZXJQdWI6IHN0cmluZywgZGF0YTogc3RyaW5nfVtdLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICkge1xuICAgICAgICBjb25zdCByZXN1bHQ6IHtpZDogc3RyaW5nLCBkYXRhOiBhbnl9W10gPSBbXVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGF0YSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBqc29uTWVzc2FnZSA9IGF3YWl0IHRoaXMuZGVjcnlwdE1lc3NhZ2UoYXV0aEtleVF1ZXJ5LCBpdGVtLnNlbmRlclB1YiwgaXRlbS5kYXRhLCB1bmRlZmluZWQsIGF1dGhLZXlUeXBlKVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGpzb25NZXNzYWdlKVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIGFzeW5jIGdldFBlcnNvbmFsQXNSZWNpcGllbnQoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICByZWNpcGllbnRBY2NvdW50TmFtZTogc3RyaW5nLFxuICAgICAgICBpZHM6IHN0cmluZ1tdLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICk6IFByb21pc2U8e2lkOiBzdHJpbmcsIGRhdGE6IGFueX1bXT4ge1xuICAgICAgICBjb25zdCByZWNpcGllbnRQdWIgPSBhd2FpdCB0aGlzLnJlYWRBcGkuZ2V0UGVybWlzc2lvbktleUJ5TmFtZShyZWNpcGllbnRBY2NvdW50TmFtZSwgXCJhY3RpdmVcIilcbiAgICAgICAgaWYgKCFyZWNpcGllbnRQdWIpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ3JlY2lwaWVudFB1YiBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhQnVuZGxlID0ge1xuICAgICAgICAgICAgcmVjaXBpZW50UHViLFxuICAgICAgICAgICAgaWRzLFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgdGhpcy5zaWduT2JqZWN0KGF1dGhLZXlRdWVyeSwgcmVjaXBpZW50UHViLCBkYXRhQnVuZGxlLCBhdXRoS2V5VHlwZSlcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnBlcnNvbmFsRGF0YS5nZXRQZXJzb25hbERhdGFBc1JlY2lwaWVudChkYXRhQnVuZGxlLCBzaWduYXR1cmUpXG5cbiAgICAgICAgaWYgKCFyZXN1bHQub2spIHtcbiAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VFbmNyeXB0ZWRQZXJzb25hbERhdGEoYXV0aEtleVF1ZXJ5LCByZXN1bHQucmVzdWx0LCBhdXRoS2V5VHlwZSlcbiAgICB9XG5cbiAgICBhc3luYyBnZXRQZXJzb25hbEFzU2VuZGVyKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgc2VuZGVyQWNjb3VudE5hbWU6IHN0cmluZyxcbiAgICAgICAgaWRzOiBzdHJpbmdbXSxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApOiBQcm9taXNlPHtpZDogc3RyaW5nLCBkYXRhOiBhbnl9W10+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVyUHViID0gYXdhaXQgdGhpcy5yZWFkQXBpLmdldFBlcm1pc3Npb25LZXlCeU5hbWUoc2VuZGVyQWNjb3VudE5hbWUsIFwiYWN0aXZlXCIpXG4gICAgICAgIGlmICghc2VuZGVyUHViKSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdzZW5kZXJQdWIgY2Fubm90IGJlIGVtcHR5JykpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YUJ1bmRsZSA9IHtcbiAgICAgICAgICAgIHNlbmRlclB1YixcbiAgICAgICAgICAgIGlkcyxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IHRoaXMuc2lnbk9iamVjdChhdXRoS2V5UXVlcnksIHNlbmRlclB1YiwgZGF0YUJ1bmRsZSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wZXJzb25hbERhdGEuZ2V0UGVyc29uYWxEYXRhQXNTZW5kZXIoZGF0YUJ1bmRsZSwgc2lnbmF0dXJlKVxuXG4gICAgICAgIGlmICghcmVzdWx0Lm9rKSB7XG4gICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlRW5jcnlwdGVkUGVyc29uYWxEYXRhKGF1dGhLZXlRdWVyeSwgcmVzdWx0LnJlc3VsdCwgYXV0aEtleVR5cGUpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFpblxuIl19