/* eslint-disable no-unused-vars */

declare module 'eosjs-api' {
  type AccountName = import('./eos/types').AccountName
  type AccountStats = import('./eos/types').AccountStats
  type TableResult<RowType> = import('./eos/types').TableResult<RowType>

  interface EosApiConfig {
    httpEndpoint: string
  }

  class EosApi {
    constructor(config: EosApiConfig)

    getKeyAccounts(publicKey: string): Promise<AccountName[]>

    getAccount(accountName: AccountName): Promise<AccountStats>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getTableRows<RowType = any>(
      json: boolean,
      code: string,
      scope: string,
      table: string,
      table_key?: string,
      lower_bound?: number | string,
      upper_bound?: number | string,
      limit?: number,
      key_type?: string,
      index_position?: number
    ): TableResult<RowType>
  }

  export default EosApi
}

declare module 'eosjs-ecc'
declare module 'bip39'