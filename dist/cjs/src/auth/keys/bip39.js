"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMnemonic = exports.mnemonicToSeed = exports.isValidMnemonic = void 0;
var bip39_1 = require("bip39");
var english_json_1 = __importDefault(require("bip39/src/wordlists/english.json"));
var isValidMnemonic = function (mnemonic) { return (0, bip39_1.validateMnemonic)(mnemonic, english_json_1.default); };
exports.isValidMnemonic = isValidMnemonic;
var mnemonicToSeed = function (mnemonic) {
    return (0, bip39_1.mnemonicToSeed)(mnemonic).then(function (seed) { return seed.toString('hex'); });
};
exports.mnemonicToSeed = mnemonicToSeed;
var generateMnemonic = function () { return (0, bip39_1.generateMnemonic)(null, null, english_json_1.default); };
exports.generateMnemonic = generateMnemonic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90cy9zcmMvYXV0aC9rZXlzL2JpcDM5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUF1RztBQUN2RyxrRkFBaUQ7QUFFMUMsSUFBTSxlQUFlLEdBQUcsVUFBQyxRQUFnQixJQUFLLE9BQUEsSUFBQSx3QkFBZ0IsRUFBQyxRQUFRLEVBQUUsc0JBQUUsQ0FBQyxFQUE5QixDQUE4QixDQUFBO0FBQXRFLFFBQUEsZUFBZSxtQkFBdUQ7QUFFNUUsSUFBTSxjQUFjLEdBQUcsVUFBQyxRQUFnQjtJQUM3QyxPQUFBLElBQUEsc0JBQW1CLEVBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBWSxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQztBQUExRSxDQUEwRSxDQUFBO0FBRC9ELFFBQUEsY0FBYyxrQkFDaUQ7QUFFckUsSUFBTSxnQkFBZ0IsR0FBRyxjQUFjLE9BQUEsSUFBQSx3QkFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsc0JBQUUsQ0FBQyxFQUFsQixDQUFrQixDQUFBO0FBQW5ELFFBQUEsZ0JBQWdCLG9CQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZhbGlkYXRlTW5lbW9uaWMsIG1uZW1vbmljVG9TZWVkIGFzIG1uZW1vbmljVG9TZWVkQmlwMzksIGdlbmVyYXRlTW5lbW9uaWMgYXMgZ00gfSBmcm9tICdiaXAzOSdcbmltcG9ydCBFTiBmcm9tICdiaXAzOS9zcmMvd29yZGxpc3RzL2VuZ2xpc2guanNvbidcblxuZXhwb3J0IGNvbnN0IGlzVmFsaWRNbmVtb25pYyA9IChtbmVtb25pYzogc3RyaW5nKSA9PiB2YWxpZGF0ZU1uZW1vbmljKG1uZW1vbmljLCBFTilcblxuZXhwb3J0IGNvbnN0IG1uZW1vbmljVG9TZWVkID0gKG1uZW1vbmljOiBzdHJpbmcpID0+XG4gIG1uZW1vbmljVG9TZWVkQmlwMzkobW5lbW9uaWMpLnRoZW4oKHNlZWQ6IEJ1ZmZlcikgPT4gc2VlZC50b1N0cmluZygnaGV4JykpXG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZU1uZW1vbmljID0gKCk6IHN0cmluZyA9PiBnTShudWxsLCBudWxsLCBFTilcbiJdfQ==