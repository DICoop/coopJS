import EosApi from 'eosjs-api';
import { RpcEndpoint, BalancingMode } from './types';
declare class ReadApi {
    private readonly balancingMode;
    private readonly apis;
    private offset;
    constructor(chainName: string, apiConfigs: RpcEndpoint[], balancingMode?: BalancingMode);
    getInstance(): EosApi;
    getKeyAccounts: EosApi['getKeyAccounts'];
    getAccount: EosApi['getAccount'];
    getCurrencyBalance: EosApi['getCurrencyBalance'];
    getUserBalance(account: string, symbol: string): Promise<string>;
    getTableRows<RowType>(code: string, scope: string, table: string, table_key?: string, lower_bound?: number | string, upper_bound?: number | string, limit?: number, key_type?: string, index_position?: number): import("../eos/types").TableResult<RowType>;
}
export default ReadApi;
