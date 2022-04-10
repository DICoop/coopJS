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

    getCurrencyBalance(code: string, account: AccountName, symbol?: string): Promise<number[]>

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

declare module "eosjs-ecc" {
  import Long from "long";

  export interface Crypt {
    nonce: Long;
    message: Buffer;
    checksum: Buffer | string;
  }

  export function PublicKey(arg: any): any;

  module Aes {
    export function decrypt(private_key: string, public_key: string, nonce: Long, message: string | Buffer, checksum: number): Buffer

    export function encrypt(private_key: string, public_key: string, message: string| Buffer, nonce?: string): Crypt
  }
}
declare module 'bip39'
declare module 'wif'
declare module 'core-js-pure/stable/escape'
declare module 'core-js-pure/stable/unescape'