export type BalancingMode = 'round-robin' | 'random-once' | 'random'

export interface RpcEndpoint {
  protocol: string
  host: string
  port: number
}

export interface TableCodeConfig {
  core?: string
  staker?: string
  p2p?: string
  reg?: string
  part?: string
}

export interface TableCodeConfigStrict {
  core: string
  staker: string
  p2p: string
  reg: string
  part: string
}

export interface ChainConfig {
  name: string
  rpcEndpoints: RpcEndpoint[]
  balancingMode?: BalancingMode
  explorerApiUrl: string
  tableCodeConfigOverride?: TableCodeConfig
}

export interface UalConfig {
  rootChain: string
}

export interface Config {
  chains: ChainConfig[]
  ual: UalConfig
  tableCodeConfig: TableCodeConfigStrict
}

export interface Host {
  username: string
  total_shares: number
  quote_precision: number
}
