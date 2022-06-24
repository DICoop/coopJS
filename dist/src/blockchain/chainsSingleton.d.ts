import { TextDecoder, TextEncoder } from 'text-encoding';
import Chain from './chain';
import { Config, SignatureProviderMaker, AuthKeySearchCallback, ChainCrypt } from './types';
import Registrator from "./registrator";
declare class ChainsSingleton {
    private readonly chainsByName;
    private initialized;
    private rootChain;
    registrator: Registrator;
    textDecoder?: typeof TextDecoder;
    textEncoder?: typeof TextEncoder;
    constructor();
    init(config: Config, authKeySearchCallback?: AuthKeySearchCallback, signatureProviderMaker?: SignatureProviderMaker, chainCrypt?: ChainCrypt, textDecoder?: typeof TextDecoder, textEncoder?: typeof TextEncoder): void;
    checkChainsIsInitialized(): void;
    getChainByName(name: string): Chain;
    getRootChain(): Chain;
}
export default ChainsSingleton;
