import { ChainCrypt } from "./types";
declare class BaseCrypt implements ChainCrypt {
    decrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string>;
    encrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string>;
}
export default BaseCrypt;
