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
declare class NftContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig);
    getObjectsByOwner(owner: AccountName): Promise<NftObject[]>;
    getAllObjects(): Promise<NftObject[]>;
    getMarket(): Promise<any[]>;
    fetchRequestsWithIndexPosition(username: AccountName, indexPosition: number): Promise<any[]>;
    fetchRequests(username: AccountName): Promise<any[]>;
}
export default NftContract;
