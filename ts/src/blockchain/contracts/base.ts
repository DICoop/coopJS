import ReadApi from '../readApi'
import { TableCodeConfig } from '../types'
import {TableResult} from "../../eos/types";

interface DefaultJsonValueMaker {
  [key: string]: () => any
}

const DEFAULT_META_MAKER = () => ({});

export interface TableRowsArgs {
  scope?: string
  table: string
  table_key?: string
  lower_bound?: number | string
  upper_bound?: number | string
  limit?: number
  key_type?: string
  index_position?: number
  parseMetaAsJson?: boolean
  parseKeysAsJson?: string[],
  defaultJsonValues?: DefaultJsonValueMaker,
  getAllRows?: boolean
}

class BaseContract {
  private api: ReadApi
  private readonly baseName: string

  constructor(api: ReadApi, tableCodeConfig: TableCodeConfig, name: string) {
    this.api = api
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.baseName = tableCodeConfig[name] || name
  }

  get name() {
    return this.baseName
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
    parseKeysAsJson,
    defaultJsonValues,
    getAllRows,
  }: TableRowsArgs, prependResult?: ReturnType[]): Promise<TableResult<ReturnType>> {
    const keysAsJson = parseKeysAsJson || [];
    if (parseMetaAsJson) {
      keysAsJson.push('meta');
    }

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

    if (keysAsJson.length > 0 && result.rows) {
      for (const row of result.rows) {
        for (const keyAsJson of keysAsJson) {
          const defaultValueMaker = defaultJsonValues?.[keyAsJson] || DEFAULT_META_MAKER
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (!row[keyAsJson]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            row[keyAsJson] = defaultValueMaker()
          } else {
            try {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              row[keyAsJson] = JSON.parse(row[keyAsJson])
            } catch (_) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              row[keyAsJson] = defaultValueMaker()
            }
          }
        }
      }
    }

    if (!getAllRows || !result.more || !result.next_key) {
      if (!prependResult) {
        return result
      }
      return {
        ...result,
        rows: [...prependResult, ...result.rows],
      }
    }

    return this.getTableRows<ReturnType>({
      scope,
      table,
      table_key,
      lower_bound: result.next_key,
      upper_bound,
      limit,
      key_type,
      index_position,
      parseMetaAsJson,
      parseKeysAsJson,
      defaultJsonValues,
      getAllRows,
    }, result.rows)
  }

  async getSingleTableRow<ReturnType>(args: TableRowsArgs) {
    const result = await this.getTableRows<ReturnType>(args)

    return result.rows[0]
  }
}

export default BaseContract
