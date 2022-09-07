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
import ono from '@jsdevtools/ono';
import { UniCoreMnemonicParseError, UniCoreWifParseError } from './errors';
import { generateMnemonic, isValidMnemonic, mnemonicToSeed } from './keys/bip39';
import { hdNodeToPublicKeyBuffer, hdNodeToPrivateKeyBuffer, hdToFirstHdNode, seedToHd } from './keys/hdkey';
import { hdPublicToEccPublicKey, hdPrivateToWif, isValidWif, privateKeyToPublic, wifToPrivateKey } from './keys/ecc';
import { generateAccountName } from "./utils";
export var makeHdNodeByMnemonic = function (mnemonic) { return __awaiter(void 0, void 0, void 0, function () {
    var seed, hdBase, hdFirstNode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isValidMnemonic(mnemonic)) {
                    throw ono(new UniCoreMnemonicParseError('Invalid mnemonic'));
                }
                return [4 /*yield*/, mnemonicToSeed(mnemonic)];
            case 1:
                seed = _a.sent();
                hdBase = seedToHd(seed);
                hdFirstNode = hdToFirstHdNode(hdBase);
                return [2 /*return*/, hdFirstNode];
        }
    });
}); };
export var makePublicKeyByMnemonic = function (mnemonic) { return __awaiter(void 0, void 0, void 0, function () {
    var hdFirstNode, hdPublicKeyBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, makeHdNodeByMnemonic(mnemonic)];
            case 1:
                hdFirstNode = _a.sent();
                hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode);
                return [2 /*return*/, hdPublicToEccPublicKey(hdPublicKeyBuffer)];
        }
    });
}); };
export var makeAccount = function (username, mnemonic, wif, pub) {
    return {
        name: username,
        mnemonic: mnemonic,
        wif: wif,
        pub: pub,
    };
};
export var makeAccountByMnemonic = function (username, mnemonic) { return __awaiter(void 0, void 0, void 0, function () {
    var hdFirstNode, hdPublicKeyBuffer, hdPrivateKeyBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, makeHdNodeByMnemonic(mnemonic)];
            case 1:
                hdFirstNode = _a.sent();
                hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode);
                hdPrivateKeyBuffer = hdNodeToPrivateKeyBuffer(hdFirstNode);
                return [2 /*return*/, makeAccount(username, '', hdPrivateToWif(hdPrivateKeyBuffer), hdPublicToEccPublicKey(hdPublicKeyBuffer))];
        }
    });
}); };
export var makeAccountByWif = function (username, wif) { return __awaiter(void 0, void 0, void 0, function () {
    var publicKey;
    return __generator(this, function (_a) {
        if (!isValidWif(wif)) {
            throw ono(new UniCoreWifParseError('Invalid wif'));
        }
        publicKey = privateKeyToPublic(wifToPrivateKey(wif)).toLegacyString();
        return [2 /*return*/, makeAccount(username, '', wif, publicKey)];
    });
}); };
export var generateAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var name, mnemonic, seed, hdBase, hdFirstNode, hdPublicKeyBuffer, hdPrivateKeyBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = generateAccountName();
                mnemonic = generateMnemonic();
                return [4 /*yield*/, mnemonicToSeed(mnemonic)];
            case 1:
                seed = _a.sent();
                hdBase = seedToHd(seed);
                hdFirstNode = hdToFirstHdNode(hdBase);
                hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode);
                hdPrivateKeyBuffer = hdNodeToPrivateKeyBuffer(hdFirstNode);
                return [2 /*return*/, makeAccount(name, mnemonic, hdPrivateToWif(hdPrivateKeyBuffer), hdPublicToEccPublicKey(hdPublicKeyBuffer))];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQTtBQUVqQyxPQUFPLEVBQUMseUJBQXlCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxVQUFVLENBQUE7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDM0csT0FBTyxFQUFDLHNCQUFzQixFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFDLE1BQU0sWUFBWSxDQUFBO0FBQ2xILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUU5QyxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRyxVQUFPLFFBQWdCOzs7OztnQkFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDOUIsTUFBTSxHQUFHLENBQUMsSUFBSSx5QkFBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUE7aUJBQzdEO2dCQUVZLHFCQUFNLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBQTs7Z0JBQXJDLElBQUksR0FBRyxTQUE4QjtnQkFDckMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdkIsV0FBVyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFFM0Msc0JBQU8sV0FBVyxFQUFBOzs7S0FDbkIsQ0FBQTtBQUdELE1BQU0sQ0FBQyxJQUFNLHVCQUF1QixHQUFHLFVBQU8sUUFBZ0I7Ozs7b0JBQ3hDLHFCQUFNLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFBOztnQkFBbEQsV0FBVyxHQUFHLFNBQW9DO2dCQUNsRCxpQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFFOUQsc0JBQU8sc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsRUFBQTs7O0tBQ2pELENBQUE7QUFTRCxNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUcsVUFBQyxRQUFnQixFQUFFLFFBQWdCLEVBQUUsR0FBVyxFQUFFLEdBQVc7SUFDdEYsT0FBTztRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxVQUFBO1FBQ1IsR0FBRyxLQUFBO1FBQ0gsR0FBRyxLQUFBO0tBQ0osQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFHLFVBQU8sUUFBZ0IsRUFBRSxRQUFnQjs7OztvQkFDeEQscUJBQU0sb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFsRCxXQUFXLEdBQUcsU0FBb0M7Z0JBRWxELGlCQUFpQixHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUN4RCxrQkFBa0IsR0FBRyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFFaEUsc0JBQU8sV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFBOzs7S0FDaEgsQ0FBQTtBQUVELE1BQU0sQ0FBQyxJQUFNLGdCQUFnQixHQUFHLFVBQU8sUUFBZ0IsRUFBRSxHQUFXOzs7UUFDbEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwQixNQUFNLEdBQUcsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7U0FDbkQ7UUFFSyxTQUFTLEdBQUcsa0JBQWtCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUE7UUFFM0Usc0JBQU8sV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFBOztLQUNqRCxDQUFBO0FBRUQsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHOzs7OztnQkFDdkIsSUFBSSxHQUFHLG1CQUFtQixFQUFFLENBQUE7Z0JBQzVCLFFBQVEsR0FBRyxnQkFBZ0IsRUFBRSxDQUFBO2dCQUN0QixxQkFBTSxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUFyQyxJQUFJLEdBQUcsU0FBOEI7Z0JBQ3JDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3ZCLFdBQVcsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRXJDLGlCQUFpQixHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUN4RCxrQkFBa0IsR0FBRyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQTtnQkFFaEUsc0JBQU8sV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFBOzs7S0FDbEgsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbm8gZnJvbSAnQGpzZGV2dG9vbHMvb25vJ1xuXG5pbXBvcnQge1VuaUNvcmVNbmVtb25pY1BhcnNlRXJyb3IsIFVuaUNvcmVXaWZQYXJzZUVycm9yfSBmcm9tICcuL2Vycm9ycydcbmltcG9ydCB7IGdlbmVyYXRlTW5lbW9uaWMsIGlzVmFsaWRNbmVtb25pYywgbW5lbW9uaWNUb1NlZWQgfSBmcm9tICcuL2tleXMvYmlwMzknXG5pbXBvcnQgeyBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlciwgaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyLCBoZFRvRmlyc3RIZE5vZGUsIHNlZWRUb0hkIH0gZnJvbSAnLi9rZXlzL2hka2V5J1xuaW1wb3J0IHtoZFB1YmxpY1RvRWNjUHVibGljS2V5LCBoZFByaXZhdGVUb1dpZiwgaXNWYWxpZFdpZiwgcHJpdmF0ZUtleVRvUHVibGljLCB3aWZUb1ByaXZhdGVLZXl9IGZyb20gJy4va2V5cy9lY2MnXG5pbXBvcnQgeyBnZW5lcmF0ZUFjY291bnROYW1lIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGNvbnN0IG1ha2VIZE5vZGVCeU1uZW1vbmljID0gYXN5bmMgKG1uZW1vbmljOiBzdHJpbmcpID0+IHtcbiAgaWYgKCFpc1ZhbGlkTW5lbW9uaWMobW5lbW9uaWMpKSB7XG4gICAgdGhyb3cgb25vKG5ldyBVbmlDb3JlTW5lbW9uaWNQYXJzZUVycm9yKCdJbnZhbGlkIG1uZW1vbmljJykpXG4gIH1cblxuICBjb25zdCBzZWVkID0gYXdhaXQgbW5lbW9uaWNUb1NlZWQobW5lbW9uaWMpXG4gIGNvbnN0IGhkQmFzZSA9IHNlZWRUb0hkKHNlZWQpXG4gIGNvbnN0IGhkRmlyc3ROb2RlID0gaGRUb0ZpcnN0SGROb2RlKGhkQmFzZSlcblxuICByZXR1cm4gaGRGaXJzdE5vZGVcbn1cblxuXG5leHBvcnQgY29uc3QgbWFrZVB1YmxpY0tleUJ5TW5lbW9uaWMgPSBhc3luYyAobW5lbW9uaWM6IHN0cmluZykgPT4ge1xuICBjb25zdCBoZEZpcnN0Tm9kZSA9IGF3YWl0IG1ha2VIZE5vZGVCeU1uZW1vbmljKG1uZW1vbmljKVxuICBjb25zdCBoZFB1YmxpY0tleUJ1ZmZlciA9IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyKGhkRmlyc3ROb2RlKVxuXG4gIHJldHVybiBoZFB1YmxpY1RvRWNjUHVibGljS2V5KGhkUHVibGljS2V5QnVmZmVyKVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjY291bnREYXRhIHtcbiAgbmFtZTogc3RyaW5nXG4gIG1uZW1vbmljOiBzdHJpbmdcbiAgd2lmOiBzdHJpbmdcbiAgcHViOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VBY2NvdW50ID0gKHVzZXJuYW1lOiBzdHJpbmcsIG1uZW1vbmljOiBzdHJpbmcsIHdpZjogc3RyaW5nLCBwdWI6IHN0cmluZyk6IEFjY291bnREYXRhID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiB1c2VybmFtZSxcbiAgICBtbmVtb25pYyxcbiAgICB3aWYsXG4gICAgcHViLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBtYWtlQWNjb3VudEJ5TW5lbW9uaWMgPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgbW5lbW9uaWM6IHN0cmluZykgPT4ge1xuICBjb25zdCBoZEZpcnN0Tm9kZSA9IGF3YWl0IG1ha2VIZE5vZGVCeU1uZW1vbmljKG1uZW1vbmljKVxuXG4gIGNvbnN0IGhkUHVibGljS2V5QnVmZmVyID0gaGROb2RlVG9QdWJsaWNLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG4gIGNvbnN0IGhkUHJpdmF0ZUtleUJ1ZmZlciA9IGhkTm9kZVRvUHJpdmF0ZUtleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcblxuICByZXR1cm4gbWFrZUFjY291bnQodXNlcm5hbWUsICcnLCBoZFByaXZhdGVUb1dpZihoZFByaXZhdGVLZXlCdWZmZXIpLCBoZFB1YmxpY1RvRWNjUHVibGljS2V5KGhkUHVibGljS2V5QnVmZmVyKSlcbn1cblxuZXhwb3J0IGNvbnN0IG1ha2VBY2NvdW50QnlXaWYgPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgd2lmOiBzdHJpbmcpID0+IHtcbiAgaWYgKCFpc1ZhbGlkV2lmKHdpZikpIHtcbiAgICB0aHJvdyBvbm8obmV3IFVuaUNvcmVXaWZQYXJzZUVycm9yKCdJbnZhbGlkIHdpZicpKVxuICB9XG5cbiAgY29uc3QgcHVibGljS2V5ID0gcHJpdmF0ZUtleVRvUHVibGljKHdpZlRvUHJpdmF0ZUtleSh3aWYpKS50b0xlZ2FjeVN0cmluZygpXG5cbiAgcmV0dXJuIG1ha2VBY2NvdW50KHVzZXJuYW1lLCAnJywgd2lmLCBwdWJsaWNLZXkpXG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUFjY291bnQgPSBhc3luYyAoKTogUHJvbWlzZTxBY2NvdW50RGF0YT4gPT4ge1xuICBjb25zdCBuYW1lID0gZ2VuZXJhdGVBY2NvdW50TmFtZSgpXG4gIGNvbnN0IG1uZW1vbmljID0gZ2VuZXJhdGVNbmVtb25pYygpXG4gIGNvbnN0IHNlZWQgPSBhd2FpdCBtbmVtb25pY1RvU2VlZChtbmVtb25pYylcbiAgY29uc3QgaGRCYXNlID0gc2VlZFRvSGQoc2VlZClcbiAgY29uc3QgaGRGaXJzdE5vZGUgPSBoZFRvRmlyc3RIZE5vZGUoaGRCYXNlKVxuXG4gIGNvbnN0IGhkUHVibGljS2V5QnVmZmVyID0gaGROb2RlVG9QdWJsaWNLZXlCdWZmZXIoaGRGaXJzdE5vZGUpXG4gIGNvbnN0IGhkUHJpdmF0ZUtleUJ1ZmZlciA9IGhkTm9kZVRvUHJpdmF0ZUtleUJ1ZmZlcihoZEZpcnN0Tm9kZSlcblxuICByZXR1cm4gbWFrZUFjY291bnQobmFtZSwgbW5lbW9uaWMsIGhkUHJpdmF0ZVRvV2lmKGhkUHJpdmF0ZUtleUJ1ZmZlciksIGhkUHVibGljVG9FY2NQdWJsaWNLZXkoaGRQdWJsaWNLZXlCdWZmZXIpKVxufVxuIl19