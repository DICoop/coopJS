export type AccountName = string
export type SafeNumber = number | string
export type TokenAmount = string // string with format "10.123 TOKEN"

export interface Limit {
  used: SafeNumber
  available: SafeNumber
  max: SafeNumber
}

export interface AuthKey {
  key: string
  weight: number
}

export interface RequiredAuth {
  accounts: AccountName[]
  keys: AuthKey[]
  threshold: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  waits: any[] // TODO: typing
}

export interface Permission {
  parent?: AccountName
  perm_name: string
  required_auth: RequiredAuth
}

export interface Resources {
  cpu_weight: TokenAmount
  net_weight: TokenAmount
  owner: AccountName
  ram_bytes: number
}

export interface AccountStats {
  account_name: string
  cpu_limit: Limit
  cpu_weight: number
  created: string
  head_block_num: number
  head_block_time: string
  last_code_update: string
  net_limit: Limit
  net_weight: number
  permissions: Permission[]
  privileged: boolean
  ram_quota: number
  ram_usage: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refund_request: any // TODO: typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rex_info: any // TODO: typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  self_delegated_bandwidth: any // TODO: typing
  subjective_cpu_bill_limit: Limit
  total_resources: Resources
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  voter_info: any // TODO: typing
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableResult<RowType = any> {
  rows: RowType[]
  more?: boolean
}
