"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var text_encoding_1 = require("text-encoding");
var eosjs_1 = require("eosjs");
var eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
var isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
var ono_1 = __importDefault(require("@jsdevtools/ono"));
var btoa_1 = __importDefault(require("btoa"));
var atob_1 = __importDefault(require("atob"));
var unescape_1 = __importDefault(require("core-js-pure/stable/unescape"));
var escape_1 = __importDefault(require("core-js-pure/stable/escape"));
var eosio_1 = __importDefault(require("./contracts/eosio"));
var core_1 = __importDefault(require("./contracts/core"));
var partners_1 = __importDefault(require("./contracts/partners"));
var p2p_1 = __importDefault(require("./contracts/p2p"));
var nft_1 = __importDefault(require("./contracts/nft"));
var readApi_1 = __importDefault(require("./readApi"));
var errors_1 = require("./errors");
var baseCrypt_1 = __importDefault(require("./baseCrypt"));
var wallet_1 = __importDefault(require("./wallet"));
var explorer_1 = __importDefault(require("./explorer"));
var JsSignatureProviderMaker = (function (wif) { return Promise.resolve(new eosjs_jssig_1.JsSignatureProvider([wif])); });
var Chain = /** @class */ (function () {
    function Chain(chainConfig, tableCodeConfig, personalData, authKeySearchCallback, signatureProviderMaker, chainCrypt, textDecoder, textEncoder) {
        var _this = this;
        this.name = chainConfig.name;
        this.tableCodeConfig = __assign(__assign({}, tableCodeConfig), (chainConfig.tableCodeConfigOverride || {}));
        this.readApi = new readApi_1.default(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode);
        this.explorer = new explorer_1.default(chainConfig.explorerApiUrl);
        this.rpcByEndpoint = {};
        this.authKeyType = chainConfig.authKeyType || 'plain-auth-key';
        this.authKeySearchCallback = authKeySearchCallback;
        this.signatureProviderMaker = signatureProviderMaker || JsSignatureProviderMaker;
        this.chainCrypt = chainCrypt || new baseCrypt_1.default();
        this.textDecoder = textDecoder;
        this.textEncoder = textEncoder;
        this.coreSymbol = chainConfig.coreSymbol;
        this.personalData = personalData;
        this.eosioContract = this.applyContract(eosio_1.default);
        this.coreContract = this.applyContract(core_1.default);
        this.partnersContract = this.applyContract(partners_1.default);
        this.p2pContract = this.applyContract(p2p_1.default);
        this.nftContract = this.applyContract(nft_1.default);
        this.wallets = (chainConfig.wallets || []).map(function (walletConfig) { return new wallet_1.default(walletConfig, _this.readApi); });
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
            this.rpcByEndpoint[endpoint] = new eosjs_1.JsonRpc(endpoint, { fetch: isomorphic_fetch_1.default });
        }
        return this.rpcByEndpoint[endpoint];
    };
    Chain.prototype.getEosInstanceBySignatureProvider = function (signatureProvider) {
        var rpc = this.getCachedRpc();
        return new eosjs_1.Api({
            rpc: rpc,
            signatureProvider: signatureProvider,
            // @ts-ignore
            textDecoder: new (this.textDecoder || text_encoding_1.TextDecoder)(),
            textEncoder: new (this.textEncoder || text_encoding_1.TextEncoder)(),
        });
    };
    /**
     * @deprecated since version 1.0.2
     */
    Chain.prototype.getEosPassInstance = function (wif) {
        var signatureProvider = new eosjs_jssig_1.JsSignatureProvider([wif]);
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
                throw (0, ono_1.default)(new Error('For authKeyType=wif-search-callback wifSearchCallback need to define'));
            }
            return this.authKeySearchCallback(authKeyQuery);
        }
        throw (0, ono_1.default)(new errors_1.NotImplementedError('Not implemented authKeyType'));
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
                            throw (0, ono_1.default)(new Error('authKey cannot be empty'));
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
                            throw (0, ono_1.default)(new Error('authKey cannot be empty'));
                        }
                        preparedMessage = (0, btoa_1.default)((0, unescape_1.default)(encodeURIComponent(message)));
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
                            throw (0, ono_1.default)(new Error('authKey cannot be empty'));
                        }
                        return [4 /*yield*/, this.chainCrypt.decrypt(authKey, publicKey, message, memo)];
                    case 2:
                        decryptedMessage = _a.sent();
                        return [2 /*return*/, decodeURIComponent((0, escape_1.default)((0, atob_1.default)(decryptedMessage)))];
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
        throw (0, ono_1.default)(new Error('Unsupported value type'));
    };
    Chain.prototype.objToStableMessage = function (dict) {
        return this.makeValueAsStr(dict);
    };
    Chain.prototype.btoaEscape = function (str) {
        return (0, btoa_1.default)((0, unescape_1.default)(encodeURIComponent(str)));
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
                            throw (0, ono_1.default)(new Error('authKey cannot be empty'));
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
                return [2 /*return*/, this.chainCrypt.verify(publicKey, signature, preparedMessage)];
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
                            throw (0, ono_1.default)(new Error('senderPub or recipientPub cannot be empty'));
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
    Chain.prototype.parseEncryptedPersonalData = function (authKeyQuery, data, authKeyType) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, data_1, item, decrypted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        _i = 0, data_1 = data;
                        _a.label = 1;
                    case 1:
                        if (!(_i < data_1.length)) return [3 /*break*/, 4];
                        item = data_1[_i];
                        return [4 /*yield*/, this.decryptMessage(authKeyQuery, item.senderPub, item.data, undefined, authKeyType)];
                    case 2:
                        decrypted = _a.sent();
                        result.push({
                            id: item.id,
                            data: JSON.parse(decrypted),
                        });
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, result];
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
                            throw (0, ono_1.default)(new Error('recipientPub cannot be empty'));
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
                        if (!result.ok) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, this.parseEncryptedPersonalData(authKeyQuery, result.result, authKeyType)];
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
                            throw (0, ono_1.default)(new Error('senderPub cannot be empty'));
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
                        if (!result.ok) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, this.parseEncryptedPersonalData(authKeyQuery, result.result, authKeyType)];
                }
            });
        });
    };
    return Chain;
}());
exports.default = Chain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9jaGFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQXVEO0FBQ3ZELCtCQUFtQztBQUNuQyxzREFBMkQ7QUFHM0Qsc0VBQW9DO0FBQ3BDLHdEQUFrQztBQUNsQyw4Q0FBd0I7QUFDeEIsOENBQXdCO0FBQ3hCLDBFQUFtRDtBQUNuRCxzRUFBK0M7QUFFL0MsNERBQTZDO0FBQzdDLDBEQUEyQztBQUMzQyxrRUFBbUQ7QUFDbkQsd0RBQXlDO0FBQ3pDLHdEQUF5QztBQVN6QyxzREFBK0I7QUFFL0IsbUNBQTZDO0FBQzdDLDBEQUFvQztBQUNwQyxvREFBOEI7QUFDOUIsd0RBQWtDO0FBT2xDLElBQU0sd0JBQXdCLEdBQUcsQ0FBQyxVQUFDLEdBQVcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxpQ0FBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQyxDQUFBO0FBRW5HO0lBdUJJLGVBQ0ksV0FBd0IsRUFDeEIsZUFBZ0MsRUFDaEMsWUFBMEIsRUFDMUIscUJBQTZDLEVBQzdDLHNCQUErQyxFQUMvQyxVQUF1QixFQUN2QixXQUFnQyxFQUNoQyxXQUFnQztRQVJwQyxpQkErQkM7UUFyQkcsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFBO1FBQzVCLElBQUksQ0FBQyxlQUFlLHlCQUFPLGVBQWUsR0FBSyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsYUFB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YSxFQUNiLFdBQXlCOzs7Ozs0QkFFUCxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxFQUFBOzt3QkFBbEYsU0FBUyxHQUFHLFNBQXNFO3dCQUN4RixJQUFJLENBQUMsU0FBUyxFQUFFOzRCQUNaLE1BQU0sSUFBQSxhQUFHLEVBQUMsSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFBO3lCQUNwRDt3QkFDSyxVQUFVLEdBQUc7NEJBQ2YsU0FBUyxXQUFBOzRCQUNULEdBQUcsS0FBQTt5QkFDTixDQUFBO3dCQUVpQixxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBbkYsU0FBUyxHQUFHLFNBQXVFO3dCQUUxRSxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFBQTs7d0JBQS9FLE1BQU0sR0FBRyxTQUFzRTt3QkFFckYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7NEJBQ1osc0JBQU8sRUFBRSxFQUFBO3lCQUNaO3dCQUVELHNCQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBQTs7OztLQUNuRjtJQUNMLFlBQUM7QUFBRCxDQUFDLEFBcFZELElBb1ZDO0FBRUQsa0JBQWUsS0FBSyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZXh0RGVjb2RlciwgVGV4dEVuY29kZXJ9IGZyb20gJ3RleHQtZW5jb2RpbmcnO1xuaW1wb3J0IHtBcGksIEpzb25ScGN9IGZyb20gJ2Vvc2pzJztcbmltcG9ydCB7SnNTaWduYXR1cmVQcm92aWRlcn0gZnJvbSAnZW9zanMvZGlzdC9lb3Nqcy1qc3NpZyc7XG5pbXBvcnQge1NpZ25hdHVyZVByb3ZpZGVyLCBUcmFuc2FjdENvbmZpZywgVHJhbnNhY3Rpb24sIFRyYW5zYWN0UmVzdWx0fSBmcm9tICdlb3Nqcy9kaXN0L2Vvc2pzLWFwaS1pbnRlcmZhY2VzJztcbmltcG9ydCB7UHVzaFRyYW5zYWN0aW9uQXJncywgUmVhZE9ubHlUcmFuc2FjdFJlc3VsdH0gZnJvbSAnZW9zanMvZGlzdC9lb3Nqcy1ycGMtaW50ZXJmYWNlcyc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnaXNvbW9ycGhpYy1mZXRjaCdcbmltcG9ydCBvbm8gZnJvbSBcIkBqc2RldnRvb2xzL29ub1wiO1xuaW1wb3J0IGJ0b2EgZnJvbSAnYnRvYSc7XG5pbXBvcnQgYXRvYiBmcm9tICdhdG9iJztcbmltcG9ydCB1bmVzY2FwZSBmcm9tICdjb3JlLWpzLXB1cmUvc3RhYmxlL3VuZXNjYXBlJ1xuaW1wb3J0IGVzY2FwZSBmcm9tICdjb3JlLWpzLXB1cmUvc3RhYmxlL2VzY2FwZSdcblxuaW1wb3J0IEVvc2lvQ29udHJhY3QgZnJvbSAnLi9jb250cmFjdHMvZW9zaW8nXG5pbXBvcnQgQ29yZUNvbnRyYWN0IGZyb20gJy4vY29udHJhY3RzL2NvcmUnXG5pbXBvcnQgUGFydG5lcnNDb250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9wYXJ0bmVycydcbmltcG9ydCBQMlBDb250cmFjdCBmcm9tICcuL2NvbnRyYWN0cy9wMnAnXG5pbXBvcnQgTmZ0Q29udHJhY3QgZnJvbSAnLi9jb250cmFjdHMvbmZ0J1xuaW1wb3J0IHtcbiAgICBBdXRoS2V5U2VhcmNoQ2FsbGJhY2ssXG4gICAgQXV0aEtleVR5cGUsXG4gICAgQ2hhaW5Db25maWcsXG4gICAgQ2hhaW5DcnlwdCxcbiAgICBTaWduYXR1cmVQcm92aWRlck1ha2VyLFxuICAgIFRhYmxlQ29kZUNvbmZpZ1xufSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IFJlYWRBcGkgZnJvbSAnLi9yZWFkQXBpJ1xuaW1wb3J0IEJhc2VDb250cmFjdCBmcm9tIFwiLi9jb250cmFjdHMvYmFzZVwiO1xuaW1wb3J0IHtOb3RJbXBsZW1lbnRlZEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQgQmFzZUNyeXB0IGZyb20gXCIuL2Jhc2VDcnlwdFwiO1xuaW1wb3J0IFdhbGxldCBmcm9tIFwiLi93YWxsZXRcIjtcbmltcG9ydCBFeHBsb3JlciBmcm9tIFwiLi9leHBsb3JlclwiO1xuaW1wb3J0IFBlcnNvbmFsRGF0YSBmcm9tIFwiLi9wZXJzb25hbERhdGFcIjtcblxuaW50ZXJmYWNlIFJwY3NCeUVuZHBvaW50cyB7XG4gICAgW2tleTogc3RyaW5nXTogSnNvblJwY1xufVxuXG5jb25zdCBKc1NpZ25hdHVyZVByb3ZpZGVyTWFrZXIgPSAoKHdpZjogc3RyaW5nKSA9PiBQcm9taXNlLnJlc29sdmUobmV3IEpzU2lnbmF0dXJlUHJvdmlkZXIoW3dpZl0pKSlcblxuY2xhc3MgQ2hhaW4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbmFtZTogc3RyaW5nXG4gICAgcHVibGljIHJlYWRBcGk6IFJlYWRBcGlcbiAgICBwdWJsaWMgZXhwbG9yZXI6IEV4cGxvcmVyXG4gICAgcHJpdmF0ZSByZWFkb25seSB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZ1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcnBjQnlFbmRwb2ludDogUnBjc0J5RW5kcG9pbnRzXG4gICAgcHJpdmF0ZSByZWFkb25seSBhdXRoS2V5VHlwZTogQXV0aEtleVR5cGVcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF1dGhLZXlTZWFyY2hDYWxsYmFjaz86IEF1dGhLZXlTZWFyY2hDYWxsYmFja1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2lnbmF0dXJlUHJvdmlkZXJNYWtlcjogU2lnbmF0dXJlUHJvdmlkZXJNYWtlclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhaW5DcnlwdDogQ2hhaW5DcnlwdFxuICAgIHByaXZhdGUgdGV4dERlY29kZXI/OiB0eXBlb2YgVGV4dERlY29kZXJcbiAgICBwcml2YXRlIHRleHRFbmNvZGVyPzogdHlwZW9mIFRleHRFbmNvZGVyXG4gICAgcHJpdmF0ZSBwZXJzb25hbERhdGE6IFBlcnNvbmFsRGF0YVxuXG4gICAgcHVibGljIGVvc2lvQ29udHJhY3Q6IEVvc2lvQ29udHJhY3RcbiAgICBwdWJsaWMgY29yZUNvbnRyYWN0OiBDb3JlQ29udHJhY3RcbiAgICBwdWJsaWMgcGFydG5lcnNDb250cmFjdDogUGFydG5lcnNDb250cmFjdFxuICAgIHB1YmxpYyBwMnBDb250cmFjdDogUDJQQ29udHJhY3RcbiAgICBwdWJsaWMgbmZ0Q29udHJhY3Q6IE5mdENvbnRyYWN0XG5cbiAgICBwdWJsaWMgd2FsbGV0czogV2FsbGV0W11cbiAgICBwdWJsaWMgcmVhZG9ubHkgY29yZVN5bWJvbD86IHN0cmluZ1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNoYWluQ29uZmlnOiBDaGFpbkNvbmZpZyxcbiAgICAgICAgdGFibGVDb2RlQ29uZmlnOiBUYWJsZUNvZGVDb25maWcsXG4gICAgICAgIHBlcnNvbmFsRGF0YTogUGVyc29uYWxEYXRhLFxuICAgICAgICBhdXRoS2V5U2VhcmNoQ2FsbGJhY2s/OiBBdXRoS2V5U2VhcmNoQ2FsbGJhY2ssXG4gICAgICAgIHNpZ25hdHVyZVByb3ZpZGVyTWFrZXI/OiBTaWduYXR1cmVQcm92aWRlck1ha2VyLFxuICAgICAgICBjaGFpbkNyeXB0PzogQ2hhaW5DcnlwdCxcbiAgICAgICAgdGV4dERlY29kZXI/OiB0eXBlb2YgVGV4dERlY29kZXIsXG4gICAgICAgIHRleHRFbmNvZGVyPzogdHlwZW9mIFRleHRFbmNvZGVyLFxuICAgICkge1xuICAgICAgICB0aGlzLm5hbWUgPSBjaGFpbkNvbmZpZy5uYW1lXG4gICAgICAgIHRoaXMudGFibGVDb2RlQ29uZmlnID0gey4uLnRhYmxlQ29kZUNvbmZpZywgLi4uKGNoYWluQ29uZmlnLnRhYmxlQ29kZUNvbmZpZ092ZXJyaWRlIHx8IHt9KX1cbiAgICAgICAgdGhpcy5yZWFkQXBpID0gbmV3IFJlYWRBcGkodGhpcy5uYW1lLCBjaGFpbkNvbmZpZy5ycGNFbmRwb2ludHMsIGNoYWluQ29uZmlnLmJhbGFuY2luZ01vZGUpXG4gICAgICAgIHRoaXMuZXhwbG9yZXIgPSBuZXcgRXhwbG9yZXIoY2hhaW5Db25maWcuZXhwbG9yZXJBcGlVcmwpXG4gICAgICAgIHRoaXMucnBjQnlFbmRwb2ludCA9IHt9XG4gICAgICAgIHRoaXMuYXV0aEtleVR5cGUgPSBjaGFpbkNvbmZpZy5hdXRoS2V5VHlwZSB8fCAncGxhaW4tYXV0aC1rZXknXG4gICAgICAgIHRoaXMuYXV0aEtleVNlYXJjaENhbGxiYWNrID0gYXV0aEtleVNlYXJjaENhbGxiYWNrXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlUHJvdmlkZXJNYWtlciA9IHNpZ25hdHVyZVByb3ZpZGVyTWFrZXIgfHwgSnNTaWduYXR1cmVQcm92aWRlck1ha2VyXG4gICAgICAgIHRoaXMuY2hhaW5DcnlwdCA9IGNoYWluQ3J5cHQgfHwgbmV3IEJhc2VDcnlwdCgpXG4gICAgICAgIHRoaXMudGV4dERlY29kZXIgPSB0ZXh0RGVjb2RlclxuICAgICAgICB0aGlzLnRleHRFbmNvZGVyID0gdGV4dEVuY29kZXJcbiAgICAgICAgdGhpcy5jb3JlU3ltYm9sID0gY2hhaW5Db25maWcuY29yZVN5bWJvbFxuICAgICAgICB0aGlzLnBlcnNvbmFsRGF0YSA9IHBlcnNvbmFsRGF0YVxuXG4gICAgICAgIHRoaXMuZW9zaW9Db250cmFjdCA9IHRoaXMuYXBwbHlDb250cmFjdChFb3Npb0NvbnRyYWN0KVxuICAgICAgICB0aGlzLmNvcmVDb250cmFjdCA9IHRoaXMuYXBwbHlDb250cmFjdChDb3JlQ29udHJhY3QpXG4gICAgICAgIHRoaXMucGFydG5lcnNDb250cmFjdCA9IHRoaXMuYXBwbHlDb250cmFjdChQYXJ0bmVyc0NvbnRyYWN0KVxuICAgICAgICB0aGlzLnAycENvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KFAyUENvbnRyYWN0KVxuICAgICAgICB0aGlzLm5mdENvbnRyYWN0ID0gdGhpcy5hcHBseUNvbnRyYWN0KE5mdENvbnRyYWN0KVxuXG4gICAgICAgIHRoaXMud2FsbGV0cyA9IChjaGFpbkNvbmZpZy53YWxsZXRzIHx8IFtdKS5tYXAod2FsbGV0Q29uZmlnID0+IG5ldyBXYWxsZXQod2FsbGV0Q29uZmlnLCB0aGlzLnJlYWRBcGkpKVxuICAgIH1cblxuICAgIGdldCB3YWxsZXRzU3ltYm9scygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbGV0cy5tYXAod2FsbGV0ID0+IHdhbGxldC5zeW1ib2wpXG4gICAgfVxuXG4gICAgZ2V0V2FsbGV0QnlTeW1ib2woc3ltYm9sOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbGV0cy5maW5kKHdhbGxldCA9PiB3YWxsZXQuc3ltYm9sID09PSBzeW1ib2wpXG4gICAgfVxuXG4gICAgYXBwbHlDb250cmFjdDxUIGV4dGVuZHMgQmFzZUNvbnRyYWN0Pihjb250cmFjdDogeyBuZXcoLi4uYXJnczogYW55W10pOiBUOyB9KTogVCB7XG4gICAgICAgIHJldHVybiBuZXcgY29udHJhY3QodGhpcy5yZWFkQXBpLCB0aGlzLnRhYmxlQ29kZUNvbmZpZylcbiAgICB9XG5cbiAgICBnZXRDYWNoZWRScGMoKSB7XG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy5yZWFkQXBpLmdldEVuZHBvaW50KClcbiAgICAgICAgaWYgKCF0aGlzLnJwY0J5RW5kcG9pbnRbZW5kcG9pbnRdKSB7XG4gICAgICAgICAgICB0aGlzLnJwY0J5RW5kcG9pbnRbZW5kcG9pbnRdID0gbmV3IEpzb25ScGMoZW5kcG9pbnQsIHtmZXRjaH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucnBjQnlFbmRwb2ludFtlbmRwb2ludF1cbiAgICB9XG5cbiAgICBnZXRFb3NJbnN0YW5jZUJ5U2lnbmF0dXJlUHJvdmlkZXIoc2lnbmF0dXJlUHJvdmlkZXI6IFNpZ25hdHVyZVByb3ZpZGVyKSB7XG4gICAgICAgIGNvbnN0IHJwYyA9IHRoaXMuZ2V0Q2FjaGVkUnBjKClcblxuICAgICAgICByZXR1cm4gbmV3IEFwaSh7XG4gICAgICAgICAgICBycGMsXG4gICAgICAgICAgICBzaWduYXR1cmVQcm92aWRlcixcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRleHREZWNvZGVyOiBuZXcgKHRoaXMudGV4dERlY29kZXIgfHwgVGV4dERlY29kZXIpKCksXG4gICAgICAgICAgICB0ZXh0RW5jb2RlcjogbmV3ICh0aGlzLnRleHRFbmNvZGVyIHx8IFRleHRFbmNvZGVyKSgpLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDEuMC4yXG4gICAgICovXG4gICAgZ2V0RW9zUGFzc0luc3RhbmNlKHdpZjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZVByb3ZpZGVyID0gbmV3IEpzU2lnbmF0dXJlUHJvdmlkZXIoW3dpZl0pO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFb3NJbnN0YW5jZUJ5U2lnbmF0dXJlUHJvdmlkZXIoc2lnbmF0dXJlUHJvdmlkZXIpO1xuICAgIH1cblxuICAgIGFzeW5jIG1ha2VFb3NJbnN0YW5jZShhdXRoS2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlUHJvdmlkZXIgPSBhd2FpdCB0aGlzLnNpZ25hdHVyZVByb3ZpZGVyTWFrZXIoYXV0aEtleSlcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RW9zSW5zdGFuY2VCeVNpZ25hdHVyZVByb3ZpZGVyKHNpZ25hdHVyZVByb3ZpZGVyKTtcbiAgICB9XG5cbiAgICBnZXRBdXRoS2V5KGF1dGhLZXlRdWVyeTogc3RyaW5nLCBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsQXV0aEtleVR5cGUgPSBhdXRoS2V5VHlwZSB8fCB0aGlzLmF1dGhLZXlUeXBlXG5cbiAgICAgICAgaWYgKGxvY2FsQXV0aEtleVR5cGUgPT09ICdwbGFpbi1hdXRoLWtleScpIHtcbiAgICAgICAgICAgIHJldHVybiBhdXRoS2V5UXVlcnlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2NhbEF1dGhLZXlUeXBlID09PSAnYXV0aC1rZXktc2VhcmNoLWNhbGxiYWNrJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmF1dGhLZXlTZWFyY2hDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ0ZvciBhdXRoS2V5VHlwZT13aWYtc2VhcmNoLWNhbGxiYWNrIHdpZlNlYXJjaENhbGxiYWNrIG5lZWQgdG8gZGVmaW5lJykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRoS2V5U2VhcmNoQ2FsbGJhY2soYXV0aEtleVF1ZXJ5KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgb25vKG5ldyBOb3RJbXBsZW1lbnRlZEVycm9yKCdOb3QgaW1wbGVtZW50ZWQgYXV0aEtleVR5cGUnKSlcbiAgICB9XG5cbiAgICBhc3luYyB0cmFuc2FjdEJ5QXV0aEtleShcbiAgICAgICAgYXV0aEtleTogc3RyaW5nLFxuICAgICAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgICAgIGNvbmZpZz86IFRyYW5zYWN0Q29uZmlnXG4gICAgKTogUHJvbWlzZTxUcmFuc2FjdFJlc3VsdCB8IFJlYWRPbmx5VHJhbnNhY3RSZXN1bHQgfCBQdXNoVHJhbnNhY3Rpb25BcmdzPiB7XG4gICAgICAgIGNvbnN0IGVvcyA9IGF3YWl0IHRoaXMubWFrZUVvc0luc3RhbmNlKGF1dGhLZXkpXG4gICAgICAgIHJldHVybiBlb3MudHJhbnNhY3QodHJhbnNhY3Rpb24sIGNvbmZpZylcbiAgICB9XG5cbiAgICBhc3luYyB0cmFuc2FjdChcbiAgICAgICAgYXV0aEtleVF1ZXJ5OiBzdHJpbmcsXG4gICAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgICAgY29uZmlnPzogVHJhbnNhY3RDb25maWcsXG4gICAgICAgIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUsXG4gICAgKTogUHJvbWlzZTxUcmFuc2FjdFJlc3VsdCB8IFJlYWRPbmx5VHJhbnNhY3RSZXN1bHQgfCBQdXNoVHJhbnNhY3Rpb25BcmdzPiB7XG4gICAgICAgIGNvbnN0IGF1dGhLZXkgPSBhd2FpdCB0aGlzLmdldEF1dGhLZXkoYXV0aEtleVF1ZXJ5LCBhdXRoS2V5VHlwZSlcblxuICAgICAgICBpZiAoIWF1dGhLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ2F1dGhLZXkgY2Fubm90IGJlIGVtcHR5JykpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2FjdEJ5QXV0aEtleShhdXRoS2V5LCB0cmFuc2FjdGlvbiwgY29uZmlnKVxuICAgIH1cblxuICAgIGFzeW5jIGVuY3J5cHRNZXNzYWdlKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgbWVtbz86IHN0cmluZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByZXBhcmVkTWVzc2FnZSA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KG1lc3NhZ2UpKSlcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5DcnlwdC5lbmNyeXB0KGF1dGhLZXksIHB1YmxpY0tleSwgcHJlcGFyZWRNZXNzYWdlLCBtZW1vKVxuICAgIH1cblxuICAgIGFzeW5jIGRlY3J5cHRNZXNzYWdlKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgbWVtbz86IHN0cmluZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlY3J5cHRlZE1lc3NhZ2UgPSBhd2FpdCB0aGlzLmNoYWluQ3J5cHQuZGVjcnlwdChhdXRoS2V5LCBwdWJsaWNLZXksIG1lc3NhZ2UsIG1lbW8pXG5cbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoYXRvYihkZWNyeXB0ZWRNZXNzYWdlKSkpXG4gICAgfVxuXG4gICAgbWFrZVZhbHVlQXNTdHIodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubWFwKGl0ZW0gPT4gdGhpcy5tYWtlVmFsdWVBc1N0cihpdGVtKSkuam9pbignLCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpLnNvcnQoKVxuICAgICAgICAgICAgcmV0dXJuIGtleXMubWFwKGtleSA9PiBgJHtrZXl9PSR7dGhpcy5tYWtlVmFsdWVBc1N0cih2YWx1ZVtrZXldKX1gKS5qb2luKCcmJylcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHZhbHVlIHR5cGUnKSlcbiAgICB9XG5cbiAgICBvYmpUb1N0YWJsZU1lc3NhZ2UoZGljdDogUmVjb3JkPHN0cmluZywgYW55Pikge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWtlVmFsdWVBc1N0cihkaWN0KVxuICAgIH1cblxuICAgIGJ0b2FFc2NhcGUoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKVxuICAgIH1cblxuICAgIGFzeW5jIHNpZ25NZXNzYWdlKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgYXV0aEtleSA9IGF3YWl0IHRoaXMuZ2V0QXV0aEtleShhdXRoS2V5UXVlcnksIGF1dGhLZXlUeXBlKVxuXG4gICAgICAgIGlmICghYXV0aEtleSkge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignYXV0aEtleSBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByZXBhcmVkTWVzc2FnZSA9IHRoaXMuYnRvYUVzY2FwZShtZXNzYWdlKVxuICAgICAgICByZXR1cm4gdGhpcy5jaGFpbkNyeXB0LnNpZ24oYXV0aEtleSwgcHJlcGFyZWRNZXNzYWdlKVxuICAgIH1cblxuICAgIGFzeW5jIHZlcmlmeU1lc3NhZ2UoXG4gICAgICAgIHB1YmxpY0tleTogc3RyaW5nLFxuICAgICAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICAgICkge1xuICAgICAgICBjb25zdCBwcmVwYXJlZE1lc3NhZ2UgPSB0aGlzLmJ0b2FFc2NhcGUobWVzc2FnZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhaW5DcnlwdC52ZXJpZnkocHVibGljS2V5LCBzaWduYXR1cmUsIHByZXBhcmVkTWVzc2FnZSlcbiAgICB9XG5cbiAgICBhc3luYyBzaWduT2JqZWN0KFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgcHVibGljS2V5OiBzdHJpbmcsXG4gICAgICAgIGRpY3Q6IFJlY29yZDxzdHJpbmcsIGFueT4sXG4gICAgICAgIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm9ialRvU3RhYmxlTWVzc2FnZShkaWN0KVxuICAgICAgICByZXR1cm4gdGhpcy5zaWduTWVzc2FnZShhdXRoS2V5UXVlcnksIHB1YmxpY0tleSwgbWVzc2FnZSwgYXV0aEtleVR5cGUpXG4gICAgfVxuXG4gICAgYXN5bmMgdmVyaWZ5T2JqZWN0KFxuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZyxcbiAgICAgICAgZGljdDogUmVjb3JkPHN0cmluZywgYW55PixcbiAgICAgICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm9ialRvU3RhYmxlTWVzc2FnZShkaWN0KVxuICAgICAgICByZXR1cm4gdGhpcy52ZXJpZnlNZXNzYWdlKHB1YmxpY0tleSwgbWVzc2FnZSwgc2lnbmF0dXJlKVxuICAgIH1cblxuICAgIGFzeW5jIHNlbmRQZXJzb25hbERhdGEoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBzZW5kZXJBY2NvdW50TmFtZTogc3RyaW5nLFxuICAgICAgICByZWNpcGllbnRBY2NvdW50TmFtZTogc3RyaW5nLFxuICAgICAgICBkYXRhOiBhbnksXG4gICAgICAgIGF1dGhLZXlUeXBlPzogQXV0aEtleVR5cGUsXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHNlbmRlclB1YiA9IGF3YWl0IHRoaXMucmVhZEFwaS5nZXRQZXJtaXNzaW9uS2V5QnlOYW1lKHNlbmRlckFjY291bnROYW1lLCBcImFjdGl2ZVwiKVxuICAgICAgICBjb25zdCByZWNpcGllbnRQdWIgPSBhd2FpdCB0aGlzLnJlYWRBcGkuZ2V0UGVybWlzc2lvbktleUJ5TmFtZShyZWNpcGllbnRBY2NvdW50TmFtZSwgXCJhY3RpdmVcIilcbiAgICAgICAgaWYgKCFzZW5kZXJQdWIgfHwgIXJlY2lwaWVudFB1Yikge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBFcnJvcignc2VuZGVyUHViIG9yIHJlY2lwaWVudFB1YiBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBqc29uTWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZFRvU2VuZGVyID0gYXdhaXQgdGhpcy5lbmNyeXB0TWVzc2FnZShhdXRoS2V5UXVlcnksIHNlbmRlclB1YiwganNvbk1lc3NhZ2UsIHVuZGVmaW5lZCwgYXV0aEtleVR5cGUpXG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZFRvUmVjaXBpZW50ID0gYXdhaXQgdGhpcy5lbmNyeXB0TWVzc2FnZShhdXRoS2V5UXVlcnksIHJlY2lwaWVudFB1YiwganNvbk1lc3NhZ2UsIHVuZGVmaW5lZCwgYXV0aEtleVR5cGUpXG4gICAgICAgIGNvbnN0IGRhdGFCdW5kbGUgPSB7XG4gICAgICAgICAgICBzZW5kZXJQdWIsXG4gICAgICAgICAgICByZWNpcGllbnRQdWIsXG4gICAgICAgICAgICBzZW5kZXJEYXRhOiBlbmNyeXB0ZWRUb1NlbmRlcixcbiAgICAgICAgICAgIHJlY2lwaWVudERhdGE6IGVuY3J5cHRlZFRvUmVjaXBpZW50LFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgdGhpcy5zaWduT2JqZWN0KGF1dGhLZXlRdWVyeSwgc2VuZGVyUHViLCBkYXRhQnVuZGxlLCBhdXRoS2V5VHlwZSlcblxuICAgICAgICByZXR1cm4gdGhpcy5wZXJzb25hbERhdGEuc2VuZFBlcnNvbmFsRGF0YShkYXRhQnVuZGxlLCBzaWduYXR1cmUpXG4gICAgfVxuXG4gICAgYXN5bmMgcGFyc2VFbmNyeXB0ZWRQZXJzb25hbERhdGEoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICBkYXRhOiB7aWQ6IHN0cmluZywgc2VuZGVyUHViOiBzdHJpbmcsIGRhdGE6IHN0cmluZ31bXSxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApIHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiB7aWQ6IHN0cmluZywgZGF0YTogYW55fVtdID0gW11cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlY3J5cHRlZCA9IGF3YWl0IHRoaXMuZGVjcnlwdE1lc3NhZ2UoYXV0aEtleVF1ZXJ5LCBpdGVtLnNlbmRlclB1YiwgaXRlbS5kYXRhLCB1bmRlZmluZWQsIGF1dGhLZXlUeXBlKVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04ucGFyc2UoZGVjcnlwdGVkKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIGFzeW5jIGdldFBlcnNvbmFsQXNSZWNpcGllbnQoXG4gICAgICAgIGF1dGhLZXlRdWVyeTogc3RyaW5nLFxuICAgICAgICByZWNpcGllbnRBY2NvdW50TmFtZTogc3RyaW5nLFxuICAgICAgICBpZHM6IHN0cmluZ1tdLFxuICAgICAgICBhdXRoS2V5VHlwZT86IEF1dGhLZXlUeXBlLFxuICAgICk6IFByb21pc2U8e2lkOiBzdHJpbmcsIGRhdGE6IGFueX1bXT4ge1xuICAgICAgICBjb25zdCByZWNpcGllbnRQdWIgPSBhd2FpdCB0aGlzLnJlYWRBcGkuZ2V0UGVybWlzc2lvbktleUJ5TmFtZShyZWNpcGllbnRBY2NvdW50TmFtZSwgXCJhY3RpdmVcIilcbiAgICAgICAgaWYgKCFyZWNpcGllbnRQdWIpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgRXJyb3IoJ3JlY2lwaWVudFB1YiBjYW5ub3QgYmUgZW1wdHknKSlcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhQnVuZGxlID0ge1xuICAgICAgICAgICAgcmVjaXBpZW50UHViLFxuICAgICAgICAgICAgaWRzLFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgdGhpcy5zaWduT2JqZWN0KGF1dGhLZXlRdWVyeSwgcmVjaXBpZW50UHViLCBkYXRhQnVuZGxlLCBhdXRoS2V5VHlwZSlcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnBlcnNvbmFsRGF0YS5nZXRQZXJzb25hbERhdGFBc1JlY2lwaWVudChkYXRhQnVuZGxlLCBzaWduYXR1cmUpXG5cbiAgICAgICAgaWYgKCFyZXN1bHQub2spIHtcbiAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VFbmNyeXB0ZWRQZXJzb25hbERhdGEoYXV0aEtleVF1ZXJ5LCByZXN1bHQucmVzdWx0LCBhdXRoS2V5VHlwZSlcbiAgICB9XG5cbiAgICBhc3luYyBnZXRQZXJzb25hbEFzU2VuZGVyKFxuICAgICAgICBhdXRoS2V5UXVlcnk6IHN0cmluZyxcbiAgICAgICAgc2VuZGVyQWNjb3VudE5hbWU6IHN0cmluZyxcbiAgICAgICAgaWRzOiBzdHJpbmdbXSxcbiAgICAgICAgYXV0aEtleVR5cGU/OiBBdXRoS2V5VHlwZSxcbiAgICApOiBQcm9taXNlPHtpZDogc3RyaW5nLCBkYXRhOiBhbnl9W10+IHtcbiAgICAgICAgY29uc3Qgc2VuZGVyUHViID0gYXdhaXQgdGhpcy5yZWFkQXBpLmdldFBlcm1pc3Npb25LZXlCeU5hbWUoc2VuZGVyQWNjb3VudE5hbWUsIFwiYWN0aXZlXCIpXG4gICAgICAgIGlmICghc2VuZGVyUHViKSB7XG4gICAgICAgICAgICB0aHJvdyBvbm8obmV3IEVycm9yKCdzZW5kZXJQdWIgY2Fubm90IGJlIGVtcHR5JykpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YUJ1bmRsZSA9IHtcbiAgICAgICAgICAgIHNlbmRlclB1YixcbiAgICAgICAgICAgIGlkcyxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGF3YWl0IHRoaXMuc2lnbk9iamVjdChhdXRoS2V5UXVlcnksIHNlbmRlclB1YiwgZGF0YUJ1bmRsZSwgYXV0aEtleVR5cGUpXG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wZXJzb25hbERhdGEuZ2V0UGVyc29uYWxEYXRhQXNTZW5kZXIoZGF0YUJ1bmRsZSwgc2lnbmF0dXJlKVxuXG4gICAgICAgIGlmICghcmVzdWx0Lm9rKSB7XG4gICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlRW5jcnlwdGVkUGVyc29uYWxEYXRhKGF1dGhLZXlRdWVyeSwgcmVzdWx0LnJlc3VsdCwgYXV0aEtleVR5cGUpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFpblxuIl19