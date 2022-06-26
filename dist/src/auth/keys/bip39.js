"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMnemonic = exports.mnemonicToSeed = exports.isValidMnemonic = void 0;
const bip39_1 = require("bip39");
const english_json_1 = __importDefault(require("bip39/src/wordlists/english.json"));
const isValidMnemonic = (mnemonic) => (0, bip39_1.validateMnemonic)(mnemonic, english_json_1.default);
exports.isValidMnemonic = isValidMnemonic;
const mnemonicToSeed = (mnemonic) => (0, bip39_1.mnemonicToSeed)(mnemonic).then((seed) => seed.toString('hex'));
exports.mnemonicToSeed = mnemonicToSeed;
const generateMnemonic = () => (0, bip39_1.generateMnemonic)(null, null, english_json_1.default);
exports.generateMnemonic = generateMnemonic;
//# sourceMappingURL=bip39.js.map