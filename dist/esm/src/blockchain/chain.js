var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var JsSignatureProviderMaker = (function (wif) { return Promise.resolve(new JsSignatureProvider([wif])); });
var Chain = /** @class */ (function () {
    function Chain(chainConfig, tableCodeConfig, personalData, authKeySearchCallback, signatureProviderMaker, chainCrypt, textDecoder, textEncoder) {
        var _this = this;
        this.name = chainConfig.name;
        this.tableCodeConfig = __assign(__assign({}, tableCodeConfig), (chainConfig.tableCodeConfigOverride || {}));
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
        this.wallets = (chainConfig.wallets || []).map(function (walletConfig) { return new Wallet(walletConfig, _this.readApi); });
    }
    Object.defineProperty(Chain.prototype, "walletsSymbols", {
        get: function () {
            return this.wallets.map(function (wallet) { return wallet.symbol; });
        },
        enumerable: false,
        configurable: true
    });
    Chain.prototype.getWalletBySymbol = function (symbol) {
        return this.wallets.find(function (wallet) { return wallet.symbol === symbol; });
    };
    Chain.prototype.applyContract = function (contract) {
        return new contract(this.readApi, this.tableCodeConfig);
    };
    Chain.prototype.getCachedRpc = function () {
        var endpoint = this.readApi.getEndpoint();
        if (!this.rpcByEndpoint[endpoint]) {
            this.rpcByEndpoint[endpoint] = new JsonRpc(endpoint, { fetch: fetch });
        }
        return this.rpcByEndpoint[endpoint];
    };
    Chain.prototype.getEosInstanceBySignatureProvider = function (signatureProvider) {
        var rpc = this.getCachedRpc();
        return new Api({
            rpc: rpc,
            signatureProvider: signatureProvider,
            // @ts-ignore
            textDecoder: new (this.textDecoder || TextDecoder)(),
            textEncoder: new (this.textEncoder || TextEncoder)(),
        });
    };
    /**
     * @deprecated since version 1.0.2
     */
    Chain.prototype.getEosPassInstance = function (wif) {
        var signatureProvider = new JsSignatureProvider([wif]);
        return this.getEosInstanceBySignatureProvider(signatureProvider);
    };
    Chain.prototype.makeEosInstance = function (authKey) {
        return __awaiter(this, void 0, void 0, function () {
            var signatureProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.signatureProviderMaker(authKey)];
                    case 1:
                        signatureProvider = _a.sent();
                        return [2 /*return*/, this.getEosInstanceBySignatureProvider(signatureProvider)];
                }
            });
        });
    };
    Chain.prototype.getAuthKey = function (authKeyQuery, authKeyType) {
        var localAuthKeyType = authKeyType || this.authKeyType;
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
    };
    Chain.prototype.transactByAuthKey = function (authKey, transaction, config) {
        return __awaiter(this, void 0, void 0, function () {
            var eos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeEosInstance(authKey)];
                    case 1:
                        eos = _a.sent();
                        return [2 /*return*/, eos.transact(transaction, config)];
                }
            });
        });
    };
    Chain.prototype.transact = function (authKeyQuery, transaction, config, authKeyType) {
        return __awaiter(this, void 0, void 0, function () {
            var authKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthKey(authKeyQuery, authKeyType)];
                    case 1:
                        authKey = _a.sent();
                        if (!authKey) {
                            throw ono(new Error('authKey cannot be empty'));
                        }
                        return [2 /*return*/, this.transactByAuthKey(authKey, transaction, config)];
                }
            });
        });
    };
    Chain.prototype.encryptMessage = function (authKeyQuery, publicKey, message, memo, authKeyType) {
        return __awaiter(this, void 0, void 0, function () {
            var authKey, preparedMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthKey(authKeyQuery, authKeyType)];
                    case 1:
                        authKey = _a.sent();
                        if (!authKey) {
                            throw ono(new Error('authKey cannot be empty'));
                        }
                        preparedMessage = btoa(unescape(encodeURIComponent(message)));
                        return [2 /*return*/, this.chainCrypt.encrypt(authKey, publicKey, preparedMessage, memo)];
                }
            });
        });
    };
    Chain.prototype.decryptMessage = function (authKeyQuery, publicKey, message, memo, authKeyType) {
        return __awaiter(this, void 0, void 0, function () {
            var authKey, decryptedMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthKey(authKeyQuery, authKeyType)];
                    case 1:
                        authKey = _a.sent();
                        if (!authKey) {
                            throw ono(new Error('authKey cannot be empty'));
                        }
                        return [4 /*yield*/, this.chainCrypt.decrypt(authKey, publicKey, message, memo)];
                    case 2:
                        decryptedMessage = _a.sent();
                        return [2 /*return*/, decodeURIComponent(escape(atob(decryptedMessage)))];
                }
            });
        });
    };
    Chain.prototype.makeValueAsStr = function (value) {
        var _this = this;
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined) {
            return String(value);
        }
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                return value.map(function (item) { return _this.makeValueAsStr(item); }).join(',');
            }
            var keys = Object.keys(value).sort();
            return keys.map(function (key) { return "".concat(key, "=").concat(_this.makeValueAsStr(value[key])); }).join('&');
        }
        throw ono(new Error('Unsupported value type'));
    };
    Chain.prototype.objToStableMessage = function (dict) {
        return this.makeValueAsStr(dict);
    };
    Chain.prototype.btoaEscape = function (str) {
        return btoa(unescape(encodeURIComponent(str)));
    };
    Chain.prototype.signMessage = function (authKeyQuery, publicKey, message, authKeyType) {
        return __awaiter(this, void 0, void 0, function () {
            var authKey, preparedMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAuthKey(authKeyQuery, authKeyType)];
                    case 1:
                        authKey = _a.sent();
                        if (!authKey) {
                            throw ono(new Error('authKey cannot be empty'));
                        }
                        preparedMessage = this.btoaEscape(message);
                        return [2 /*return*/, this.chainCrypt.sign(authKey, preparedMessage)];
                }
            });
        });
    };
    Chain.prototype.verifyMessage = function (publicKey, message, signature) {
        return __awaiter(this, void 0, void 0, function () {
            var preparedMessage;
            return __generator(this, function (_a) {
                preparedMessage = this.btoaEscape(message);
                return [2 /*return*/, this.chainCrypt.verify(publicKey, preparedMessage, signature)];
            });
        });
    };
    Chain.prototype.signObject = function (authKeyQuery, publicKey, dict, authKeyType) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                message = this.objToStableMessage(dict);
                return [2 /*return*/, this.signMessage(authKeyQuery, publicKey, message, authKeyType)];
            });
        });
    };
    Chain.prototype.verifyObject = function (publicKey, dict, signature) {
        return __awaiter(this, void 0, void 0, function () {
            var message;
            return __generator(this, function (_a) {
                message = this.objToStableMessage(dict);
                return [2 /*return*/, this.verifyMessage(publicKey, message, signature)];
            });
        });
    };
    Chain.prototype.sendPersonalData = function (authKeyQuery, senderAccountName, recipientAccountName, data, authKeyType) {
        return __awaiter(this, void 0, void 0, function () {
            var senderPub, recipientPub, jsonMessage, encryptedToSender, encryptedToRecipient, dataBundle, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readApi.getPermissionKeyByName(senderAccountName, "active")];
                    case 1:
                        senderPub = _a.sent();
                        return [4 /*yield*/, this.readApi.getPermissionKeyByName(recipientAccountName, "active")];
                    case 2:
                        recipientPub = _a.sent();
                        if (!senderPub || !recipientPub) {
                            throw ono(new Error('senderPub or recipientPub cannot be empty'));
                        }
                        jsonMessage = JSON.stringify(data);
                        return [4 /*yield*/, this.encryptMessage(authKeyQuery, senderPub, jsonMessage, undefined, authKeyType)];
                    case 3:
                        encryptedToSender = _a.sent();
                        return [4 /*yield*/, this.encryptMessage(authKeyQuery, recipientPub, jsonMessage, undefined, authKeyType)];
                    case 4:
                        encryptedToRecipient = _a.sent();
                        dataBundle = {
                            senderPub: senderPub,
                            recipientPub: recipientPub,
                            senderData: encryptedToSender,
                            recipientData: encryptedToRecipient,
                        };
                        return [4 /*yield*/, this.signObject(authKeyQuery, senderPub, dataBundle, authKeyType)];
                    case 5:
                        signature = _a.sent();
                        return [2 /*return*/, this.personalData.sendPersonalData(dataBundle, signature)];
                }
            });
        });
    };
    Chain.prototype.getPersonalAsRecipient = function (authKeyQuery, recipientAccountName, ids, authKeyType) {
        return __awaiter(this, void 0, void 0, function () {
            var recipientPub, dataBundle, signature, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readApi.getPermissionKeyByName(recipientAccountName, "active")];
                    case 1:
                        recipientPub = _a.sent();
                        if (!recipientPub) {
                            throw ono(new Error('recipientPub cannot be empty'));
                        }
                        dataBundle = {
                            recipientPub: recipientPub,
                            ids: ids,
                        };
                        return [4 /*yield*/, this.signObject(authKeyQuery, recipientPub, dataBundle, authKeyType)];
                    case 2:
                        signature = _a.sent();
                        return [4 /*yield*/, this.personalData.getPersonalDataAsRecipient(dataBundle, signature)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, JSON.parse(result)];
                }
            });
        });
    };
    Chain.prototype.getPersonalAsSender = function (authKeyQuery, senderAccountName, ids, authKeyType) {
        return __awaiter(this, void 0, void 0, function () {
            var senderPub, dataBundle, signature, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readApi.getPermissionKeyByName(senderAccountName, "active")];
                    case 1:
                        senderPub = _a.sent();
                        if (!senderPub) {
                            throw ono(new Error('senderPub cannot be empty'));
                        }
                        dataBundle = {
                            senderPub: senderPub,
                            ids: ids,
                        };
                        return [4 /*yield*/, this.signObject(authKeyQuery, senderPub, dataBundle, authKeyType)];
                    case 2:
                        signature = _a.sent();
                        return [4 /*yield*/, this.personalData.getPersonalDataAsSender(dataBundle, signature)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, JSON.parse(result)];
                }
            });
        });
    };
    return Chain;
}());
export default Chain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9jaGFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxXQUFXLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQ25DLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRzNELE9BQU8sS0FBSyxNQUFNLGtCQUFrQixDQUFBO0FBQ3BDLE9BQU8sR0FBRyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xDLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUN4QixPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxRQUFRLE1BQU0sOEJBQThCLENBQUE7QUFDbkQsT0FBTyxNQUFNLE1BQU0sNEJBQTRCLENBQUE7QUFFL0MsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUE7QUFDN0MsT0FBTyxZQUFZLE1BQU0sa0JBQWtCLENBQUE7QUFDM0MsT0FBTyxnQkFBZ0IsTUFBTSxzQkFBc0IsQ0FBQTtBQUNuRCxPQUFPLFdBQVcsTUFBTSxpQkFBaUIsQ0FBQTtBQUN6QyxPQUFPLFdBQVcsTUFBTSxpQkFBaUIsQ0FBQTtBQVN6QyxPQUFPLE9BQU8sTUFBTSxXQUFXLENBQUE7QUFFL0IsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFDOUIsT0FBTyxRQUFRLE1BQU0sWUFBWSxDQUFDO0FBT2xDLElBQU0sd0JBQXdCLEdBQUcsQ0FBQyxVQUFDLEdBQVcsSUFBSyxPQUFBLE9BQU8sQ0FB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QUNwRDt3QkFDSyxVQUFVLEdBQUc7NEJBQ2YsU0FBUyxXQUFBOzRCQUNULEdBQUcsS0FBQTt5QkFDTixDQUFBO3dCQUVpQixxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBbkYsU0FBUyxHQUFHLFNBQXVFO3dCQUUxRSxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQS9FLE1BQU0sR0FBRyxTQUFzRTt3QkFFckYsc0JBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBQTs7OztLQUM1QjtJQUNMLFlBQUM7QUFBRCxDQUFDLEFBNVRELElBNFRDO0FBRUQsZUFBZSxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RleHREZWNvZGVyLCBUZXh0RW5jb2Rlcn0gZnJvbSAndGV4dC1lbmNvZGluZyc7XG5pbXBvcnQge0FwaSwgSnNvblJwY30gZnJvbSAnZW9zanMnO1xuaW1wb3J0IHtKc1NpZ25hdHVyZVByb3ZpZGVyfSBmcm9tICdlb3Nqcy9kaXN0L2Vvc2pzLWpzc2lnJztcbmltcG9ydCB7U2lnbmF0dXJlUHJvdmlkZXIsIFRyYW5zYWN0Q29uZmlnLCBUcmFuc2FjdGlvbiwgVHJhbnNhY3RSZXN1bHR9IGZyb20gJ2Vvc2pzL2Rpc3QvZW9zanMtYXBpLWludGVyZmFjZXMnO1xuaW1wb3J0IHtQdXNoVHJhbnNhY3Rpb25BcmdzLCBSZWFkT25seVRyYW5zYWN0UmVzdWx0fSBmcm9tICdlb3Nqcy9kaXN0L2Vvc2pzLXJwYy1pbnRlcmZhY2VzJztcbmltcG9ydCBmZXRjaCBmcm9tICdpc29tb3JwaGljLWZldGNoJ1xuaW1wb3J0IG9ubyBmcm9tIFwiQGpzZGV2dG9vbHMvb25vXCI7XG5pbXBvcnQgYnRvYSBmcm9tICdidG9hJztcbmltcG9ydCBhdG9iIGZyb20gJ2F0b2InO1xuaW1wb3J0IHVuZXNjYXBlIGZyb20gJ2NvcmUtanMtcHVyZS9zdGFibGUvdW5lc2NhcGUnXG5pbXBvcnQgZXNjYXBlIGZyb20gJ2NvcmUtanMtcHVyZS9zdGFibGUvZXNjYXBlJ1xuXG5pbXBvcnQgRW9zaW9Db250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9lb3NpbydcbmltcG9ydCBDb3JlQ29udHJhY3QgZnJvbSAnLi9jb250cmFjdHMvY29yZSdcbmltcG9ydCBQYXJ0bmVyc0NvbnRyYWN0IGZyb20gJy4vY29udHJhY3RzL3BhcnRuZXJzJ1xuaW1wb3J0IFAyUENvbnRyYWN0IGZyb20gJy4vY29udHJhY3RzL3AycCdcbmltcG9ydCBOZnRDb250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9uZnQnXG5pbXBvcnQge1xuICAgIEF1dGhLZXlTZWFyY2hDYWxsYmFjayxcbiAgICBBdXRoS2V5VHlwZSxcbiAgICBDaGFpbkNvbmZpZyxcbiAgICBDaGFpbkNyeXB0LFxuICAgIFNpZ25hdHVyZVByb3ZpZGVyTWFrZXIsXG4gICAgVGFibGVDb2RlQ29uZmlnXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgUmVhZEFwaSBmcm9tICcuL3JlYWRBcGknXG5pbXBvcnQgQmFzZUNvbnRyYWN0IGZyb20gXCIuL2NvbnRyYWN0cy9iYXNlXCI7XG5pbXBvcnQge05vdEltcGxlbWVudGVkRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCBCYXNlQ3J5cHQgZnJvbSBcIi4vYmFzZUNyeXB0XCI7XG5pbXBvcnQgV2FsbGV0IGZyb20gXCIuL3dhbGxldFwiO1xuaW1wb3J0IEV4cGxvcmVyIGZyb20gXCIuL2V4cGxvcmVyXCI7XG5pbXBvcnQgUGVyc29uYWxEYXRhIGZyb20gXCIuL3BlcnNvbmFsRGF0YVwiO1xuXG5pbnRlcmZhY2UgUnBjc0J5RW5kcG9pbnRzIHtcbiAgICBba2V5OiBzdHJpbmddOiBKc29uUnBjXG59XG5cbmNvbnN0IEpzU2lnbmF0dXJlUHJvdmlkZXJNYWtlciA9ICgod2lmOiBzdHJpbmcpID0+IFByb21pc2UucmVzb2x2ZShuZXcgSnNTaWduYXR1cmVQcm92aWRlcihbd2lmXSkpKVxuXG5jbGFzcyBDaGFpbiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBuYW1lOiBzdHJpbmdcbiAgICBwdWJsaWMgcmVhZEFwaTogUmVhZEFwaVxuICAgIHB1YmxpYyBleHBsb3JlcjogRXhwbG9yZXJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRhYmxlQ29kZUNvbmZpZzogVGFibGVDb2RlQ29uZmlnXG4gICAgcHJpdmF0ZSByZWFkb25seSBycGNCeUVuZHBvaW50OiBScGNzQnlFbmRwb2ludHNcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF1dGhLZXlUeXBlOiBBdXRoS2V5VHlwZVxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXV0aEtleVNlYXJjaENhbGxiYWNrPzogQXV0aEtleVNlYXJjaENhbGxiYWNrXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaWduYXR1cmVQcm92aWRlck1ha2VyOiBTaWduYXR1cmVQcm92aWRlck1ha2VyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjaGFpbkNyeXB0OiBDaGFpbkNyeXB0XG4gICAgcHJpdmF0ZSB0ZXh0RGVjb2Rlcj86IHR5cGVvZiBUZXh0RGVjb2RlclxuICAgIHByaXZhdGUgdGV4dEVuY29kZXI/OiB0eXBlb2YgVGV4dEVuY29kZXJcbiAgICBwcml2YXRlIHBlcnNvbmFsRGF0YTogUGVyc29uYWxEYXRhXG5cbiAgICBwdWJsaWMgZW9zaW9Db250cmFjdDogRW9zaW9Db250cmFjdFxuICAgIHB1YmxpYyBjb3JlQ29udHJhY3Q6IENvcmVDb250cmFjdFxuICAgIHB1YmxpYyBwYXJ0bmVyc0NvbnRyYWN0OiBQYXJ0bmVyc0NvbnRyYWN0XG4gICAgcHVibGljIHAycENvbnRyYWN0OiBQMlBDb250cmFjdFxuICAgIHB1YmxpYyBuZnRDb250cmFjdDogTmZ0Q29udHJhY3RcblxuICAgIHB1YmxpYyB3YWxsZXRzOiBXYWxsZXRbXVxuICAgIHB1YmxpYyByZWFkb25seSBjb3JlU3ltYm9sPzogc3RyaW5nXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY2hhaW5Db25maWc6IENoYWluQ29uZmlnLFxuICAgICAgICB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZyxcbiAgICAgICAgcGVyc29uYWxEYXRhOiBQZXJzb25hbERhdGEsXG4gICAgICAgIGF1dGhLZXlTZWFyY2hDYWxsYmFjaz86IEF1dGhLZXlTZWFyY2hDYWxsYmFjayxcbiAgICAgICAgc2lnbmF0dXJlUHJvdmlkZXJNYWtlcj86IFNpZ25hdHVyZVByb3ZpZGVyTWFrZXIsXG4gICAgICAgIGNoYWluQ3J5cHQ/OiBDaGFpbkNyeXB0LFxuICAgICAgICB0ZXh0RGVjb2Rlcj86IHR5cGVvZiBUZXh0RGVjb2RlcixcbiAgICAgICAgdGV4dEVuY29kZXI/OiB0eXBlb2YgVGV4dEVuY29kZXIsXG4gICAgKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IGNoYWluQ29uZmlnLm5hbWVcbiAgICAgICAgdGhpcy50YWJsZUNvZGVDb25maWcgPSB7Li4udGFibGVDb2RlQ29uZmlnLCAuLi4oY2hhaW5Db25maWcudGFibGVDb2RlQ29uZmlnT3ZlcnJpZGUgfHwge30pfVxuICAgICAgICB0aGlzLnJlYWRBcGkgPSBuZXcgUmVhZEFwaSh0aGlzLm5hbWUsIGNoYWluQ29uZmlnLnJwY0VuZHBvaW50cywgY2hhaW5Db25maWcuYmFsYW5jaW5nTW9kZSlcbiAgICAgICAgdGhpcy5leHBsb3JlciA9IG5ldyBFeHBsb3JlcihjaGFpbkNvbmZpZy5leHBsb3JlckFwaVVybClcbiAgICAgICAgdGhpcy5ycGNCeUVuZHBvaW50ID0ge31cbiAgICAgICAgdGhpcy5hdXRoS2V5VHlwZSA9IGNoYWluQ29uZmlnLmF1dGhLZXlUeXBlIHx8ICdwbGFpbi1hdXRoLWtleSdcbiAgICAgICAgdGhpcy5hdXRoS2V5U2VhcmNoQ2FsbGJhY2sgPSBhdXRoS2V5U2VhcmNoQ2FsbGJhY2tcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQcm92aWRlck1ha2VyID0gc2lnbmF0dXJlUHJvdmlkZXJNYWtlciB8fCBKc1NpZ25hdHVyZVByb3ZpZGVyTWFrZXJcbiAgICAgICAgdGhpcy5jaGFpbkNyeXB0ID0gY2hhaW5DcnlwdCB8fCBuZXcgQmFzZUNyeXB0KClcbiAgICAgICAgdGhpcy50ZXh0RGVjb2RlciA9IHRleHREZWNvZGVyXG4gICAgICAgIHRoaXMudGV4dEVuY29kZXIgPSB0ZXh0RW5jb2RlclxuICAgICAgICB0aGlzLmNvcmVTeW1ib2wgPSBjaGFpbkNvbmZpZy5jb3JlU3ltYm9sXG4gICAgICAgIHRoaXMucGVyc29uYWxEYXRhID0gcGVyc29uYWxEYXRhXG5cbiAgICAgICAgdGhpcy5lb3Npb0NvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KEVvc2lvQ29udHJhY3QpXG4gICAgICAgIHRoaXMuY29yZUNvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KENvcmVDb250cmFjdClcbiAgICAgICAgdGhpcy5wYXJ0bmVyc0NvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KFBhcnRuZXJzQ29udHJhY3QpXG4gICAgICAgIHRoaXMucDJwQ29udHJhY3QgPSB0aGlzLmFwcGx5Q29udHJhY3QoUDJQQ29udHJhY3QpXG4gICAgICAgIHRoaXMubmZ0Q29udHJhY3QgPSB0aGlzLmFwcGx5Q29udHJhY3QoTmZ0Q29udHJhY3QpXG5cbiAgICAgICAgdGhpcy53YWxsZXRzID0gKGNoYWluQ29uZmlnLndhbGxldHMgfHwgW10pLm1hcCh3YWxsZXRDb25maWcgPT4gbmV3IFdhbGxldCh3YWxsZXRDb25maWcsIHRoaXMucmVhZEFwaSkpXG4gICAgfVxuXG4gICAgZ2V0IHdhbGxldHNTeW1ib2xzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxsZXRzLm1hcCh3YWxsZXQgPT4gd2FsbGV0LnN5bWJvbClcbiAgICB9XG5cbiAgICBnZXRXYWxsZXRCeVN5bWJvbChzeW1ib2w6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxsZXRzLmZpbmQod2FsbGV0ID0+IHdhbGxldC5zeW1ib2wgPT09IHN5bWJvbClcbiAgICB9XG5cbiAgICBhcHBseUNvbnRyYWN0PFQgZXh0ZW5kcyBCYXNlQ29udHJhY3Q+KGNvbnRyYWN0OiB7IG5ldyguLi5hcmdzOiBhbnlbXSk6IFQ7IH0pOiBUIHtcbiAgICAgICAgcmV0dXJuIG5ldyBjb250cmFjdCh0aGlzLnJlYWRBcGksIHRoaXMudGFibGVDb2RlQ29uZmlnKVxuICAgIH1cblxuICAgIGdldENhY2hlZFJwYygpIHtcbiAgICAgICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLnJlYWRBcGkuZ2V0RW5kcG9pbnQoKVxuICAgICAgICBpZiAoIXRoaXMucnBjQnlFbmRwb2ludFtlbmRwb2ludF0pIHtcbiAgICAgICAgICAgIHRoaXMucnBjQnlFbmRwb2ludFtlbmRwb2ludF0gPSBuZXcgSnNvblJwYyhlbmRwb2ludCwge2ZldGNofSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5ycGNCeUVuZHBvaW50W2VuZHBvaW50XVxuICAgIH1cblxuICAgIGdldEVvc0luc3RhbmNlQnlTaWduYXR1cmVQcm92aWRlcihzaWduYXR1cmVQcm92aWRlcjogU2lnbmF0dXJlUHJvdmlkZXIpIHtcbiAgICAgICAgY29uc3QgcnBjID0gdGhpcy5nZXRDYWNoZWRScGMoKVxuXG4gICAgICAgIHJldHVybiBuZXcgQXBpKHtcbiAgICAgICAgICAgIHJwYyxcbiAgICAgICAgICAgIHNpZ25hdHVyZVByb3ZpZGVyLFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGV4dERlY29kZXI6IG5ldyAodGhpcy50ZXh0RGVjb2RlciB8fCBUZXh0RGVjb2RlcikoKSxcbiAgICAgICAgICAgIHRleHRFbmNvZGVyOiBuZXcgKHRoaXMudGV4dEVuY29kZXIgfHwgVGV4dEVuY29kZXIpKCksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMS4wLjJcbiAgICAgKi9cbiAgICBnZXRFb3NQYXNzSW5zdGFuY2Uod2lmOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUHJvdmlkZXIgPSBuZXcgSnNTaWduYXR1cmVQcm92aWRlcihbd2lmXSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVvc0luc3RhbmNlQnlTaWduYXR1cmVQcm92aWRlcihzaWduYXR1cmVQcm92aWRlcik7XG4gICAgfVxuXG4gICAgYXN5bmMgbWFrZUVvc0luc3RhbmNlKGF1dGhLZXk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzaWduYXR1cmVQcm92aWRlciA9IGF3YWl0IHRoaXMuc2lnbmF0dXJlUHJvdmlkZXJNYWtlcihhdXRoS2V5KVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFb3NJbnN0YW5jZUJ5U2lnbmF0dXJlUHJvdmlkZXIoc2lnbmF0dXJlUHJvdmlkZXIpO1xuICAgIH1cblxuICAgIGdldEF1dGhLZXkoYXV0aEtleVF1ZXJ5OiBzdHJpbmcsIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUpIHtcbiAgICAgICAgY29uc3QgbG9jYWxBdXRoS2V5VHlwZSA9IGF1dGhLZXlUeXBlIHx8IHRoaXMuYXV0aEtleVR5cGVcblxuICAgICAgICBpZiAobG9jYWxBdXRoS2V5VHlwZSA9PT0gJ3BsYWluLWF1dGgta2V5Jykge1xuICAgICAgICAgICAgcmV0dXJuIGF1dGhLZXlRdWVyeVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvY2FsQXV0aEtleVR5cGUgPT09ICdhdXRoLWtleS1zZWFyY2gtY2FsbGJhY2snKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYXV0aEtleVNlYXJjaENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignRm9yIGF1dGhLZXlUeXBlPXdpZi1zZWFyY2gtY2FsbGJhY2sgd2lmU2VhcmNoQ2FsbGJhY2sgbmVlZCB0byBkZWZpbmUnKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dGhLZXlTZWFyY2hDYWxsYmFjayhhdXRoS2V5UXVlcnkpXG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBvbm8obmV3IE5vdEltcGxlbWVudGVkRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCBhdXRoS2V5VHlwZScpKVxuICAgIH1cblxuICAgIGFzeW5jIHRyYW5zYWN0QnlBdXRoS2V5KFxuICAgICAgICBhdXRoS2V5OiBzdHJpbmcsXG4gICAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgICAgY29uZmlnPzogVHJhbnNhY3RDb25maWdcbiAgICApOiBQcm9taXNlPFRyYW5zYWN0UmVzdWx0IHwgUmVhZE9ubHlUcmFuc2FjdFJlc3VsdCB8IFB1c2hUcmFuc2FjdGlvbkFyZ3M+IHtcbiAgICAgICAgY29uc3QgZW9zID0gYXdhaXQgdGhpcy5tYWtlRW9zSW5zdGFuY2UoYXV0aEtleSlcbiAgICAgICAgcmV0dXJuIGVvcy50cmFuc2FjdCh0cmFuc2FjdGlvbiwgY29uZmlnKVxuICAgIH1cblxuICAgIGFzeW5jIHRyYW5zYWN0KFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgICAgICBjb25maWc/OiBUcmFuc2FjdENvbmZpZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApOiBQcm9taXNlPFRyYW5zYWN0UmVzdWx0IHwgUmVhZE9ubHlUcmFuc2FjdFJlc3VsdCB8IFB1c2hUcmFuc2FjdGlvbkFyZ3M+IHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zYWN0QnlBdXRoS2V5KGF1dGhLZXksIHRyYW5zYWN0aW9uLCBjb25maWcpXG4gICAgfVxuXG4gICAgYXN5bmMgZW5jcnlwdE1lc3NhZ2UoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBtZW1vPzogc3RyaW5nLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICkge1xuICAgICAgICBjb25zdCBhdXRoS2V5ID0gYXdhaXQgdGhpcy5nZXRBdXRoS2V5KGF1dGhLZXlRdWVyeSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgaWYgKCFhdXRoS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdhdXRoS2V5IGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJlcGFyZWRNZXNzYWdlID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQobWVzc2FnZSkpKVxuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbkNyeXB0LmVuY3J5cHQoYXV0aEtleSwgcHVibGljS2V5LCBwcmVwYXJlZE1lc3NhZ2UsIG1lbW8pXG4gICAgfVxuXG4gICAgYXN5bmMgZGVjcnlwdE1lc3NhZ2UoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBtZW1vPzogc3RyaW5nLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICkge1xuICAgICAgICBjb25zdCBhdXRoS2V5ID0gYXdhaXQgdGhpcy5nZXRBdXRoS2V5KGF1dGhLZXlRdWVyeSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgaWYgKCFhdXRoS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdhdXRoS2V5IGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVjcnlwdGVkTWVzc2FnZSA9IGF3YWl0IHRoaXMuY2hhaW5DcnlwdC5kZWNyeXB0KGF1dGhLZXksIHB1YmxpY0tleSwgbWVzc2FnZSwgbWVtbylcblxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShhdG9iKGRlY3J5cHRlZE1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBtYWtlVmFsdWVBc1N0cih2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJyB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5tYXAoaXRlbSA9PiB0aGlzLm1ha2VWYWx1ZUFzU3RyKGl0ZW0pKS5qb2luKCcsJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSkuc29ydCgpXG4gICAgICAgICAgICByZXR1cm4ga2V5cy5tYXAoa2V5ID0+IGAke2tleX09JHt0aGlzLm1ha2VWYWx1ZUFzU3RyKHZhbHVlW2tleV0pfWApLmpvaW4oJyYnKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgdmFsdWUgdHlwZScpKVxuICAgIH1cblxuICAgIG9ialRvU3RhYmxlTWVzc2FnZShkaWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1ha2VWYWx1ZUFzU3RyKGRpY3QpXG4gICAgfVxuXG4gICAgYnRvYUVzY2FwZShzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpXG4gICAgfVxuXG4gICAgYXN5bmMgc2lnbk1lc3NhZ2UoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICkge1xuICAgICAgICBjb25zdCBhdXRoS2V5ID0gYXdhaXQgdGhpcy5nZXRBdXRoS2V5KGF1dGhLZXlRdWVyeSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgaWYgKCFhdXRoS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdhdXRoS2V5IGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJlcGFyZWRNZXNzYWdlID0gdGhpcy5idG9hRXNjYXBlKG1lc3NhZ2UpXG4gICAgICAgIHJldHVybiB0aGlzLmNoYWluQ3J5cHQuc2lnbihhdXRoS2V5LCBwcmVwYXJlZE1lc3NhZ2UpXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5TWVzc2FnZShcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHByZXBhcmVkTWVzc2FnZSA9IHRoaXMuYnRvYUVzY2FwZShtZXNzYWdlKVxuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbkNyeXB0LnZlcmlmeShwdWJsaWNLZXksIHByZXBhcmVkTWVzc2FnZSwgc2lnbmF0dXJlKVxuICAgIH1cblxuICAgIGFzeW5jIHNpZ25PYmplY3QoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgZGljdDogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMub2JqVG9TdGFibGVNZXNzYWdlKGRpY3QpXG4gICAgICAgIHJldHVybiB0aGlzLnNpZ25NZXNzYWdlKGF1dGhLZXlRdWVyeSwgcHVibGljS2V5LCBtZXNzYWdlLCBhdXRoS2V5VHlwZSlcbiAgICB9XG5cbiAgICBhc3luYyB2ZXJpZnlPYmplY3QoXG4gICAgICAgIHB1YmxpY0tleTogc3RyaW5nLFxuICAgICAgICBkaWN0OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICAgICAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMub2JqVG9TdGFibGVNZXNzYWdlKGRpY3QpXG4gICAgICAgIHJldHVybiB0aGlzLnZlcmlmeU1lc3NhZ2UocHVibGljS2V5LCBtZXNzYWdlLCBzaWduYXR1cmUpXG4gICAgfVxuXG4gICAgYXN5bmMgc2VuZFBlcnNvbmFsRGF0YShcbiAgICAgICAgYXV0aEtleVF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIHNlbmRlckFjY291bnROYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlY2lwaWVudEFjY291bnROYW1lOiBzdHJpbmcsXG4gICAgICAgIGRhdGE6IGFueSxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3Qgc2VuZGVyUHViID0gYXdhaXQgdGhpcy5yZWFkQXBpLmdldFBlcm1pc3Npb25LZXlCeU5hbWUoc2VuZGVyQWNjb3VudE5hbWUsIFwiYWN0aXZlXCIpXG4gICAgICAgIGNvbnN0IHJlY2lwaWVudFB1YiA9IGF3YWl0IHRoaXMucmVhZEFwaS5nZXRQZXJtaXNzaW9uS2V5QnlOYW1lKHJlY2lwaWVudEFjY291bnROYW1lLCBcImFjdGl2ZVwiKVxuICAgICAgICBpZiAoIXNlbmRlclB1YiB8fCAhcmVjaXBpZW50UHViKSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdzZW5kZXJQdWIgb3IgcmVjaXBpZW50UHViIGNhbm5vdCBiZSBlbXB0eScpKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGpzb25NZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkVG9TZW5kZXIgPSBhd2FpdCB0aGlzLmVuY3J5cHRNZXNzYWdlKGF1dGhLZXlRdWVyeSwgc2VuZGVyUHViLCBqc29uTWVzc2FnZSwgdW5kZWZpbmVkLCBhdXRoS2V5VHlwZSlcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkVG9SZWNpcGllbnQgPSBhd2FpdCB0aGlzLmVuY3J5cHRNZXNzYWdlKGF1dGhLZXlRdWVyeSwgcmVjaXBpZW50UHViLCBqc29uTWVzc2FnZSwgdW5kZWZpbmVkLCBhdXRoS2V5VHlwZSlcbiAgICAgICAgY29uc3QgZGF0YUJ1bmRsZSA9IHtcbiAgICAgICAgICAgIHNlbmRlclB1YixcbiAgICAgICAgICAgIHJlY2lwaWVudFB1YixcbiAgICAgICAgICAgIHNlbmRlckRhdGE6IGVuY3J5cHRlZFRvU2VuZGVyLFxuICAgICAgICAgICAgcmVjaXBpZW50RGF0YTogZW5jcnlwdGVkVG9SZWNpcGllbnQsXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCB0aGlzLnNpZ25PYmplY3QoYXV0aEtleVF1ZXJ5LCBzZW5kZXJQdWIsIGRhdGFCdW5kbGUsIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBlcnNvbmFsRGF0YS5zZW5kUGVyc29uYWxEYXRhKGRhdGFCdW5kbGUsIHNpZ25hdHVyZSlcbiAgICB9XG5cbiAgICBhc3luYyBnZXRQZXJzb25hbEFzUmVjaXBpZW50KFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcmVjaXBpZW50QWNjb3VudE5hbWU6IHN0cmluZyxcbiAgICAgICAgaWRzOiBzdHJpbmdbXSxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgcmVjaXBpZW50UHViID0gYXdhaXQgdGhpcy5yZWFkQXBpLmdldFBlcm1pc3Npb25LZXlCeU5hbWUocmVjaXBpZW50QWNjb3VudE5hbWUsIFwiYWN0aXZlXCIpXG4gICAgICAgIGlmICghcmVjaXBpZW50UHViKSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdyZWNpcGllbnRQdWIgY2Fubm90IGJlIGVtcHR5JykpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YUJ1bmRsZSA9IHtcbiAgICAgICAgICAgIHJlY2lwaWVudFB1YixcbiAgICAgICAgICAgIGlkcyxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IHRoaXMuc2lnbk9iamVjdChhdXRoS2V5UXVlcnksIHJlY2lwaWVudFB1YiwgZGF0YUJ1bmRsZSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wZXJzb25hbERhdGEuZ2V0UGVyc29uYWxEYXRhQXNSZWNpcGllbnQoZGF0YUJ1bmRsZSwgc2lnbmF0dXJlKVxuXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3VsdClcbiAgICB9XG5cbiAgICBhc3luYyBnZXRQZXJzb25hbEFzU2VuZGVyKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgc2VuZGVyQWNjb3VudE5hbWU6IHN0cmluZyxcbiAgICAgICAgaWRzOiBzdHJpbmdbXSxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3Qgc2VuZGVyUHViID0gYXdhaXQgdGhpcy5yZWFkQXBpLmdldFBlcm1pc3Npb25LZXlCeU5hbWUoc2VuZGVyQWNjb3VudE5hbWUsIFwiYWN0aXZlXCIpXG4gICAgICAgIGlmICghc2VuZGVyUHViKSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdzZW5kZXJQdWIgY2Fubm90IGJlIGVtcHR5JykpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YUJ1bmRsZSA9IHtcbiAgICAgICAgICAgIHNlbmRlclB1YixcbiAgICAgICAgICAgIGlkcyxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IHRoaXMuc2lnbk9iamVjdChhdXRoS2V5UXVlcnksIHNlbmRlclB1YiwgZGF0YUJ1bmRsZSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wZXJzb25hbERhdGEuZ2V0UGVyc29uYWxEYXRhQXNTZW5kZXIoZGF0YUJ1bmRsZSwgc2lnbmF0dXJlKVxuXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3VsdClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYWluXG4iXX0=