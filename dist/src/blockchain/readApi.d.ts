import EosApi from 'eosjs-api';
import { RpcEndpoint, BalancingMode } from './types';
interface BalancingResult<T> {
    result: T;
    offset: number;
}
declare class ReadApi {
    private readonly balancingMode;
    private readonly apis;
    private readonly endpoints;
    private offset;
    constructor(chainName: string, apiConfigs: RpcEndpoint[], balancingMode?: BalancingMode);
    getBalancedItemByOffset<T>(currentOffset: number, items: T[], balancingMode: BalancingMode): BalancingResult<T>;
    getBalancedItem<T>(collection: T[]): T;
    getInstance(): EosApi;
    getEndpoint(): string;
    getKeyAccounts: EosApi['getKeyAccounts'];
    getAccount: EosApi['getAccount'];
    getCurrencyBalance: EosApi['getCurrencyBalance'];
    getUserBalance(account: string, symbol: string): Promise<string>;
    getPermissionKeyByName(accountName: string, name: string): Promise<string | undefined>;
    getTableRows<RowType>(code: string, scope: string, table: string, table_key?: string, lower_bound?: number | string, upper_bound?: number | string, limit?: number, key_type?: string, index_position?: number): import("../eos/types").TableResult<RowType>;
}
export default ReadApi;
