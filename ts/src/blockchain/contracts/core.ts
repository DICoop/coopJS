import ReadApi from '../readApi'
import {Host, TableCodeConfig} from '../types'
import BaseContract from './base'

interface UserPowerData {
  delegated: number
  frozen: number
  power: number
  staked: number
  username: string
  with_badges: number
}

interface MarketBalance {
  balance: string
  weight: string
  contract: string
}

interface MarketPrice {
  buy: string
  sell: string
}

interface MarketData {
  base: MarketBalance
  id: number
  name: string
  quote: MarketBalance
  supply: string
  vesting_seconds: number
  liquid: number // generated property
  price: MarketPrice // generated property
  stake: string // generated property
  if_user_sell_all?: string // generated property
}

interface ReportsData {
  approved: number
  balance: string
  comment: string
  count: number
  created_at: string
  curator: string
  data: string
  distributed: number
  expired_at: string
  goal_id: string
  need_check: number
  report_id: number
  requested: string
  status: string
  task_id: string
  total_votes: number
  type: number
  username: string
  voters: any[]
}

class CoreContract extends BaseContract {
  constructor(api: ReadApi, tableCodeConfig: TableCodeConfig) {
    super(api, tableCodeConfig, 'core')
  }

  async getUserPower(username: string, hostname: string) {
    const powerData: UserPowerData | null = await this.getSingleTableRow<UserPowerData>({
      table: 'power3',
      scope: hostname,
      lower_bound: username,
      upper_bound: username,
      limit: 1,
    })

    return powerData || {
      delegated: 0,
      frozen: 0,
      power: 0,
      staked: 0,
      username,
      with_badges: 0,
    }
  }

  async getMarket(host: Host, userPower: UserPowerData) {
    const market = await this.getSingleTableRow<MarketData>({
      table: 'powermarket',
      scope: host.username,
      lower_bound: 0,
      limit: 1,
    })

    market.liquid = host.total_shares - Number(market.base.balance.split(' ')[0])
    if (market.liquid === 0) {
      market.liquid = 1
    }

    const price1 = Number(market.quote.balance.split(' ')[0])
    const price2 = Number(market.base.balance.split(' ')[0])

    market.price = {
      buy: (price1 / price2).toFixed(host.quote_precision),
      sell: (price1 / price2).toFixed(host.quote_precision),
    }

    market.stake = (userPower.power / market.liquid * 100).toFixed(3) || '0'

    const res = Math.max(userPower.power * price1 / ( price2 + userPower.power), 0)
    if (res) {
      market.if_user_sell_all = res.toFixed(4)
    }

    return market
  }

  getReports(username: string) {
    return this.getTableRows<ReportsData>({
      table: 'reports3',
      scope: 'core',
      lower_bound: username,
      upper_bound: username,
      limit: 100,
      index_position: 4,
      key_type: 'i64',
      getAllRows: true,
    })
  }
}

export default CoreContract
