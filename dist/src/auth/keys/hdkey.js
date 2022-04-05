"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hdNodeToPrivateKeyBuffer = exports.hdNodeToPublicKeyBuffer = exports.hdToFirstHdNode = exports.seedToHd = void 0;
const hdkey_1 = __importDefault(require("hdkey"));
const buffer_1 = require("buffer");
const seedToHd = (seed) => {
    const isString = typeof seed === 'string';
    const seedBuffer = isString ? buffer_1.Buffer.from(seed, 'hex') : seed;
    return hdkey_1.default.fromMasterSeed(seedBuffer);
};
exports.seedToHd = seedToHd;
const hdToFirstHdNode = (hd) => hd.derive("m/44'/194'/0'/0/0");
exports.hdToFirstHdNode = hdToFirstHdNode;
const hdNodeToPublicKeyBuffer = (hd) => hd.publicKey;
exports.hdNodeToPublicKeyBuffer = hdNodeToPublicKeyBuffer;
const hdNodeToPrivateKeyBuffer = (hd) => hd.privateKey;
exports.hdNodeToPrivateKeyBuffer = hdNodeToPrivateKeyBuffer;
//# sourceMappingURL=hdkey.js.map