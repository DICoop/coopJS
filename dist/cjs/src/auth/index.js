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
exports.generateAccount = exports.makeAccountByWif = exports.makeAccountByMnemonic = exports.makeAccount = exports.makePublicKeyByMnemonic = exports.makeHdNodeByMnemonic = void 0;
var ono_1 = __importDefault(require("@jsdevtools/ono"));
var errors_1 = require("./errors");
var bip39_1 = require("./keys/bip39");
var hdkey_1 = require("./keys/hdkey");
var ecc_1 = require("./keys/ecc");
var utils_1 = require("./utils");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBaUM7QUFFakMsbUNBQXdFO0FBQ3hFLHNDQUFnRjtBQUNoRixzQ0FBMkc7QUFDM0csa0NBQWtIO0FBQ2xILGlDQUE4QztBQUV2QyxJQUFNLG9CQUFvQixHQUFHLFVBQU8sUUFBZ0I7Ozs7O2dCQUN6RCxJQUFJLENBQUMsSUFBQSx1QkFBZSxFQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM5QixNQUFNLElBQUEsYUFBRyxFQUFDLElBQUksa0NBQXlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO2lCQUM3RDtnQkFFWSxxQkFBTSxJQUFBLHNCQUFjLEVBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFyQyxJQUFJLEdBQUcsU0FBOEI7Z0JBQ3JDLE1BQU0sR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3ZCLFdBQVcsR0FBRyxJQUFBLHVCQUFlLEVBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRTNDLHNCQUFPLFdBQVcsRUFBQTs7O0tBQ25CLENBQUE7QUFWWSxRQUFBLG9CQUFvQix3QkFVaEM7QUFHTSxJQUFNLHVCQUF1QixHQUFHLFVBQU8sUUFBZ0I7Ozs7b0JBQ3hDLHFCQUFNLElBQUEsNEJBQW9CLEVBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFsRCxXQUFXLEdBQUcsU0FBb0M7Z0JBQ2xELGlCQUFpQixHQUFHLElBQUEsK0JBQXVCLEVBQUMsV0FBVyxDQUFDLENBQUE7Z0JBRTlELHNCQUFPLElBQUEsNEJBQXNCLEVBQUMsaUJBQWlCLENBQUMsRUFBQTs7O0tBQ2pELENBQUE7QUFMWSxRQUFBLHVCQUF1QiwyQkFLbkM7QUFTTSxJQUFNLFdBQVcsR0FBRyxVQUFDLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxHQUFXLEVBQUUsR0FBVztJQUN0RixPQUFPO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLFVBQUE7UUFDUixHQUFHLEtBQUE7UUFDSCxHQUFHLEtBQUE7S0FDSixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBUFksUUFBQSxXQUFXLGVBT3ZCO0FBRU0sSUFBTSxxQkFBcUIsR0FBRyxVQUFPLFFBQWdCLEVBQUUsUUFBZ0I7Ozs7b0JBQ3hELHFCQUFNLElBQUEsNEJBQW9CLEVBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFsRCxXQUFXLEdBQUcsU0FBb0M7Z0JBRWxELGlCQUFpQixHQUFHLElBQUEsK0JBQXVCLEVBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQ3hELGtCQUFrQixHQUFHLElBQUEsZ0NBQXdCLEVBQUMsV0FBVyxDQUFDLENBQUE7Z0JBRWhFLHNCQUFPLElBQUEsbUJBQVcsRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUEsb0JBQWMsRUFBQyxrQkFBa0IsQ0FBQyxFQUFFLElBQUEsNEJBQXNCLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFBOzs7S0FDaEgsQ0FBQTtBQVBZLFFBQUEscUJBQXFCLHlCQU9qQztBQUVNLElBQU0sZ0JBQWdCLEdBQUcsVUFBTyxRQUFnQixFQUFFLEdBQVc7OztRQUNsRSxJQUFJLENBQUMsSUFBQSxnQkFBVSxFQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sSUFBQSxhQUFHLEVBQUMsSUFBSSw2QkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO1NBQ25EO1FBRUssU0FBUyxHQUFHLElBQUEsd0JBQWtCLEVBQUMsSUFBQSxxQkFBZSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7UUFFM0Usc0JBQU8sSUFBQSxtQkFBVyxFQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFBOztLQUNqRCxDQUFBO0FBUlksUUFBQSxnQkFBZ0Isb0JBUTVCO0FBRU0sSUFBTSxlQUFlLEdBQUc7Ozs7O2dCQUN2QixJQUFJLEdBQUcsSUFBQSwyQkFBbUIsR0FBRSxDQUFBO2dCQUM1QixRQUFRLEdBQUcsSUFBQSx3QkFBZ0IsR0FBRSxDQUFBO2dCQUN0QixxQkFBTSxJQUFBLHNCQUFjLEVBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFyQyxJQUFJLEdBQUcsU0FBOEI7Z0JBQ3JDLE1BQU0sR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3ZCLFdBQVcsR0FBRyxJQUFBLHVCQUFlLEVBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRXJDLGlCQUFpQixHQUFHLElBQUEsK0JBQXVCLEVBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQ3hELGtCQUFrQixHQUFHLElBQUEsZ0NBQXdCLEVBQUMsV0FBVyxDQUFDLENBQUE7Z0JBRWhFLHNCQUFPLElBQUEsbUJBQVcsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUEsb0JBQWMsRUFBQyxrQkFBa0IsQ0FBQyxFQUFFLElBQUEsNEJBQXNCLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFBOzs7S0FDbEgsQ0FBQTtBQVhZLFFBQUEsZUFBZSxtQkFXM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb25vIGZyb20gJ0Bqc2RldnRvb2xzL29ubydcblxuaW1wb3J0IHtVbmlDb3JlTW5lbW9uaWNQYXJzZUVycm9yLCBVbmlDb3JlV2lmUGFyc2VFcnJvcn0gZnJvbSAnLi9lcnJvcnMnXG5pbXBvcnQgeyBnZW5lcmF0ZU1uZW1vbmljLCBpc1ZhbGlkTW5lbW9uaWMsIG1uZW1vbmljVG9TZWVkIH0gZnJvbSAnLi9rZXlzL2JpcDM5J1xuaW1wb3J0IHsgaGROb2RlVG9QdWJsaWNLZXlCdWZmZXIsIGhkTm9kZVRvUHJpdmF0ZUtleUJ1ZmZlciwgaGRUb0ZpcnN0SGROb2RlLCBzZWVkVG9IZCB9IGZyb20gJy4va2V5cy9oZGtleSdcbmltcG9ydCB7aGRQdWJsaWNUb0VjY1B1YmxpY0tleSwgaGRQcml2YXRlVG9XaWYsIGlzVmFsaWRXaWYsIHByaXZhdGVLZXlUb1B1YmxpYywgd2lmVG9Qcml2YXRlS2V5fSBmcm9tICcuL2tleXMvZWNjJ1xuaW1wb3J0IHsgZ2VuZXJhdGVBY2NvdW50TmFtZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBjb25zdCBtYWtlSGROb2RlQnlNbmVtb25pYyA9IGFzeW5jIChtbmVtb25pYzogc3RyaW5nKSA9PiB7XG4gIGlmICghaXNWYWxpZE1uZW1vbmljKG1uZW1vbmljKSkge1xuICAgIHRocm93IG9ubyhuZXcgVW5pQ29yZU1uZW1vbmljUGFyc2VFcnJvcignSW52YWxpZCBtbmVtb25pYycpKVxuICB9XG5cbiAgY29uc3Qgc2VlZCA9IGF3YWl0IG1uZW1vbmljVG9TZWVkKG1uZW1vbmljKVxuICBjb25zdCBoZEJhc2UgPSBzZWVkVG9IZChzZWVkKVxuICBjb25zdCBoZEZpcnN0Tm9kZSA9IGhkVG9GaXJzdEhkTm9kZShoZEJhc2UpXG5cbiAgcmV0dXJuIGhkRmlyc3ROb2RlXG59XG5cblxuZXhwb3J0IGNvbnN0IG1ha2VQdWJsaWNLZXlCeU1uZW1vbmljID0gYXN5bmMgKG1uZW1vbmljOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgaGRGaXJzdE5vZGUgPSBhd2FpdCBtYWtlSGROb2RlQnlNbmVtb25pYyhtbmVtb25pYylcbiAgY29uc3QgaGRQdWJsaWNLZXlCdWZmZXIgPSBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcblxuICByZXR1cm4gaGRQdWJsaWNUb0VjY1B1YmxpY0tleShoZFB1YmxpY0tleUJ1ZmZlcilcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBY2NvdW50RGF0YSB7XG4gIG5hbWU6IHN0cmluZ1xuICBtbmVtb25pYzogc3RyaW5nXG4gIHdpZjogc3RyaW5nXG4gIHB1Yjogc3RyaW5nXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlQWNjb3VudCA9ICh1c2VybmFtZTogc3RyaW5nLCBtbmVtb25pYzogc3RyaW5nLCB3aWY6IHN0cmluZywgcHViOiBzdHJpbmcpOiBBY2NvdW50RGF0YSA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogdXNlcm5hbWUsXG4gICAgbW5lbW9uaWMsXG4gICAgd2lmLFxuICAgIHB1YixcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFrZUFjY291bnRCeU1uZW1vbmljID0gYXN5bmMgKHVzZXJuYW1lOiBzdHJpbmcsIG1uZW1vbmljOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgaGRGaXJzdE5vZGUgPSBhd2FpdCBtYWtlSGROb2RlQnlNbmVtb25pYyhtbmVtb25pYylcblxuICBjb25zdCBoZFB1YmxpY0tleUJ1ZmZlciA9IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuICBjb25zdCBoZFByaXZhdGVLZXlCdWZmZXIgPSBoZE5vZGVUb1ByaXZhdGVLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG5cbiAgcmV0dXJuIG1ha2VBY2NvdW50KHVzZXJuYW1lLCAnJywgaGRQcml2YXRlVG9XaWYoaGRQcml2YXRlS2V5QnVmZmVyKSwgaGRQdWJsaWNUb0VjY1B1YmxpY0tleShoZFB1YmxpY0tleUJ1ZmZlcikpXG59XG5cbmV4cG9ydCBjb25zdCBtYWtlQWNjb3VudEJ5V2lmID0gYXN5bmMgKHVzZXJuYW1lOiBzdHJpbmcsIHdpZjogc3RyaW5nKSA9PiB7XG4gIGlmICghaXNWYWxpZFdpZih3aWYpKSB7XG4gICAgdGhyb3cgb25vKG5ldyBVbmlDb3JlV2lmUGFyc2VFcnJvcignSW52YWxpZCB3aWYnKSlcbiAgfVxuXG4gIGNvbnN0IHB1YmxpY0tleSA9IHByaXZhdGVLZXlUb1B1YmxpYyh3aWZUb1ByaXZhdGVLZXkod2lmKSkudG9MZWdhY3lTdHJpbmcoKVxuXG4gIHJldHVybiBtYWtlQWNjb3VudCh1c2VybmFtZSwgJycsIHdpZiwgcHVibGljS2V5KVxufVxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVBY2NvdW50ID0gYXN5bmMgKCk6IFByb21pc2U8QWNjb3VudERhdGE+ID0+IHtcbiAgY29uc3QgbmFtZSA9IGdlbmVyYXRlQWNjb3VudE5hbWUoKVxuICBjb25zdCBtbmVtb25pYyA9IGdlbmVyYXRlTW5lbW9uaWMoKVxuICBjb25zdCBzZWVkID0gYXdhaXQgbW5lbW9uaWNUb1NlZWQobW5lbW9uaWMpXG4gIGNvbnN0IGhkQmFzZSA9IHNlZWRUb0hkKHNlZWQpXG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gaGRUb0ZpcnN0SGROb2RlKGhkQmFzZSlcblxuICBjb25zdCBoZFB1YmxpY0tleUJ1ZmZlciA9IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuICBjb25zdCBoZFByaXZhdGVLZXlCdWZmZXIgPSBoZE5vZGVUb1ByaXZhdGVLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG5cbiAgcmV0dXJuIG1ha2VBY2NvdW50KG5hbWUsIG1uZW1vbmljLCBoZFByaXZhdGVUb1dpZihoZFByaXZhdGVLZXlCdWZmZXIpLCBoZFB1YmxpY1RvRWNjUHVibGljS2V5KGhkUHVibGljS2V5QnVmZmVyKSlcbn1cbiJdfQ==