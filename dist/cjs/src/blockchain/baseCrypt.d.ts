import { ChainCrypt } from "./types";
declare class BaseCrypt implements ChainCrypt {
    decrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string>;
    encrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string>;
    sign(privateKey: string, message: string): string;
    verify(publicKey: string, signature: string, message: string): boolean;
}
export default BaseCrypt;
//# sourceMappingURL=baseCrypt.d.ts.map