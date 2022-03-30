import { AccountName } from '../../eos/types'
import ReadApi from '../readApi'
import { TableCodeConfig } from '../types'
import BaseContract from './base'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PartnerRow = any

class PartnersContract extends BaseContract {
  constructor(api: ReadApi, tableCodeConfig: TableCodeConfig) {
    super(api, tableCodeConfig, 'part')
  }

  getAccountPartner(accountName: AccountName) {
    return this.getSingleTableRow<PartnerRow>({
      table: 'partners2',
      lower_bound: accountName,
      upper_bound: accountName,
      limit: 1,
      parseMetaAsJson: true,
    })
  }
}

export default PartnersContract
