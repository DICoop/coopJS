import ReadApi from '../readApi';
import { TableCodeConfig } from '../types';
import BaseContract from './base';
interface EosioGlobalData {
    base_per_transaction_net_usage: number;
    context_free_discount_net_usage_den: number;
    context_free_discount_net_usage_num: number;
    deferred_trx_expiration_window: number;
    last_name_close: string;
    last_pervote_bucket_fill: string;
    last_producer_schedule_size: number;
    last_producer_schedule_update: string;
    max_authority_depth: number;
    max_block_cpu_usage: number;
    max_block_net_usage: number;
    max_inline_action_depth: number;
    max_inline_action_size: number;
    max_ram_size: string;
    max_transaction_cpu_usage: number;
    max_transaction_delay: number;
    max_transaction_lifetime: number;
    max_transaction_net_usage: number;
    min_transaction_cpu_usage: number;
    net_usage_leeway: number;
    perblock_bucket: string;
    pervote_bucket: string;
    target_block_cpu_usage_pct: number;
    target_block_net_usage_pct: number;
    thresh_activated_stake_time: string;
    total_activated_stake: number;
    total_producer_vote_weight: string;
    total_ram_bytes_reserved: number;
    total_ram_stake: number;
    total_unpaid_blocks: number;
}
declare class EosioContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig);
    getGlobalData(): Promise<EosioGlobalData>;
}
export default EosioContract;
//# sourceMappingURL=eosio.d.ts.map