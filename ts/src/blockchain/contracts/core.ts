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

interface ReportData {
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

interface TaskData {
  active: number
  badge_id: number
  batch: any[]
  benefactor: string
  calendar: any[]
  completed: number
  created_at: string
  creator: string
  curator: string
  data: string
  doer: string
  duration: number
  expired_at: string
  for_each: string
  funded: string
  gifted_badges: number
  gifted_power: number
  goal_id: string
  host: string
  is_batch: number
  is_encrypted: number
  is_public: number
  is_regular: number
  level: number
  meta: any
  parent_batch_id: number
  permlink: string
  priority: number
  public_key: string
  remain: string
  reports_count: number
  requested: string
  role: string
  start_at: string
  status: string
  suggester: string
  task_id: string
  title: string
  total_votes: number
  type: string
  validated: number
  voters: any[]
  with_badge: number
}

interface BadgeData {
  caption: string
  description: string
  id: number
  iurl: string
  pic: string
  power: number
  remain: number
  total: number
}

interface TaskDataResult extends TaskData {
  reports: ReportData[]
  user_reports: ReportData[]
  no_reports_on_check: boolean
  has_report: boolean
  report_approved: boolean
  badge?: BadgeData
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
    return this.getTableRows<ReportData>({
      table: 'reports3',
      scope: 'core',
      lower_bound: username,
      upper_bound: username,
      limit: 100,
      index_position: 4,
      key_type: 'i64',
      getAllRows: true,
    }).then(result => result.rows)
  }

  getTasksRaw() {
    return this.getTableRows<TaskData>({
      table: 'tasks',
      scope: 'core',
      lower_bound: 0,
      limit: 100,
      getAllRows: true,
      parseMetaAsJson: true,
    }).then(result => result.rows)
  }

  getBadgesRaw() {
    return this.getTableRows<BadgeData>({
      table: 'badges',
      scope: 'core',
      lower_bound: 0,
      limit: 100,
      getAllRows: true,
    }).then(result => result.rows)
  }

  async getTasks(username: string, reports: ReportData[]) {
    const tasks = await this.getTasksRaw()
    const badges = await this.getBadgesRaw()

    const result: TaskDataResult[] = []

    for (const task of tasks) {
      if (task.validated !== 1) {
        continue
      }

      const taskReports = reports.filter(report => report.task_id === task.task_id)
      const userReports = taskReports.filter(report => report.username === username)

      if (userReports.length > 0) {
        continue
      }

      const no_reports_on_check = taskReports.every(report => !report.need_check && report.approved)

      const badge = task.with_badge ? badges.find(b=> task.badge_id == b.id) : undefined

      const taskResult: TaskDataResult = {
        ...task,
        no_reports_on_check,
        has_report: false,
        report_approved: false,
        badge,
        reports: taskReports,
        user_reports: userReports,
      }

      result.push(taskResult)
    }

    return result
  }
}

export default CoreContract
