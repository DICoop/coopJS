import ReadApi from '../readApi';
import { TableCodeConfig } from '../types';
import BaseContract from './base';
interface UsdRatesData {
    id: number;
    out_asset: string;
    out_contract: string;
    rate: string;
    updated_at: string;
}
declare class P2PContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig);
    getOrders(username?: string): Promise<{
        created_at: string;
        creator: string;
        curator: string;
        details: any;
        expired_at: string;
        id: number;
        out_completed: string;
        out_contract: string;
        out_currency_code: number;
        out_locked: string;
        out_precision: number;
        out_quantity: string;
        out_rate: string;
        out_remain: string;
        out_symbol: string;
        out_type: string;
        parent_creator: string;
        parent_id: number;
        quote_completed: string;
        quote_contract: string;
        quote_locked: string;
        quote_precision: number;
        quote_quantity: string;
        quote_rate: string;
        quote_remain: string;
        quote_symbol: string;
        quote_type: string;
        root_completed: string;
        root_contract: string;
        root_locked: string;
        root_precision: number;
        root_quantity: string;
        root_remain: string;
        root_remain_float?: number | undefined;
        root_symbol: string;
        status: string;
        type: string;
    }[]>;
    getUSDRates(): Promise<UsdRatesData[]>;
    getRateFromRates(rates: UsdRatesData[], symbol: string, precision: number): string;
    getUsdRate(symbol: string, precision: number): Promise<string>;
}
export default P2PContract;
