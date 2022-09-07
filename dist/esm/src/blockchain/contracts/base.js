var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var DEFAULT_META_MAKER = function () { return ({}); };
var BaseContract = /** @class */ (function () {
    function BaseContract(api, tableCodeConfig, name) {
        this.api = api;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.baseName = tableCodeConfig[name] || name;
    }
    Object.defineProperty(BaseContract.prototype, "name", {
        get: function () {
            return this.baseName;
        },
        enumerable: false,
        configurable: true
    });
    BaseContract.prototype.getTableRows = function (_a, prependResult) {
        var scope = _a.scope, table = _a.table, table_key = _a.table_key, lower_bound = _a.lower_bound, upper_bound = _a.upper_bound, limit = _a.limit, key_type = _a.key_type, index_position = _a.index_position, parseMetaAsJson = _a.parseMetaAsJson, parseKeysAsJson = _a.parseKeysAsJson, defaultJsonValues = _a.defaultJsonValues, getAllRows = _a.getAllRows;
        return __awaiter(this, void 0, void 0, function () {
            var keysAsJson, result, _i, _b, row, _c, keysAsJson_1, keyAsJson, defaultValueMaker;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        keysAsJson = parseKeysAsJson || [];
                        if (parseMetaAsJson) {
                            keysAsJson.push('meta');
                        }
                        return [4 /*yield*/, this.api.getTableRows(this.name, scope || this.name, table, table_key, lower_bound, upper_bound, limit, key_type, index_position)];
                    case 1:
                        result = _d.sent();
                        if (keysAsJson.length > 0 && result.rows) {
                            for (_i = 0, _b = result.rows; _i < _b.length; _i++) {
                                row = _b[_i];
                                for (_c = 0, keysAsJson_1 = keysAsJson; _c < keysAsJson_1.length; _c++) {
                                    keyAsJson = keysAsJson_1[_c];
                                    defaultValueMaker = (defaultJsonValues === null || defaultJsonValues === void 0 ? void 0 : defaultJsonValues[keyAsJson]) || DEFAULT_META_MAKER;
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
                                return [2 /*return*/, result];
                            }
                            return [2 /*return*/, __assign(__assign({}, result), { rows: __spreadArray(__spreadArray([], prependResult, true), result.rows, true) })];
                        }
                        return [2 /*return*/, this.getTableRows({
                                scope: scope,
                                table: table,
                                table_key: table_key,
                                lower_bound: result.next_key,
                                upper_bound: upper_bound,
                                limit: limit,
                                key_type: key_type,
                                index_position: index_position,
                                parseMetaAsJson: parseMetaAsJson,
                                parseKeysAsJson: parseKeysAsJson,
                                defaultJsonValues: defaultJsonValues,
                                getAllRows: getAllRows,
                            }, result.rows)];
                }
            });
        });
    };
    BaseContract.prototype.getSingleTableRow = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTableRows(args)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                }
            });
        });
    };
    return BaseContract;
}());
export default BaseContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3NyYy9ibG9ja2NoYWluL2NvbnRyYWN0cy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUEsSUFBTSxrQkFBa0IsR0FBRyxjQUFNLE9BQUEsQ0FBQyxFQUFFLENBQUMsRUFBSixDQUFJLENBQUM7QUFpQnRDO0lBSUUsc0JBQVksR0FBWSxFQUFFLGVBQWdDLEVBQUUsSUFBWTtRQUN0RSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLDZEQUE2RDtRQUM3RCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFBO0lBQy9DLENBQUM7SUFFRCxzQkFBVyw4QkFBSTthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3RCLENBQUM7OztPQUFBO0lBRUssbUNBQVksR0FBbEIsVUFBK0IsRUFhZixFQUFFLGFBQTRCO1lBWjVDLEtBQUssV0FBQSxFQUNMLEtBQUssV0FBQSxFQUNMLFNBQVMsZUFBQSxFQUNULFdBQVcsaUJBQUEsRUFDWCxXQUFXLGlCQUFBLEVBQ1gsS0FBSyxXQUFBLEVBQ0wsUUFBUSxjQUFBLEVBQ1IsY0FBYyxvQkFBQSxFQUNkLGVBQWUscUJBQUEsRUFDZixlQUFlLHFCQUFBLEVBQ2YsaUJBQWlCLHVCQUFBLEVBQ2pCLFVBQVUsZ0JBQUE7Ozs7Ozt3QkFFSixVQUFVLEdBQUcsZUFBZSxJQUFJLEVBQUUsQ0FBQzt3QkFDekMsSUFBSSxlQUFlLEVBQUU7NEJBQ25CLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3pCO3dCQUVjLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUN4QyxJQUFJLENBQUMsSUFBSSxFQUNULEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxFQUNsQixLQUFLLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsRUFDUixjQUFjLENBQ2YsRUFBQTs7d0JBVkssTUFBTSxHQUFHLFNBVWQ7d0JBRUQsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFOzRCQUN4QyxXQUE2QixFQUFYLEtBQUEsTUFBTSxDQUFDLElBQUksRUFBWCxjQUFXLEVBQVgsSUFBVyxFQUFFO2dDQUFwQixHQUFHO2dDQUNaLFdBQWtDLEVBQVYseUJBQVUsRUFBVix3QkFBVSxFQUFWLElBQVUsRUFBRTtvQ0FBekIsU0FBUztvQ0FDWixpQkFBaUIsR0FBRyxDQUFBLGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFHLFNBQVMsQ0FBQyxLQUFJLGtCQUFrQixDQUFBO29DQUM5RSw2REFBNkQ7b0NBQzdELGFBQWE7b0NBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTt3Q0FDbkIsNkRBQTZEO3dDQUM3RCxhQUFhO3dDQUNiLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxDQUFBO3FDQUNyQzt5Q0FBTTt3Q0FDTCxJQUFJOzRDQUNGLDZEQUE2RDs0Q0FDN0QsYUFBYTs0Q0FDYixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTt5Q0FDNUM7d0NBQUMsT0FBTyxDQUFDLEVBQUU7NENBQ1YsNkRBQTZEOzRDQUM3RCxhQUFhOzRDQUNiLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxDQUFBO3lDQUNyQztxQ0FDRjtpQ0FDRjs2QkFDRjt5QkFDRjt3QkFFRCxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7NEJBQ25ELElBQUksQ0FBQyxhQUFhLEVBQUU7Z0NBQ2xCLHNCQUFPLE1BQU0sRUFBQTs2QkFDZDs0QkFDRCw0Q0FDSyxNQUFNLEtBQ1QsSUFBSSxrQ0FBTSxhQUFhLFNBQUssTUFBTSxDQUFDLElBQUksWUFDeEM7eUJBQ0Y7d0JBRUQsc0JBQU8sSUFBSSxDQUFDLFlBQVksQ0FBYTtnQ0FDbkMsS0FBSyxPQUFBO2dDQUNMLEtBQUssT0FBQTtnQ0FDTCxTQUFTLFdBQUE7Z0NBQ1QsV0FBVyxFQUFFLE1BQU0sQ0FBQyxRQUFRO2dDQUM1QixXQUFXLGFBQUE7Z0NBQ1gsS0FBSyxPQUFBO2dDQUNMLFFBQVEsVUFBQTtnQ0FDUixjQUFjLGdCQUFBO2dDQUNkLGVBQWUsaUJBQUE7Z0NBQ2YsZUFBZSxpQkFBQTtnQ0FDZixpQkFBaUIsbUJBQUE7Z0NBQ2pCLFVBQVUsWUFBQTs2QkFDWCxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7OztLQUNoQjtJQUVLLHdDQUFpQixHQUF2QixVQUFvQyxJQUFtQjs7Ozs7NEJBQ3RDLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQWEsSUFBSSxDQUFDLEVBQUE7O3dCQUFsRCxNQUFNLEdBQUcsU0FBeUM7d0JBRXhELHNCQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUE7Ozs7S0FDdEI7SUFDSCxtQkFBQztBQUFELENBQUMsQUF0R0QsSUFzR0M7QUFFRCxlQUFlLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFkQXBpIGZyb20gJy4uL3JlYWRBcGknXG5pbXBvcnQgeyBUYWJsZUNvZGVDb25maWcgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCB7VGFibGVSZXN1bHR9IGZyb20gXCIuLi8uLi9lb3MvdHlwZXNcIjtcblxuaW50ZXJmYWNlIERlZmF1bHRKc29uVmFsdWVNYWtlciB7XG4gIFtrZXk6IHN0cmluZ106ICgpID0+IGFueVxufVxuXG5jb25zdCBERUZBVUxUX01FVEFfTUFLRVIgPSAoKSA9PiAoe30pO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlUm93c0FyZ3Mge1xuICBzY29wZT86IHN0cmluZ1xuICB0YWJsZTogc3RyaW5nXG4gIHRhYmxlX2tleT86IHN0cmluZ1xuICBsb3dlcl9ib3VuZD86IG51bWJlciB8IHN0cmluZ1xuICB1cHBlcl9ib3VuZD86IG51bWJlciB8IHN0cmluZ1xuICBsaW1pdD86IG51bWJlclxuICBrZXlfdHlwZT86IHN0cmluZ1xuICBpbmRleF9wb3NpdGlvbj86IG51bWJlclxuICBwYXJzZU1ldGFBc0pzb24/OiBib29sZWFuXG4gIHBhcnNlS2V5c0FzSnNvbj86IHN0cmluZ1tdLFxuICBkZWZhdWx0SnNvblZhbHVlcz86IERlZmF1bHRKc29uVmFsdWVNYWtlcixcbiAgZ2V0QWxsUm93cz86IGJvb2xlYW5cbn1cblxuY2xhc3MgQmFzZUNvbnRyYWN0IHtcbiAgcHJpdmF0ZSBhcGk6IFJlYWRBcGlcbiAgcHJpdmF0ZSByZWFkb25seSBiYXNlTmFtZTogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IoYXBpOiBSZWFkQXBpLCB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZywgbmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5hcGkgPSBhcGlcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuYmFzZU5hbWUgPSB0YWJsZUNvZGVDb25maWdbbmFtZV0gfHwgbmFtZVxuICB9XG5cbiAgcHVibGljIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmJhc2VOYW1lXG4gIH1cblxuICBhc3luYyBnZXRUYWJsZVJvd3M8UmV0dXJuVHlwZT4oe1xuICAgIHNjb3BlLFxuICAgIHRhYmxlLFxuICAgIHRhYmxlX2tleSxcbiAgICBsb3dlcl9ib3VuZCxcbiAgICB1cHBlcl9ib3VuZCxcbiAgICBsaW1pdCxcbiAgICBrZXlfdHlwZSxcbiAgICBpbmRleF9wb3NpdGlvbixcbiAgICBwYXJzZU1ldGFBc0pzb24sXG4gICAgcGFyc2VLZXlzQXNKc29uLFxuICAgIGRlZmF1bHRKc29uVmFsdWVzLFxuICAgIGdldEFsbFJvd3MsXG4gIH06IFRhYmxlUm93c0FyZ3MsIHByZXBlbmRSZXN1bHQ/OiBSZXR1cm5UeXBlW10pOiBQcm9taXNlPFRhYmxlUmVzdWx0PFJldHVyblR5cGU+PiB7XG4gICAgY29uc3Qga2V5c0FzSnNvbiA9IHBhcnNlS2V5c0FzSnNvbiB8fCBbXTtcbiAgICBpZiAocGFyc2VNZXRhQXNKc29uKSB7XG4gICAgICBrZXlzQXNKc29uLnB1c2goJ21ldGEnKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmFwaS5nZXRUYWJsZVJvd3M8UmV0dXJuVHlwZT4oXG4gICAgICB0aGlzLm5hbWUsXG4gICAgICBzY29wZSB8fCB0aGlzLm5hbWUsXG4gICAgICB0YWJsZSxcbiAgICAgIHRhYmxlX2tleSxcbiAgICAgIGxvd2VyX2JvdW5kLFxuICAgICAgdXBwZXJfYm91bmQsXG4gICAgICBsaW1pdCxcbiAgICAgIGtleV90eXBlLFxuICAgICAgaW5kZXhfcG9zaXRpb25cbiAgICApXG5cbiAgICBpZiAoa2V5c0FzSnNvbi5sZW5ndGggPiAwICYmIHJlc3VsdC5yb3dzKSB7XG4gICAgICBmb3IgKGNvbnN0IHJvdyBvZiByZXN1bHQucm93cykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleUFzSnNvbiBvZiBrZXlzQXNKc29uKSB7XG4gICAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlTWFrZXIgPSBkZWZhdWx0SnNvblZhbHVlcz8uW2tleUFzSnNvbl0gfHwgREVGQVVMVF9NRVRBX01BS0VSXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBpZiAoIXJvd1trZXlBc0pzb25dKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICByb3dba2V5QXNKc29uXSA9IGRlZmF1bHRWYWx1ZU1ha2VyKClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgIHJvd1trZXlBc0pzb25dID0gSlNPTi5wYXJzZShyb3dba2V5QXNKc29uXSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgIHJvd1trZXlBc0pzb25dID0gZGVmYXVsdFZhbHVlTWFrZXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZ2V0QWxsUm93cyB8fCAhcmVzdWx0Lm1vcmUgfHwgIXJlc3VsdC5uZXh0X2tleSkge1xuICAgICAgaWYgKCFwcmVwZW5kUmVzdWx0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnJlc3VsdCxcbiAgICAgICAgcm93czogWy4uLnByZXBlbmRSZXN1bHQsIC4uLnJlc3VsdC5yb3dzXSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRUYWJsZVJvd3M8UmV0dXJuVHlwZT4oe1xuICAgICAgc2NvcGUsXG4gICAgICB0YWJsZSxcbiAgICAgIHRhYmxlX2tleSxcbiAgICAgIGxvd2VyX2JvdW5kOiByZXN1bHQubmV4dF9rZXksXG4gICAgICB1cHBlcl9ib3VuZCxcbiAgICAgIGxpbWl0LFxuICAgICAga2V5X3R5cGUsXG4gICAgICBpbmRleF9wb3NpdGlvbixcbiAgICAgIHBhcnNlTWV0YUFzSnNvbixcbiAgICAgIHBhcnNlS2V5c0FzSnNvbixcbiAgICAgIGRlZmF1bHRKc29uVmFsdWVzLFxuICAgICAgZ2V0QWxsUm93cyxcbiAgICB9LCByZXN1bHQucm93cylcbiAgfVxuXG4gIGFzeW5jIGdldFNpbmdsZVRhYmxlUm93PFJldHVyblR5cGU+KGFyZ3M6IFRhYmxlUm93c0FyZ3MpIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxSZXR1cm5UeXBlPihhcmdzKVxuXG4gICAgcmV0dXJuIHJlc3VsdC5yb3dzWzBdXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNvbnRyYWN0XG4iXX0=