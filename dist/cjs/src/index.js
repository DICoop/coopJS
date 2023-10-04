"use strict";
/// <reference path="./eos-api.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContract = exports.ReadApi = exports.ChainsSingleton = exports.isValidWif = exports.generateKeyPair = exports.makeAccountByWif = exports.makeAccountByMnemonic = exports.generateAccount = exports.makePublicKeyByMnemonic = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "makePublicKeyByMnemonic", { enumerable: true, get: function () { return auth_1.makePublicKeyByMnemonic; } });
Object.defineProperty(exports, "generateAccount", { enumerable: true, get: function () { return auth_1.generateAccount; } });
Object.defineProperty(exports, "makeAccountByMnemonic", { enumerable: true, get: function () { return auth_1.makeAccountByMnemonic; } });
Object.defineProperty(exports, "makeAccountByWif", { enumerable: true, get: function () { return auth_1.makeAccountByWif; } });
Object.defineProperty(exports, "generateKeyPair", { enumerable: true, get: function () { return auth_1.generateKeyPair; } });
var ecc_1 = require("./auth/keys/ecc");
Object.defineProperty(exports, "isValidWif", { enumerable: true, get: function () { return ecc_1.isValidWif; } });
var chainsSingleton_1 = require("./blockchain/chainsSingleton");
Object.defineProperty(exports, "ChainsSingleton", { enumerable: true, get: function () { return __importDefault(chainsSingleton_1).default; } });
var readApi_1 = require("./blockchain/readApi");
Object.defineProperty(exports, "ReadApi", { enumerable: true, get: function () { return __importDefault(readApi_1).default; } });
var base_1 = require("./blockchain/contracts/base");
Object.defineProperty(exports, "BaseContract", { enumerable: true, get: function () { return __importDefault(base_1).default; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVDQUF1Qzs7Ozs7O0FBRXZDLCtCQU9lO0FBTlgsK0dBQUEsdUJBQXVCLE9BQUE7QUFDdkIsdUdBQUEsZUFBZSxPQUFBO0FBRWYsNkdBQUEscUJBQXFCLE9BQUE7QUFDckIsd0dBQUEsZ0JBQWdCLE9BQUE7QUFDaEIsdUdBQUEsZUFBZSxPQUFBO0FBR25CLHVDQUEwQztBQUFsQyxpR0FBQSxVQUFVLE9BQUE7QUFFbEIsZ0VBQXVFO0FBQS9ELG1JQUFBLE9BQU8sT0FBbUI7QUFFbEMsZ0RBQXVEO0FBQS9DLG1IQUFBLE9BQU8sT0FBVztBQUUxQixvREFBbUU7QUFBM0QscUhBQUEsT0FBTyxPQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2Vvcy1hcGkuZC50c1wiIC8+XG5cbmV4cG9ydCB7XG4gICAgbWFrZVB1YmxpY0tleUJ5TW5lbW9uaWMsXG4gICAgZ2VuZXJhdGVBY2NvdW50LFxuICAgIEFjY291bnREYXRhLFxuICAgIG1ha2VBY2NvdW50QnlNbmVtb25pYyxcbiAgICBtYWtlQWNjb3VudEJ5V2lmLFxuICAgIGdlbmVyYXRlS2V5UGFpclxufSBmcm9tICcuL2F1dGgnXG5cbmV4cG9ydCB7aXNWYWxpZFdpZn0gZnJvbSAnLi9hdXRoL2tleXMvZWNjJ1xuXG5leHBvcnQge2RlZmF1bHQgYXMgQ2hhaW5zU2luZ2xldG9ufSBmcm9tICcuL2Jsb2NrY2hhaW4vY2hhaW5zU2luZ2xldG9uJ1xuXG5leHBvcnQge2RlZmF1bHQgYXMgUmVhZEFwaX0gZnJvbSAnLi9ibG9ja2NoYWluL3JlYWRBcGknXG5leHBvcnQge1RhYmxlQ29kZUNvbmZpZ30gZnJvbSAnLi9ibG9ja2NoYWluL3R5cGVzJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIEJhc2VDb250cmFjdH0gZnJvbSAnLi9ibG9ja2NoYWluL2NvbnRyYWN0cy9iYXNlJ1xuIl19