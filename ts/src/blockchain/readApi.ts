import EosApi from 'eosjs-api'
import ono from '@jsdevtools/ono'

import { RpcEndpoint, BalancingMode } from './types'
import { RpcEndpointsEmptyError } from './errors'

class ReadApi {
  private readonly balancingMode: BalancingMode
  private readonly apis: EosApi[]
  private offset: number

  constructor(chainName: string, apiConfigs: RpcEndpoint[], balancingMode?: BalancingMode) {
    this.offset = 0
    this.balancingMode = balancingMode || 'random-once'
    this.apis = []

    if (!apiConfigs || apiConfigs.length === 0) {
      throw ono(new RpcEndpointsEmptyError(`rpcEndpoints is empty (chain=${chainName})`))
    }

    for (const { protocol, host, port } of apiConfigs) {
      const rpcEndpointString = `${protocol}://${host}:${port}`
      this.apis.push(new EosApi({ httpEndpoint: rpcEndpointString }))
    }

    if (this.balancingMode === 'random-once' && this.apis.length > 1) {
      this.offset = Math.floor(Math.random() * this.apis.length)
    }
  }

  getInstance(): EosApi {
    if (this.apis.length < 2) {
      return this.apis[0]
    }

    let offset = this.offset
    if (this.balancingMode === 'random') {
      offset = Math.floor(Math.random() * this.apis.length)
    }

    const api = this.apis[offset]

    if (this.balancingMode === 'round-robin') {
      this.offset++

      if (this.offset >= this.apis.length) {
        this.offset = 0
      }
    }

    return api
  }

  getKeyAccounts: EosApi['getKeyAccounts'] = (...args) => {
    const instance = this.getInstance()

    return instance.getKeyAccounts(...args)
  }

  getAccount: EosApi['getAccount'] = (...args) => {
    const instance = this.getInstance()

    return instance.getAccount(...args)
  }

  getTableRows<RowType>(
    code: string,
    scope: string,
    table: string,
    table_key?: string,
    lower_bound?: number | string,
    upper_bound?: number | string,
    limit?: number,
    key_type?: string,
    index_position?: number
  ) {
    const instance = this.getInstance()

    return instance.getTableRows<RowType>(
      true,
      code,
      scope,
      table,
      table_key,
      lower_bound,
      upper_bound,
      limit,
      key_type,
      index_position
    )
  }
}

export default ReadApi
