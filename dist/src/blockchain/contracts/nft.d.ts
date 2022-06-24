import { AccountName } from '../../eos/types';
import ReadApi from '../readApi';
import { TableCodeConfig } from '../types';
import BaseContract from './base';
export interface NftObject {
    category: string;
    creator: string;
    creator_can_emit_new_pieces: number;
    description: string;
    id: number;
    images: string[];
    ipns: string;
    lang: string;
    title: string;
    total_pieces: number;
}
export interface DeliveryRequest {
    type: string;
    placeholder: string;
}
export interface NftMarketObject {
    blocked_pieces: number;
    buyer_can_offer_price: number;
    delivery_from: string;
    delivery_methods: string[];
    delivery_operators: string[];
    id: number;
    is_auction: number;
    lang: string;
    meta: {
        delivery_request: DeliveryRequest[];
    };
    object_id: number;
    one_piece_price: string;
    remain_pieces: number;
    sales_closed_at: string;
    sales_start_at: string;
    seller: string;
    status: string;
    token_contract: string;
    total_price: string;
    with_delivery: number;
}
declare class NftContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig);
    getObjectsByOwner(owner: AccountName): Promise<NftObject[]>;
    getAllObjects(): Promise<NftObject[]>;
    getMarket(): Promise<NftMarketObject[]>;
    fetchRequestsWithIndexPosition(username: AccountName, indexPosition: number): Promise<any[]>;
    fetchRequests(username: AccountName): Promise<any[]>;
}
export default NftContract;
