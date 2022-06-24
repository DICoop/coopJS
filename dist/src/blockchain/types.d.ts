import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
export declare type BalancingMode = 'round-robin' | 'random-once' | 'random';
export interface RpcEndpoint {
    protocol: string;
    host: string;
    port: number;
}
export interface TableCodeConfig {
    core?: string;
    staker?: string;
    p2p?: string;
    reg?: string;
    part?: string;
}
export interface TableCodeConfigStrict {
    core: string;
    staker: string;
    p2p: string;
    reg: string;
    part: string;
}
export declare type AuthKeyType = 'plain-auth-key' | 'auth-key-search-callback';
export interface WalletConfig {
    symbol: string;
    contract: string;
    canTransfer?: boolean;
    canDeposit?: boolean;
    canWithdraw?: boolean;
}
export interface ChainConfig {
    name: string;
    rpcEndpoints: RpcEndpoint[];
    balancingMode?: BalancingMode;
    explorerApiUrl: string;
    tableCodeConfigOverride?: TableCodeConfig;
    authKeyType?: AuthKeyType;
    wallets?: WalletConfig[];
    coreSymbol?: string;
}
export interface UalConfig {
    rootChain: string;
}
export interface RegistratorConfig {
    api: string;
    appName: string;
}
export interface Config {
    chains: ChainConfig[];
    ual: UalConfig;
    tableCodeConfig: TableCodeConfigStrict;
    registrator?: RegistratorConfig;
}
export declare type AuthKeySearchCallback = (authKeyQuery: string) => Promise<string | null>;
export declare type SignatureProviderMaker = (authKey: string) => Promise<SignatureProvider>;
export interface ChainCrypt {
    encrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string>;
    decrypt(authKey: string, publicKey: string, message: string, memo?: string): Promise<string>;
}
