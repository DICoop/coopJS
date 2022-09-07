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
    constructor(chainConfig, tableCodeConfig, authKeySearchCallback, signatureProviderMaker, chainCrypt, textDecoder, textEncoder) {
        this.name = chainConfig.name;
        this.tableCodeConfig = { ...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {}) };
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
                throw ono(new Error('For authKeyType=wif-search-callback wifSearchCallback need to define'));
            }
            return this.authKeySearchCallback(authKeyQuery);
        }
        throw ono(new NotImplementedError('Not implemented authKeyType'));
    }
    async transactByAuthKey(authKey, transaction, config) {
        const eos = await this.makeEosInstance(authKey);
        return eos.transact(transaction, config);
    }
    async transact(authKeyQuery, transaction, config, authKeyType) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType);
        if (!authKey) {
            throw ono(new Error('authKey cannot be empty'));
        }
        return this.transactByAuthKey(authKey, transaction, config);
    }
    async encryptMessage(authKeyQuery, publicKey, message, memo, authKeyType) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType);
        if (!authKey) {
            throw ono(new Error('authKey cannot be empty'));
        }
        const permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "active");
        if (!permissionKey) {
            throw ono(new Error('permissionKey cannot be empty'));
        }
        const preparedMessage = btoa(unescape(encodeURIComponent(message)));
        return this.chainCrypt.encrypt(authKey, permissionKey, preparedMessage, memo);
    }
    async decryptMessage(authKeyQuery, publicKey, message, memo, authKeyType) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType);
        if (!authKey) {
            throw ono(new Error('authKey cannot be empty'));
        }
        let permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "gateway");
        if (!permissionKey) {
            permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "active");
        }
        if (!permissionKey) {
            throw ono(new Error('permissionKey cannot be empty'));
        }
        const decryptedMessage = await this.chainCrypt.decrypt(authKey, permissionKey, message, memo);
        return decodeURIComponent(escape(atob(decryptedMessage)));
    }
    objToStableMessage(dict) {
        const keys = Object.keys(dict).sort();
        return keys.map(key => `${key}=${dict[key]}`).join('&');
    }
    btoaEscape(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }
    async signMessage(authKeyQuery, publicKey, message, authKeyType) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType);
        if (!authKey) {
            throw ono(new Error('authKey cannot be empty'));
        }
        const preparedMessage = this.btoaEscape(message);
        return this.chainCrypt.sign(authKey, preparedMessage);
    }
    async verifyMessage(publicKey, message, signature) {
        const preparedMessage = this.btoaEscape(message);
        return this.chainCrypt.verify(publicKey, preparedMessage, signature);
    }
    async signObject(authKeyQuery, publicKey, dict, authKeyType) {
        const message = this.objToStableMessage(dict);
        return this.signMessage(authKeyQuery, publicKey, message, authKeyType);
    }
    async verifyObject(publicKey, dict, signature) {
        const message = this.objToStableMessage(dict);
        return this.verifyMessage(publicKey, message, signature);
    }
}
export default Chain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9jaGFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUNuQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUczRCxPQUFPLEtBQUssTUFBTSxrQkFBa0IsQ0FBQTtBQUNwQyxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3hCLE9BQU8sUUFBUSxNQUFNLDhCQUE4QixDQUFBO0FBQ25ELE9BQU8sTUFBTSxNQUFNLDRCQUE0QixDQUFBO0FBRS9DLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFBO0FBQzdDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFBO0FBQzNDLE9BQU8sZ0JBQWdCLE1BQU0sc0JBQXNCLENBQUE7QUFDbkQsT0FBTyxXQUFXLE1BQU0saUJBQWlCLENBQUE7QUFDekMsT0FBTyxXQUFXLE1BQU0saUJBQWlCLENBQUE7QUFTekMsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFBO0FBRS9CLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBQzlCLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQU1sQyxNQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxD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LE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDaEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUNaLFlBQW9CLEVBQ3BCLFNBQWlCLEVBQ2pCLElBQTRCLEVBQzVCLFdBQXlCO1FBRXpCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQ2QsU0FBaUIsRUFDakIsSUFBNEIsRUFDNUIsU0FBaUI7UUFFakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzVELENBQUM7Q0FDSjtBQUVELGVBQWUsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZXh0RGVjb2RlciwgVGV4dEVuY29kZXJ9IGZyb20gJ3RleHQtZW5jb2RpbmcnO1xuaW1wb3J0IHtBcGksIEpzb25ScGN9IGZyb20gJ2Vvc2pzJztcbmltcG9ydCB7SnNTaWduYXR1cmVQcm92aWRlcn0gZnJvbSAnZW9zanMvZGlzdC9lb3Nqcy1qc3NpZyc7XG5pbXBvcnQge1NpZ25hdHVyZVByb3ZpZGVyLCBUcmFuc2FjdENvbmZpZywgVHJhbnNhY3Rpb24sIFRyYW5zYWN0UmVzdWx0fSBmcm9tICdlb3Nqcy9kaXN0L2Vvc2pzLWFwaS1pbnRlcmZhY2VzJztcbmltcG9ydCB7UHVzaFRyYW5zYWN0aW9uQXJncywgUmVhZE9ubHlUcmFuc2FjdFJlc3VsdH0gZnJvbSAnZW9zanMvZGlzdC9lb3Nqcy1ycGMtaW50ZXJmYWNlcyc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnaXNvbW9ycGhpYy1mZXRjaCdcbmltcG9ydCBvbm8gZnJvbSBcIkBqc2RldnRvb2xzL29ub1wiO1xuaW1wb3J0IGJ0b2EgZnJvbSAnYnRvYSc7XG5pbXBvcnQgYXRvYiBmcm9tICdhdG9iJztcbmltcG9ydCB1bmVzY2FwZSBmcm9tICdjb3JlLWpzLXB1cmUvc3RhYmxlL3VuZXNjYXBlJ1xuaW1wb3J0IGVzY2FwZSBmcm9tICdjb3JlLWpzLXB1cmUvc3RhYmxlL2VzY2FwZSdcblxuaW1wb3J0IEVvc2lvQ29udHJhY3QgZnJvbSAnLi9jb250cmFjdHMvZW9zaW8nXG5pbXBvcnQgQ29yZUNvbnRyYWN0IGZyb20gJy4vY29udHJhY3RzL2NvcmUnXG5pbXBvcnQgUGFydG5lcnNDb250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9wYXJ0bmVycydcbmltcG9ydCBQMlBDb250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9wMnAnXG5pbXBvcnQgTmZ0Q29udHJhY3QgZnJvbSAnLi9jb250cmFjdHMvbmZ0J1xuaW1wb3J0IHtcbiAgICBBdXRoS2V5U2VhcmNoQ2FsbGJhY2ssXG4gICAgQXV0aEtleVR5cGUsXG4gICAgQ2hhaW5Db25maWcsXG4gICAgQ2hhaW5DcnlwdCxcbiAgICBTaWduYXR1cmVQcm92aWRlck1ha2VyLFxuICAgIFRhYmxlQ29kZUNvbmZpZ1xufSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IFJlYWRBcGkgZnJvbSAnLi9yZWFkQXBpJ1xuaW1wb3J0IEJhc2VDb250cmFjdCBmcm9tIFwiLi9jb250cmFjdHMvYmFzZVwiO1xuaW1wb3J0IHtOb3RJbXBsZW1lbnRlZEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQgQmFzZUNyeXB0IGZyb20gXCIuL2Jhc2VDcnlwdFwiO1xuaW1wb3J0IFdhbGxldCBmcm9tIFwiLi93YWxsZXRcIjtcbmltcG9ydCBFeHBsb3JlciBmcm9tIFwiLi9leHBsb3JlclwiO1xuXG5pbnRlcmZhY2UgUnBjc0J5RW5kcG9pbnRzIHtcbiAgICBba2V5OiBzdHJpbmddOiBKc29uUnBjXG59XG5cbmNvbnN0IEpzU2lnbmF0dXJlUHJvdmlkZXJNYWtlciA9ICgod2lmOiBzdHJpbmcpID0+IFByb21pc2UucmVzb2x2ZShuZXcgSnNTaWduYXR1cmVQcm92aWRlcihbd2lmXSkpKVxuXG5jbGFzcyBDaGFpbiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBuYW1lOiBzdHJpbmdcbiAgICBwdWJsaWMgcmVhZEFwaTogUmVhZEFwaVxuICAgIHB1YmxpYyBleHBsb3JlcjogRXhwbG9yZXJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRhYmxlQ29kZUNvbmZpZzogVGFibGVDb2RlQ29uZmlnXG4gICAgcHJpdmF0ZSByZWFkb25seSBycGNCeUVuZHBvaW50OiBScGNzQnlFbmRwb2ludHNcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF1dGhLZXlUeXBlOiBBdXRoS2V5VHlwZVxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXV0aEtleVNlYXJjaENhbGxiYWNrPzogQXV0aEtleVNlYXJjaENhbGxiYWNrXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaWduYXR1cmVQcm92aWRlck1ha2VyOiBTaWduYXR1cmVQcm92aWRlck1ha2VyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjaGFpbkNyeXB0OiBDaGFpbkNyeXB0XG4gICAgcHJpdmF0ZSB0ZXh0RGVjb2Rlcj86IHR5cGVvZiBUZXh0RGVjb2RlclxuICAgIHByaXZhdGUgdGV4dEVuY29kZXI/OiB0eXBlb2YgVGV4dEVuY29kZXJcblxuICAgIHB1YmxpYyBlb3Npb0NvbnRyYWN0OiBFb3Npb0NvbnRyYWN0XG4gICAgcHVibGljIGNvcmVDb250cmFjdDogQ29yZUNvbnRyYWN0XG4gICAgcHVibGljIHBhcnRuZXJzQ29udHJhY3Q6IFBhcnRuZXJzQ29udHJhY3RcbiAgICBwdWJsaWMgcDJwQ29udHJhY3Q6IFAyUENvbnRyYWN0XG4gICAgcHVibGljIG5mdENvbnRyYWN0OiBOZnRDb250cmFjdFxuXG4gICAgcHVibGljIHdhbGxldHM6IFdhbGxldFtdXG4gICAgcHVibGljIHJlYWRvbmx5IGNvcmVTeW1ib2w/OiBzdHJpbmdcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBjaGFpbkNvbmZpZzogQ2hhaW5Db25maWcsXG4gICAgICAgIHRhYmxlQ29kZUNvbmZpZzogVGFibGVDb2RlQ29uZmlnLFxuICAgICAgICBhdXRoS2V5U2VhcmNoQ2FsbGJhY2s/OiBBdXRoS2V5U2VhcmNoQ2FsbGJhY2ssXG4gICAgICAgIHNpZ25hdHVyZVByb3ZpZGVyTWFrZXI/OiBTaWduYXR1cmVQcm92aWRlck1ha2VyLFxuICAgICAgICBjaGFpbkNyeXB0PzogQ2hhaW5DcnlwdCxcbiAgICAgICAgdGV4dERlY29kZXI/OiB0eXBlb2YgVGV4dERlY29kZXIsXG4gICAgICAgIHRleHRFbmNvZGVyPzogdHlwZW9mIFRleHRFbmNvZGVyLFxuICAgICkge1xuICAgICAgICB0aGlzLm5hbWUgPSBjaGFpbkNvbmZpZy5uYW1lXG4gICAgICAgIHRoaXMudGFibGVDb2RlQ29uZmlnID0gey4uLnRhYmxlQ29kZUNvbmZpZywgLi4uKGNoYWluQ29uZmlnLnRhYmxlQ29kZUNvbmZpZ092ZXJyaWRlIHx8IHt9KX1cbiAgICAgICAgdGhpcy5yZWFkQXBpID0gbmV3IFJlYWRBcGkodGhpcy5uYW1lLCBjaGFpbkNvbmZpZy5ycGNFbmRwb2ludHMsIGNoYWluQ29uZmlnLmJhbGFuY2luZ01vZGUpXG4gICAgICAgIHRoaXMuZXhwbG9yZXIgPSBuZXcgRXhwbG9yZXIoY2hhaW5Db25maWcuZXhwbG9yZXJBcGlVcmwpXG4gICAgICAgIHRoaXMucnBjQnlFbmRwb2ludCA9IHt9XG4gICAgICAgIHRoaXMuYXV0aEtleVR5cGUgPSBjaGFpbkNvbmZpZy5hdXRoS2V5VHlwZSB8fCAncGxhaW4tYXV0aC1rZXknXG4gICAgICAgIHRoaXMuYXV0aEtleVNlYXJjaENhbGxiYWNrID0gYXV0aEtleVNlYXJjaENhbGxiYWNrXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlUHJvdmlkZXJNYWtlciA9IHNpZ25hdHVyZVByb3ZpZGVyTWFrZXIgfHwgSnNTaWduYXR1cmVQcm92aWRlck1ha2VyXG4gICAgICAgIHRoaXMuY2hhaW5DcnlwdCA9IGNoYWluQ3J5cHQgfHwgbmV3IEJhc2VDcnlwdCgpXG4gICAgICAgIHRoaXMudGV4dERlY29kZXIgPSB0ZXh0RGVjb2RlclxuICAgICAgICB0aGlzLnRleHRFbmNvZGVyID0gdGV4dEVuY29kZXJcbiAgICAgICAgdGhpcy5jb3JlU3ltYm9sID0gY2hhaW5Db25maWcuY29yZVN5bWJvbFxuXG4gICAgICAgIHRoaXMuZW9zaW9Db250cmFjdCA9IHRoaXMuYXBwbHlDb250cmFjdChFb3Npb0NvbnRyYWN0KVxuICAgICAgICB0aGlzLmNvcmVDb250cmFjdCA9IHRoaXMuYXBwbHlDb250cmFjdChDb3JlQ29udHJhY3QpXG4gICAgICAgIHRoaXMucGFydG5lcnNDb250cmFjdCA9IHRoaXMuYXBwbHlDb250cmFjdChQYXJ0bmVyc0NvbnRyYWN0KVxuICAgICAgICB0aGlzLnAycENvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KFAyUENvbnRyYWN0KVxuICAgICAgICB0aGlzLm5mdENvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KE5mdENvbnRyYWN0KVxuXG4gICAgICAgIHRoaXMud2FsbGV0cyA9IChjaGFpbkNvbmZpZy53YWxsZXRzIHx8IFtdKS5tYXAod2FsbGV0Q29uZmlnID0+IG5ldyBXYWxsZXQod2FsbGV0Q29uZmlnLCB0aGlzLnJlYWRBcGkpKVxuICAgIH1cblxuICAgIGdldCB3YWxsZXRzU3ltYm9scygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbGV0cy5tYXAod2FsbGV0ID0+IHdhbGxldC5zeW1ib2wpXG4gICAgfVxuXG4gICAgZ2V0V2FsbGV0QnlTeW1ib2woc3ltYm9sOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbGV0cy5maW5kKHdhbGxldCA9PiB3YWxsZXQuc3ltYm9sID09PSBzeW1ib2wpXG4gICAgfVxuXG4gICAgYXBwbHlDb250cmFjdDxUIGV4dGVuZHMgQmFzZUNvbnRyYWN0Pihjb250cmFjdDogeyBuZXcoLi4uYXJnczogYW55W10pOiBUOyB9KTogVCB7XG4gICAgICAgIHJldHVybiBuZXcgY29udHJhY3QodGhpcy5yZWFkQXBpLCB0aGlzLnRhYmxlQ29kZUNvbmZpZylcbiAgICB9XG5cbiAgICBnZXRDYWNoZWRScGMoKSB7XG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5yZWFkQXBpLmdldEVuZHBvaW50KClcbiAgICAgICAgaWYgKCF0aGlzLnJwY0J5RW5kcG9pbnRbZW5kcG9pbnRdKSB7XG4gICAgICAgICAgICB0aGlzLnJwY0J5RW5kcG9pbnRbZW5kcG9pbnRdID0gbmV3IEpzb25ScGMoZW5kcG9pbnQsIHtmZXRjaH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucnBjQnlFbmRwb2ludFtlbmRwb2ludF1cbiAgICB9XG5cbiAgICBnZXRFb3NJbnN0YW5jZUJ5U2lnbmF0dXJlUHJvdmlkZXIoc2lnbmF0dXJlUHJvdmlkZXI6IFNpZ25hdHVyZVByb3ZpZGVyKSB7XG4gICAgICAgIGNvbnN0IHJwYyA9IHRoaXMuZ2V0Q2FjaGVkUnBjKClcblxuICAgICAgICByZXR1cm4gbmV3IEFwaSh7XG4gICAgICAgICAgICBycGMsXG4gICAgICAgICAgICBzaWduYXR1cmVQcm92aWRlcixcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRleHREZWNvZGVyOiBuZXcgKHRoaXMudGV4dERlY29kZXIgfHwgVGV4dERlY29kZXIpKCksXG4gICAgICAgICAgICB0ZXh0RW5jb2RlcjogbmV3ICh0aGlzLnRleHRFbmNvZGVyIHx8IFRleHRFbmNvZGVyKSgpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDEuMC4yXG4gICAgICovXG4gICAgZ2V0RW9zUGFzc0luc3RhbmNlKHdpZjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZVByb3ZpZGVyID0gbmV3IEpzU2lnbmF0dXJlUHJvdmlkZXIoW3dpZl0pO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFb3NJbnN0YW5jZUJ5U2lnbmF0dXJlUHJvdmlkZXIoc2lnbmF0dXJlUHJvdmlkZXIpO1xuICAgIH1cblxuICAgIGFzeW5jIG1ha2VFb3NJbnN0YW5jZShhdXRoS2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUHJvdmlkZXIgPSBhd2FpdCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyTWFrZXIoYXV0aEtleSlcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RW9zSW5zdGFuY2VCeVNpZ25hdHVyZVByb3ZpZGVyKHNpZ25hdHVyZVByb3ZpZGVyKTtcbiAgICB9XG5cbiAgICBnZXRBdXRoS2V5KGF1dGhLZXlRdWVyeTogc3RyaW5nLCBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsQXV0aEtleVR5cGUgPSBhdXRoS2V5VHlwZSB8fCB0aGlzLmF1dGhLZXlUeXBlXG5cbiAgICAgICAgaWYgKGxvY2FsQXV0aEtleVR5cGUgPT09ICdwbGFpbi1hdXRoLWtleScpIHtcbiAgICAgICAgICAgIHJldHVybiBhdXRoS2V5UXVlcnlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2NhbEF1dGhLZXlUeXBlID09PSAnYXV0aC1rZXktc2VhcmNoLWNhbGxiYWNrJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dGhLZXlTZWFyY2hDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ0ZvciBhdXRoS2V5VHlwZT13aWYtc2VhcmNoLWNhbGxiYWNrIHdpZlNlYXJjaENhbGxiYWNrIG5lZWQgdG8gZGVmaW5lJykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRoS2V5U2VhcmNoQ2FsbGJhY2soYXV0aEtleVF1ZXJ5KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgb25vKG5ldyBOb3RJbXBsZW1lbnRlZEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgYXV0aEtleVR5cGUnKSlcbiAgICB9XG5cbiAgICBhc3luYyB0cmFuc2FjdEJ5QXV0aEtleShcbiAgICAgICAgYXV0aEtleTogc3RyaW5nLFxuICAgICAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgICAgIGNvbmZpZz86IFRyYW5zYWN0Q29uZmlnXG4gICAgKTogUHJvbWlzZTxUcmFuc2FjdFJlc3VsdCB8IFJlYWRPbmx5VHJhbnNhY3RSZXN1bHQgfCBQdXNoVHJhbnNhY3Rpb25BcmdzPiB7XG4gICAgICAgIGNvbnN0IGVvcyA9IGF3YWl0IHRoaXMubWFrZUVvc0luc3RhbmNlKGF1dGhLZXkpXG4gICAgICAgIHJldHVybiBlb3MudHJhbnNhY3QodHJhbnNhY3Rpb24sIGNvbmZpZylcbiAgICB9XG5cbiAgICBhc3luYyB0cmFuc2FjdChcbiAgICAgICAgYXV0aEtleVF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgICAgY29uZmlnPzogVHJhbnNhY3RDb25maWcsXG4gICAgICAgIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUsXG4gICAgKTogUHJvbWlzZTxUcmFuc2FjdFJlc3VsdCB8IFJlYWRPbmx5VHJhbnNhY3RSZXN1bHQgfCBQdXNoVHJhbnNhY3Rpb25BcmdzPiB7XG4gICAgICAgIGNvbnN0IGF1dGhLZXkgPSBhd2FpdCB0aGlzLmdldEF1dGhLZXkoYXV0aEtleVF1ZXJ5LCBhdXRoS2V5VHlwZSlcblxuICAgICAgICBpZiAoIWF1dGhLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ2F1dGhLZXkgY2Fubm90IGJlIGVtcHR5JykpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdEJ5QXV0aEtleShhdXRoS2V5LCB0cmFuc2FjdGlvbiwgY29uZmlnKVxuICAgIH1cblxuICAgIGFzeW5jIGVuY3J5cHRNZXNzYWdlKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgbWVtbz86IHN0cmluZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBlcm1pc3Npb25LZXkgPSBhd2FpdCB0aGlzLnJlYWRBcGkuZ2V0UGVybWlzc2lvbktleUJ5TmFtZShwdWJsaWNLZXksIFwiYWN0aXZlXCIpXG5cbiAgICAgICAgaWYgKCFwZXJtaXNzaW9uS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdwZXJtaXNzaW9uS2V5IGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJlcGFyZWRNZXNzYWdlID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQobWVzc2FnZSkpKVxuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbkNyeXB0LmVuY3J5cHQoYXV0aEtleSwgcGVybWlzc2lvbktleSwgcHJlcGFyZWRNZXNzYWdlLCBtZW1vKVxuICAgIH1cblxuICAgIGFzeW5jIGRlY3J5cHRNZXNzYWdlKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgbWVtbz86IHN0cmluZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwZXJtaXNzaW9uS2V5ID0gYXdhaXQgdGhpcy5yZWFkQXBpLmdldFBlcm1pc3Npb25LZXlCeU5hbWUocHVibGljS2V5LCBcImdhdGV3YXlcIilcblxuICAgICAgICBpZiAoIXBlcm1pc3Npb25LZXkpIHtcbiAgICAgICAgICAgIHBlcm1pc3Npb25LZXkgPSBhd2FpdCB0aGlzLnJlYWRBcGkuZ2V0UGVybWlzc2lvbktleUJ5TmFtZShwdWJsaWNLZXksIFwiYWN0aXZlXCIpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXBlcm1pc3Npb25LZXkpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ3Blcm1pc3Npb25LZXkgY2Fubm90IGJlIGVtcHR5JykpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWNyeXB0ZWRNZXNzYWdlID0gYXdhaXQgdGhpcy5jaGFpbkNyeXB0LmRlY3J5cHQoYXV0aEtleSwgcGVybWlzc2lvbktleSwgbWVzc2FnZSwgbWVtbylcblxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShhdG9iKGRlY3J5cHRlZE1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBvYmpUb1N0YWJsZU1lc3NhZ2UoZGljdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGljdCkuc29ydCgpXG4gICAgICAgIHJldHVybiBrZXlzLm1hcChrZXkgPT4gYCR7a2V5fT0ke2RpY3Rba2V5XX1gKS5qb2luKCcmJylcbiAgICB9XG5cbiAgICBidG9hRXNjYXBlKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSlcbiAgICB9XG5cbiAgICBhc3luYyBzaWduTWVzc2FnZShcbiAgICAgICAgYXV0aEtleVF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIHB1YmxpY0tleTogc3RyaW5nLFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGF1dGhLZXkgPSBhd2FpdCB0aGlzLmdldEF1dGhLZXkoYXV0aEtleVF1ZXJ5LCBhdXRoS2V5VHlwZSlcblxuICAgICAgICBpZiAoIWF1dGhLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ2F1dGhLZXkgY2Fubm90IGJlIGVtcHR5JykpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcmVwYXJlZE1lc3NhZ2UgPSB0aGlzLmJ0b2FFc2NhcGUobWVzc2FnZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5DcnlwdC5zaWduKGF1dGhLZXksIHByZXBhcmVkTWVzc2FnZSlcbiAgICB9XG5cbiAgICBhc3luYyB2ZXJpZnlNZXNzYWdlKFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgY29uc3QgcHJlcGFyZWRNZXNzYWdlID0gdGhpcy5idG9hRXNjYXBlKG1lc3NhZ2UpXG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluQ3J5cHQudmVyaWZ5KHB1YmxpY0tleSwgcHJlcGFyZWRNZXNzYWdlLCBzaWduYXR1cmUpXG4gICAgfVxuXG4gICAgYXN5bmMgc2lnbk9iamVjdChcbiAgICAgICAgYXV0aEtleVF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIHB1YmxpY0tleTogc3RyaW5nLFxuICAgICAgICBkaWN0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5vYmpUb1N0YWJsZU1lc3NhZ2UoZGljdClcbiAgICAgICAgcmV0dXJuIHRoaXMuc2lnbk1lc3NhZ2UoYXV0aEtleVF1ZXJ5LCBwdWJsaWNLZXksIG1lc3NhZ2UsIGF1dGhLZXlUeXBlKVxuICAgIH1cblxuICAgIGFzeW5jIHZlcmlmeU9iamVjdChcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIGRpY3Q6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sXG4gICAgICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICAgICkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5vYmpUb1N0YWJsZU1lc3NhZ2UoZGljdClcbiAgICAgICAgcmV0dXJuIHRoaXMudmVyaWZ5TWVzc2FnZShwdWJsaWNLZXksIG1lc3NhZ2UsIHNpZ25hdHVyZSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYWluXG4iXX0=