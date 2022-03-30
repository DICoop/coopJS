import ReadApi from '../readApi'
import { TableCodeConfig } from '../types'
import BaseContract from './base'

class CoreContract extends BaseContract {
  constructor(api: ReadApi, tableCodeConfig: TableCodeConfig) {
    super(api, tableCodeConfig, 'core')
  }
}

export default CoreContract
