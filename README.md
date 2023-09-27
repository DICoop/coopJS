# coopJS

CoopJS is universal core library for cooperatives 

It is based on a singleton model that accepts a configuration and provides access to one or more blockchains and contracts.

## Installation

```bash
yarn add coopjs>
```

Create a chainsMain.ts file with the following content:

```typescript
import { ChainsSingleton } from 'coopjs'
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
      name: 'AXON',
      rpcEndpoints: [
        {
          protocol: 'https',
          host: 'api.samplesite.com',
          port: 443,
        },
      ],
      explorerApiUrl: 'https://explorer.samplesite.com',
    },
  ],
  ual: {
    rootChain: 'AXON',
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
import { makePublicKeyByMnemonic } from 'unicore'
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

## Additional contracts

You can use your own contracts.

Example:

Create eosioContract.ts:
```typescript
import {
    BaseContract,
    ReadApi,
    TableCodeConfig,
} from 'unicore'

interface EosioGlobalData {
    base_per_transaction_net_usage: number
    context_free_discount_net_usage_den: number
}

class EosioContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig) {
        super(api, tableCodeConfig, 'eosio')
    }

    getGlobalData(): Promise<EosioGlobalData> {
        return this.getSingleTableRow<EosioGlobalData>({
            table: 'global',
        })
    }
}

export default EosioContract
```

And use it:
```typescript
import Chains from '~/chainsMain'
import EosioContract from '~/eosioContract'

const rootChain = Chains.getRootChain()
const eosioContract = rootChain.applyContract(EosioContract)

const data = await eosioContract.getGlobalData()
```
