import { Api, JsonRpc } from 'eosjs';
import { Transaction, TransactConfig, TransactResult, SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';
import { PushTransactionArgs, ReadOnlyTransactResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import EosioContract from './contracts/eosio';
import CoreContract from './contracts/core';
import PartnersContract from './contracts/partners';
import P2PContract from './contracts/p2p';
import { AuthKeyType, ChainConfig, SignatureProviderMaker, TableCodeConfig, AuthKeySearchCallback } from './types';
import ReadApi from './readApi';
import BaseContract from "./contracts/base";
declare class Chain {
    private readonly name;
    readApi: ReadApi;
    private readonly tableCodeConfig;
    private readonly rpcByEndpoint;
    private readonly authKeyType;
    private readonly authKeySearchCallback?;
    private readonly signatureProviderMaker;
    eosioContract: EosioContract;
    coreContract: CoreContract;
    partnersContract: PartnersContract;
    p2pContract: P2PContract;
    constructor(chainConfig: ChainConfig, tableCodeConfig: TableCodeConfig, authKeySearchCallback?: AuthKeySearchCallback, signatureProviderMaker?: SignatureProviderMaker);
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
    transactByAuthKey(authKey: string, transaction: Transaction, config?: TransactConfig): Promise<TransactResult | ReadOnlyTransactResult | PushTransactionArgs>;
    transact(authKey: string, transaction: Transaction, config?: TransactConfig, authKeyType?: AuthKeyType): Promise<TransactResult | ReadOnlyTransactResult | PushTransactionArgs>;
}
export default Chain;
