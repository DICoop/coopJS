import ReadApi from '../readApi'
import { TableCodeConfig } from '../types'
import BaseContract, {TableRowsArgs} from './base'

interface OrdersData {
  created_at: string
  creator: string
  curator: string
  details: any
  expired_at: string
  id: number
  out_completed: string
  out_contract: string
  out_currency_code: number
  out_locked: string
  out_precision: number
  out_quantity: string
  out_rate: string
  out_remain: string
  out_symbol: string
  out_type: string
  parent_creator: string
  parent_id: number
  quote_completed: string
  quote_contract: string
  quote_locked: string
  quote_precision: number
  quote_quantity: string
  quote_rate: string
  quote_remain: string
  quote_symbol: string
  quote_type: string
  root_completed: string
  root_contract: string
  root_locked: string
  root_precision: number
  root_quantity: string
  root_remain: string
  root_remain_float?: number
  root_symbol: string
  status: string
  type: string
}

interface UsdRatesData {
  id: number
  out_asset: string
  out_contract: string
  rate: string
  updated_at: string
}

class P2PContract extends BaseContract {
  constructor(api: ReadApi, tableCodeConfig: TableCodeConfig) {
    super(api, tableCodeConfig, 'p2p')
  }

  async getOrders(username?: string) {
    const q: TableRowsArgs = {
      table: 'orders',
      lower_bound: 0,
      limit: 100,
      getAllRows: true,
    }
    if (username) {
      q.lower_bound = username
      q.upper_bound = username
      q.index_position = 5
      q.key_type = 'i64'
    }
    const {rows} = await this.getTableRows<OrdersData>(q)

    return rows.map(row => {
      const res = {...row}

      try {
        res.details = JSON.parse(res.details)
        res.root_remain_float = parseFloat(res.root_remain)
      } catch(e){
        res.details = {address: res.details}
      }

      return res
    })
  }

  getUSDRates() {
    return this.getTableRows<UsdRatesData>({
      table: 'usdrates',
      lower_bound: 0,
      limit: 100,
      getAllRows: true,
    }).then(result => result.rows)
  }

  getRateFromRates(rates: UsdRatesData[], symbol: string, precision: number) {
    const filter = `${(0).toFixed(precision)} ${symbol}`

    const rate = rates.find(el => el.out_asset === filter)

    return rate ? rate.rate : '0'
  }

  async getUsdRate(symbol: string, precision: number) {
    const rates = await this.getUSDRates()

    return this.getRateFromRates(rates, symbol, precision)
  }
}

export default P2PContract
