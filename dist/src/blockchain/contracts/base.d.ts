import ReadApi from '../readApi';
import { TableCodeConfig } from '../types';
interface TableRowsArgs {
    scope?: string;
    table: string;
    table_key?: string;
    lower_bound?: number | string;
    upper_bound?: number | string;
    limit?: number;
    key_type?: string;
    index_position?: number;
    parseMetaAsJson?: boolean;
}
declare class BaseContract {
    private api;
    private readonly name;
    constructor(api: ReadApi, tableCodeConfig: TableCodeConfig, name: string);
    getTableRows<ReturnType>({ scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position, parseMetaAsJson, }: TableRowsArgs): Promise<import("../../eos/types").TableResult<ReturnType>>;
    getSingleTableRow<ReturnType>(args: TableRowsArgs): Promise<ReturnType>;
}
export default BaseContract;
