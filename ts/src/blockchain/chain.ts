import EosioContract from './contracts/eosio'
import CoreContract from './contracts/core'
import PartnersContract from './contracts/partners'
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

  constructor(chainConfig: ChainConfig, tableCodeConfig: TableCodeConfig) {
    this.name = chainConfig.name
    this.tableCodeConfig = { ...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {}) }
    this.readApi = new ReadApi(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode)

    this.eosioContract = this.applyContract(EosioContract)
    this.coreContract = this.applyContract(CoreContract)
    this.partnersContract = this.applyContract(PartnersContract)
  }

  applyContract<T extends BaseContract>(contract: { new(...args: any[]): T ;}): T {
    return new contract(this.readApi, this.tableCodeConfig)
  }
}

export default Chain
