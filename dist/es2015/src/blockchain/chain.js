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
                const decrypted = yield this.decryptMessage(authKeyQuery, item.senderPub, item.data, undefined, authKeyType);
                result.push({
                    id: item.id,
                    data: JSON.parse(decrypted),
                });
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
            return this.parseEncryptedPersonalData(authKeyQuery, result.data, authKeyType);
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
            return this.parseEncryptedPersonalData(authKeyQuery, result.data, authKeyType);
        });
    }
}
export default Chain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9jaGFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUNuQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUczRCxPQUFPLEtBQUssTUFBTSxrQkFBa0IsQ0FBQTtBQUNwQyxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sUUFBUSxNQUFNLDhCQUE4QixDQUFBO0FBQ25ELE9BQU8sTUFBTSxNQUFNLDRCQUE0QixDQUFBO0FBRS9DLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFBO0FBQzdDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFBO0FBQzNDLE9BQU8sZ0JBQWdCLE1BQU0sc0JBQXNCLENBQUE7QUFDbkQsT0FBTyxXQUFXLE1BQU0saUJBQWlCLENBQUE7QUFDekMsT0FBTyxXQUFXLE1BQU0saUJBQWlCLENBQUE7QUFTekMsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFBO0FBRS9CLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBQzlCLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQU9sQyxNQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxDQUFD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QUFTLEVBQUU7Z0JBQ1osTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFBO2FBQ3BEO1lBQ0QsTUFBTSxVQUFVLEdBQUc7Z0JBQ2YsU0FBUztnQkFDVCxHQUFHO2FBQ04sQ0FBQTtZQUVELE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQTtZQUV6RixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBRXJGLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUNaLE9BQU8sRUFBRSxDQUFBO2FBQ1o7WUFFRCxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUNsRixDQUFDO0tBQUE7Q0FDSjtBQUVELGVBQWUsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZXh0RGVjb2RlciwgVGV4dEVuY29kZXJ9IGZyb20gJ3RleHQtZW5jb2RpbmcnO1xuaW1wb3J0IHtBcGksIEpzb25ScGN9IGZyb20gJ2Vvc2pzJztcbmltcG9ydCB7SnNTaWduYXR1cmVQcm92aWRlcn0gZnJvbSAnZW9zanMvZGlzdC9lb3Nqcy1qc3NpZyc7XG5pbXBvcnQge1NpZ25hdHVyZVByb3ZpZGVyLCBUcmFuc2FjdENvbmZpZywgVHJhbnNhY3Rpb24sIFRyYW5zYWN0UmVzdWx0fSBmcm9tICdlb3Nqcy9kaXN0L2Vvc2pzLWFwaS1pbnRlcmZhY2VzJztcbmltcG9ydCB7UHVzaFRyYW5zYWN0aW9uQXJncywgUmVhZE9ubHlUcmFuc2FjdFJlc3VsdH0gZnJvbSAnZW9zanMvZGlzdC9lb3Nqcy1ycGMtaW50ZXJmYWNlcyc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnaXNvbW9ycGhpYy1mZXRjaCdcbmltcG9ydCBvbm8gZnJvbSBcIkBqc2RldnRvb2xzL29ub1wiO1xuaW1wb3J0IGJ0b2EgZnJvbSAnYnRvYSc7XG5pbXBvcnQgYXRvYiBmcm9tICdhdG9iJztcbmltcG9ydCB1bmVzY2FwZSBmcm9tICdjb3JlLWpzLXB1cmUvc3RhYmxlL3VuZXNjYXBlJ1xuaW1wb3J0IGVzY2FwZSBmcm9tICdjb3JlLWpzLXB1cmUvc3RhYmxlL2VzY2FwZSdcblxuaW1wb3J0IEVvc2lvQ29udHJhY3QgZnJvbSAnLi9jb250cmFjdHMvZW9zaW8nXG5pbXBvcnQgQ29yZUNvbnRyYWN0IGZyb20gJy4vY29udHJhY3RzL2NvcmUnXG5pbXBvcnQgUGFydG5lcnNDb250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9wYXJ0bmVycydcbmltcG9ydCBQMlBDb250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9wMnAnXG5pbXBvcnQgTmZ0Q29udHJhY3QgZnJvbSAnLi9jb250cmFjdHMvbmZ0J1xuaW1wb3J0IHtcbiAgICBBdXRoS2V5U2VhcmNoQ2FsbGJhY2ssXG4gICAgQXV0aEtleVR5cGUsXG4gICAgQ2hhaW5Db25maWcsXG4gICAgQ2hhaW5DcnlwdCxcbiAgICBTaWduYXR1cmVQcm92aWRlck1ha2VyLFxuICAgIFRhYmxlQ29kZUNvbmZpZ1xufSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IFJlYWRBcGkgZnJvbSAnLi9yZWFkQXBpJ1xuaW1wb3J0IEJhc2VDb250cmFjdCBmcm9tIFwiLi9jb250cmFjdHMvYmFzZVwiO1xuaW1wb3J0IHtOb3RJbXBsZW1lbnRlZEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQgQmFzZUNyeXB0IGZyb20gXCIuL2Jhc2VDcnlwdFwiO1xuaW1wb3J0IFdhbGxldCBmcm9tIFwiLi93YWxsZXRcIjtcbmltcG9ydCBFeHBsb3JlciBmcm9tIFwiLi9leHBsb3JlclwiO1xuaW1wb3J0IFBlcnNvbmFsRGF0YSBmcm9tIFwiLi9wZXJzb25hbERhdGFcIjtcblxuaW50ZXJmYWNlIFJwY3NCeUVuZHBvaW50cyB7XG4gICAgW2tleTogc3RyaW5nXTogSnNvblJwY1xufVxuXG5jb25zdCBKc1NpZ25hdHVyZVByb3ZpZGVyTWFrZXIgPSAoKHdpZjogc3RyaW5nKSA9PiBQcm9taXNlLnJlc29sdmUobmV3IEpzU2lnbmF0dXJlUHJvdmlkZXIoW3dpZl0pKSlcblxuY2xhc3MgQ2hhaW4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZTogc3RyaW5nXG4gICAgcHVibGljIHJlYWRBcGk6IFJlYWRBcGlcbiAgICBwdWJsaWMgZXhwbG9yZXI6IEV4cGxvcmVyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZ1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcnBjQnlFbmRwb2ludDogUnBjc0J5RW5kcG9pbnRzXG4gICAgcHJpdmF0ZSByZWFkb25seSBhdXRoS2V5VHlwZTogQXV0aEtleVR5cGVcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF1dGhLZXlTZWFyY2hDYWxsYmFjaz86IEF1dGhLZXlTZWFyY2hDYWxsYmFja1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2lnbmF0dXJlUHJvdmlkZXJNYWtlcjogU2lnbmF0dXJlUHJvdmlkZXJNYWtlclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhaW5DcnlwdDogQ2hhaW5DcnlwdFxuICAgIHByaXZhdGUgdGV4dERlY29kZXI/OiB0eXBlb2YgVGV4dERlY29kZXJcbiAgICBwcml2YXRlIHRleHRFbmNvZGVyPzogdHlwZW9mIFRleHRFbmNvZGVyXG4gICAgcHJpdmF0ZSBwZXJzb25hbERhdGE6IFBlcnNvbmFsRGF0YVxuXG4gICAgcHVibGljIGVvc2lvQ29udHJhY3Q6IEVvc2lvQ29udHJhY3RcbiAgICBwdWJsaWMgY29yZUNvbnRyYWN0OiBDb3JlQ29udHJhY3RcbiAgICBwdWJsaWMgcGFydG5lcnNDb250cmFjdDogUGFydG5lcnNDb250cmFjdFxuICAgIHB1YmxpYyBwMnBDb250cmFjdDogUDJQQ29udHJhY3RcbiAgICBwdWJsaWMgbmZ0Q29udHJhY3Q6IE5mdENvbnRyYWN0XG5cbiAgICBwdWJsaWMgd2FsbGV0czogV2FsbGV0W11cbiAgICBwdWJsaWMgcmVhZG9ubHkgY29yZVN5bWJvbD86IHN0cmluZ1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNoYWluQ29uZmlnOiBDaGFpbkNvbmZpZyxcbiAgICAgICAgdGFibGVDb2RlQ29uZmlnOiBUYWJsZUNvZGVDb25maWcsXG4gICAgICAgIHBlcnNvbmFsRGF0YTogUGVyc29uYWxEYXRhLFxuICAgICAgICBhdXRoS2V5U2VhcmNoQ2FsbGJhY2s/OiBBdXRoS2V5U2VhcmNoQ2FsbGJhY2ssXG4gICAgICAgIHNpZ25hdHVyZVByb3ZpZGVyTWFrZXI/OiBTaWduYXR1cmVQcm92aWRlck1ha2VyLFxuICAgICAgICBjaGFpbkNyeXB0PzogQ2hhaW5DcnlwdCxcbiAgICAgICAgdGV4dERlY29kZXI/OiB0eXBlb2YgVGV4dERlY29kZXIsXG4gICAgICAgIHRleHRFbmNvZGVyPzogdHlwZW9mIFRleHRFbmNvZGVyLFxuICAgICkge1xuICAgICAgICB0aGlzLm5hbWUgPSBjaGFpbkNvbmZpZy5uYW1lXG4gICAgICAgIHRoaXMudGFibGVDb2RlQ29uZmlnID0gey4uLnRhYmxlQ29kZUNvbmZpZywgLi4uKGNoYWluQ29uZmlnLnRhYmxlQ29kZUNvbmZpZ092ZXJyaWRlIHx8IHt9KX1cbiAgICAgICAgdGhpcy5yZWFkQXBpID0gbmV3IFJlYWRBcGkodGhpcy5uYW1lLCBjaGFpbkNvbmZpZy5ycGNFbmRwb2ludHMsIGNoYWluQ29uZmlnLmJhbGFuY2luZ01vZGUpXG4gICAgICAgIHRoaXMuZXhwbG9yZXIgPSBuZXcgRXhwbG9yZXIoY2hhaW5Db25maWcuZXhwbG9yZXJBcGlVcmwpXG4gICAgICAgIHRoaXMucnBjQnlFbmRwb2ludCA9IHt9XG4gICAgICAgIHRoaXMuYXV0aEtleVR5cGUgPSBjaGFpbkNvbmZpZy5hdXRoS2V5VHlwZSB8fCAncGxhaW4tYXV0aC1rZXknXG4gICAgICAgIHRoaXMuYXV0aEtleVNlYXJjaENhbGxiYWNrID0gYXV0aEtleVNlYXJjaENhbGxiYWNrXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlUHJvdmlkZXJNYWtlciA9IHNpZ25hdHVyZVByb3ZpZGVyTWFrZXIgfHwgSnNTaWduYXR1cmVQcm92aWRlck1ha2VyXG4gICAgICAgIHRoaXMuY2hhaW5DcnlwdCA9IGNoYWluQ3J5cHQgfHwgbmV3IEJhc2VDcnlwdCgpXG4gICAgICAgIHRoaXMudGV4dERlY29kZXIgPSB0ZXh0RGVjb2RlclxuICAgICAgICB0aGlzLnRleHRFbmNvZGVyID0gdGV4dEVuY29kZXJcbiAgICAgICAgdGhpcy5jb3JlU3ltYm9sID0gY2hhaW5Db25maWcuY29yZVN5bWJvbFxuICAgICAgICB0aGlzLnBlcnNvbmFsRGF0YSA9IHBlcnNvbmFsRGF0YVxuXG4gICAgICAgIHRoaXMuZW9zaW9Db250cmFjdCA9IHRoaXMuYXBwbHlDb250cmFjdChFb3Npb0NvbnRyYWN0KVxuICAgICAgICB0aGlzLmNvcmVDb250cmFjdCA9IHRoaXMuYXBwbHlDb250cmFjdChDb3JlQ29udHJhY3QpXG4gICAgICAgIHRoaXMucGFydG5lcnNDb250cmFjdCA9IHRoaXMuYXBwbHlDb250cmFjdChQYXJ0bmVyc0NvbnRyYWN0KVxuICAgICAgICB0aGlzLnAycENvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KFAyUENvbnRyYWN0KVxuICAgICAgICB0aGlzLm5mdENvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KE5mdENvbnRyYWN0KVxuXG4gICAgICAgIHRoaXMud2FsbGV0cyA9IChjaGFpbkNvbmZpZy53YWxsZXRzIHx8IFtdKS5tYXAod2FsbGV0Q29uZmlnID0+IG5ldyBXYWxsZXQod2FsbGV0Q29uZmlnLCB0aGlzLnJlYWRBcGkpKVxuICAgIH1cblxuICAgIGdldCB3YWxsZXRzU3ltYm9scygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbGV0cy5tYXAod2FsbGV0ID0+IHdhbGxldC5zeW1ib2wpXG4gICAgfVxuXG4gICAgZ2V0V2FsbGV0QnlTeW1ib2woc3ltYm9sOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbGV0cy5maW5kKHdhbGxldCA9PiB3YWxsZXQuc3ltYm9sID09PSBzeW1ib2wpXG4gICAgfVxuXG4gICAgYXBwbHlDb250cmFjdDxUIGV4dGVuZHMgQmFzZUNvbnRyYWN0Pihjb250cmFjdDogeyBuZXcoLi4uYXJnczogYW55W10pOiBUOyB9KTogVCB7XG4gICAgICAgIHJldHVybiBuZXcgY29udHJhY3QodGhpcy5yZWFkQXBpLCB0aGlzLnRhYmxlQ29kZUNvbmZpZylcbiAgICB9XG5cbiAgICBnZXRDYWNoZWRScGMoKSB7XG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5yZWFkQXBpLmdldEVuZHBvaW50KClcbiAgICAgICAgaWYgKCF0aGlzLnJwY0J5RW5kcG9pbnRbZW5kcG9pbnRdKSB7XG4gICAgICAgICAgICB0aGlzLnJwY0J5RW5kcG9pbnRbZW5kcG9pbnRdID0gbmV3IEpzb25ScGMoZW5kcG9pbnQsIHtmZXRjaH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucnBjQnlFbmRwb2ludFtlbmRwb2ludF1cbiAgICB9XG5cbiAgICBnZXRFb3NJbnN0YW5jZUJ5U2lnbmF0dXJlUHJvdmlkZXIoc2lnbmF0dXJlUHJvdmlkZXI6IFNpZ25hdHVyZVByb3ZpZGVyKSB7XG4gICAgICAgIGNvbnN0IHJwYyA9IHRoaXMuZ2V0Q2FjaGVkUnBjKClcblxuICAgICAgICByZXR1cm4gbmV3IEFwaSh7XG4gICAgICAgICAgICBycGMsXG4gICAgICAgICAgICBzaWduYXR1cmVQcm92aWRlcixcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRleHREZWNvZGVyOiBuZXcgKHRoaXMudGV4dERlY29kZXIgfHwgVGV4dERlY29kZXIpKCksXG4gICAgICAgICAgICB0ZXh0RW5jb2RlcjogbmV3ICh0aGlzLnRleHRFbmNvZGVyIHx8IFRleHRFbmNvZGVyKSgpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDEuMC4yXG4gICAgICovXG4gICAgZ2V0RW9zUGFzc0luc3RhbmNlKHdpZjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZVByb3ZpZGVyID0gbmV3IEpzU2lnbmF0dXJlUHJvdmlkZXIoW3dpZl0pO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFb3NJbnN0YW5jZUJ5U2lnbmF0dXJlUHJvdmlkZXIoc2lnbmF0dXJlUHJvdmlkZXIpO1xuICAgIH1cblxuICAgIGFzeW5jIG1ha2VFb3NJbnN0YW5jZShhdXRoS2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUHJvdmlkZXIgPSBhd2FpdCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyTWFrZXIoYXV0aEtleSlcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RW9zSW5zdGFuY2VCeVNpZ25hdHVyZVByb3ZpZGVyKHNpZ25hdHVyZVByb3ZpZGVyKTtcbiAgICB9XG5cbiAgICBnZXRBdXRoS2V5KGF1dGhLZXlRdWVyeTogc3RyaW5nLCBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsQXV0aEtleVR5cGUgPSBhdXRoS2V5VHlwZSB8fCB0aGlzLmF1dGhLZXlUeXBlXG5cbiAgICAgICAgaWYgKGxvY2FsQXV0aEtleVR5cGUgPT09ICdwbGFpbi1hdXRoLWtleScpIHtcbiAgICAgICAgICAgIHJldHVybiBhdXRoS2V5UXVlcnlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2NhbEF1dGhLZXlUeXBlID09PSAnYXV0aC1rZXktc2VhcmNoLWNhbGxiYWNrJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dGhLZXlTZWFyY2hDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ0ZvciBhdXRoS2V5VHlwZT13aWYtc2VhcmNoLWNhbGxiYWNrIHdpZlNlYXJjaENhbGxiYWNrIG5lZWQgdG8gZGVmaW5lJykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRoS2V5U2VhcmNoQ2FsbGJhY2soYXV0aEtleVF1ZXJ5KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgb25vKG5ldyBOb3RJbXBsZW1lbnRlZEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgYXV0aEtleVR5cGUnKSlcbiAgICB9XG5cbiAgICBhc3luYyB0cmFuc2FjdEJ5QXV0aEtleShcbiAgICAgICAgYXV0aEtleTogc3RyaW5nLFxuICAgICAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgICAgIGNvbmZpZz86IFRyYW5zYWN0Q29uZmlnXG4gICAgKTogUHJvbWlzZTxUcmFuc2FjdFJlc3VsdCB8IFJlYWRPbmx5VHJhbnNhY3RSZXN1bHQgfCBQdXNoVHJhbnNhY3Rpb25BcmdzPiB7XG4gICAgICAgIGNvbnN0IGVvcyA9IGF3YWl0IHRoaXMubWFrZUVvc0luc3RhbmNlKGF1dGhLZXkpXG4gICAgICAgIHJldHVybiBlb3MudHJhbnNhY3QodHJhbnNhY3Rpb24sIGNvbmZpZylcbiAgICB9XG5cbiAgICBhc3luYyB0cmFuc2FjdChcbiAgICAgICAgYXV0aEtleVF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgICAgY29uZmlnPzogVHJhbnNhY3RDb25maWcsXG4gICAgICAgIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUsXG4gICAgKTogUHJvbWlzZTxUcmFuc2FjdFJlc3VsdCB8IFJlYWRPbmx5VHJhbnNhY3RSZXN1bHQgfCBQdXNoVHJhbnNhY3Rpb25BcmdzPiB7XG4gICAgICAgIGNvbnN0IGF1dGhLZXkgPSBhd2FpdCB0aGlzLmdldEF1dGhLZXkoYXV0aEtleVF1ZXJ5LCBhdXRoS2V5VHlwZSlcblxuICAgICAgICBpZiAoIWF1dGhLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ2F1dGhLZXkgY2Fubm90IGJlIGVtcHR5JykpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdEJ5QXV0aEtleShhdXRoS2V5LCB0cmFuc2FjdGlvbiwgY29uZmlnKVxuICAgIH1cblxuICAgIGFzeW5jIGVuY3J5cHRNZXNzYWdlKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgbWVtbz86IHN0cmluZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByZXBhcmVkTWVzc2FnZSA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KG1lc3NhZ2UpKSlcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5DcnlwdC5lbmNyeXB0KGF1dGhLZXksIHB1YmxpY0tleSwgcHJlcGFyZWRNZXNzYWdlLCBtZW1vKVxuICAgIH1cblxuICAgIGFzeW5jIGRlY3J5cHRNZXNzYWdlKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgbWVtbz86IHN0cmluZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlY3J5cHRlZE1lc3NhZ2UgPSBhd2FpdCB0aGlzLmNoYWluQ3J5cHQuZGVjcnlwdChhdXRoS2V5LCBwdWJsaWNLZXksIG1lc3NhZ2UsIG1lbW8pXG5cbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoYXRvYihkZWNyeXB0ZWRNZXNzYWdlKSkpXG4gICAgfVxuXG4gICAgbWFrZVZhbHVlQXNTdHIodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubWFwKGl0ZW0gPT4gdGhpcy5tYWtlVmFsdWVBc1N0cihpdGVtKSkuam9pbignLCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpLnNvcnQoKVxuICAgICAgICAgICAgcmV0dXJuIGtleXMubWFwKGtleSA9PiBgJHtrZXl9PSR7dGhpcy5tYWtlVmFsdWVBc1N0cih2YWx1ZVtrZXldKX1gKS5qb2luKCcmJylcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHZhbHVlIHR5cGUnKSlcbiAgICB9XG5cbiAgICBvYmpUb1N0YWJsZU1lc3NhZ2UoZGljdDogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlVmFsdWVBc1N0cihkaWN0KVxuICAgIH1cblxuICAgIGJ0b2FFc2NhcGUoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKVxuICAgIH1cblxuICAgIGFzeW5jIHNpZ25NZXNzYWdlKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByZXBhcmVkTWVzc2FnZSA9IHRoaXMuYnRvYUVzY2FwZShtZXNzYWdlKVxuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbkNyeXB0LnNpZ24oYXV0aEtleSwgcHJlcGFyZWRNZXNzYWdlKVxuICAgIH1cblxuICAgIGFzeW5jIHZlcmlmeU1lc3NhZ2UoXG4gICAgICAgIHB1YmxpY0tleTogc3RyaW5nLFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICAgICkge1xuICAgICAgICBjb25zdCBwcmVwYXJlZE1lc3NhZ2UgPSB0aGlzLmJ0b2FFc2NhcGUobWVzc2FnZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5DcnlwdC52ZXJpZnkocHVibGljS2V5LCBzaWduYXR1cmUsIHByZXBhcmVkTWVzc2FnZSlcbiAgICB9XG5cbiAgICBhc3luYyBzaWduT2JqZWN0KFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIGRpY3Q6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgICAgIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm9ialRvU3RhYmxlTWVzc2FnZShkaWN0KVxuICAgICAgICByZXR1cm4gdGhpcy5zaWduTWVzc2FnZShhdXRoS2V5UXVlcnksIHB1YmxpY0tleSwgbWVzc2FnZSwgYXV0aEtleVR5cGUpXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5T2JqZWN0KFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgZGljdDogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICAgICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm9ialRvU3RhYmxlTWVzc2FnZShkaWN0KVxuICAgICAgICByZXR1cm4gdGhpcy52ZXJpZnlNZXNzYWdlKHB1YmxpY0tleSwgbWVzc2FnZSwgc2lnbmF0dXJlKVxuICAgIH1cblxuICAgIGFzeW5jIHNlbmRQZXJzb25hbERhdGEoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBzZW5kZXJBY2NvdW50TmFtZTogc3RyaW5nLFxuICAgICAgICByZWNpcGllbnRBY2NvdW50TmFtZTogc3RyaW5nLFxuICAgICAgICBkYXRhOiBhbnksXG4gICAgICAgIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHNlbmRlclB1YiA9IGF3YWl0IHRoaXMucmVhZEFwaS5nZXRQZXJtaXNzaW9uS2V5QnlOYW1lKHNlbmRlckFjY291bnROYW1lLCBcImFjdGl2ZVwiKVxuICAgICAgICBjb25zdCByZWNpcGllbnRQdWIgPSBhd2FpdCB0aGlzLnJlYWRBcGkuZ2V0UGVybWlzc2lvbktleUJ5TmFtZShyZWNpcGllbnRBY2NvdW50TmFtZSwgXCJhY3RpdmVcIilcbiAgICAgICAgaWYgKCFzZW5kZXJQdWIgfHwgIXJlY2lwaWVudFB1Yikge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignc2VuZGVyUHViIG9yIHJlY2lwaWVudFB1YiBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBqc29uTWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZFRvU2VuZGVyID0gYXdhaXQgdGhpcy5lbmNyeXB0TWVzc2FnZShhdXRoS2V5UXVlcnksIHNlbmRlclB1YiwganNvbk1lc3NhZ2UsIHVuZGVmaW5lZCwgYXV0aEtleVR5cGUpXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZFRvUmVjaXBpZW50ID0gYXdhaXQgdGhpcy5lbmNyeXB0TWVzc2FnZShhdXRoS2V5UXVlcnksIHJlY2lwaWVudFB1YiwganNvbk1lc3NhZ2UsIHVuZGVmaW5lZCwgYXV0aEtleVR5cGUpXG4gICAgICAgIGNvbnN0IGRhdGFCdW5kbGUgPSB7XG4gICAgICAgICAgICBzZW5kZXJQdWIsXG4gICAgICAgICAgICByZWNpcGllbnRQdWIsXG4gICAgICAgICAgICBzZW5kZXJEYXRhOiBlbmNyeXB0ZWRUb1NlbmRlcixcbiAgICAgICAgICAgIHJlY2lwaWVudERhdGE6IGVuY3J5cHRlZFRvUmVjaXBpZW50LFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgdGhpcy5zaWduT2JqZWN0KGF1dGhLZXlRdWVyeSwgc2VuZGVyUHViLCBkYXRhQnVuZGxlLCBhdXRoS2V5VHlwZSlcblxuICAgICAgICByZXR1cm4gdGhpcy5wZXJzb25hbERhdGEuc2VuZFBlcnNvbmFsRGF0YShkYXRhQnVuZGxlLCBzaWduYXR1cmUpXG4gICAgfVxuXG4gICAgYXN5bmMgcGFyc2VFbmNyeXB0ZWRQZXJzb25hbERhdGEoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBkYXRhOiB7aWQ6IHN0cmluZywgc2VuZGVyUHViOiBzdHJpbmcsIGRhdGE6IHN0cmluZ31bXSxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiB7aWQ6IHN0cmluZywgZGF0YTogYW55fVtdID0gW11cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlY3J5cHRlZCA9IGF3YWl0IHRoaXMuZGVjcnlwdE1lc3NhZ2UoYXV0aEtleVF1ZXJ5LCBpdGVtLnNlbmRlclB1YiwgaXRlbS5kYXRhLCB1bmRlZmluZWQsIGF1dGhLZXlUeXBlKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04ucGFyc2UoZGVjcnlwdGVkKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIGFzeW5jIGdldFBlcnNvbmFsQXNSZWNpcGllbnQoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICByZWNpcGllbnRBY2NvdW50TmFtZTogc3RyaW5nLFxuICAgICAgICBpZHM6IHN0cmluZ1tdLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICk6IFByb21pc2U8e2lkOiBzdHJpbmcsIGRhdGE6IGFueX1bXT4ge1xuICAgICAgICBjb25zdCByZWNpcGllbnRQdWIgPSBhd2FpdCB0aGlzLnJlYWRBcGkuZ2V0UGVybWlzc2lvbktleUJ5TmFtZShyZWNpcGllbnRBY2NvdW50TmFtZSwgXCJhY3RpdmVcIilcbiAgICAgICAgaWYgKCFyZWNpcGllbnRQdWIpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ3JlY2lwaWVudFB1YiBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhQnVuZGxlID0ge1xuICAgICAgICAgICAgcmVjaXBpZW50UHViLFxuICAgICAgICAgICAgaWRzLFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgdGhpcy5zaWduT2JqZWN0KGF1dGhLZXlRdWVyeSwgcmVjaXBpZW50UHViLCBkYXRhQnVuZGxlLCBhdXRoS2V5VHlwZSlcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnBlcnNvbmFsRGF0YS5nZXRQZXJzb25hbERhdGFBc1JlY2lwaWVudChkYXRhQnVuZGxlLCBzaWduYXR1cmUpXG5cbiAgICAgICAgaWYgKCFyZXN1bHQub2spIHtcbiAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VFbmNyeXB0ZWRQZXJzb25hbERhdGEoYXV0aEtleVF1ZXJ5LCByZXN1bHQuZGF0YSwgYXV0aEtleVR5cGUpXG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UGVyc29uYWxBc1NlbmRlcihcbiAgICAgICAgYXV0aEtleVF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIHNlbmRlckFjY291bnROYW1lOiBzdHJpbmcsXG4gICAgICAgIGlkczogc3RyaW5nW10sXG4gICAgICAgIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUsXG4gICAgKTogUHJvbWlzZTx7aWQ6IHN0cmluZywgZGF0YTogYW55fVtdPiB7XG4gICAgICAgIGNvbnN0IHNlbmRlclB1YiA9IGF3YWl0IHRoaXMucmVhZEFwaS5nZXRQZXJtaXNzaW9uS2V5QnlOYW1lKHNlbmRlckFjY291bnROYW1lLCBcImFjdGl2ZVwiKVxuICAgICAgICBpZiAoIXNlbmRlclB1Yikge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignc2VuZGVyUHViIGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGFCdW5kbGUgPSB7XG4gICAgICAgICAgICBzZW5kZXJQdWIsXG4gICAgICAgICAgICBpZHMsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCB0aGlzLnNpZ25PYmplY3QoYXV0aEtleVF1ZXJ5LCBzZW5kZXJQdWIsIGRhdGFCdW5kbGUsIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucGVyc29uYWxEYXRhLmdldFBlcnNvbmFsRGF0YUFzU2VuZGVyKGRhdGFCdW5kbGUsIHNpZ25hdHVyZSlcblxuICAgICAgICBpZiAoIXJlc3VsdC5vaykge1xuICAgICAgICAgICAgcmV0dXJuIFtdXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUVuY3J5cHRlZFBlcnNvbmFsRGF0YShhdXRoS2V5UXVlcnksIHJlc3VsdC5kYXRhLCBhdXRoS2V5VHlwZSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYWluXG4iXX0=