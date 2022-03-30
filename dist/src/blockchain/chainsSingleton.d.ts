import Chain from './chain';
import { Config } from './types';
declare class ChainsSingleton {
    private readonly chainsByName;
    private initialized;
    private rootChain;
    constructor();
    init(config: Config): void;
    checkChainsIsInitialized(): void;
    getChainByName(name: string): Chain;
    getRootChain(): Chain;
}
export default ChainsSingleton;
