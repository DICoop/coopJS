"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eos_encrypt_1 = require("eos-encrypt");
class BaseCrypt {
    decrypt(authKey, publicKey, message, memo) {
        return Promise.resolve((0, eos_encrypt_1.encrypt)(authKey, publicKey, message, { memo, maxsize: 10000 }));
    }
    encrypt(authKey, publicKey, message, memo) {
        return Promise.resolve((0, eos_encrypt_1.decrypt)(authKey, publicKey, message, { memo }));
    }
}
exports.default = BaseCrypt;
//# sourceMappingURL=baseCrypt.js.map