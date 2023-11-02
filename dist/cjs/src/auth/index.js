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
exports.generateKeyPair = exports.hasPrivateKey = exports.generateAccount = exports.makeAccountByWif = exports.makeAccountByMnemonic = exports.makeAccount = exports.makePublicKeyByMnemonic = exports.makeHdNodeByMnemonic = void 0;
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
var hasPrivateKey = function (accountData, permissionName) { return __awaiter(void 0, void 0, void 0, function () {
    var permission, hasPublicKeys;
    return __generator(this, function (_a) {
        if (!accountData || !permissionName) {
            return [2 /*return*/, false];
        }
        permission = accountData.permissions.find(function (p) { return p.perm_name === permissionName; });
        if (!permission) {
            return [2 /*return*/, false];
        }
        hasPublicKeys = permission.required_auth.keys.some(function (key) { return key.key && (key.key.startsWith('EOS') || key.key.startsWith('PUB_K1_')); });
        return [2 /*return*/, hasPublicKeys];
    });
}); };
exports.hasPrivateKey = hasPrivateKey;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBaUM7QUFFakMsbUNBQXdFO0FBQ3hFLHNDQUFnRjtBQUNoRixzQ0FBMkc7QUFDM0csa0NBQWtIO0FBQ2xILGlDQUE4QztBQUt0QyxJQUFBLE1BQU0sR0FBSyxVQUFVLENBQUMsTUFBTSxPQUF0QixDQUF1QjtBQUU5QixJQUFNLG9CQUFvQixHQUFHLFVBQU8sUUFBZ0I7Ozs7O2dCQUN6RCxJQUFJLENBQUMsSUFBQSx1QkFBZSxFQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM5QixNQUFNLElBQUEsYUFBRyxFQUFDLElBQUksa0NBQXlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO2lCQUM3RDtnQkFFWSxxQkFBTSxJQUFBLHNCQUFjLEVBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFyQyxJQUFJLEdBQUcsU0FBOEI7Z0JBQ3JDLE1BQU0sR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3ZCLFdBQVcsR0FBRyxJQUFBLHVCQUFlLEVBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRTNDLHNCQUFPLFdBQVcsRUFBQTs7O0tBQ25CLENBQUE7QUFWWSxRQUFBLG9CQUFvQix3QkFVaEM7QUFHTSxJQUFNLHVCQUF1QixHQUFHLFVBQU8sUUFBZ0I7Ozs7b0JBQ3hDLHFCQUFNLElBQUEsNEJBQW9CLEVBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFsRCxXQUFXLEdBQUcsU0FBb0M7Z0JBQ2xELGlCQUFpQixHQUFHLElBQUEsK0JBQXVCLEVBQUMsV0FBVyxDQUFDLENBQUE7Z0JBRTlELHNCQUFPLElBQUEsNEJBQXNCLEVBQUMsaUJBQWlCLENBQUMsRUFBQTs7O0tBQ2pELENBQUE7QUFMWSxRQUFBLHVCQUF1Qiwy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M0QsbUVBQW1FO0FBQ25FLDhDQUE4QztBQUU5QywrREFBK0Q7QUFDL0QsNENBQTRDO0FBRTVDLDREQUE0RDtBQUM1RCw0REFBNEQ7QUFDNUQscURBQXFEO0FBRXJELGtEQUFrRDtBQUdsRCxtR0FBbUc7QUFFbkcsd0RBQXdEO0FBQ3hELHNGQUFzRjtBQUV0RixxREFBcUQ7QUFDckQsMEVBQTBFO0FBQzFFLE9BQU87QUFFUCxnRUFBZ0U7QUFFaEUsNEZBQTRGO0FBRTVGLGtEQUFrRDtBQUVsRCxnREFBZ0Q7QUFDaEQsNENBQTRDO0FBQzVDLHFDQUFxQztBQUNyQyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9ubyBmcm9tICdAanNkZXZ0b29scy9vbm8nXG5cbmltcG9ydCB7VW5pQ29yZU1uZW1vbmljUGFyc2VFcnJvciwgVW5pQ29yZVdpZlBhcnNlRXJyb3J9IGZyb20gJy4vZXJyb3JzJ1xuaW1wb3J0IHsgZ2VuZXJhdGVNbmVtb25pYywgaXNWYWxpZE1uZW1vbmljLCBtbmVtb25pY1RvU2VlZCB9IGZyb20gJy4va2V5cy9iaXAzOSdcbmltcG9ydCB7IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyLCBoZE5vZGVUb1ByaXZhdGVLZXlCdWZmZXIsIGhkVG9GaXJzdEhkTm9kZSwgc2VlZFRvSGQgfSBmcm9tICcuL2tleXMvaGRrZXknXG5pbXBvcnQge2hkUHVibGljVG9FY2NQdWJsaWNLZXksIGhkUHJpdmF0ZVRvV2lmLCBpc1ZhbGlkV2lmLCBwcml2YXRlS2V5VG9QdWJsaWMsIHdpZlRvUHJpdmF0ZUtleX0gZnJvbSAnLi9rZXlzL2VjYydcbmltcG9ydCB7IGdlbmVyYXRlQWNjb3VudE5hbWUgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5pbXBvcnQge3RvX2hleCwgYWIyYiwgc2hhMjU2LCBlbmNvZGVfYjU4LCBiYXNlNjR1cmxfZGVjb2RlfSBmcm9tIFwiLi9rZXlzL2NyeXB0b1wiO1xuaW1wb3J0IGhhc2ggZnJvbSAnaGFzaC5qcyc7XG5cbmNvbnN0IHsgc3VidGxlIH0gPSBnbG9iYWxUaGlzLmNyeXB0bztcblxuZXhwb3J0IGNvbnN0IG1ha2VIZE5vZGVCeU1uZW1vbmljID0gYXN5bmMgKG1uZW1vbmljOiBzdHJpbmcpID0+IHtcbiAgaWYgKCFpc1ZhbGlkTW5lbW9uaWMobW5lbW9uaWMpKSB7XG4gICAgdGhyb3cgb25vKG5ldyBVbmlDb3JlTW5lbW9uaWNQYXJzZUVycm9yKCdJbnZhbGlkIG1uZW1vbmljJykpXG4gIH1cblxuICBjb25zdCBzZWVkID0gYXdhaXQgbW5lbW9uaWNUb1NlZWQobW5lbW9uaWMpXG4gIGNvbnN0IGhkQmFzZSA9IHNlZWRUb0hkKHNlZWQpXG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gaGRUb0ZpcnN0SGROb2RlKGhkQmFzZSlcblxuICByZXR1cm4gaGRGaXJzdE5vZGVcbn1cblxuXG5leHBvcnQgY29uc3QgbWFrZVB1YmxpY0tleUJ5TW5lbW9uaWMgPSBhc3luYyAobW5lbW9uaWM6IHN0cmluZykgPT4ge1xuICBjb25zdCBoZEZpcnN0Tm9kZSA9IGF3YWl0IG1ha2VIZE5vZGVCeU1uZW1vbmljKG1uZW1vbmljKVxuICBjb25zdCBoZFB1YmxpY0tleUJ1ZmZlciA9IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuXG4gIHJldHVybiBoZFB1YmxpY1RvRWNjUHVibGljS2V5KGhkUHVibGljS2V5QnVmZmVyKVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjY291bnREYXRhIHtcbiAgbmFtZTogc3RyaW5nXG4gIG1uZW1vbmljOiBzdHJpbmdcbiAgd2lmOiBzdHJpbmdcbiAgcHViOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VBY2NvdW50ID0gKHVzZXJuYW1lOiBzdHJpbmcsIG1uZW1vbmljOiBzdHJpbmcsIHdpZjogc3RyaW5nLCBwdWI6IHN0cmluZyk6IEFjY291bnREYXRhID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiB1c2VybmFtZSxcbiAgICBtbmVtb25pYyxcbiAgICB3aWYsXG4gICAgcHViLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlQWNjb3VudEJ5TW5lbW9uaWMgPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgbW5lbW9uaWM6IHN0cmluZykgPT4ge1xuICBjb25zdCBoZEZpcnN0Tm9kZSA9IGF3YWl0IG1ha2VIZE5vZGVCeU1uZW1vbmljKG1uZW1vbmljKVxuXG4gIGNvbnN0IGhkUHVibGljS2V5QnVmZmVyID0gaGROb2RlVG9QdWJsaWNLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG4gIGNvbnN0IGhkUHJpdmF0ZUtleUJ1ZmZlciA9IGhkTm9kZVRvUHJpdmF0ZUtleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcblxuICByZXR1cm4gbWFrZUFjY291bnQodXNlcm5hbWUsICcnLCBoZFByaXZhdGVUb1dpZihoZFByaXZhdGVLZXlCdWZmZXIpLCBoZFB1YmxpY1RvRWNjUHVibGljS2V5KGhkUHVibGljS2V5QnVmZmVyKSlcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VBY2NvdW50QnlXaWYgPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgd2lmOiBzdHJpbmcpID0+IHtcbiAgaWYgKCFpc1ZhbGlkV2lmKHdpZikpIHtcbiAgICB0aHJvdyBvbm8obmV3IFVuaUNvcmVXaWZQYXJzZUVycm9yKCdJbnZhbGlkIHdpZicpKVxuICB9XG5cbiAgY29uc3QgcHVibGljS2V5ID0gcHJpdmF0ZUtleVRvUHVibGljKHdpZlRvUHJpdmF0ZUtleSh3aWYpKS50b0xlZ2FjeVN0cmluZygpXG5cbiAgcmV0dXJuIG1ha2VBY2NvdW50KHVzZXJuYW1lLCAnJywgd2lmLCBwdWJsaWNLZXkpXG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUFjY291bnQgPSBhc3luYyAoKTogUHJvbWlzZTxBY2NvdW50RGF0YT4gPT4ge1xuICBjb25zdCBuYW1lID0gZ2VuZXJhdGVBY2NvdW50TmFtZSgpXG4gIGNvbnN0IG1uZW1vbmljID0gZ2VuZXJhdGVNbmVtb25pYygpXG4gIGNvbnN0IHNlZWQgPSBhd2FpdCBtbmVtb25pY1RvU2VlZChtbmVtb25pYylcbiAgY29uc3QgaGRCYXNlID0gc2VlZFRvSGQoc2VlZClcbiAgY29uc3QgaGRGaXJzdE5vZGUgPSBoZFRvRmlyc3RIZE5vZGUoaGRCYXNlKVxuXG4gIGNvbnN0IGhkUHVibGljS2V5QnVmZmVyID0gaGROb2RlVG9QdWJsaWNLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG4gIGNvbnN0IGhkUHJpdmF0ZUtleUJ1ZmZlciA9IGhkTm9kZVRvUHJpdmF0ZUtleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcblxuICByZXR1cm4gbWFrZUFjY291bnQobmFtZSwgbW5lbW9uaWMsIGhkUHJpdmF0ZVRvV2lmKGhkUHJpdmF0ZUtleUJ1ZmZlciksIGhkUHVibGljVG9FY2NQdWJsaWNLZXkoaGRQdWJsaWNLZXlCdWZmZXIpKVxufVxuXG5leHBvcnQgY29uc3QgaGFzUHJpdmF0ZUtleSA9IGFzeW5jKGFjY291bnREYXRhOiBhbnksIHBlcm1pc3Npb25OYW1lOiBhbnkpID0+IHtcbiAgaWYgKCFhY2NvdW50RGF0YSB8fCAhcGVybWlzc2lvbk5hbWUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBwZXJtaXNzaW9uID0gYWNjb3VudERhdGEucGVybWlzc2lvbnMuZmluZCgocCA6IGFueSkgPT4gcC5wZXJtX25hbWUgPT09IHBlcm1pc3Npb25OYW1lKTtcbiAgaWYgKCFwZXJtaXNzaW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgaGFzUHVibGljS2V5cyA9IHBlcm1pc3Npb24ucmVxdWlyZWRfYXV0aC5rZXlzLnNvbWUoKGtleSA6IGFueSkgPT4ga2V5LmtleSAmJiAoa2V5LmtleS5zdGFydHNXaXRoKCdFT1MnKSB8fCBrZXkua2V5LnN0YXJ0c1dpdGgoJ1BVQl9LMV8nKSkpO1xuICBcbiAgcmV0dXJuIGhhc1B1YmxpY0tleXM7XG5cbn1cblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlS2V5UGFpciA9IGFzeW5jKCkgPT4ge1xuICBjb25zdCBtbmVtb25pYyA9IGdlbmVyYXRlTW5lbW9uaWMoKVxuICBjb25zdCBzZWVkID0gYXdhaXQgbW5lbW9uaWNUb1NlZWQobW5lbW9uaWMpXG4gIGNvbnN0IGhkQmFzZSA9IHNlZWRUb0hkKHNlZWQpXG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gaGRUb0ZpcnN0SGROb2RlKGhkQmFzZSlcblxuICBjb25zdCBoZFB1YmxpY0tleUJ1ZmZlciA9IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuICBjb25zdCBoZFByaXZhdGVLZXlCdWZmZXIgPSBoZE5vZGVUb1ByaXZhdGVLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG4gIFxuICByZXR1cm4ge21uZW1vbmljLCBwcml2YXRlX2tleTogaGRQcml2YXRlVG9XaWYoaGRQcml2YXRlS2V5QnVmZmVyKSwgcHVibGljX2tleTogaGRQdWJsaWNUb0VjY1B1YmxpY0tleShoZFB1YmxpY0tleUJ1ZmZlcil9ICBcbn1cbi8vIGV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleVBhaXIgPSBhc3luYygpID0+IHtcbi8vICAgY29uc3QgeyBwcml2YXRlS2V5LCBwdWJsaWNLZXkgfSA9IGF3YWl0IHN1YnRsZS5nZW5lcmF0ZUtleShcbi8vICAge1xuLy8gICAgIG5hbWU6IFwiRUNEU0FcIixcbi8vICAgICBuYW1lZEN1cnZlOiBcIlAtMjU2XCIsXG4vLyAgIH0sXG4vLyAgIHRydWUsXG4vLyAgIFtcInNpZ25cIiwgXCJ2ZXJpZnlcIl1cbi8vICAgKTtcblxuLy8gICBsZXQgcHJpdmF0ZV9qd2sgPSBhd2FpdCBzdWJ0bGUuZXhwb3J0S2V5KFwiandrXCIsIHByaXZhdGVLZXkpXG4gIFxuLy8gICBsZXQgcHJpdmF0ZV9oZXggPSB0b19oZXgoYWIyYihiYXNlNjR1cmxfZGVjb2RlKHByaXZhdGVfandrLmQhKSkpXG4gIFxuLy8gICAvL1NIQS0yNTYgaGFzaCB3aXRoIGEgMHg4MCBieXRlIGluIGZyb250XG4vLyAgIGxldCBwcml2YXRlX20yNTYgID0gYXdhaXQgc2hhMjU2KCc4MCcrIHByaXZhdGVfaGV4IClcblxuLy8gICAvL1NIQS0yNTYgaGFzaCBvZiB0aGUgcHJpdmF0ZSBrZXlcbi8vICAgbGV0IHByaXZhdGVfc2hhMjU2ICA9IGF3YWl0IHNoYTI1Nihwcml2YXRlX20yNTYpXG5cbi8vICAgLy9maXJzdCA0IGJ5dGVzIG9mIHRoZSBzZWNvbmQgU0hBLTI1NiBoYXNoXG4vLyAgIGxldCBwcml2YXRlX2ZvdXIgPSBwcml2YXRlX3NoYTI1Ni5zdWJzdHIoMCw4KTtcblxuLy8gICAvL0Jhc2U1OCBlbmNvZGUgdGhlIGJpbmFyeSBkYXRhIHRvIGdldCBFT1MgcHJpdmF0ZSBrZXlcbi8vICAgbGV0IHByaXZhdGVfd2lmID0gZW5jb2RlX2I1OCgnODAnKyBwcml2YXRlX2hleCArIHByaXZhdGVfZm91cilcbi8vICAgY29uc29sZS5sb2coXCJwcml2YXRlX2p3azogXCIsIHByaXZhdGVfandrKVxuXG4vLyAgIGxldCBwdWJsaWNfandrID0gYXdhaXQgc3VidGxlLmV4cG9ydEtleShcImp3a1wiLCBwdWJsaWNLZXkpO1xuLy8gICBjb25zb2xlLmxvZyhcInB1YmxpY19qd2s6IFwiLCBwdWJsaWNfandrKVxuICBcbi8vICAgY29uc3QgeF9iaW5hcnkgPSBhYjJiKGJhc2U2NHVybF9kZWNvZGUocHVibGljX2p3ay54ISkpO1xuLy8gICBjb25zdCB5X2JpbmFyeSA9IGFiMmIoYmFzZTY0dXJsX2RlY29kZShwdWJsaWNfandrLnkhKSk7XG4vLyAgIGNvbnN0IHB1YmxpY19iaW5hcnkgPSB4X2JpbmFyeS5jb25jYXQoeV9iaW5hcnkpO1xuXG4vLyAgIGNvbnNvbGUubG9nKFwicHVibGljX2JpbmFyeTogXCIsIHB1YmxpY19iaW5hcnkpXG5cbiAgXG4vLyAgIGNvbnN0IHB1YmxpY19yaXBlbWQxNjAgPSBoYXNoLnJpcGVtZDE2MCgpLnVwZGF0ZShuZXcgVWludDhBcnJheShwdWJsaWNfYmluYXJ5KSkuZGlnZXN0KCdoZXgnKTtcbiAgXG4vLyAgIGNvbnNvbGUubG9nKFwicHVibGljX3JpcGVtZDE2MDogXCIsIHB1YmxpY19yaXBlbWQxNjApXG4vLyAgIGxldCBjaGVja3N1bSA9IHB1YmxpY19yaXBlbWQxNjAuc3Vic3RyKDAsIDgpOyAvLyDQn9C10YDQstGL0LUgNCDQsdCw0LnRgtCwLCDQvdC+INCyIGhleCDRhNC+0YDQvNCw0YLQtVxuICBcbi8vICAgbGV0IHB1YmxpY193aXRoX2NoZWNrc3VtID0gcHVibGljX2JpbmFyeS5jb25jYXQoXG4vLyAgICAgICBwdWJsaWNfcmlwZW1kMTYwLnN1YnN0cigwLCA4KS5zcGxpdCgnJykubWFwKHggPT4gcGFyc2VJbnQoeCwgMTYpKVxuLy8gICApO1xuXG4vLyAgIGNvbnNvbGUubG9nKFwicHVibGljX3dpdGhfY2hlY2tzdW06IFwiLCBwdWJsaWNfd2l0aF9jaGVja3N1bSlcblxuLy8gICBsZXQgcHVibGljX2Jhc2U1OCA9IGVuY29kZV9iNTgocHVibGljX3dpdGhfY2hlY2tzdW0ubWFwKHggPT4geC50b1N0cmluZygxNikpLmpvaW4oJycpKTtcblxuLy8gICBjb25zb2xlLmxvZyhcInB1YmxpY19iYXNlNTg6IFwiLCBwdWJsaWNfYmFzZTU4KVxuXG4vLyAgIGxldCBwdWJsaWNfa2V5ID0gXCJQVUJfUjFfXCIgKyBwdWJsaWNfYmFzZTU4O1xuLy8gICBjb25zb2xlLmxvZyhcInB1YmxpY19rZXk6IFwiLCBwdWJsaWNfa2V5KVxuLy8gICByZXR1cm4ge3ByaXZhdGVfd2lmLCBwdWJsaWNfa2V5fVxuLy8gfVxuIl19