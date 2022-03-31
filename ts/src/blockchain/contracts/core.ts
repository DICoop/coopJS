import ReadApi from '../readApi'
import { TableCodeConfig } from '../types'
import BaseContract from './base'

interface UserPowerData {
  delegated: number
  frozen: number
  power: number
  staked: number
  username: string
  with_badges: number
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
}

export default CoreContract
