import ono from '@jsdevtools/ono'

import Chain from './chain'
import {Config, SignatureProviderMaker, AuthKeySearchCallback} from './types'
import { UnknownChainError, ChainsIsNotInitializedError } from './errors'

interface ChainsByName {
  [key: string]: Chain
}

class ChainsSingleton {
  private readonly chainsByName: ChainsByName
  private initialized: boolean
  private rootChain: string

  constructor() {
    this.chainsByName = {}
    this.initialized = false
    this.rootChain = 'unknown'
  }

  init(
      config: Config,
      authKeySearchCallback?: AuthKeySearchCallback,
      signatureProviderMaker?: SignatureProviderMaker,
    ) {
    if (this.initialized) {
      return
    }

    for (const chain of config.chains) {
      this.chainsByName[chain.name] = new Chain(
          chain,
          config.tableCodeConfig,
          authKeySearchCallback,
          signatureProviderMaker
      )
    }

    this.rootChain = config.ual.rootChain
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
