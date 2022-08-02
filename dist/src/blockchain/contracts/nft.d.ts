import { AccountName } from '../../eos/types';
import ReadApi from '../readApi';
import { TableCodeConfig } from '../types';
import BaseContract from './base';
export interface NftObject {
    category: string;
    creator: string;
    description: string;
    id: number;
    images: string[];
    ipns: string;
    meta: Object;
    title: string;
    total_pieces: number;
}
export interface DeliveryRequest {
    type: string;
    placeholder: string;
}
export interface NftMarketObject {
    base_piece_price: string;
    blocked_pieces: number;
    day_finish: number;
    day_start: number;
    id: number;
    meta: {
        delivery_request: DeliveryRequest[];
    };
    min_piece_price: string;
    object_id: number;
    remain_pieces: number;
    sales_closed_at: string;
    sales_start_at: string;
    seller: string;
    status: "waiting" | "pause" | "accepted" | "confirmed" | "issued" | "declined" | "cancelled";
    token_contract: string;
    total_price: string;
}
export interface NftMarketRequest {
    id: number;
    market_id: number;
    buyer: string;
    seller: string;
    manager: string;
    requested_pieces: number;
    total_price: string;
    base_piece_price: string;
    one_piece_price: string;
    total_payed: string;
    status: "waiting" | "payed" | "accepted" | "delivery" | "finish";
    day_start: number;
    day_finish: number;
    delivery_to: string;
    meta: Object;
}
declare class NftContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig);
    getObjectsByOwner(owner: AccountName): Promise<NftObject[]>;
    getAllObjects(): Promise<NftObject[]>;
    getMarket(): Promise<NftMarketObject[]>;
    fetchRequestsWithIndexPosition(username: AccountName, indexPosition: number): Promise<NftMarketRequest[]>;
    fetchRequests(username: AccountName): Promise<NftMarketRequest[]>;
}
export default NftContract;
//# sourceMappingURL=nft.d.ts.map