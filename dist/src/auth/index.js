"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePublicKeyByMnemonic = void 0;
const ono_1 = __importDefault(require("@jsdevtools/ono"));
const errors_1 = require("./errors");
const bip39_1 = require("./keys/bip39");
const hdkey_1 = require("./keys/hdkey");
const ecc_1 = require("./keys/ecc");
const makePublicKeyByMnemonic = async (mnemonic) => {
    if (!(0, bip39_1.isValidMnemonic)(mnemonic)) {
        throw (0, ono_1.default)(new errors_1.UniCoreMnemonicParseError('Invalid mnemonic'));
    }
    const seed = await (0, bip39_1.mnemonicToSeed)(mnemonic);
    const hdBase = (0, hdkey_1.seedToHd)(seed);
    const hdFirstNode = (0, hdkey_1.hdToFirstHdNode)(hdBase);
    const hdPublicKeyBuffer = (0, hdkey_1.hdNodeToPublicKeyBuffer)(hdFirstNode);
    return (0, ecc_1.hdPublicToEccPublicKey)(hdPublicKeyBuffer);
};
exports.makePublicKeyByMnemonic = makePublicKeyByMnemonic;
//# sourceMappingURL=index.js.map