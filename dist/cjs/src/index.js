"use strict";
/// <reference path="./eos-api.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContract = exports.ReadApi = exports.ChainsSingleton = exports.isValidWif = exports.makeAccountByWif = exports.makeAccountByMnemonic = exports.generateAccount = exports.makePublicKeyByMnemonic = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "makePublicKeyByMnemonic", { enumerable: true, get: function () { return auth_1.makePublicKeyByMnemonic; } });
Object.defineProperty(exports, "generateAccount", { enumerable: true, get: function () { return auth_1.generateAccount; } });
Object.defineProperty(exports, "makeAccountByMnemonic", { enumerable: true, get: function () { return auth_1.makeAccountByMnemonic; } });
Object.defineProperty(exports, "makeAccountByWif", { enumerable: true, get: function () { return auth_1.makeAccountByWif; } });
var ecc_1 = require("./auth/keys/ecc");
Object.defineProperty(exports, "isValidWif", { enumerable: true, get: function () { return ecc_1.isValidWif; } });
var chainsSingleton_1 = require("./blockchain/chainsSingleton");
Object.defineProperty(exports, "ChainsSingleton", { enumerable: true, get: function () { return __importDefault(chainsSingleton_1).default; } });
var readApi_1 = require("./blockchain/readApi");
Object.defineProperty(exports, "ReadApi", { enumerable: true, get: function () { return __importDefault(readApi_1).default; } });
var base_1 = require("./blockchain/contracts/base");
Object.defineProperty(exports, "BaseContract", { enumerable: true, get: function () { return __importDefault(base_1).default; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVDQUF1Qzs7Ozs7O0FBRXZDLCtCQU1lO0FBTFgsK0dBQUEsdUJBQXVCLE9BQUE7QUFDdkIsdUdBQUEsZUFBZSxPQUFBO0FBRWYsNkdBQUEscUJBQXFCLE9BQUE7QUFDckIsd0dBQUEsZ0JBQWdCLE9BQUE7QUFHcEIsdUNBQTBDO0FBQWxDLGlHQUFBLFVBQVUsT0FBQTtBQUVsQixnRUFBdUU7QUFBL0QsbUlBQUEsT0FBTyxPQUFtQjtBQUVsQyxnREFBdUQ7QUFBL0MsbUhBQUEsT0FBTyxPQUFXO0FBRTFCLG9EQUFtRTtBQUEzRCxxSEFBQSxPQUFPLE9BQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vZW9zLWFwaS5kLnRzXCIgLz5cblxuZXhwb3J0IHtcbiAgICBtYWtlUHVibGljS2V5QnlNbmVtb25pYyxcbiAgICBnZW5lcmF0ZUFjY291bnQsXG4gICAgQWNjb3VudERhdGEsXG4gICAgbWFrZUFjY291bnRCeU1uZW1vbmljLFxuICAgIG1ha2VBY2NvdW50QnlXaWYsXG59IGZyb20gJy4vYXV0aCdcblxuZXhwb3J0IHtpc1ZhbGlkV2lmfSBmcm9tICcuL2F1dGgva2V5cy9lY2MnXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBDaGFpbnNTaW5nbGV0b259IGZyb20gJy4vYmxvY2tjaGFpbi9jaGFpbnNTaW5nbGV0b24nXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBSZWFkQXBpfSBmcm9tICcuL2Jsb2NrY2hhaW4vcmVhZEFwaSdcbmV4cG9ydCB7VGFibGVDb2RlQ29uZmlnfSBmcm9tICcuL2Jsb2NrY2hhaW4vdHlwZXMnXG5leHBvcnQge2RlZmF1bHQgYXMgQmFzZUNvbnRyYWN0fSBmcm9tICcuL2Jsb2NrY2hhaW4vY29udHJhY3RzL2Jhc2UnXG4iXX0=