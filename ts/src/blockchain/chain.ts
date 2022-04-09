import { TextEncoder, TextDecoder } from 'util';
import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { Transaction, TransactConfig, TransactResult, SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';
import { PushTransactionArgs, ReadOnlyTransactResult } from 'eosjs/dist/eosjs-rpc-interfaces';
import fetch from 'isomorphic-fetch'

import EosioContract from './contracts/eosio'
import CoreContract from './contracts/core'
import PartnersContract from './contracts/partners'
import P2PContract from './contracts/p2p'
import {AuthKeyType, ChainConfig, SignatureProviderMaker, TableCodeConfig, AuthKeySearchCallback} from './types'
import ReadApi from './readApi'
import BaseContract from "./contracts/base";
import ono from "@jsdevtools/ono";
import { NotImplementedError } from './errors';

interface RpcsByEndpoints {
  [key: string]: JsonRpc
}

const JsSignatureProviderMaker = ((wif: string) => Promise.resolve(new JsSignatureProvider([wif])))

class Chain {
  private readonly name: string
  public readApi: ReadApi
  private readonly tableCodeConfig: TableCodeConfig
  private readonly rpcByEndpoint: RpcsByEndpoints
  private readonly authKeyType: AuthKeyType
  private readonly authKeySearchCallback?: AuthKeySearchCallback
  private readonly signatureProviderMaker: SignatureProviderMaker

  public eosioContract: EosioContract
  public coreContract: CoreContract
  public partnersContract: PartnersContract
  public p2pContract: P2PContract

  constructor(
      chainConfig: ChainConfig,
      tableCodeConfig: TableCodeConfig,
      authKeySearchCallback?: AuthKeySearchCallback,
      signatureProviderMaker?: SignatureProviderMaker,
  ) {
    this.name = chainConfig.name
    this.tableCodeConfig = { ...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {}) }
    this.readApi = new ReadApi(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode)
    this.rpcByEndpoint = {}
    this.authKeyType = chainConfig.authKeyType || 'plain-auth-key'
    this.authKeySearchCallback = authKeySearchCallback
    this.signatureProviderMaker = signatureProviderMaker || JsSignatureProviderMaker

    this.eosioContract = this.applyContract(EosioContract)
    this.coreContract = this.applyContract(CoreContract)
    this.partnersContract = this.applyContract(PartnersContract)
    this.p2pContract = this.applyContract(P2PContract)
  }

  applyContract<T extends BaseContract>(contract: { new(...args: any[]): T ;}): T {
    return new contract(this.readApi, this.tableCodeConfig)
  }

  getCachedRpc() {
    const endpoint = this.readApi.getEndpoint()
    if (!this.rpcByEndpoint[endpoint]) {
      this.rpcByEndpoint[endpoint] = new JsonRpc(endpoint, {fetch});
    }

    return this.rpcByEndpoint[endpoint]
  }

  getEosInstanceBySignatureProvider(signatureProvider: SignatureProvider) {
    const rpc = this.getCachedRpc()

    return new Api({
      rpc,
      signatureProvider,
      // @ts-ignore
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
  }

  /**
   * @deprecated since version 1.0.2
   */
  getEosPassInstance(wif: string) {
    const signatureProvider = new JsSignatureProvider([wif]);
    return this.getEosInstanceBySignatureProvider(signatureProvider);
  }

  async makeEosInstance(authKey: string) {
    const signatureProvider = await this.signatureProviderMaker(authKey)
    return this.getEosInstanceBySignatureProvider(signatureProvider);
  }

  async transactByAuthKey(
      authKey: string,
      transaction: Transaction,
      config?: TransactConfig
  ): Promise<TransactResult | ReadOnlyTransactResult | PushTransactionArgs> {
    const eos = await this.makeEosInstance(authKey)
    return eos.transact(transaction, config)
  }

  async transact(
      authKey: string,
      transaction: Transaction,
      config?: TransactConfig,
      authKeyType?: AuthKeyType,
  ): Promise<TransactResult | ReadOnlyTransactResult | PushTransactionArgs> {
    const localAuthKeyType = authKeyType || this.authKeyType

    if (localAuthKeyType === 'plain-auth-key') {
      return this.transactByAuthKey(authKey, transaction, config)
    }

    if (localAuthKeyType === 'auth-key-search-callback') {
      if (!this.authKeySearchCallback) {
        throw ono(new Error('For authKeyType=wif-search-callback wifSearchCallback need to define'))
      }
      const wif = await this.authKeySearchCallback(authKey)

      return this.transactByAuthKey(wif, transaction, config)
    }

    throw ono(new NotImplementedError('Not implemented authKeyType'))
  }
}

export default Chain
