import { AccountName } from '../../eos/types';
import ReadApi from '../readApi';
import { TableCodeConfig } from '../types';
import BaseContract from './base';
declare class NftContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig);
    getObjectsByOwner(owner: AccountName): Promise<any[]>;
    getAllObjects(): Promise<any[]>;
    getMarket(): Promise<any[]>;
    fetchRequestsWithIndexPosition(username: AccountName, indexPosition: number): Promise<any[]>;
    fetchRequests(username: AccountName): Promise<any[]>;
}
export default NftContract;
