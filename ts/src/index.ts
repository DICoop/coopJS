/// <reference path="./eos-api.d.ts" />

export {
    makePublicKeyByMnemonic,
    generateAccount,
    AccountData,
    makeAccountByMnemonic,
    makeAccountByWif,
    generateKeyPair,
    checkPublicKey
} from './auth'

export {isValidWif} from './auth/keys/ecc'

export {default as ChainsSingleton} from './blockchain/chainsSingleton'

export {default as ReadApi} from './blockchain/readApi'
export {TableCodeConfig} from './blockchain/types'
export {default as BaseContract} from './blockchain/contracts/base'
