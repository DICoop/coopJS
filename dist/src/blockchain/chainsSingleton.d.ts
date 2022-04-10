import Chain from './chain';
import { Config, SignatureProviderMaker, AuthKeySearchCallback, ChainCrypt } from './types';
declare class ChainsSingleton {
    private readonly chainsByName;
    private initialized;
    private rootChain;
    constructor();
    init(config: Config, authKeySearchCallback?: AuthKeySearchCallback, signatureProviderMaker?: SignatureProviderMaker, chainCrypt?: ChainCrypt): void;
    checkChainsIsInitialized(): void;
    getChainByName(name: string): Chain;
    getRootChain(): Chain;
}
export default ChainsSingleton;
