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
  meta: Record<string, unknown>,
  title: string
  total_pieces: number
}

export interface NftPieceObject {
  id: number
  object_id: number
  owner: string,
  pieces: number
  day_finish: number
  day_start: number
}

export interface DeliveryRequest {
  type: string
  placeholder: string
}

export type DeliveryRequestFilled = DeliveryRequest & {
  value: string
}

export type DeliveryRequestPersonalData = {
  personalDataId?: string
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
  total_pieces_on_sell: number
  solded_pieces: number
  backed_pieces: number
  sales_closed_at: string
  sales_start_at: string
  seller: string
  status: "waiting" | "pause"
  token_contract: string
  total_price: string
}

export interface NftMarketRequest {
  id: number
  market_id: number
  buyer: string
  seller: string
  manager: string
  requested_pieces: number
  total_price: string
  base_piece_price: string
  one_piece_price: string
  total_payed: string
  status: "waiting" | "accepted" | "confirmed" | "issued" | "declined" | "cancelled" | "completed"
  day_start: number
  day_finish: number
  delivery_to: DeliveryRequestFilled[] | DeliveryRequestPersonalData
  meta: Record<string, unknown>
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
    }
    const {rows} = await this.getTableRows<NftPieceObject>(q)

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

  async getObjectsById(id: number) {
    const q: TableRowsArgs = {
      table: 'objects',
      limit: 1,
      lower_bound: id,
      upper_bound: id,
      index_position: 0,
      key_type: 'i64',
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

  async getMarketObjectsById(id: number) {
    const q: TableRowsArgs = {
      table: 'market',
      limit: 1,
      lower_bound: id,
      upper_bound: id,
      index_position: 0,
      key_type: 'i64',
      parseMetaAsJson: true,
    }
    const {rows} = await this.getTableRows<NftMarketObject>(q)

    return rows;
  }

  async fetchRequestsWithIndexPosition(username: AccountName, indexPosition: number) {
    const q: TableRowsArgs = {
      table: 'requests',
      lower_bound: username,
      upper_bound: username,
      limit: 1000,
      index_position: indexPosition,
      key_type: 'i64',
      parseKeysAsJson: ['delivery_to', 'meta'],
      getAllRows: true,
    }
    const {rows} = await this.getTableRows<NftMarketRequest>(q)

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
