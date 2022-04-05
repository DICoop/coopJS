"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMnemonic = exports.mnemonicToSeed = exports.isValidMnemonic = void 0;
const bip39_1 = require("bip39");
const isValidMnemonic = (mnemonic) => (0, bip39_1.validateMnemonic)(mnemonic);
exports.isValidMnemonic = isValidMnemonic;
const mnemonicToSeed = (mnemonic) => (0, bip39_1.mnemonicToSeed)(mnemonic).then((seed) => seed.toString('hex'));
exports.mnemonicToSeed = mnemonicToSeed;
const generateMnemonic = () => (0, bip39_1.generateMnemonic)();
exports.generateMnemonic = generateMnemonic;
//# sourceMappingURL=bip39.js.map