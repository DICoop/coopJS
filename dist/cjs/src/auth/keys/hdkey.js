"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hdNodeToPrivateKeyBuffer = exports.hdNodeToPublicKeyBuffer = exports.hdToFirstHdNode = exports.seedToHd = void 0;
var hdkey_1 = __importDefault(require("hdkey"));
var buffer_1 = require("buffer");
var seedToHd = function (seed) {
    var isString = typeof seed === 'string';
    var seedBuffer = isString ? buffer_1.Buffer.from(seed, 'hex') : seed;
    return hdkey_1.default.fromMasterSeed(seedBuffer);
};
exports.seedToHd = seedToHd;
var hdToFirstHdNode = function (hd) { return hd.derive("m/44'/194'/0'/0/0"); };
exports.hdToFirstHdNode = hdToFirstHdNode;
var hdNodeToPublicKeyBuffer = function (hd) { return hd.publicKey; };
exports.hdNodeToPublicKeyBuffer = hdNodeToPublicKeyBuffer;
// @ts-ignore
var hdNodeToPrivateKeyBuffer = function (hd) { return hd.privateKey || hd._privateKey; };
exports.hdNodeToPrivateKeyBuffer = hdNodeToPrivateKeyBuffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGRrZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9rZXlzL2hka2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUF5QjtBQUN6QixpQ0FBK0I7QUFFeEIsSUFBTSxRQUFRLEdBQUcsVUFBQyxJQUFxQjtJQUM1QyxJQUFNLFFBQVEsR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUE7SUFDekMsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxlQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBRTdELE9BQU8sZUFBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUE7QUFMWSxRQUFBLFFBQVEsWUFLcEI7QUFFTSxJQUFNLGVBQWUsR0FBRyxVQUFDLEVBQVMsSUFBSyxPQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQTtBQUEvRCxRQUFBLGVBQWUsbUJBQWdEO0FBRXJFLElBQU0sdUJBQXVCLEdBQUcsVUFBQyxFQUFTLElBQUssT0FBQSxFQUFFLENBQUMsU0FBUyxFQUFaLENBQVksQ0FBQTtBQUFyRCxRQUFBLHVCQUF1QiwyQkFBOEI7QUFFbEUsYUFBYTtBQUNOLElBQU0sd0JBQXdCLEdBQUcsVUFBQyxFQUFTLElBQUssT0FBQSxFQUFFLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQS9CLENBQStCLENBQUE7QUFBekUsUUFBQSx3QkFBd0IsNEJBQWlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGhka2V5IGZyb20gJ2hka2V5J1xuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSAnYnVmZmVyJ1xuXG5leHBvcnQgY29uc3Qgc2VlZFRvSGQgPSAoc2VlZDogc3RyaW5nIHwgQnVmZmVyKSA9PiB7XG4gIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIHNlZWQgPT09ICdzdHJpbmcnXG4gIGNvbnN0IHNlZWRCdWZmZXIgPSBpc1N0cmluZyA/IEJ1ZmZlci5mcm9tKHNlZWQsICdoZXgnKSA6IHNlZWRcblxuICByZXR1cm4gaGRrZXkuZnJvbU1hc3RlclNlZWQoc2VlZEJ1ZmZlcilcbn1cblxuZXhwb3J0IGNvbnN0IGhkVG9GaXJzdEhkTm9kZSA9IChoZDogaGRrZXkpID0+IGhkLmRlcml2ZShcIm0vNDQnLzE5NCcvMCcvMC8wXCIpXG5cbmV4cG9ydCBjb25zdCBoZE5vZGVUb1B1YmxpY0tleUJ1ZmZlciA9IChoZDogaGRrZXkpID0+IGhkLnB1YmxpY0tleVxuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgY29uc3QgaGROb2RlVG9Qcml2YXRlS2V5QnVmZmVyID0gKGhkOiBoZGtleSkgPT4gaGQucHJpdmF0ZUtleSB8fCBoZC5fcHJpdmF0ZUtleVxuIl19