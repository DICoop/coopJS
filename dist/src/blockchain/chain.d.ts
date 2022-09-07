import { TextDecoder, TextEncoder } from 'text-encoding';
import { Api, JsonRpc } from 'eosjs';
import { SignatureProvider, TransactConfig, Transaction, TransactResult } from 'eosjs/dist/eosjs-api-interfaces';
import { PushTransactionArgs, ReadOnlyTransactResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import EosioContract from './contracts/eosio';
import CoreContract from './contracts/core';
import PartnersContract from './contracts/partners';
import P2PContract from './contracts/p2p';
import NftContract from './contracts/nft';
import { AuthKeySearchCallback, AuthKeyType, ChainConfig, ChainCrypt, SignatureProviderMaker, TableCodeConfig } from './types';
import ReadApi from './readApi';
import BaseContract from "./contracts/base";
import Wallet from "./wallet";
import Explorer from "./explorer";
declare class Chain {
    private readonly name;
    readApi: ReadApi;
    explorer: Explorer;
    private readonly tableCodeConfig;
    private readonly rpcByEndpoint;
    private readonly authKeyType;
    private readonly authKeySearchCallback?;
    private readonly signatureProviderMaker;
    private readonly chainCrypt;
    private textDecoder?;
    private textEncoder?;
    eosioContract: EosioContract;
    coreContract: CoreContract;
    partnersContract: PartnersContract;
    p2pContract: P2PContract;
    nftContract: NftContract;
    wallets: Wallet[];
    readonly coreSymbol?: string;
    constructor(chainConfig: ChainConfig, tableCodeConfig: TableCodeConfig, authKeySearchCallback?: AuthKeySearchCallback, signatureProviderMaker?: SignatureProviderMaker, chainCrypt?: ChainCrypt, textDecoder?: typeof TextDecoder, textEncoder?: typeof TextEncoder);
    get walletsSymbols(): string[];
    getWalletBySymbol(symbol: string): Wallet | undefined;
    applyContract<T extends BaseContract>(contract: {
        new (...args: any[]): T;
    }): T;
    getCachedRpc(): JsonRpc;
    getEosInstanceBySignatureProvider(signatureProvider: SignatureProvider): Api;
    /**
     * @deprecated since version 1.0.2
     */
    getEosPassInstance(wif: string): Api;
    makeEosInstance(authKey: string): Promise<Api>;
    getAuthKey(authKeyQuery: string, authKeyType?: AuthKeyType): string | Promise<string | null>;
    transactByAuthKey(authKey: string, transaction: Transaction, config?: TransactConfig): Promise<TransactResult | ReadOnlyTransactResult | PushTransactionArgs>;
    transact(authKeyQuery: string, transaction: Transaction, config?: TransactConfig, authKeyType?: AuthKeyType): Promise<TransactResult | ReadOnlyTransactResult | PushTransactionArgs>;
    encryptMessage(authKeyQuery: string, publicKey: string, message: string, memo?: string, authKeyType?: AuthKeyType): Promise<string>;
    decryptMessage(authKeyQuery: string, publicKey: string, message: string, memo?: string, authKeyType?: AuthKeyType): Promise<string>;
    makeValueAsStr(value: any): string;
    objToStableMessage(dict: Record<string, any>): string;
    btoaEscape(str: string): string;
    signMessage(authKeyQuery: string, publicKey: string, message: string, authKeyType?: AuthKeyType): Promise<string>;
    verifyMessage(publicKey: string, message: string, signature: string): Promise<boolean>;
    signObject(authKeyQuery: string, publicKey: string, dict: Record<string, string>, authKeyType?: AuthKeyType): Promise<string>;
    verifyObject(publicKey: string, dict: Record<string, string>, signature: string): Promise<boolean>;
}
export default Chain;
//# sourceMappingURL=chain.d.ts.map