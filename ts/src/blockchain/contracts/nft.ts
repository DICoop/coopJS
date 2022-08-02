import { AccountName } from '../../eos/types'
import ReadApi from '../readApi'
import { TableCodeConfig } from '../types'
import BaseContract, {TableRowsArgs} from './base'

export interface NftObject {
  category: string
  creator: string
  description: string
  id: number
  images: string[]
  ipns: string
  meta: Object,
  title: string
  total_pieces: number
}

export interface DeliveryRequest {
  type: string
  placeholder: string
}

export interface NftMarketObject {
  base_piece_price: string
  blocked_pieces: number
  day_finish: number
  day_start: number
  id: number
  meta: {delivery_request: DeliveryRequest[]}
  min_piece_price: string
  object_id: number
  remain_pieces: number
  sales_closed_at: string
  sales_start_at: string
  seller: string
  status: string
  token_contract: string
  total_price: string
}

class NftContract extends BaseContract {
  constructor(api: ReadApi, tableCodeConfig: TableCodeConfig) {
    super(api, tableCodeConfig, 'nft')
  }

  async getObjectsByOwner(owner: AccountName) {
    const q: TableRowsArgs = {
      table: 'pieces',
      lower_bound: owner,
      upper_bound: owner,
      limit: 1000,
      index_position: 2,
      key_type: 'i64',
      getAllRows: true,
      parseMetaAsJson: true,
      parseKeysAsJson: ['images'],
      defaultJsonValues: {
        images: () => [],
      },
    }
    const {rows} = await this.getTableRows<NftObject>(q)

    return rows;
  }

  async getAllObjects() {
    const q: TableRowsArgs = {
      table: 'objects',
      limit: 100,
      lower_bound: 0,
      getAllRows: true,
      parseMetaAsJson: true,
      parseKeysAsJson: ['images'],
      defaultJsonValues: {
        images: () => [],
      },
    }
    const {rows} = await this.getTableRows<NftObject>(q)

    return rows;
  }

  async getMarket() {
    const q: TableRowsArgs = {
      table: 'market',
      limit: 1000,
      lower_bound: 0,
      getAllRows: true,
      parseMetaAsJson: true,
    }
    const {rows} = await this.getTableRows<NftMarketObject>(q)

    return rows;
  }

  async fetchRequestsWithIndexPosition(username: AccountName, indexPosition: number) {
    const q: TableRowsArgs = {
      table: 'pieces',
      lower_bound: username,
      upper_bound: username,
      limit: 1000,
      index_position: indexPosition,
      key_type: 'i64',
      parseKeysAsJson: ['delivery_to'],
      getAllRows: true,
    }
    const {rows} = await this.getTableRows<any>(q)

    return rows;
  }

  async fetchRequests(username: AccountName) {
    const [asBuyer, asSeller] = await Promise.all([
      this.fetchRequestsWithIndexPosition(username, 2),
      this.fetchRequestsWithIndexPosition(username, 3),
    ]);

    return [...asBuyer, ...asSeller];
  }
}

export default NftContract
