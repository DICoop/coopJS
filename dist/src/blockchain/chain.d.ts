import EosioContract from './contracts/eosio';
import CoreContract from './contracts/core';
import PartnersContract from './contracts/partners';
import P2PContract from './contracts/p2p';
import { ChainConfig, TableCodeConfig } from './types';
import ReadApi from './readApi';
import BaseContract from "./contracts/base";
declare class Chain {
    private readonly name;
    readApi: ReadApi;
    private readonly tableCodeConfig;
    eosioContract: EosioContract;
    coreContract: CoreContract;
    partnersContract: PartnersContract;
    p2pContract: P2PContract;
    constructor(chainConfig: ChainConfig, tableCodeConfig: TableCodeConfig);
    applyContract<T extends BaseContract>(contract: {
        new (...args: any[]): T;
    }): T;
}
export default Chain;
