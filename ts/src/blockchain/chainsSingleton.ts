import ono from '@jsdevtools/ono'
import {TextDecoder, TextEncoder} from 'util'

import Chain from './chain'
import {Config, SignatureProviderMaker, AuthKeySearchCallback, ChainCrypt} from './types'
import { UnknownChainError, ChainsIsNotInitializedError } from './errors'
import Registrator from "./registrator";

interface ChainsByName {
  [key: string]: Chain
}

class ChainsSingleton {
  private readonly chainsByName: ChainsByName
  private initialized: boolean
  private rootChain: string
  public registrator: Registrator
  public textDecoder?: typeof TextDecoder
  public textEncoder?: typeof TextEncoder

  constructor() {
    this.chainsByName = {}
    this.initialized = false
    this.rootChain = 'unknown'
    this.registrator = new Registrator(null)
  }

  init(
      config: Config,
      authKeySearchCallback?: AuthKeySearchCallback,
      signatureProviderMaker?: SignatureProviderMaker,
      chainCrypt?: ChainCrypt,
      textDecoder?: typeof TextDecoder,
      textEncoder?: typeof TextEncoder,
    ) {
    if (this.initialized) {
      return
    }

    this.textDecoder = textDecoder
    this.textEncoder = textEncoder

    for (const chain of config.chains) {
      this.chainsByName[chain.name] = new Chain(
          chain,
          config.tableCodeConfig,
          authKeySearchCallback,
          signatureProviderMaker,
          chainCrypt,
          this.textDecoder,
          this.textEncoder
      )
    }

    this.rootChain = config.ual.rootChain
    if (config.registrator) {
      this.registrator.setConfig(config.registrator)
    }
    this.initialized = true
  }

  checkChainsIsInitialized() {
    if (!this.initialized) {
      throw ono(new ChainsIsNotInitializedError('Chains is not initialized'))
    }
  }

  getChainByName(name: string) {
    this.checkChainsIsInitialized()

    const chain = this.chainsByName[name]

    if (!chain) {
      throw ono(new UnknownChainError(`Chain "${name}" not found`))
    }

    return chain
  }

  getRootChain() {
    return this.getChainByName(this.rootChain)
  }
}

export default ChainsSingleton
