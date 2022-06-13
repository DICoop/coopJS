import {TextDecoder, TextEncoder} from 'util';
import {Api, JsonRpc} from 'eosjs';
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig';
import {SignatureProvider, TransactConfig, Transaction, TransactResult} from 'eosjs/dist/eosjs-api-interfaces';
import {PushTransactionArgs, ReadOnlyTransactResult} from 'eosjs/dist/eosjs-rpc-interfaces';
import fetch from 'isomorphic-fetch'
import ono from "@jsdevtools/ono";
import btoa from 'btoa';
import atob from 'atob';
import unescape from 'core-js-pure/stable/unescape'
import escape from 'core-js-pure/stable/escape'

import EosioContract from './contracts/eosio'
import CoreContract from './contracts/core'
import PartnersContract from './contracts/partners'
import P2PContract from './contracts/p2p'
import NftContract from './contracts/nft'
import {
  AuthKeySearchCallback,
  AuthKeyType,
  ChainConfig,
  ChainCrypt,
  SignatureProviderMaker,
  TableCodeConfig
} from './types'
import ReadApi from './readApi'
import BaseContract from "./contracts/base";
import {NotImplementedError} from './errors';
import BaseCrypt from "./baseCrypt";

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
  private readonly chainCrypt: ChainCrypt

  public eosioContract: EosioContract
  public coreContract: CoreContract
  public partnersContract: PartnersContract
  public p2pContract: P2PContract
  public nftContract: NftContract

  constructor(
      chainConfig: ChainConfig,
      tableCodeConfig: TableCodeConfig,
      authKeySearchCallback?: AuthKeySearchCallback,
      signatureProviderMaker?: SignatureProviderMaker,
      chainCrypt?: ChainCrypt,
  ) {
    this.name = chainConfig.name
    this.tableCodeConfig = { ...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {}) }
    this.readApi = new ReadApi(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode)
    this.rpcByEndpoint = {}
    this.authKeyType = chainConfig.authKeyType || 'plain-auth-key'
    this.authKeySearchCallback = authKeySearchCallback
    this.signatureProviderMaker = signatureProviderMaker || JsSignatureProviderMaker
    this.chainCrypt = chainCrypt || new BaseCrypt()

    this.eosioContract = this.applyContract(EosioContract)
    this.coreContract = this.applyContract(CoreContract)
    this.partnersContract = this.applyContract(PartnersContract)
    this.p2pContract = this.applyContract(P2PContract)
    this.nftContract = this.applyContract(NftContract)
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

  getAuthKey(authKeyQuery: string, authKeyType?: AuthKeyType) {
    const localAuthKeyType = authKeyType || this.authKeyType

    if (localAuthKeyType === 'plain-auth-key') {
      return authKeyQuery
    }

    if (localAuthKeyType === 'auth-key-search-callback') {
      if (!this.authKeySearchCallback) {
        throw ono(new Error('For authKeyType=wif-search-callback wifSearchCallback need to define'))
      }
      return this.authKeySearchCallback(authKeyQuery)
    }

    throw ono(new NotImplementedError('Not implemented authKeyType'))
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
      authKeyQuery: string,
      transaction: Transaction,
      config?: TransactConfig,
      authKeyType?: AuthKeyType,
  ): Promise<TransactResult | ReadOnlyTransactResult | PushTransactionArgs> {
    const authKey = await this.getAuthKey(authKeyQuery, authKeyType)

    if (!authKey) {
      throw ono(new Error('authKey cannot be empty'))
    }

    return this.transactByAuthKey(authKey, transaction, config)
  }

  async encryptMessage(
      authKeyQuery: string,
      publicKey: string,
      message: string,
      memo?: string,
      authKeyType?: AuthKeyType,
  ) {
    const authKey = await this.getAuthKey(authKeyQuery, authKeyType)

    if (!authKey) {
      throw ono(new Error('authKey cannot be empty'))
    }

    const permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "active")

    if (!permissionKey) {
      throw ono(new Error('permissionKey cannot be empty'))
    }

    const preparedMessage = btoa(unescape(encodeURIComponent(message)))
    return this.chainCrypt.encrypt(authKey, permissionKey, preparedMessage, memo)
  }

  async decryptMessage(
      authKeyQuery: string,
      publicKey: string,
      message: string,
      memo?: string,
      authKeyType?: AuthKeyType,
  ) {
    const authKey = await this.getAuthKey(authKeyQuery, authKeyType)

    if (!authKey) {
      throw ono(new Error('authKey cannot be empty'))
    }

    let permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "gateway")

    if (!permissionKey) {
      permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "active")
    }

    if (!permissionKey) {
      throw ono(new Error('permissionKey cannot be empty'))
    }

    const decryptedMessage = await this.chainCrypt.decrypt(authKey, permissionKey, message, memo)

    return decodeURIComponent(escape(atob(decryptedMessage)))
  }
}

export default Chain
