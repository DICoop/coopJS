# UNICORE.JS

Unicore.js is universal core library for UNI OS.

It is based on a singleton model that accepts a configuration and provides access to one or more blockchains and contracts.

## Installation

TODO yarn and npm install.

Create a chainsMain.ts file with the following content:

```typescript
import ChainsSingleton from './uni-core/blockchain/chainsSingleton'
import config from './config'

const instance = new ChainsSingleton()
instance.init(config)

export default instance
```

Config example:

```typescript
export default {
  chains: [
    {
      name: 'FLOWER',
      rpcEndpoints: [
        {
          protocol: 'https',
          host: 'api.intellect.run',
          port: 443,
        },
      ],
      explorerApiUrl: 'https://explorer.gaia.holdings',
    },
  ],
  ual: {
    rootChain: 'FLOWER',
  },
  tableCodeConfig: {
    core: 'unicore',
    staker: 'staker',
    p2p: 'p2p',
    reg: 'registrator',
    part: 'part',
  },
}
```

## Usage

Just import `chainsMain.ts` and call needed methods.

```typescript
import { makePublicKeyByMnemonic } from '~/uni-core/auth'
import Chains from '~/chainsMain'

const mnemonic = '...some mnemonic 12 words...'

// Convert mnemonic to public key string (EOS...)
const publicKey = await makePublicKeyByMnemonic(mnemonic)

// You can get root chain
const rootChain = Chains.getRootChain()
// Or by name
const eywaChain = Chains.getChainByName('EYWA')

// Get account name by publicKey
const {account_names: [account]} = await rootChain.readApi.getKeyAccounts(publicKey)

// Get account stats by eosjs-api
const accountStats = await rootChain.readApi.getAccount(account)

// Get global eosio data
const eosioGlobalData = await rootChain.eosioContract.getGlobalData()

// Get account partner data
const partnerData = await rootChain.partnersContract.getAccountPartner(account)
```
