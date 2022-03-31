"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseContract {
    constructor(api, tableCodeConfig, name) {
        this.api = api;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.name = tableCodeConfig[name] || name;
    }
    async getTableRows({ scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position, parseMetaAsJson, getAllRows, }, prependResult) {
        const result = await this.api.getTableRows(this.name, scope || this.name, table, table_key, lower_bound, upper_bound, limit, key_type, index_position);
        if (parseMetaAsJson && result.rows) {
            for (const row of result.rows) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (!row.meta) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    row.meta = {};
                }
                else {
                    try {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        row.meta = JSON.parse(row.meta);
                    }
                    catch (_) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        row.meta = {};
                    }
                }
            }
        }
        if (!getAllRows || !result.more || !result.next_key) {
            if (!prependResult) {
                return result;
            }
            return {
                ...result,
                rows: [...prependResult, ...result.rows],
            };
        }
        return this.getTableRows({
            scope,
            table,
            table_key,
            lower_bound: result.next_key,
            upper_bound,
            limit,
            key_type,
            index_position,
            parseMetaAsJson,
            getAllRows,
        }, result.rows);
    }
    async getSingleTableRow(args) {
        const result = await this.getTableRows(args);
        return result.rows[0];
    }
}
exports.default = BaseContract;
//# sourceMappingURL=base.js.map