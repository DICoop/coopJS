var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import BaseContract from './base';
var NftContract = /** @class */ (function (_super) {
    __extends(NftContract, _super);
    function NftContract(api, tableCodeConfig) {
        return _super.call(this, api, tableCodeConfig, 'nft') || this;
    }
    NftContract.prototype.getObjectsByOwner = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var q, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = {
                            table: 'pieces',
                            lower_bound: owner,
                            upper_bound: owner,
                            limit: 1000,
                            index_position: 2,
                            key_type: 'i64',
                            getAllRows: true,
                        };
                        return [4 /*yield*/, this.getTableRows(q)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    NftContract.prototype.getAllObjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var q, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = {
                            table: 'objects',
                            limit: 100,
                            lower_bound: 0,
                            getAllRows: true,
                            parseMetaAsJson: true,
                            parseKeysAsJson: ['images'],
                            defaultJsonValues: {
                                images: function () { return []; },
                            },
                        };
                        return [4 /*yield*/, this.getTableRows(q)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    NftContract.prototype.getObjectsById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var q, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = {
                            table: 'objects',
                            limit: 1,
                            lower_bound: id,
                            upper_bound: id,
                            index_position: 0,
                            key_type: 'i64',
                            parseMetaAsJson: true,
                            parseKeysAsJson: ['images'],
                            defaultJsonValues: {
                                images: function () { return []; },
                            },
                        };
                        return [4 /*yield*/, this.getTableRows(q)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    NftContract.prototype.getMarket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var q, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = {
                            table: 'market',
                            limit: 1000,
                            lower_bound: 0,
                            getAllRows: true,
                            parseMetaAsJson: true,
                        };
                        return [4 /*yield*/, this.getTableRows(q)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    NftContract.prototype.getMarketObjectsById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var q, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = {
                            table: 'market',
                            limit: 1,
                            lower_bound: id,
                            upper_bound: id,
                            index_position: 0,
                            key_type: 'i64',
                            parseMetaAsJson: true,
                        };
                        return [4 /*yield*/, this.getTableRows(q)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    NftContract.prototype.fetchRequestsWithIndexPosition = function (username, indexPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var q, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = {
                            table: 'requests',
                            lower_bound: username,
                            upper_bound: username,
                            limit: 1000,
                            index_position: indexPosition,
                            key_type: 'i64',
                            parseKeysAsJson: ['delivery_to', 'meta'],
                            getAllRows: true,
                        };
                        return [4 /*yield*/, this.getTableRows(q)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    NftContract.prototype.fetchRequests = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, asBuyer, asSeller;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.fetchRequestsWithIndexPosition(username, 2),
                            this.fetchRequestsWithIndexPosition(username, 3),
                        ])];
                    case 1:
                        _a = _b.sent(), asBuyer = _a[0], asSeller = _a[1];
                        return [2 /*return*/, __spreadArray(__spreadArray([], asBuyer, true), asSeller, true)];
                }
            });
        });
    };
    return NftContract;
}(BaseContract));
export default NftContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vY29udHJhY3RzL25mdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLFlBQTZCLE1BQU0sUUFBUSxDQUFBO0FBb0VsRDtJQUEwQiwrQkFBWTtJQUNwQyxxQkFBWSxHQUFZLEVBQUUsZUFBZ0M7ZUFDeEQsa0JBQU0sR0FBRyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVLLHVDQUFpQixHQUF2QixVQUF3QixLQUFrQjs7Ozs7O3dCQUNsQyxDQUFDLEdBQWtCOzRCQUN2QixLQUFLLEVBQUUsUUFBUTs0QkFDZixXQUFXLEVBQUUsS0FBSzs0QkFDbEIsV0FBVyxFQUFFLEtBQUs7NEJBQ2xCLEtBQUssRUFBRSxJQUFJOzRCQUNYLGNBQWMsRUFBRSxDQUFDOzRCQUNqQixRQUFRLEVBQUUsS0FBSzs0QkFDZixVQUFVLEVBQUUsSUFBSTt5QkFDakIsQ0FBQTt3QkFDYyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFpQixDQUFDLENBQUMsRUFBQTs7d0JBQWxELElBQUksR0FBSSxDQUFBLFNBQTBDLENBQUEsS0FBOUM7d0JBRVgsc0JBQU8sSUFBSSxFQUFDOzs7O0tBQ2I7SUFFSyxtQ0FBYSxHQUFuQjs7Ozs7O3dCQUNRLENBQUMsR0FBa0I7NEJBQ3ZCLEtBQUssRUFBRSxTQUFTOzRCQUNoQixLQUFLLEVBQUUsR0FBRzs0QkFDVixXQUFXLEVBQUUsQ0FBQzs0QkFDZCxVQUFVLEVBQUUsSUFBSTs0QkFDaEIsZUFBZSxFQUFFLElBQUk7NEJBQ3JCLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFDM0IsaUJBQWlCLEVBQUU7Z0NBQ2pCLE1BQU0sRUFBRSxjQUFNLE9BQUEsRUFBRSxFQUFGLENBQUU7NkJB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TyxTQUFLLFFBQVEsU0FBRTs7OztLQUNsQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQTVHRCxDQUEwQixZQUFZLEdBNEdyQztBQUVELGVBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3VudE5hbWUgfSBmcm9tICcuLi8uLi9lb3MvdHlwZXMnXG5pbXBvcnQgUmVhZEFwaSBmcm9tICcuLi9yZWFkQXBpJ1xuaW1wb3J0IHsgVGFibGVDb2RlQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgQmFzZUNvbnRyYWN0LCB7VGFibGVSb3dzQXJnc30gZnJvbSAnLi9iYXNlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIE5mdE9iamVjdCB7XG4gIGNhdGVnb3J5OiBzdHJpbmdcbiAgY3JlYXRvcjogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgaWQ6IG51bWJlclxuICBpbWFnZXM6IHN0cmluZ1tdXG4gIGlwbnM6IHN0cmluZ1xuICBtZXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgdGl0bGU6IHN0cmluZ1xuICB0b3RhbF9waWVjZXM6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5mdFBpZWNlT2JqZWN0IHtcbiAgaWQ6IG51bWJlclxuICBvYmplY3RfaWQ6IG51bWJlclxuICBvd25lcjogc3RyaW5nLFxuICBwaWVjZXM6IG51bWJlclxuICBkYXlfZmluaXNoOiBudW1iZXJcbiAgZGF5X3N0YXJ0OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWxpdmVyeVJlcXVlc3Qge1xuICB0eXBlOiBzdHJpbmdcbiAgcGxhY2Vob2xkZXI6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEZWxpdmVyeVJlcXVlc3RGaWxsZWQgPSBEZWxpdmVyeVJlcXVlc3QgJiB7XG4gIHZhbHVlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOZnRNYXJrZXRPYmplY3Qge1xuICBiYXNlX3BpZWNlX3ByaWNlOiBzdHJpbmdcbiAgYmxvY2tlZF9waWVjZXM6IG51bWJlclxuICBkYXlfZmluaXNoOiBudW1iZXJcbiAgZGF5X3N0YXJ0OiBudW1iZXJcbiAgaWQ6IG51bWJlclxuICBtZXRhOiB7ZGVsaXZlcnlfcmVxdWVzdDogRGVsaXZlcnlSZXF1ZXN0W119XG4gIG1pbl9waWVjZV9wcmljZTogc3RyaW5nXG4gIG9iamVjdF9pZDogbnVtYmVyXG4gIHJlbWFpbl9waWVjZXM6IG51bWJlclxuICBzYWxlc19jbG9zZWRfYXQ6IHN0cmluZ1xuICBzYWxlc19zdGFydF9hdDogc3RyaW5nXG4gIHNlbGxlcjogc3RyaW5nXG4gIHN0YXR1czogXCJ3YWl0aW5nXCIgfCBcInBhdXNlXCJcbiAgdG9rZW5fY29udHJhY3Q6IHN0cmluZ1xuICB0b3RhbF9wcmljZTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmZ0TWFya2V0UmVxdWVzdCB7XG4gIGlkOiBudW1iZXJcbiAgbWFya2V0X2lkOiBudW1iZXJcbiAgYnV5ZXI6IHN0cmluZ1xuICBzZWxsZXI6IHN0cmluZ1xuICBtYW5hZ2VyOiBzdHJpbmdcbiAgcmVxdWVzdGVkX3BpZWNlczogbnVtYmVyXG4gIHRvdGFsX3ByaWNlOiBzdHJpbmdcbiAgYmFzZV9waWVjZV9wcmljZTogc3RyaW5nXG4gIG9uZV9waWVjZV9wcmljZTogc3RyaW5nXG4gIHRvdGFsX3BheWVkOiBzdHJpbmdcbiAgc3RhdHVzOiBcIndhaXRpbmdcIiB8IFwiYWNjZXB0ZWRcIiB8IFwiY29uZmlybWVkXCIgfCBcImlzc3VlZFwiIHwgXCJkZWNsaW5lZFwiIHwgXCJjYW5jZWxsZWRcIiB8IFwiY29tcGxldGVkXCJcbiAgZGF5X3N0YXJ0OiBudW1iZXJcbiAgZGF5X2ZpbmlzaDogbnVtYmVyXG4gIGRlbGl2ZXJ5X3RvOiBEZWxpdmVyeVJlcXVlc3RGaWxsZWRbXVxuICBtZXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPlxufVxuXG5jbGFzcyBOZnRDb250cmFjdCBleHRlbmRzIEJhc2VDb250cmFjdCB7XG4gIGNvbnN0cnVjdG9yKGFwaTogUmVhZEFwaSwgdGFibGVDb2RlQ29uZmlnOiBUYWJsZUNvZGVDb25maWcpIHtcbiAgICBzdXBlcihhcGksIHRhYmxlQ29kZUNvbmZpZywgJ25mdCcpXG4gIH1cblxuICBhc3luYyBnZXRPYmplY3RzQnlPd25lcihvd25lcjogQWNjb3VudE5hbWUpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdwaWVjZXMnLFxuICAgICAgbG93ZXJfYm91bmQ6IG93bmVyLFxuICAgICAgdXBwZXJfYm91bmQ6IG93bmVyLFxuICAgICAgbGltaXQ6IDEwMDAsXG4gICAgICBpbmRleF9wb3NpdGlvbjogMixcbiAgICAgIGtleV90eXBlOiAnaTY0JyxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdFBpZWNlT2JqZWN0PihxKVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBhc3luYyBnZXRBbGxPYmplY3RzKCkge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ29iamVjdHMnLFxuICAgICAgbGltaXQ6IDEwMCxcbiAgICAgIGxvd2VyX2JvdW5kOiAwLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICAgIHBhcnNlTWV0YUFzSnNvbjogdHJ1ZSxcbiAgICAgIHBhcnNlS2V5c0FzSnNvbjogWydpbWFnZXMnXSxcbiAgICAgIGRlZmF1bHRKc29uVmFsdWVzOiB7XG4gICAgICAgIGltYWdlczogKCkgPT4gW10sXG4gICAgICB9LFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGdldE9iamVjdHNCeUlkKGlkOiBudW1iZXIpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdvYmplY3RzJyxcbiAgICAgIGxpbWl0OiAxLFxuICAgICAgbG93ZXJfYm91bmQ6IGlkLFxuICAgICAgdXBwZXJfYm91bmQ6IGlkLFxuICAgICAgaW5kZXhfcG9zaXRpb246IDAsXG4gICAgICBrZXlfdHlwZTogJ2k2NCcsXG4gICAgICBwYXJzZU1ldGFBc0pzb246IHRydWUsXG4gICAgICBwYXJzZUtleXNBc0pzb246IFsnaW1hZ2VzJ10sXG4gICAgICBkZWZhdWx0SnNvblZhbHVlczoge1xuICAgICAgICBpbWFnZXM6ICgpID0+IFtdLFxuICAgICAgfSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0T2JqZWN0PihxKVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBhc3luYyBnZXRNYXJrZXQoKSB7XG4gICAgY29uc3QgcTogVGFibGVSb3dzQXJncyA9IHtcbiAgICAgIHRhYmxlOiAnbWFya2V0JyxcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgbG93ZXJfYm91bmQ6IDAsXG4gICAgICBnZXRBbGxSb3dzOiB0cnVlLFxuICAgICAgcGFyc2VNZXRhQXNKc29uOiB0cnVlLFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRNYXJrZXRPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGdldE1hcmtldE9iamVjdHNCeUlkKGlkOiBudW1iZXIpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdtYXJrZXQnLFxuICAgICAgbGltaXQ6IDEsXG4gICAgICBsb3dlcl9ib3VuZDogaWQsXG4gICAgICB1cHBlcl9ib3VuZDogaWQsXG4gICAgICBpbmRleF9wb3NpdGlvbjogMCxcbiAgICAgIGtleV90eXBlOiAnaTY0JyxcbiAgICAgIHBhcnNlTWV0YUFzSnNvbjogdHJ1ZSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0TWFya2V0T2JqZWN0PihxKVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBhc3luYyBmZXRjaFJlcXVlc3RzV2l0aEluZGV4UG9zaXRpb24odXNlcm5hbWU6IEFjY291bnROYW1lLCBpbmRleFBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdyZXF1ZXN0cycsXG4gICAgICBsb3dlcl9ib3VuZDogdXNlcm5hbWUsXG4gICAgICB1cHBlcl9ib3VuZDogdXNlcm5hbWUsXG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIGluZGV4X3Bvc2l0aW9uOiBpbmRleFBvc2l0aW9uLFxuICAgICAga2V5X3R5cGU6ICdpNjQnLFxuICAgICAgcGFyc2VLZXlzQXNKc29uOiBbJ2RlbGl2ZXJ5X3RvJywgJ21ldGEnXSxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdE1hcmtldFJlcXVlc3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGZldGNoUmVxdWVzdHModXNlcm5hbWU6IEFjY291bnROYW1lKSB7XG4gICAgY29uc3QgW2FzQnV5ZXIsIGFzU2VsbGVyXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuZmV0Y2hSZXF1ZXN0c1dpdGhJbmRleFBvc2l0aW9uKHVzZXJuYW1lLCAyKSxcbiAgICAgIHRoaXMuZmV0Y2hSZXF1ZXN0c1dpdGhJbmRleFBvc2l0aW9uKHVzZXJuYW1lLCAzKSxcbiAgICBdKTtcblxuICAgIHJldHVybiBbLi4uYXNCdXllciwgLi4uYXNTZWxsZXJdO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5mdENvbnRyYWN0XG4iXX0=