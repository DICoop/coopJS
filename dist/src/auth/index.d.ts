export declare const makePublicKeyByMnemonic: (mnemonic: string) => Promise<any>;
interface AccountData {
    name: string;
    mnemonic: string;
    wif: string;
    pub: string;
}
export declare const generateAccount: () => Promise<AccountData>;
export {};
