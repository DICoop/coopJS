import ReadApi from '../readApi';
import { TableCodeConfig } from '../types';
import BaseContract from './base';
interface UserPowerData {
    delegated: number;
    frozen: number;
    power: number;
    staked: number;
    username: string;
    with_badges: number;
}
interface MarketBalance {
    balance: string;
    weight: string;
    contract: string;
}
interface MarketPrice {
    buy: string;
    sell: string;
}
interface MarketData {
    base: MarketBalance;
    id: number;
    name: string;
    quote: MarketBalance;
    supply: string;
    vesting_seconds: number;
    liquid: number;
    price: MarketPrice;
    stake: string;
    if_user_sell_all?: string;
}
interface ReportData {
    approved: number;
    balance: string;
    comment: string;
    count: number;
    created_at: string;
    curator: string;
    data: string;
    distributed: number;
    expired_at: string;
    goal_id: string;
    need_check: number;
    report_id: number;
    requested: string;
    status: string;
    task_id: string;
    total_votes: number;
    type: number;
    username: string;
    voters: any[];
}
interface TaskData {
    active: number;
    badge_id: number;
    batch: any[];
    benefactor: string;
    calendar: any[];
    completed: number;
    created_at: string;
    creator: string;
    curator: string;
    data: string;
    doer: string;
    duration: number;
    expired_at: string;
    for_each: string;
    funded: string;
    gifted_badges: number;
    gifted_power: number;
    goal_id: string;
    host: string;
    is_batch: number;
    is_encrypted: number;
    is_public: number;
    is_regular: number;
    level: number;
    meta: any;
    parent_batch_id: number;
    permlink: string;
    priority: number;
    public_key: string;
    remain: string;
    reports_count: number;
    requested: string;
    role: string;
    start_at: string;
    status: string;
    suggester: string;
    task_id: string;
    title: string;
    total_votes: number;
    type: string;
    validated: number;
    voters: any[];
    with_badge: number;
}
interface BadgeData {
    caption: string;
    description: string;
    id: number;
    iurl: string;
    pic: string;
    power: number;
    remain: number;
    total: number;
}
interface TaskDataResult extends TaskData {
    reports: ReportData[];
    user_reports: ReportData[];
    no_reports_on_check: boolean;
    has_report: boolean;
    report_approved: boolean;
    badge?: BadgeData;
}
interface HostData {
    achieved_goals: number;
    activated: number;
    ahost: string;
    approved_reports: number;
    architect: string;
    asset_on_sale: string;
    asset_on_sale_precision: number;
    asset_on_sale_symbol: string;
    cfund_percent: number;
    chat_mode: string;
    chosts: any[];
    completed_tasks: number;
    consensus_percent: number;
    current_cycle_num: number;
    current_pool_id: number;
    current_pool_num: number;
    cycle_start_id: number;
    dac_mode: number;
    dacs_percent: number;
    direct_goal_withdraw: number;
    fhosts: any[];
    fhosts_mode: number;
    gsponsor_model: any[];
    hfund_percent: number;
    hoperator: string;
    levels: number[];
    meta: string;
    need_switch: number;
    non_active_chost: number;
    parameters_setted: number;
    payed: number;
    power_market_id: string;
    precision: number;
    priority_flag: number;
    purpose: string;
    quote_amount: string;
    quote_precision: number;
    quote_symbol: string;
    quote_token_contract: string;
    referral_percent: number;
    registered_at: string;
    root_token: string;
    root_token_contract: string;
    sale_is_enabled: number;
    sale_mode: string;
    sale_shift: number;
    sale_token_contract: string;
    symbol: string;
    sys_percent: number;
    title: string;
    to_pay: string;
    total_dacs_weight: number;
    total_goals: number;
    total_reports: number;
    total_shares: number;
    total_tasks: number;
    type: string;
    username: string;
    voting_only_up: number;
}
declare class CoreContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig);
    getUserPower(username: string, hostname: string): Promise<UserPowerData>;
    getMarket(host: HostData, userPower: UserPowerData): Promise<MarketData>;
    getReports(username: string): Promise<ReportData[]>;
    getTasksRaw(): Promise<TaskData[]>;
    getBadgesRaw(): Promise<BadgeData[]>;
    getTasks(username: string, reports: ReportData[]): Promise<TaskDataResult[]>;
    getHost(hostname: string): Promise<HostData>;
}
export default CoreContract;
//# sourceMappingURL=core.d.ts.map