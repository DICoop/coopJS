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
    var mnemonic, seed, hdBase, hdFirstNode, hdPublicKeyBuffer, hdPrivateKeyBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mnemonic = (0, bip39_1.generateMnemonic)();
                return [4 /*yield*/, (0, bip39_1.mnemonicToSeed)(mnemonic)];
            case 1:
                seed = _a.sent();
                hdBase = (0, hdkey_1.seedToHd)(seed);
                hdFirstNode = (0, hdkey_1.hdToFirstHdNode)(hdBase);
                hdPublicKeyBuffer = (0, hdkey_1.hdNodeToPublicKeyBuffer)(hdFirstNode);
                hdPrivateKeyBuffer = (0, hdkey_1.hdNodeToPrivateKeyBuffer)(hdFirstNode);
                return [2 /*return*/, { mnemonic: mnemonic, private_key: (0, ecc_1.hdPrivateToWif)(hdPrivateKeyBuffer), public_key: (0, ecc_1.hdPublicToEccPublicKey)(hdPublicKeyBuffer) }];
        }
    });
}); };
exports.generateKeyPair = generateKeyPair;
// export const generateKeyPair = async() => {
//   const { privateKey, publicKey } = await subtle.generateKey(
//   {
//     name: "ECDSA",
//     namedCurve: "P-256",
//   },
//   true,
//   ["sign", "verify"]
//   );
//   let private_jwk = await subtle.exportKey("jwk", privateKey)
//   let private_hex = to_hex(ab2b(base64url_decode(private_jwk.d!)))
//   //SHA-256 hash with a 0x80 byte in front
//   let private_m256  = await sha256('80'+ private_hex )
//   //SHA-256 hash of the private key
//   let private_sha256  = await sha256(private_m256)
//   //first 4 bytes of the second SHA-256 hash
//   let private_four = private_sha256.substr(0,8);
//   //Base58 encode the binary data to get EOS private key
//   let private_wif = encode_b58('80'+ private_hex + private_four)
//   console.log("private_jwk: ", private_jwk)
//   let public_jwk = await subtle.exportKey("jwk", publicKey);
//   console.log("public_jwk: ", public_jwk)
//   const x_binary = ab2b(base64url_decode(public_jwk.x!));
//   const y_binary = ab2b(base64url_decode(public_jwk.y!));
//   const public_binary = x_binary.concat(y_binary);
//   console.log("public_binary: ", public_binary)
//   const public_ripemd160 = hash.ripemd160().update(new Uint8Array(public_binary)).digest('hex');
//   console.log("public_ripemd160: ", public_ripemd160)
//   let checksum = public_ripemd160.substr(0, 8); // Первые 4 байта, но в hex формате
//   let public_with_checksum = public_binary.concat(
//       public_ripemd160.substr(0, 8).split('').map(x => parseInt(x, 16))
//   );
//   console.log("public_with_checksum: ", public_with_checksum)
//   let public_base58 = encode_b58(public_with_checksum.map(x => x.toString(16)).join(''));
//   console.log("public_base58: ", public_base58)
//   let public_key = "PUB_R1_" + public_base58;
//   console.log("public_key: ", public_key)
//   return {private_wif, public_key}
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBaUM7QUFFakMsbUNBQXdFO0FBQ3hFLHNDQUFnRjtBQUNoRixzQ0FBMkc7QUFDM0csa0NBQWtIO0FBQ2xILGlDQUE4QztBQUt0QyxJQUFBLE1BQU0sR0FBSyxVQUFVLENBQUMsTUFBTSxPQUF0QixDQUF1QjtBQUU5QixJQUFNLG9CQUFvQixHQUFHLFVBQU8sUUFBZ0I7Ozs7O2dCQUN6RCxJQUFJLENBQUMsSUFBQSx1QkFBZSxFQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM5QixNQUFNLElBQUEsYUFBRyxFQUFDLElBQUksa0NBQXlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO2lCQUM3RDtnQkFFWSxxQkFBTSxJQUFBLHNCQUFjLEVBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFyQyxJQUFJLEdBQUcsU0FBOEI7Z0JBQ3JDLE1BQU0sR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3ZCLFdBQVcsR0FBRyxJQUFBLHVCQUFlLEVBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRTNDLHNCQUFPLFdBQVcsRUFBQTs7O0tBQ25CLENBQUE7QUFWWSxRQUFBLG9CQUFvQix3QkFVaEM7QUFHTSxJQUFNLHVCQUF1QixHQUFHLFVBQU8sUUFBZ0I7Ozs7b0JBQ3hDLHFCQUFNLElBQUEsNEJBQW9CLEVBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFsRCxXQUFXLEdBQUcsU0FBb0M7Z0JBQ2xELGlCQUFpQixHQUFHLElBQUEsK0JBQXVCLEVBQUMsV0FBVyxDQUFDLENBQUE7Z0JBRTlELHNCQUFPLElBQUEsNEJBQXNCLEVBQUMsaUJBQWlCLENBQUMsRUFBQTs7O0tBQ2pELENBQUE7QUFMWSxRQUFBLHVCQUF1Qiwy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RUFBRSxXQUFXLEVBQUUsSUFBQSxvQkFBYyxFQUFDLGtCQUFrQixDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUEsNEJBQXNCLEVBQUMsaUJBQWlCLENBQUMsRUFBQyxFQUFBOzs7S0FDMUgsQ0FBQTtBQVZZLFFBQUEsZUFBZSxtQkFVM0I7QUFFRCw4Q0FBOEM7QUFDOUMsZ0VBQWdFO0FBQ2hFLE1BQU07QUFDTixxQkFBcUI7QUFDckIsMkJBQTJCO0FBQzNCLE9BQU87QUFDUCxVQUFVO0FBQ1YsdUJBQXVCO0FBQ3ZCLE9BQU87QUFFUCxnRUFBZ0U7QUFFaEUscUVBQXFFO0FBRXJFLDZDQUE2QztBQUM3Qyx5REFBeUQ7QUFFekQsc0NBQXNDO0FBQ3RDLHFEQUFxRDtBQUVyRCwrQ0FBK0M7QUFDL0MsbURBQW1EO0FBRW5ELDJEQUEyRDtBQUMzRCxtRUFBbUU7QUFDbkUsOENBQThDO0FBRTlDLCtEQUErRDtBQUMvRCw0Q0FBNEM7QUFFNUMsNERBQTREO0FBQzVELDREQUE0RDtBQUM1RCxxREFBcUQ7QUFFckQsa0RBQWtEO0FBR2xELG1HQUFtRztBQUVuRyx3REFBd0Q7QUFDeEQsc0ZBQXNGO0FBRXRGLHFEQUFxRDtBQUNyRCwwRUFBMEU7QUFDMUUsT0FBTztBQUVQLGdFQUFnRTtBQUVoRSw0RkFBNEY7QUFFNUYsa0RBQWtEO0FBRWxELGdEQUFnRDtBQUNoRCw0Q0FBNEM7QUFDNUMscUNBQXFDO0FBQ3JDLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb25vIGZyb20gJ0Bqc2RldnRvb2xzL29ubydcblxuaW1wb3J0IHtVbmlDb3JlTW5lbW9uaWNQYXJzZUVycm9yLCBVbmlDb3JlV2lmUGFyc2VFcnJvcn0gZnJvbSAnLi9lcnJvcnMnXG5pbXBvcnQgeyBnZW5lcmF0ZU1uZW1vbmljLCBpc1ZhbGlkTW5lbW9uaWMsIG1uZW1vbmljVG9TZWVkIH0gZnJvbSAnLi9rZXlzL2JpcDM5J1xuaW1wb3J0IHsgaGROb2RlVG9QdWJsaWNLZXlCdWZmZXIsIGhkTm9kZVRvUHJpdmF0ZUtleUJ1ZmZlciwgaGRUb0ZpcnN0SGROb2RlLCBzZWVkVG9IZCB9IGZyb20gJy4va2V5cy9oZGtleSdcbmltcG9ydCB7aGRQdWJsaWNUb0VjY1B1YmxpY0tleSwgaGRQcml2YXRlVG9XaWYsIGlzVmFsaWRXaWYsIHByaXZhdGVLZXlUb1B1YmxpYywgd2lmVG9Qcml2YXRlS2V5fSBmcm9tICcuL2tleXMvZWNjJ1xuaW1wb3J0IHsgZ2VuZXJhdGVBY2NvdW50TmFtZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmltcG9ydCB7dG9faGV4LCBhYjJiLCBzaGEyNTYsIGVuY29kZV9iNTgsIGJhc2U2NHVybF9kZWNvZGV9IGZyb20gXCIuL2tleXMvY3J5cHRvXCI7XG5pbXBvcnQgaGFzaCBmcm9tICdoYXNoLmpzJztcblxuY29uc3QgeyBzdWJ0bGUgfSA9IGdsb2JhbFRoaXMuY3J5cHRvO1xuXG5leHBvcnQgY29uc3QgbWFrZUhkTm9kZUJ5TW5lbW9uaWMgPSBhc3luYyAobW5lbW9uaWM6IHN0cmluZykgPT4ge1xuICBpZiAoIWlzVmFsaWRNbmVtb25pYyhtbmVtb25pYykpIHtcbiAgICB0aHJvdyBvbm8obmV3IFVuaUNvcmVNbmVtb25pY1BhcnNlRXJyb3IoJ0ludmFsaWQgbW5lbW9uaWMnKSlcbiAgfVxuXG4gIGNvbnN0IHNlZWQgPSBhd2FpdCBtbmVtb25pY1RvU2VlZChtbmVtb25pYylcbiAgY29uc3QgaGRCYXNlID0gc2VlZFRvSGQoc2VlZClcbiAgY29uc3QgaGRGaXJzdE5vZGUgPSBoZFRvRmlyc3RIZE5vZGUoaGRCYXNlKVxuXG4gIHJldHVybiBoZEZpcnN0Tm9kZVxufVxuXG5cbmV4cG9ydCBjb25zdCBtYWtlUHVibGljS2V5QnlNbmVtb25pYyA9IGFzeW5jIChtbmVtb25pYzogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gYXdhaXQgbWFrZUhkTm9kZUJ5TW5lbW9uaWMobW5lbW9uaWMpXG4gIGNvbnN0IGhkUHVibGljS2V5QnVmZmVyID0gaGROb2RlVG9QdWJsaWNLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG5cbiAgcmV0dXJuIGhkUHVibGljVG9FY2NQdWJsaWNLZXkoaGRQdWJsaWNLZXlCdWZmZXIpXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNjb3VudERhdGEge1xuICBuYW1lOiBzdHJpbmdcbiAgbW5lbW9uaWM6IHN0cmluZ1xuICB3aWY6IHN0cmluZ1xuICBwdWI6IHN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgbWFrZUFjY291bnQgPSAodXNlcm5hbWU6IHN0cmluZywgbW5lbW9uaWM6IHN0cmluZywgd2lmOiBzdHJpbmcsIHB1Yjogc3RyaW5nKTogQWNjb3VudERhdGEgPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IHVzZXJuYW1lLFxuICAgIG1uZW1vbmljLFxuICAgIHdpZixcbiAgICBwdWIsXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VBY2NvdW50QnlNbmVtb25pYyA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCBtbmVtb25pYzogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gYXdhaXQgbWFrZUhkTm9kZUJ5TW5lbW9uaWMobW5lbW9uaWMpXG5cbiAgY29uc3QgaGRQdWJsaWNLZXlCdWZmZXIgPSBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcbiAgY29uc3QgaGRQcml2YXRlS2V5QnVmZmVyID0gaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuXG4gIHJldHVybiBtYWtlQWNjb3VudCh1c2VybmFtZSwgJycsIGhkUHJpdmF0ZVRvV2lmKGhkUHJpdmF0ZUtleUJ1ZmZlciksIGhkUHVibGljVG9FY2NQdWJsaWNLZXkoaGRQdWJsaWNLZXlCdWZmZXIpKVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUFjY291bnRCeVdpZiA9IGFzeW5jICh1c2VybmFtZTogc3RyaW5nLCB3aWY6IHN0cmluZykgPT4ge1xuICBpZiAoIWlzVmFsaWRXaWYod2lmKSkge1xuICAgIHRocm93IG9ubyhuZXcgVW5pQ29yZVdpZlBhcnNlRXJyb3IoJ0ludmFsaWQgd2lmJykpXG4gIH1cblxuICBjb25zdCBwdWJsaWNLZXkgPSBwcml2YXRlS2V5VG9QdWJsaWMod2lmVG9Qcml2YXRlS2V5KHdpZikpLnRvTGVnYWN5U3RyaW5nKClcblxuICByZXR1cm4gbWFrZUFjY291bnQodXNlcm5hbWUsICcnLCB3aWYsIHB1YmxpY0tleSlcbn1cblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQWNjb3VudCA9IGFzeW5jICgpOiBQcm9taXNlPEFjY291bnREYXRhPiA9PiB7XG4gIGNvbnN0IG5hbWUgPSBnZW5lcmF0ZUFjY291bnROYW1lKClcbiAgY29uc3QgbW5lbW9uaWMgPSBnZW5lcmF0ZU1uZW1vbmljKClcbiAgY29uc3Qgc2VlZCA9IGF3YWl0IG1uZW1vbmljVG9TZWVkKG1uZW1vbmljKVxuICBjb25zdCBoZEJhc2UgPSBzZWVkVG9IZChzZWVkKVxuICBjb25zdCBoZEZpcnN0Tm9kZSA9IGhkVG9GaXJzdEhkTm9kZShoZEJhc2UpXG5cbiAgY29uc3QgaGRQdWJsaWNLZXlCdWZmZXIgPSBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcbiAgY29uc3QgaGRQcml2YXRlS2V5QnVmZmVyID0gaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuXG4gIHJldHVybiBtYWtlQWNjb3VudChuYW1lLCBtbmVtb25pYywgaGRQcml2YXRlVG9XaWYoaGRQcml2YXRlS2V5QnVmZmVyKSwgaGRQdWJsaWNUb0VjY1B1YmxpY0tleShoZFB1YmxpY0tleUJ1ZmZlcikpXG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleVBhaXIgPSBhc3luYygpID0+IHtcbiAgY29uc3QgbW5lbW9uaWMgPSBnZW5lcmF0ZU1uZW1vbmljKClcbiAgY29uc3Qgc2VlZCA9IGF3YWl0IG1uZW1vbmljVG9TZWVkKG1uZW1vbmljKVxuICBjb25zdCBoZEJhc2UgPSBzZWVkVG9IZChzZWVkKVxuICBjb25zdCBoZEZpcnN0Tm9kZSA9IGhkVG9GaXJzdEhkTm9kZShoZEJhc2UpXG5cbiAgY29uc3QgaGRQdWJsaWNLZXlCdWZmZXIgPSBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcbiAgY29uc3QgaGRQcml2YXRlS2V5QnVmZmVyID0gaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuICBcbiAgcmV0dXJuIHttbmVtb25pYywgcHJpdmF0ZV9rZXk6IGhkUHJpdmF0ZVRvV2lmKGhkUHJpdmF0ZUtleUJ1ZmZlciksIHB1YmxpY19rZXk6IGhkUHVibGljVG9FY2NQdWJsaWNLZXkoaGRQdWJsaWNLZXlCdWZmZXIpfSAgXG59XG5cbi8vIGV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleVBhaXIgPSBhc3luYygpID0+IHtcbi8vICAgY29uc3QgeyBwcml2YXRlS2V5LCBwdWJsaWNLZXkgfSA9IGF3YWl0IHN1YnRsZS5nZW5lcmF0ZUtleShcbi8vICAge1xuLy8gICAgIG5hbWU6IFwiRUNEU0FcIixcbi8vICAgICBuYW1lZEN1cnZlOiBcIlAtMjU2XCIsXG4vLyAgIH0sXG4vLyAgIHRydWUsXG4vLyAgIFtcInNpZ25cIiwgXCJ2ZXJpZnlcIl1cbi8vICAgKTtcblxuLy8gICBsZXQgcHJpdmF0ZV9qd2sgPSBhd2FpdCBzdWJ0bGUuZXhwb3J0S2V5KFwiandrXCIsIHByaXZhdGVLZXkpXG4gIFxuLy8gICBsZXQgcHJpdmF0ZV9oZXggPSB0b19oZXgoYWIyYihiYXNlNjR1cmxfZGVjb2RlKHByaXZhdGVfandrLmQhKSkpXG4gIFxuLy8gICAvL1NIQS0yNTYgaGFzaCB3aXRoIGEgMHg4MCBieXRlIGluIGZyb250XG4vLyAgIGxldCBwcml2YXRlX20yNTYgID0gYXdhaXQgc2hhMjU2KCc4MCcrIHByaXZhdGVfaGV4IClcblxuLy8gICAvL1NIQS0yNTYgaGFzaCBvZiB0aGUgcHJpdmF0ZSBrZXlcbi8vICAgbGV0IHByaXZhdGVfc2hhMjU2ICA9IGF3YWl0IHNoYTI1Nihwcml2YXRlX20yNTYpXG5cbi8vICAgLy9maXJzdCA0IGJ5dGVzIG9mIHRoZSBzZWNvbmQgU0hBLTI1NiBoYXNoXG4vLyAgIGxldCBwcml2YXRlX2ZvdXIgPSBwcml2YXRlX3NoYTI1Ni5zdWJzdHIoMCw4KTtcblxuLy8gICAvL0Jhc2U1OCBlbmNvZGUgdGhlIGJpbmFyeSBkYXRhIHRvIGdldCBFT1MgcHJpdmF0ZSBrZXlcbi8vICAgbGV0IHByaXZhdGVfd2lmID0gZW5jb2RlX2I1OCgnODAnKyBwcml2YXRlX2hleCArIHByaXZhdGVfZm91cilcbi8vICAgY29uc29sZS5sb2coXCJwcml2YXRlX2p3azogXCIsIHByaXZhdGVfandrKVxuXG4vLyAgIGxldCBwdWJsaWNfandrID0gYXdhaXQgc3VidGxlLmV4cG9ydEtleShcImp3a1wiLCBwdWJsaWNLZXkpO1xuLy8gICBjb25zb2xlLmxvZyhcInB1YmxpY19qd2s6IFwiLCBwdWJsaWNfandrKVxuICBcbi8vICAgY29uc3QgeF9iaW5hcnkgPSBhYjJiKGJhc2U2NHVybF9kZWNvZGUocHVibGljX2p3ay54ISkpO1xuLy8gICBjb25zdCB5X2JpbmFyeSA9IGFiMmIoYmFzZTY0dXJsX2RlY29kZShwdWJsaWNfandrLnkhKSk7XG4vLyAgIGNvbnN0IHB1YmxpY19iaW5hcnkgPSB4X2JpbmFyeS5jb25jYXQoeV9iaW5hcnkpO1xuXG4vLyAgIGNvbnNvbGUubG9nKFwicHVibGljX2JpbmFyeTogXCIsIHB1YmxpY19iaW5hcnkpXG5cbiAgXG4vLyAgIGNvbnN0IHB1YmxpY19yaXBlbWQxNjAgPSBoYXNoLnJpcGVtZDE2MCgpLnVwZGF0ZShuZXcgVWludDhBcnJheShwdWJsaWNfYmluYXJ5KSkuZGlnZXN0KCdoZXgnKTtcbiAgXG4vLyAgIGNvbnNvbGUubG9nKFwicHVibGljX3JpcGVtZDE2MDogXCIsIHB1YmxpY19yaXBlbWQxNjApXG4vLyAgIGxldCBjaGVja3N1bSA9IHB1YmxpY19yaXBlbWQxNjAuc3Vic3RyKDAsIDgpOyAvLyDQn9C10YDQstGL0LUgNCDQsdCw0LnRgtCwLCDQvdC+INCyIGhleCDRhNC+0YDQvNCw0YLQtVxuICBcbi8vICAgbGV0IHB1YmxpY193aXRoX2NoZWNrc3VtID0gcHVibGljX2JpbmFyeS5jb25jYXQoXG4vLyAgICAgICBwdWJsaWNfcmlwZW1kMTYwLnN1YnN0cigwLCA4KS5zcGxpdCgnJykubWFwKHggPT4gcGFyc2VJbnQoeCwgMTYpKVxuLy8gICApO1xuXG4vLyAgIGNvbnNvbGUubG9nKFwicHVibGljX3dpdGhfY2hlY2tzdW06IFwiLCBwdWJsaWNfd2l0aF9jaGVja3N1bSlcblxuLy8gICBsZXQgcHVibGljX2Jhc2U1OCA9IGVuY29kZV9iNTgocHVibGljX3dpdGhfY2hlY2tzdW0ubWFwKHggPT4geC50b1N0cmluZygxNikpLmpvaW4oJycpKTtcblxuLy8gICBjb25zb2xlLmxvZyhcInB1YmxpY19iYXNlNTg6IFwiLCBwdWJsaWNfYmFzZTU4KVxuXG4vLyAgIGxldCBwdWJsaWNfa2V5ID0gXCJQVUJfUjFfXCIgKyBwdWJsaWNfYmFzZTU4O1xuLy8gICBjb25zb2xlLmxvZyhcInB1YmxpY19rZXk6IFwiLCBwdWJsaWNfa2V5KVxuLy8gICByZXR1cm4ge3ByaXZhdGVfd2lmLCBwdWJsaWNfa2V5fVxuLy8gfVxuIl19