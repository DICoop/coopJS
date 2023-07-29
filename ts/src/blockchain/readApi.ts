import EosApi from 'eosjs-api'
import ono from '@jsdevtools/ono'

import { RpcEndpoint, BalancingMode } from './types'
import { RpcEndpointsEmptyError } from './errors'

interface BalancingResult<T> {
  result: T,
  offset: number,
}

class ReadApi {
  private readonly balancingMode: BalancingMode
  private readonly apis: EosApi[]
  private readonly endpoints: string[]
  private offset: number

  constructor(chainName: string, apiConfigs: RpcEndpoint[], balancingMode?: BalancingMode) {
    this.offset = 0
    this.balancingMode = balancingMode || 'random-once'
    this.apis = []
    this.endpoints = []

    if (!apiConfigs || apiConfigs.length === 0) {
      throw ono(new RpcEndpointsEmptyError(`rpcEndpoints is empty (chain=${chainName})`))
    }

    for (const { protocol, host, port } of apiConfigs) {
      const rpcEndpointString = `${protocol}://${host}:${port}`
      this.endpoints.push(rpcEndpointString)
      this.apis.push(new EosApi({ httpEndpoint: rpcEndpointString }))
    }

    if (this.balancingMode === 'random-once' && this.apis.length > 1) {
      this.offset = Math.floor(Math.random() * this.apis.length)
    }
  }

  getBalancedItemByOffset<T>(currentOffset: number, items: T[], balancingMode: BalancingMode): BalancingResult<T> {
    if (items.length < 2) {
      return {
        result: items[0],
        offset: 0,
      }
    }

    let nextOffset = currentOffset
    if (balancingMode === 'random') {
      nextOffset = Math.floor(Math.random() * items.length)
    }

    const instance = items[nextOffset]

    if (balancingMode === 'round-robin') {
      nextOffset++

      if (nextOffset >= items.length) {
        nextOffset = 0
      }
    }

    return {
      result: instance,
      offset: nextOffset,
    }
  }

  getBalancedItem<T>(collection: T[]): T {
    const {
      result,
      offset,
    } = this.getBalancedItemByOffset<T>(this.offset, collection, this.balancingMode)

    this.offset = offset

    return result
  }

  getInstance(): EosApi {
    return this.getBalancedItem<EosApi>(this.apis)
  }

  getEndpoint(): string {
    return this.getBalancedItem<string>(this.endpoints)
  }

  getKeyAccounts: EosApi['getKeyAccounts'] = (...args) => {
    const instance = this.getInstance()

    return instance.getKeyAccounts(...args)
  }

  getAccount: EosApi['getAccount'] = (...args) => {
    const instance = this.getInstance()

    return instance.getAccount(...args)
  }

  getAbi: EosApi['getAbi'] = (...args) => {
    const instance = this.getInstance()

    return instance.getAbi(...args)
  }

  getCurrencyBalance: EosApi['getCurrencyBalance'] = (...args) => {
    const instance = this.getInstance()

    return instance.getCurrencyBalance(...args)
  }

  async getUserBalance(account: string, symbol: string) {
    const [balance] = await this.getCurrencyBalance("eosio.token", account, symbol)

    return `${(parseFloat(balance || '0') || 0).toFixed(4)} ${symbol}`
  }

  async getPermissionKeyByName(accountName: string, name: string) {
    const account = await this.getAccount(accountName);
    const permission = account.permissions.find(el => el.perm_name === name)

    return permission?.required_auth.keys[0].key
  }

  async getInfo(accountName: string, name: string) {
    const account = await this.getAccount(accountName);
    const permission = account.permissions.find(el => el.perm_name === name)

    return permission?.required_auth.keys[0].key
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
