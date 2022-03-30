"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hdPublicToEccPublicKey = exports.privateKeyToPublic = exports.wifToPrivateKey = exports.isValidWif = void 0;
const eosjs_ecc_migration_1 = require("eosjs/dist/eosjs-ecc-migration");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const eosjs_ecc_1 = __importDefault(require("eosjs-ecc"));
const isValidWif = (wif) => eosjs_ecc_migration_1.ecc.isValidPrivate(wif);
exports.isValidWif = isValidWif;
const wifToPrivateKey = (wif) => eosjs_jssig_1.PrivateKey.fromString(wif);
exports.wifToPrivateKey = wifToPrivateKey;
const privateKeyToPublic = (privateKey) => privateKey.getPublicKey();
exports.privateKeyToPublic = privateKeyToPublic;
const hdPublicToEccPublicKey = (hdPublicKey) => eosjs_ecc_1.default.PublicKey(hdPublicKey).toString();
exports.hdPublicToEccPublicKey = hdPublicToEccPublicKey;
//# sourceMappingURL=ecc.js.map