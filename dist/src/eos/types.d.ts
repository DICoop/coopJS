export declare type AccountName = string;
export declare type SafeNumber = number | string;
export declare type TokenAmount = string;
export interface Limit {
    used: SafeNumber;
    available: SafeNumber;
    max: SafeNumber;
}
export interface AuthKey {
    key: string;
    weight: number;
}
export interface RequiredAuth {
    accounts: AccountName[];
    keys: AuthKey[];
    threshold: number;
    waits: any[];
}
export interface Permission {
    parent?: AccountName;
    perm_name: string;
    required_auth: RequiredAuth;
}
export interface Resources {
    cpu_weight: TokenAmount;
    net_weight: TokenAmount;
    owner: AccountName;
    ram_bytes: number;
}
export interface AccountStats {
    account_name: string;
    cpu_limit: Limit;
    cpu_weight: number;
    created: string;
    head_block_num: number;
    head_block_time: string;
    last_code_update: string;
    net_limit: Limit;
    net_weight: number;
    permissions: Permission[];
    privileged: boolean;
    ram_quota: number;
    ram_usage: number;
    refund_request: any;
    rex_info: any;
    self_delegated_bandwidth: any;
    subjective_cpu_bill_limit: Limit;
    total_resources: Resources;
    voter_info: any;
}
export interface TableResult<RowType = any> {
    rows: RowType[];
    more?: boolean;
    next_key?: number | string;
}
