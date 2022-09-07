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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vY29udHJhY3RzL25mdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLFlBQTZCLE1BQU0sUUFBUSxDQUFBO0FBd0VsRDtJQUEwQiwrQkFBWTtJQUNwQyxxQkFBWSxHQUFZLEVBQUUsZUFBZ0M7ZUFDeEQsa0JBQU0sR0FBRyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVLLHVDQUFpQixHQUF2QixVQUF3QixLQUFrQjs7Ozs7O3dCQUNsQyxDQUFDLEdBQWtCOzRCQUN2QixLQUFLLEVBQUUsUUFBUTs0QkFDZixXQUFXLEVBQUUsS0FBSzs0QkFDbEIsV0FBVyxFQUFFLEtBQUs7NEJBQ2xCLEtBQUssRUFBRSxJQUFJOzRCQUNYLGNBQWMsRUFBRSxDQUFDOzRCQUNqQixRQUFRLEVBQUUsS0FBSzs0QkFDZixVQUFVLEVBQUUsSUFBSTt5QkFDakIsQ0FBQTt3QkFDYyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFpQixDQUFDLENBQUMsRUFBQTs7d0JBQWxELElBQUksR0FBSSxDQUFBLFNBQTBDLENBQUEsS0FBOUM7d0JBRVgsc0JBQU8sSUFBSSxFQUFDOzs7O0tBQ2I7SUFFSyxtQ0FBYSxHQUFuQjs7Ozs7O3dCQUNRLENBQUMsR0FBa0I7NEJBQ3ZCLEtBQUssRUFBRSxTQUFTOzRCQUNoQixLQUFLLEVBQUUsR0FBRzs0QkFDVixXQUFXLEVBQUUsQ0FBQzs0QkFDZCxVQUFVLEVBQUUsSUFBSTs0QkFDaEIsZUFBZSxFQUFFLElBQUk7NEJBQ3JCLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFDM0IsaUJBQWlCLEVBQUU7Z0NBQ2pCLE1BQU0sRUFBRSxjQUFNLE9BQUEsRUFBRSxFQUFGLENBQUU7NkJB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TyxTQUFLLFFBQVEsU0FBRTs7OztLQUNsQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQTVHRCxDQUEwQixZQUFZLEdBNEdyQztBQUVELGVBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3VudE5hbWUgfSBmcm9tICcuLi8uLi9lb3MvdHlwZXMnXG5pbXBvcnQgUmVhZEFwaSBmcm9tICcuLi9yZWFkQXBpJ1xuaW1wb3J0IHsgVGFibGVDb2RlQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgQmFzZUNvbnRyYWN0LCB7VGFibGVSb3dzQXJnc30gZnJvbSAnLi9iYXNlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIE5mdE9iamVjdCB7XG4gIGNhdGVnb3J5OiBzdHJpbmdcbiAgY3JlYXRvcjogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgaWQ6IG51bWJlclxuICBpbWFnZXM6IHN0cmluZ1tdXG4gIGlwbnM6IHN0cmluZ1xuICBtZXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcbiAgdGl0bGU6IHN0cmluZ1xuICB0b3RhbF9waWVjZXM6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5mdFBpZWNlT2JqZWN0IHtcbiAgaWQ6IG51bWJlclxuICBvYmplY3RfaWQ6IG51bWJlclxuICBvd25lcjogc3RyaW5nLFxuICBwaWVjZXM6IG51bWJlclxuICBkYXlfZmluaXNoOiBudW1iZXJcbiAgZGF5X3N0YXJ0OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWxpdmVyeVJlcXVlc3Qge1xuICB0eXBlOiBzdHJpbmdcbiAgcGxhY2Vob2xkZXI6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEZWxpdmVyeVJlcXVlc3RGaWxsZWQgPSBEZWxpdmVyeVJlcXVlc3QgJiB7XG4gIHZhbHVlOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgRGVsaXZlcnlSZXF1ZXN0UGVyc29uYWxEYXRhID0ge1xuICBwZXJzb25hbERhdGFJZD86IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5mdE1hcmtldE9iamVjdCB7XG4gIGJhc2VfcGllY2VfcHJpY2U6IHN0cmluZ1xuICBibG9ja2VkX3BpZWNlczogbnVtYmVyXG4gIGRheV9maW5pc2g6IG51bWJlclxuICBkYXlfc3RhcnQ6IG51bWJlclxuICBpZDogbnVtYmVyXG4gIG1ldGE6IHtkZWxpdmVyeV9yZXF1ZXN0OiBEZWxpdmVyeVJlcXVlc3RbXX1cbiAgbWluX3BpZWNlX3ByaWNlOiBzdHJpbmdcbiAgb2JqZWN0X2lkOiBudW1iZXJcbiAgcmVtYWluX3BpZWNlczogbnVtYmVyXG4gIHNhbGVzX2Nsb3NlZF9hdDogc3RyaW5nXG4gIHNhbGVzX3N0YXJ0X2F0OiBzdHJpbmdcbiAgc2VsbGVyOiBzdHJpbmdcbiAgc3RhdHVzOiBcIndhaXRpbmdcIiB8IFwicGF1c2VcIlxuICB0b2tlbl9jb250cmFjdDogc3RyaW5nXG4gIHRvdGFsX3ByaWNlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOZnRNYXJrZXRSZXF1ZXN0IHtcbiAgaWQ6IG51bWJlclxuICBtYXJrZXRfaWQ6IG51bWJlclxuICBidXllcjogc3RyaW5nXG4gIHNlbGxlcjogc3RyaW5nXG4gIG1hbmFnZXI6IHN0cmluZ1xuICByZXF1ZXN0ZWRfcGllY2VzOiBudW1iZXJcbiAgdG90YWxfcHJpY2U6IHN0cmluZ1xuICBiYXNlX3BpZWNlX3ByaWNlOiBzdHJpbmdcbiAgb25lX3BpZWNlX3ByaWNlOiBzdHJpbmdcbiAgdG90YWxfcGF5ZWQ6IHN0cmluZ1xuICBzdGF0dXM6IFwid2FpdGluZ1wiIHwgXCJhY2NlcHRlZFwiIHwgXCJjb25maXJtZWRcIiB8IFwiaXNzdWVkXCIgfCBcImRlY2xpbmVkXCIgfCBcImNhbmNlbGxlZFwiIHwgXCJjb21wbGV0ZWRcIlxuICBkYXlfc3RhcnQ6IG51bWJlclxuICBkYXlfZmluaXNoOiBudW1iZXJcbiAgZGVsaXZlcnlfdG86IERlbGl2ZXJ5UmVxdWVzdEZpbGxlZFtdIHwgRGVsaXZlcnlSZXF1ZXN0UGVyc29uYWxEYXRhXG4gIG1ldGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+XG59XG5cbmNsYXNzIE5mdENvbnRyYWN0IGV4dGVuZHMgQmFzZUNvbnRyYWN0IHtcbiAgY29uc3RydWN0b3IoYXBpOiBSZWFkQXBpLCB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZykge1xuICAgIHN1cGVyKGFwaSwgdGFibGVDb2RlQ29uZmlnLCAnbmZ0JylcbiAgfVxuXG4gIGFzeW5jIGdldE9iamVjdHNCeU93bmVyKG93bmVyOiBBY2NvdW50TmFtZSkge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ3BpZWNlcycsXG4gICAgICBsb3dlcl9ib3VuZDogb3duZXIsXG4gICAgICB1cHBlcl9ib3VuZDogb3duZXIsXG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIGluZGV4X3Bvc2l0aW9uOiAyLFxuICAgICAga2V5X3R5cGU6ICdpNjQnLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0UGllY2VPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGdldEFsbE9iamVjdHMoKSB7XG4gICAgY29uc3QgcTogVGFibGVSb3dzQXJncyA9IHtcbiAgICAgIHRhYmxlOiAnb2JqZWN0cycsXG4gICAgICBsaW1pdDogMTAwLFxuICAgICAgbG93ZXJfYm91bmQ6IDAsXG4gICAgICBnZXRBbGxSb3dzOiB0cnVlLFxuICAgICAgcGFyc2VNZXRhQXNKc29uOiB0cnVlLFxuICAgICAgcGFyc2VLZXlzQXNKc29uOiBbJ2ltYWdlcyddLFxuICAgICAgZGVmYXVsdEpzb25WYWx1ZXM6IHtcbiAgICAgICAgaW1hZ2VzOiAoKSA9PiBbXSxcbiAgICAgIH0sXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdE9iamVjdD4ocSlcblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgYXN5bmMgZ2V0T2JqZWN0c0J5SWQoaWQ6IG51bWJlcikge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ29iamVjdHMnLFxuICAgICAgbGltaXQ6IDEsXG4gICAgICBsb3dlcl9ib3VuZDogaWQsXG4gICAgICB1cHBlcl9ib3VuZDogaWQsXG4gICAgICBpbmRleF9wb3NpdGlvbjogMCxcbiAgICAgIGtleV90eXBlOiAnaTY0JyxcbiAgICAgIHBhcnNlTWV0YUFzSnNvbjogdHJ1ZSxcbiAgICAgIHBhcnNlS2V5c0FzSnNvbjogWydpbWFnZXMnXSxcbiAgICAgIGRlZmF1bHRKc29uVmFsdWVzOiB7XG4gICAgICAgIGltYWdlczogKCkgPT4gW10sXG4gICAgICB9LFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGdldE1hcmtldCgpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdtYXJrZXQnLFxuICAgICAgbGltaXQ6IDEwMDAsXG4gICAgICBsb3dlcl9ib3VuZDogMCxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgICBwYXJzZU1ldGFBc0pzb246IHRydWUsXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdE1hcmtldE9iamVjdD4ocSlcblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgYXN5bmMgZ2V0TWFya2V0T2JqZWN0c0J5SWQoaWQ6IG51bWJlcikge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ21hcmtldCcsXG4gICAgICBsaW1pdDogMSxcbiAgICAgIGxvd2VyX2JvdW5kOiBpZCxcbiAgICAgIHVwcGVyX2JvdW5kOiBpZCxcbiAgICAgIGluZGV4X3Bvc2l0aW9uOiAwLFxuICAgICAga2V5X3R5cGU6ICdpNjQnLFxuICAgICAgcGFyc2VNZXRhQXNKc29uOiB0cnVlLFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRNYXJrZXRPYmplY3Q+KHEpXG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGFzeW5jIGZldGNoUmVxdWVzdHNXaXRoSW5kZXhQb3NpdGlvbih1c2VybmFtZTogQWNjb3VudE5hbWUsIGluZGV4UG9zaXRpb246IG51bWJlcikge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ3JlcXVlc3RzJyxcbiAgICAgIGxvd2VyX2JvdW5kOiB1c2VybmFtZSxcbiAgICAgIHVwcGVyX2JvdW5kOiB1c2VybmFtZSxcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgaW5kZXhfcG9zaXRpb246IGluZGV4UG9zaXRpb24sXG4gICAgICBrZXlfdHlwZTogJ2k2NCcsXG4gICAgICBwYXJzZUtleXNBc0pzb246IFsnZGVsaXZlcnlfdG8nLCAnbWV0YSddLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0TWFya2V0UmVxdWVzdD4ocSlcblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hSZXF1ZXN0cyh1c2VybmFtZTogQWNjb3VudE5hbWUpIHtcbiAgICBjb25zdCBbYXNCdXllciwgYXNTZWxsZXJdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5mZXRjaFJlcXVlc3RzV2l0aEluZGV4UG9zaXRpb24odXNlcm5hbWUsIDIpLFxuICAgICAgdGhpcy5mZXRjaFJlcXVlc3RzV2l0aEluZGV4UG9zaXRpb24odXNlcm5hbWUsIDMpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIFsuLi5hc0J1eWVyLCAuLi5hc1NlbGxlcl07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmZ0Q29udHJhY3RcbiJdfQ==