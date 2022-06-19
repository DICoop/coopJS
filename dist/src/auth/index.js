"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccount = exports.makeAccountByWif = exports.makeAccountByMnemonic = exports.makeAccount = exports.makePublicKeyByMnemonic = exports.makeHdNodeByMnemonic = void 0;
const ono_1 = __importDefault(require("@jsdevtools/ono"));
const errors_1 = require("./errors");
const bip39_1 = require("./keys/bip39");
const hdkey_1 = require("./keys/hdkey");
const ecc_1 = require("./keys/ecc");
const utils_1 = require("./utils");
const makeHdNodeByMnemonic = async (mnemonic) => {
    if (!(0, bip39_1.isValidMnemonic)(mnemonic)) {
        throw (0, ono_1.default)(new errors_1.UniCoreMnemonicParseError('Invalid mnemonic'));
    }
    const seed = await (0, bip39_1.mnemonicToSeed)(mnemonic);
    const hdBase = (0, hdkey_1.seedToHd)(seed);
    const hdFirstNode = (0, hdkey_1.hdToFirstHdNode)(hdBase);
    return hdFirstNode;
};
exports.makeHdNodeByMnemonic = makeHdNodeByMnemonic;
const makePublicKeyByMnemonic = async (mnemonic) => {
    const hdFirstNode = await (0, exports.makeHdNodeByMnemonic)(mnemonic);
    const hdPublicKeyBuffer = (0, hdkey_1.hdNodeToPublicKeyBuffer)(hdFirstNode);
    return (0, ecc_1.hdPublicToEccPublicKey)(hdPublicKeyBuffer);
};
exports.makePublicKeyByMnemonic = makePublicKeyByMnemonic;
const makeAccount = (username, mnemonic, wif, pub) => {
    return {
        name: username,
        mnemonic,
        wif,
        pub,
    };
};
exports.makeAccount = makeAccount;
const makeAccountByMnemonic = async (username, mnemonic) => {
    const hdFirstNode = await (0, exports.makeHdNodeByMnemonic)(mnemonic);
    const hdPublicKeyBuffer = (0, hdkey_1.hdNodeToPublicKeyBuffer)(hdFirstNode);
    const hdPrivateKeyBuffer = (0, hdkey_1.hdNodeToPrivateKeyBuffer)(hdFirstNode);
    return (0, exports.makeAccount)(username, '', (0, ecc_1.hdPrivateToWif)(hdPrivateKeyBuffer), (0, ecc_1.hdPublicToEccPublicKey)(hdPublicKeyBuffer));
};
exports.makeAccountByMnemonic = makeAccountByMnemonic;
const makeAccountByWif = async (username, wif) => {
    if (!(0, ecc_1.isValidWif)(wif)) {
        throw (0, ono_1.default)(new errors_1.UniCoreWifParseError('Invalid wif'));
    }
    const publicKey = (0, ecc_1.privateKeyToPublic)((0, ecc_1.wifToPrivateKey)(wif)).toLegacyString();
    return (0, exports.makeAccount)(username, '', wif, publicKey);
};
exports.makeAccountByWif = makeAccountByWif;
const generateAccount = async () => {
    const name = (0, utils_1.generateAccountName)();
    const mnemonic = (0, bip39_1.generateMnemonic)();
    const seed = await (0, bip39_1.mnemonicToSeed)(mnemonic);
    const hdBase = (0, hdkey_1.seedToHd)(seed);
    const hdFirstNode = (0, hdkey_1.hdToFirstHdNode)(hdBase);
    const hdPublicKeyBuffer = (0, hdkey_1.hdNodeToPublicKeyBuffer)(hdFirstNode);
    const hdPrivateKeyBuffer = (0, hdkey_1.hdNodeToPrivateKeyBuffer)(hdFirstNode);
    return (0, exports.makeAccount)(name, mnemonic, (0, ecc_1.hdPrivateToWif)(hdPrivateKeyBuffer), (0, ecc_1.hdPublicToEccPublicKey)(hdPublicKeyBuffer));
};
exports.generateAccount = generateAccount;
//# sourceMappingURL=index.js.map