import ReadApi from '../readApi'
import { TableCodeConfig } from '../types'

interface TableRowsArgs {
  scope?: string
  table: string
  table_key?: string
  lower_bound?: number | string
  upper_bound?: number | string
  limit?: number
  key_type?: string
  index_position?: number
  parseMetaAsJson?: boolean
}

class BaseContract {
  private api: ReadApi
  private readonly name: string

  constructor(api: ReadApi, tableCodeConfig: TableCodeConfig, name: string) {
    this.api = api
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.name = tableCodeConfig[name] || name
  }

  async getTableRows<ReturnType>({
    scope,
    table,
    table_key,
    lower_bound,
    upper_bound,
    limit,
    key_type,
    index_position,
    parseMetaAsJson,
  }: TableRowsArgs) {
    const result = await this.api.getTableRows<ReturnType>(
      this.name,
      scope || this.name,
      table,
      table_key,
      lower_bound,
      upper_bound,
      limit,
      key_type,
      index_position
    )

    if (parseMetaAsJson && result.rows) {
      for (const row of result.rows) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!row.meta) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          row.meta = {}
        } else {
          try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            row.meta = JSON.parse(row.meta)
          } catch (_) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            row.meta = {}
          }
        }
      }
    }

    return result
  }

  async getSingleTableRow<ReturnType>(args: TableRowsArgs) {
    const result = await this.getTableRows<ReturnType>(args)

    return result.rows[0]
  }
}

export default BaseContract
