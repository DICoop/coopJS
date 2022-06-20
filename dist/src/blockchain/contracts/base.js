"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_META_MAKER = () => ({});
class BaseContract {
    constructor(api, tableCodeConfig, name) {
        this.api = api;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.baseName = tableCodeConfig[name] || name;
    }
    get name() {
        return this.baseName;
    }
    async getTableRows({ scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position, parseMetaAsJson, parseKeysAsJson, defaultJsonValues, getAllRows, }, prependResult) {
        const keysAsJson = parseKeysAsJson || [];
        if (parseMetaAsJson) {
            keysAsJson.push('meta');
        }
        const result = await this.api.getTableRows(this.name, scope || this.name, table, table_key, lower_bound, upper_bound, limit, key_type, index_position);
        if (keysAsJson.length > 0 && result.rows) {
            for (const row of result.rows) {
                for (const keyAsJson of keysAsJson) {
                    const defaultValueMaker = (defaultJsonValues === null || defaultJsonValues === void 0 ? void 0 : defaultJsonValues[keyAsJson]) || DEFAULT_META_MAKER;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (!row[keyAsJson]) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        row[keyAsJson] = defaultValueMaker();
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            row[keyAsJson] = JSON.parse(row[keyAsJson]);
                        }
                        catch (_) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            row[keyAsJson] = defaultValueMaker();
                        }
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
            parseKeysAsJson,
            defaultJsonValues,
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