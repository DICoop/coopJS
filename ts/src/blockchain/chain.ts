import { TextEncoder, TextDecoder } from 'util';
import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import fetch from 'isomorphic-fetch'

import EosioContract from './contracts/eosio'
import CoreContract from './contracts/core'
import PartnersContract from './contracts/partners'
import P2PContract from './contracts/p2p'
import { ChainConfig, TableCodeConfig } from './types'
import ReadApi from './readApi'
import BaseContract from "./contracts/base";

interface RpcsByEndpoints {
  [key: string]: JsonRpc
}

class Chain {
  private readonly name: string
  public readApi: ReadApi
  private readonly tableCodeConfig: TableCodeConfig
  private readonly rpcByEndpoint: RpcsByEndpoints

  public eosioContract: EosioContract
  public coreContract: CoreContract
  public partnersContract: PartnersContract
  public p2pContract: P2PContract

  constructor(chainConfig: ChainConfig, tableCodeConfig: TableCodeConfig) {
    this.name = chainConfig.name
    this.tableCodeConfig = { ...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {}) }
    this.readApi = new ReadApi(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode)
    this.rpcByEndpoint = {}

    this.eosioContract = this.applyContract(EosioContract)
    this.coreContract = this.applyContract(CoreContract)
    this.partnersContract = this.applyContract(PartnersContract)
    this.p2pContract = this.applyContract(P2PContract)
  }

  applyContract<T extends BaseContract>(contract: { new(...args: any[]): T ;}): T {
    return new contract(this.readApi, this.tableCodeConfig)
  }

  getEosPassInstance(wif: string) {
    const endpoint = this.readApi.getEndpoint()
    if (!this.rpcByEndpoint[endpoint]) {
      this.rpcByEndpoint[endpoint] = new JsonRpc(endpoint, {fetch});
    }

    const signatureProvider = new JsSignatureProvider([wif]);
    return new Api({
      rpc: this.rpcByEndpoint[endpoint],
      signatureProvider,
      // @ts-ignore
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
  }
}

export default Chain
