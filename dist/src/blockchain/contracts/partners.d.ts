import { AccountName } from '../../eos/types';
import ReadApi from '../readApi';
import { TableCodeConfig } from '../types';
import BaseContract from './base';
declare class PartnersContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig);
    getAccountPartner(accountName: AccountName): Promise<any>;
}
export default PartnersContract;
