"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hdNodeToPrivateKeyBuffer = exports.hdNodeToPublicKeyBuffer = exports.hdToFirstHdNode = exports.seedToHd = void 0;
var bip32_1 = require("bip32");
var ecc = __importStar(require("tiny-secp256k1"));
var buffer_1 = require("buffer");
var bip32 = (0, bip32_1.BIP32Factory)(ecc);
var seedToHd = function (seed) {
    var isString = typeof seed === 'string';
    var seedBuffer = isString ? buffer_1.Buffer.from(seed, 'hex') : seed;
    return bip32.fromSeed(seedBuffer);
};
exports.seedToHd = seedToHd;
var hdToFirstHdNode = function (hd) {
    return hd.derivePath("m/44'/194'/0'/0/0");
};
exports.hdToFirstHdNode = hdToFirstHdNode;
var hdNodeToPublicKeyBuffer = function (hd) {
    return buffer_1.Buffer.from(hd.publicKey);
};
exports.hdNodeToPublicKeyBuffer = hdNodeToPublicKeyBuffer;
var hdNodeToPrivateKeyBuffer = function (hd) {
    return buffer_1.Buffer.from(hd.privateKey);
};
exports.hdNodeToPrivateKeyBuffer = hdNodeToPrivateKeyBuffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGRrZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9rZXlzL2hka2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQXFDO0FBQ3JDLGtEQUFzQztBQUN0QyxpQ0FBZ0M7QUFFaEMsSUFBTSxLQUFLLEdBQUcsSUFBQSxvQkFBWSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXpCLElBQU0sUUFBUSxHQUFHLFVBQUMsSUFBcUI7SUFDNUMsSUFBTSxRQUFRLEdBQUcsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDO0lBQzFDLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM5RCxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDO0FBSlcsUUFBQSxRQUFRLFlBSW5CO0FBRUssSUFBTSxlQUFlLEdBQUcsVUFBQyxFQUFxQztJQUNuRSxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUM7QUFGVyxRQUFBLGVBQWUsbUJBRTFCO0FBRUssSUFBTSx1QkFBdUIsR0FBRyxVQUFDLEVBQXFDO0lBQzNFLE9BQU8sZUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDO0FBRlcsUUFBQSx1QkFBdUIsMkJBRWxDO0FBRUssSUFBTSx3QkFBd0IsR0FBRyxVQUFDLEVBQXFDO0lBQzVFLE9BQU8sZUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBRlcsUUFBQSx3QkFBd0IsNEJBRW5DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQklQMzJGYWN0b3J5IH0gZnJvbSAnYmlwMzInO1xuaW1wb3J0ICogYXMgZWNjIGZyb20gJ3Rpbnktc2VjcDI1NmsxJztcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcic7XG5cbmNvbnN0IGJpcDMyID0gQklQMzJGYWN0b3J5KGVjYyk7XG5cbmV4cG9ydCBjb25zdCBzZWVkVG9IZCA9IChzZWVkOiBzdHJpbmcgfCBCdWZmZXIpID0+IHtcbiAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2Ygc2VlZCA9PT0gJ3N0cmluZyc7XG4gIGNvbnN0IHNlZWRCdWZmZXIgPSBpc1N0cmluZyA/IEJ1ZmZlci5mcm9tKHNlZWQsICdoZXgnKSA6IHNlZWQ7XG4gIHJldHVybiBiaXAzMi5mcm9tU2VlZChzZWVkQnVmZmVyKTtcbn07XG5cbmV4cG9ydCBjb25zdCBoZFRvRmlyc3RIZE5vZGUgPSAoaGQ6IFJldHVyblR5cGU8dHlwZW9mIGJpcDMyLmZyb21TZWVkPikgPT4ge1xuICByZXR1cm4gaGQuZGVyaXZlUGF0aChcIm0vNDQnLzE5NCcvMCcvMC8wXCIpO1xufTtcblxuZXhwb3J0IGNvbnN0IGhkTm9kZVRvUHVibGljS2V5QnVmZmVyID0gKGhkOiBSZXR1cm5UeXBlPHR5cGVvZiBiaXAzMi5mcm9tU2VlZD4pID0+IHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGhkLnB1YmxpY0tleSk7XG59O1xuXG5leHBvcnQgY29uc3QgaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyID0gKGhkOiBSZXR1cm5UeXBlPHR5cGVvZiBiaXAzMi5mcm9tU2VlZD4pID0+IHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGhkLnByaXZhdGVLZXkhKTtcbn07XG4iXX0=