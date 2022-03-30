import ReadApi from '../readApi';
import { TableCodeConfig } from '../types';
import BaseContract from './base';
declare class CoreContract extends BaseContract {
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig);
}
export default CoreContract;
