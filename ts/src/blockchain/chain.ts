import EosioContract from './contracts/eosio'
import CoreContract from './contracts/core'
import PartnersContract from './contracts/partners'
import P2PContract from './contracts/p2p'
import { ChainConfig, TableCodeConfig } from './types'
import ReadApi from './readApi'
import BaseContract from "./contracts/base";

class Chain {
  private readonly name: string
  public readApi: ReadApi
  private readonly tableCodeConfig: TableCodeConfig

  public eosioContract: EosioContract
  public coreContract: CoreContract
  public partnersContract: PartnersContract
  public p2pContract: P2PContract

  constructor(chainConfig: ChainConfig, tableCodeConfig: TableCodeConfig) {
    this.name = chainConfig.name
    this.tableCodeConfig = { ...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {}) }
    this.readApi = new ReadApi(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode)

    this.eosioContract = this.applyContract(EosioContract)
    this.coreContract = this.applyContract(CoreContract)
    this.partnersContract = this.applyContract(PartnersContract)
    this.p2pContract = this.applyContract(P2PContract)
  }

  applyContract<T extends BaseContract>(contract: { new(...args: any[]): T ;}): T {
    return new contract(this.readApi, this.tableCodeConfig)
  }
}

export default Chain
