"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountName = void 0;
const generateAccountName = () => {
    let result = '';
    const possible = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 12; i++)
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    return result;
};
exports.generateAccountName = generateAccountName;
//# sourceMappingURL=utils.js.map