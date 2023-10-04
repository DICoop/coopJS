"use strict";
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
exports.generateKeyPair = exports.generateAccount = exports.makeAccountByWif = exports.makeAccountByMnemonic = exports.makeAccount = exports.makePublicKeyByMnemonic = exports.makeHdNodeByMnemonic = void 0;
var ono_1 = __importDefault(require("@jsdevtools/ono"));
var errors_1 = require("./errors");
var bip39_1 = require("./keys/bip39");
var hdkey_1 = require("./keys/hdkey");
var ecc_1 = require("./keys/ecc");
var utils_1 = require("./utils");
var crypto_1 = require("./keys/crypto");
var subtle = globalThis.crypto.subtle;
var makeHdNodeByMnemonic = function (mnemonic) { return __awaiter(void 0, void 0, void 0, function () {
    var seed, hdBase, hdFirstNode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, bip39_1.isValidMnemonic)(mnemonic)) {
                    throw (0, ono_1.default)(new errors_1.UniCoreMnemonicParseError('Invalid mnemonic'));
                }
                return [4 /*yield*/, (0, bip39_1.mnemonicToSeed)(mnemonic)];
            case 1:
                seed = _a.sent();
                hdBase = (0, hdkey_1.seedToHd)(seed);
                hdFirstNode = (0, hdkey_1.hdToFirstHdNode)(hdBase);
                return [2 /*return*/, hdFirstNode];
        }
    });
}); };
exports.makeHdNodeByMnemonic = makeHdNodeByMnemonic;
var makePublicKeyByMnemonic = function (mnemonic) { return __awaiter(void 0, void 0, void 0, function () {
    var hdFirstNode, hdPublicKeyBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.makeHdNodeByMnemonic)(mnemonic)];
            case 1:
                hdFirstNode = _a.sent();
                hdPublicKeyBuffer = (0, hdkey_1.hdNodeToPublicKeyBuffer)(hdFirstNode);
                return [2 /*return*/, (0, ecc_1.hdPublicToEccPublicKey)(hdPublicKeyBuffer)];
        }
    });
}); };
exports.makePublicKeyByMnemonic = makePublicKeyByMnemonic;
var makeAccount = function (username, mnemonic, wif, pub) {
    return {
        name: username,
        mnemonic: mnemonic,
        wif: wif,
        pub: pub,
    };
};
exports.makeAccount = makeAccount;
var makeAccountByMnemonic = function (username, mnemonic) { return __awaiter(void 0, void 0, void 0, function () {
    var hdFirstNode, hdPublicKeyBuffer, hdPrivateKeyBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.makeHdNodeByMnemonic)(mnemonic)];
            case 1:
                hdFirstNode = _a.sent();
                hdPublicKeyBuffer = (0, hdkey_1.hdNodeToPublicKeyBuffer)(hdFirstNode);
                hdPrivateKeyBuffer = (0, hdkey_1.hdNodeToPrivateKeyBuffer)(hdFirstNode);
                return [2 /*return*/, (0, exports.makeAccount)(username, '', (0, ecc_1.hdPrivateToWif)(hdPrivateKeyBuffer), (0, ecc_1.hdPublicToEccPublicKey)(hdPublicKeyBuffer))];
        }
    });
}); };
exports.makeAccountByMnemonic = makeAccountByMnemonic;
var makeAccountByWif = function (username, wif) { return __awaiter(void 0, void 0, void 0, function () {
    var publicKey;
    return __generator(this, function (_a) {
        if (!(0, ecc_1.isValidWif)(wif)) {
            throw (0, ono_1.default)(new errors_1.UniCoreWifParseError('Invalid wif'));
        }
        publicKey = (0, ecc_1.privateKeyToPublic)((0, ecc_1.wifToPrivateKey)(wif)).toLegacyString();
        return [2 /*return*/, (0, exports.makeAccount)(username, '', wif, publicKey)];
    });
}); };
exports.makeAccountByWif = makeAccountByWif;
var generateAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var name, mnemonic, seed, hdBase, hdFirstNode, hdPublicKeyBuffer, hdPrivateKeyBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = (0, utils_1.generateAccountName)();
                mnemonic = (0, bip39_1.generateMnemonic)();
                return [4 /*yield*/, (0, bip39_1.mnemonicToSeed)(mnemonic)];
            case 1:
                seed = _a.sent();
                hdBase = (0, hdkey_1.seedToHd)(seed);
                hdFirstNode = (0, hdkey_1.hdToFirstHdNode)(hdBase);
                hdPublicKeyBuffer = (0, hdkey_1.hdNodeToPublicKeyBuffer)(hdFirstNode);
                hdPrivateKeyBuffer = (0, hdkey_1.hdNodeToPrivateKeyBuffer)(hdFirstNode);
                return [2 /*return*/, (0, exports.makeAccount)(name, mnemonic, (0, ecc_1.hdPrivateToWif)(hdPrivateKeyBuffer), (0, ecc_1.hdPublicToEccPublicKey)(hdPublicKeyBuffer))];
        }
    });
}); };
exports.generateAccount = generateAccount;
var generateKeyPair = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, privateKey, publicKey, private_jwk, private_hex, private_m256, private_sha256, private_four, private_wif;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, subtle.generateKey({
                    name: "ECDSA",
                    namedCurve: "P-256",
                }, true, ["sign", "verify"])];
            case 1:
                _a = _b.sent(), privateKey = _a.privateKey, publicKey = _a.publicKey;
                return [4 /*yield*/, subtle.exportKey("jwk", privateKey)];
            case 2:
                private_jwk = _b.sent();
                console.log("private_jwk: ", private_jwk);
                private_hex = (0, crypto_1.to_hex)((0, crypto_1.ab2b)((0, crypto_1.base64url_decode)(private_jwk.d)));
                console.log("private_jwk.d: ", private_jwk.d);
                console.log("private_hex: ", private_hex);
                return [4 /*yield*/, (0, crypto_1.sha256)('80' + private_hex)
                    //SHA-256 hash of the private key
                ];
            case 3:
                private_m256 = _b.sent();
                return [4 /*yield*/, (0, crypto_1.sha256)(private_m256)
                    //first 4 bytes of the second SHA-256 hash
                ];
            case 4:
                private_sha256 = _b.sent();
                private_four = private_sha256.substr(0, 8);
                private_wif = (0, crypto_1.encode_b58)('80' + private_hex + private_four);
                console.log({ private_wif: private_wif, publicKey: publicKey });
                return [2 /*return*/, { private_wif: private_wif, publicKey: publicKey }];
        }
    });
}); };
exports.generateKeyPair = generateKeyPair;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBaUM7QUFFakMsbUNBQXdFO0FBQ3hFLHNDQUFnRjtBQUNoRixzQ0FBMkc7QUFDM0csa0NBQWtIO0FBQ2xILGlDQUE4QztBQUU5Qyx3Q0FBaUY7QUFFekUsSUFBQSxNQUFNLEdBQUssVUFBVSxDQUFDLE1BQU0sT0FBdEIsQ0FBdUI7QUFFOUIsSUFBTSxvQkFBb0IsR0FBRyxVQUFPLFFBQWdCOzs7OztnQkFDekQsSUFBSSxDQUFDLElBQUEsdUJBQWUsRUFBQyxRQUFRLENBQUMsRUFBRTtvQkFDOUIsTUFBTSxJQUFBLGFBQUcsRUFBQyxJQUFJLGtDQUF5QixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtpQkFDN0Q7Z0JBRVkscUJBQU0sSUFBQSxzQkFBYyxFQUFDLFFBQVEsQ0FBQyxFQUFBOztnQkFBckMsSUFBSSxHQUFHLFNBQThCO2dCQUNyQyxNQUFNLEdBQUcsSUFBQSxnQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFBO2dCQUN2QixXQUFXLEdBQUcsSUFBQSx1QkFBZSxFQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUUzQyxzQkFBTyxXQUFXLEVBQUE7OztLQUNuQixDQUFBO0FBVlksUUFBQSxvQkFBb0Isd0JBVWhDO0FBR00sSUFBTSx1QkFBdUIsR0FBRyxVQUFPLFFBQWdCOzs7O29CQUN4QyxxQkFBTSxJQUFBLDRCQUFvQixFQUFDLFFBQVEsQ0FBQyxFQUFBOztnQkFBbEQsV0FBVyxHQUFHLFNBQW9DO2dCQUNsRCxpQkFBaUIsR0FBRyxJQUFBLCtCQUF1QixFQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUU5RCxzQkFBTyxJQUFBLDRCQUFzQixFQUFDLGlCQUFpQixDQUFDLEVBQUE7OztLQUNqRCxDQUFBO0FBTFks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QyxXQUFXLEdBQUcsSUFBQSxlQUFNLEVBQUMsSUFBQSxhQUFJLEVBQUMsSUFBQSx5QkFBZ0IsRUFBQyxXQUFXLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFFLENBQUMsQ0FBQTtnQkFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUE7Z0JBRXJCLHFCQUFNLElBQUEsZUFBTSxFQUFDLElBQUksR0FBRSxXQUFXLENBQUU7b0JBRXBELGlDQUFpQztrQkFGbUI7O2dCQUFoRCxZQUFZLEdBQUksU0FBZ0M7Z0JBRzlCLHFCQUFNLElBQUEsZUFBTSxFQUFDLFlBQVksQ0FBQztvQkFFaEQsMENBQTBDO2tCQUZNOztnQkFBNUMsY0FBYyxHQUFJLFNBQTBCO2dCQUc1QyxZQUFZLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRzFDLFdBQVcsR0FBRyxJQUFBLG1CQUFVLEVBQUMsSUFBSSxHQUFFLFdBQVcsR0FBRyxZQUFZLENBQUMsQ0FBQTtnQkFFOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFDLFdBQVcsYUFBQSxFQUFFLFNBQVMsV0FBQSxFQUFDLENBQUMsQ0FBQTtnQkFFckMsc0JBQU8sRUFBQyxXQUFXLGFBQUEsRUFBRSxTQUFTLFdBQUEsRUFBQyxFQUFBOzs7S0FDaEMsQ0FBQTtBQTlCWSxRQUFBLGVBQWUsbUJBOEIzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbm8gZnJvbSAnQGpzZGV2dG9vbHMvb25vJ1xuXG5pbXBvcnQge1VuaUNvcmVNbmVtb25pY1BhcnNlRXJyb3IsIFVuaUNvcmVXaWZQYXJzZUVycm9yfSBmcm9tICcuL2Vycm9ycydcbmltcG9ydCB7IGdlbmVyYXRlTW5lbW9uaWMsIGlzVmFsaWRNbmVtb25pYywgbW5lbW9uaWNUb1NlZWQgfSBmcm9tICcuL2tleXMvYmlwMzknXG5pbXBvcnQgeyBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlciwgaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyLCBoZFRvRmlyc3RIZE5vZGUsIHNlZWRUb0hkIH0gZnJvbSAnLi9rZXlzL2hka2V5J1xuaW1wb3J0IHtoZFB1YmxpY1RvRWNjUHVibGljS2V5LCBoZFByaXZhdGVUb1dpZiwgaXNWYWxpZFdpZiwgcHJpdmF0ZUtleVRvUHVibGljLCB3aWZUb1ByaXZhdGVLZXl9IGZyb20gJy4va2V5cy9lY2MnXG5pbXBvcnQgeyBnZW5lcmF0ZUFjY291bnROYW1lIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuaW1wb3J0IHt0b19oZXgsIGFiMmIsIHNoYTI1NiwgZW5jb2RlX2I1OCwgYmFzZTY0dXJsX2RlY29kZX0gZnJvbSBcIi4va2V5cy9jcnlwdG9cIjtcblxuY29uc3QgeyBzdWJ0bGUgfSA9IGdsb2JhbFRoaXMuY3J5cHRvO1xuXG5leHBvcnQgY29uc3QgbWFrZUhkTm9kZUJ5TW5lbW9uaWMgPSBhc3luYyAobW5lbW9uaWM6IHN0cmluZykgPT4ge1xuICBpZiAoIWlzVmFsaWRNbmVtb25pYyhtbmVtb25pYykpIHtcbiAgICB0aHJvdyBvbm8obmV3IFVuaUNvcmVNbmVtb25pY1BhcnNlRXJyb3IoJ0ludmFsaWQgbW5lbW9uaWMnKSlcbiAgfVxuXG4gIGNvbnN0IHNlZWQgPSBhd2FpdCBtbmVtb25pY1RvU2VlZChtbmVtb25pYylcbiAgY29uc3QgaGRCYXNlID0gc2VlZFRvSGQoc2VlZClcbiAgY29uc3QgaGRGaXJzdE5vZGUgPSBoZFRvRmlyc3RIZE5vZGUoaGRCYXNlKVxuXG4gIHJldHVybiBoZEZpcnN0Tm9kZVxufVxuXG5cbmV4cG9ydCBjb25zdCBtYWtlUHVibGljS2V5QnlNbmVtb25pYyA9IGFzeW5jIChtbmVtb25pYzogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gYXdhaXQgbWFrZUhkTm9kZUJ5TW5lbW9uaWMobW5lbW9uaWMpXG4gIGNvbnN0IGhkUHVibGljS2V5QnVmZmVyID0gaGROb2RlVG9QdWJsaWNLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG5cbiAgcmV0dXJuIGhkUHVibGljVG9FY2NQdWJsaWNLZXkoaGRQdWJsaWNLZXlCdWZmZXIpXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNjb3VudERhdGEge1xuICBuYW1lOiBzdHJpbmdcbiAgbW5lbW9uaWM6IHN0cmluZ1xuICB3aWY6IHN0cmluZ1xuICBwdWI6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgbWFrZUFjY291bnQgPSAodXNlcm5hbWU6IHN0cmluZywgbW5lbW9uaWM6IHN0cmluZywgd2lmOiBzdHJpbmcsIHB1Yjogc3RyaW5nKTogQWNjb3VudERhdGEgPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgIG1uZW1vbmljLFxuICAgIHdpZixcbiAgICBwdWIsXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VBY2NvdW50QnlNbmVtb25pYyA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCBtbmVtb25pYzogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gYXdhaXQgbWFrZUhkTm9kZUJ5TW5lbW9uaWMobW5lbW9uaWMpXG5cbiAgY29uc3QgaGRQdWJsaWNLZXlCdWZmZXIgPSBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcbiAgY29uc3QgaGRQcml2YXRlS2V5QnVmZmVyID0gaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuXG4gIHJldHVybiBtYWtlQWNjb3VudCh1c2VybmFtZSwgJycsIGhkUHJpdmF0ZVRvV2lmKGhkUHJpdmF0ZUtleUJ1ZmZlciksIGhkUHVibGljVG9FY2NQdWJsaWNLZXkoaGRQdWJsaWNLZXlCdWZmZXIpKVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUFjY291bnRCeVdpZiA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCB3aWY6IHN0cmluZykgPT4ge1xuICBpZiAoIWlzVmFsaWRXaWYod2lmKSkge1xuICAgIHRocm93IG9ubyhuZXcgVW5pQ29yZVdpZlBhcnNlRXJyb3IoJ0ludmFsaWQgd2lmJykpXG4gIH1cblxuICBjb25zdCBwdWJsaWNLZXkgPSBwcml2YXRlS2V5VG9QdWJsaWMod2lmVG9Qcml2YXRlS2V5KHdpZikpLnRvTGVnYWN5U3RyaW5nKClcblxuICByZXR1cm4gbWFrZUFjY291bnQodXNlcm5hbWUsICcnLCB3aWYsIHB1YmxpY0tleSlcbn1cblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQWNjb3VudCA9IGFzeW5jICgpOiBQcm9taXNlPEFjY291bnREYXRhPiA9PiB7XG4gIGNvbnN0IG5hbWUgPSBnZW5lcmF0ZUFjY291bnROYW1lKClcbiAgY29uc3QgbW5lbW9uaWMgPSBnZW5lcmF0ZU1uZW1vbmljKClcbiAgY29uc3Qgc2VlZCA9IGF3YWl0IG1uZW1vbmljVG9TZWVkKG1uZW1vbmljKVxuICBjb25zdCBoZEJhc2UgPSBzZWVkVG9IZChzZWVkKVxuICBjb25zdCBoZEZpcnN0Tm9kZSA9IGhkVG9GaXJzdEhkTm9kZShoZEJhc2UpXG5cbiAgY29uc3QgaGRQdWJsaWNLZXlCdWZmZXIgPSBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcbiAgY29uc3QgaGRQcml2YXRlS2V5QnVmZmVyID0gaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuXG4gIHJldHVybiBtYWtlQWNjb3VudChuYW1lLCBtbmVtb25pYywgaGRQcml2YXRlVG9XaWYoaGRQcml2YXRlS2V5QnVmZmVyKSwgaGRQdWJsaWNUb0VjY1B1YmxpY0tleShoZFB1YmxpY0tleUJ1ZmZlcikpXG59XG5cblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlS2V5UGFpciA9IGFzeW5jKCkgPT4ge1xuICBjb25zdCB7IHByaXZhdGVLZXksIHB1YmxpY0tleSB9ID0gYXdhaXQgc3VidGxlLmdlbmVyYXRlS2V5KFxuICB7XG4gICAgbmFtZTogXCJFQ0RTQVwiLFxuICAgIG5hbWVkQ3VydmU6IFwiUC0yNTZcIixcbiAgfSxcbiAgdHJ1ZSxcbiAgW1wic2lnblwiLCBcInZlcmlmeVwiXVxuICApO1xuXG4gIGxldCBwcml2YXRlX2p3ayA9IGF3YWl0IHN1YnRsZS5leHBvcnRLZXkoXCJqd2tcIiwgcHJpdmF0ZUtleSlcbiAgY29uc29sZS5sb2coXCJwcml2YXRlX2p3azogXCIsIHByaXZhdGVfandrKVxuICBsZXQgcHJpdmF0ZV9oZXggPSB0b19oZXgoYWIyYihiYXNlNjR1cmxfZGVjb2RlKHByaXZhdGVfandrLmQhKSkpXG4gIGNvbnNvbGUubG9nKFwicHJpdmF0ZV9qd2suZDogXCIsIHByaXZhdGVfandrLmQhKVxuICBjb25zb2xlLmxvZyhcInByaXZhdGVfaGV4OiBcIiwgcHJpdmF0ZV9oZXgpXG4gIC8vIC8vU0hBLTI1NiBoYXNoIHdpdGggYSAweDgwIGJ5dGUgaW4gZnJvbnRcbiAgbGV0IHByaXZhdGVfbTI1NiAgPSBhd2FpdCBzaGEyNTYoJzgwJysgcHJpdmF0ZV9oZXggKVxuXG4gIC8vU0hBLTI1NiBoYXNoIG9mIHRoZSBwcml2YXRlIGtleVxuICBsZXQgcHJpdmF0ZV9zaGEyNTYgID0gYXdhaXQgc2hhMjU2KHByaXZhdGVfbTI1NilcblxuICAvL2ZpcnN0IDQgYnl0ZXMgb2YgdGhlIHNlY29uZCBTSEEtMjU2IGhhc2hcbiAgbGV0IHByaXZhdGVfZm91ciA9IHByaXZhdGVfc2hhMjU2LnN1YnN0cigwLDgpO1xuXG4gIC8vQmFzZTU4IGVuY29kZSB0aGUgYmluYXJ5IGRhdGEgdG8gZ2V0IEVPUyBwcml2YXRlIGtleVxuICBsZXQgcHJpdmF0ZV93aWYgPSBlbmNvZGVfYjU4KCc4MCcrIHByaXZhdGVfaGV4ICsgcHJpdmF0ZV9mb3VyKVxuICBcbiAgY29uc29sZS5sb2coe3ByaXZhdGVfd2lmLCBwdWJsaWNLZXl9KVxuXG4gIHJldHVybiB7cHJpdmF0ZV93aWYsIHB1YmxpY0tleX1cbn1cbiJdfQ==