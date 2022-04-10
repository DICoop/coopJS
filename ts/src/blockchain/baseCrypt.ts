import {encrypt, decrypt} from 'eos-encrypt'

import {ChainCrypt} from "./types";

class BaseCrypt implements ChainCrypt {
    decrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string> {
        return Promise.resolve(encrypt(authKey, publicKey, message, {memo, maxsize: 10000}));
    }

    encrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string> {
        return Promise.resolve(decrypt(authKey, publicKey, message, {memo}));
    }
}

export default BaseCrypt
