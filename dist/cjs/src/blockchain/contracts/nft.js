"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("./base"));
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
}(base_1.default));
exports.default = NftContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vY29udHJhY3RzL25mdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGdEQUFrRDtBQXdFbEQ7SUFBMEIsK0JBQVk7SUFDcEMscUJBQVksR0FBWSxFQUFFLGVBQWdDO2VBQ3hELGtCQUFNLEdBQUcsRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFSyx1Q0FBaUIsR0FBdkIsVUFBd0IsS0FBa0I7Ozs7Ozt3QkFDbEMsQ0FBQyxHQUFrQjs0QkFDdkIsS0FBSyxFQUFFLFFBQVE7NEJBQ2YsV0FBVyxFQUFFLEtBQUs7NEJBQ2xCLFdBQVcsRUFBRSxLQUFLOzRCQUNsQixLQUFLLEVBQUUsSUFBSTs0QkFDWCxjQUFjLEVBQUUsQ0FBQzs0QkFDakIsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsVUFBVSxFQUFFLElBQUk7eUJBQ2pCLENBQUE7d0JBQ2MscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBaUIsQ0FBQyxDQUFDLEVBQUE7O3dCQUFsRCxJQUFJLEdBQUksQ0FBQSxTQUEwQyxDQUFBLEtBQTlDO3dCQUVYLHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBRUssbUNBQWEsR0FBbkI7Ozs7Ozt3QkFDUSxDQUFDLEdBQWtCOzRCQUN2QixLQUFLLEVBQUUsU0FBUzs0QkFDaEIsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsV0FBVyxFQUFFLENBQUM7NEJBQ2QsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLGVBQWUsRUFBRSxJQUFJOzRCQUNyQixlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7NEJBQzNCLGlCQUFpQixFQUFFO2dDQUNqQixNQUFNLEVBQUUsY0FBTSxPQUFBLEVBQUUsRUFBRixDQUFFOzZCQUNqQjt5QkFDRixDQUFB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QUU7Ozs7S0FDbEM7SUFDSCxrQkFBQztBQUFELENBQUMsQUE1R0QsQ0FBMEIsY0FBWSxHQTRHckM7QUFFRCxrQkFBZSxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY2NvdW50TmFtZSB9IGZyb20gJy4uLy4uL2Vvcy90eXBlcydcbmltcG9ydCBSZWFkQXBpIGZyb20gJy4uL3JlYWRBcGknXG5pbXBvcnQgeyBUYWJsZUNvZGVDb25maWcgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCBCYXNlQ29udHJhY3QsIHtUYWJsZVJvd3NBcmdzfSBmcm9tICcuL2Jhc2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgTmZ0T2JqZWN0IHtcbiAgY2F0ZWdvcnk6IHN0cmluZ1xuICBjcmVhdG9yOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICBpZDogbnVtYmVyXG4gIGltYWdlczogc3RyaW5nW11cbiAgaXBuczogc3RyaW5nXG4gIG1ldGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LFxuICB0aXRsZTogc3RyaW5nXG4gIHRvdGFsX3BpZWNlczogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmZ0UGllY2VPYmplY3Qge1xuICBpZDogbnVtYmVyXG4gIG9iamVjdF9pZDogbnVtYmVyXG4gIG93bmVyOiBzdHJpbmcsXG4gIHBpZWNlczogbnVtYmVyXG4gIGRheV9maW5pc2g6IG51bWJlclxuICBkYXlfc3RhcnQ6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlbGl2ZXJ5UmVxdWVzdCB7XG4gIHR5cGU6IHN0cmluZ1xuICBwbGFjZWhvbGRlcjogc3RyaW5nXG59XG5cbmV4cG9ydCB0eXBlIERlbGl2ZXJ5UmVxdWVzdEZpbGxlZCA9IERlbGl2ZXJ5UmVxdWVzdCAmIHtcbiAgdmFsdWU6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBEZWxpdmVyeVJlcXVlc3RQZXJzb25hbERhdGEgPSB7XG4gIHBlcnNvbmFsRGF0YUlkPzogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmZ0TWFya2V0T2JqZWN0IHtcbiAgYmFzZV9waWVjZV9wcmljZTogc3RyaW5nXG4gIGJsb2NrZWRfcGllY2VzOiBudW1iZXJcbiAgZGF5X2ZpbmlzaDogbnVtYmVyXG4gIGRheV9zdGFydDogbnVtYmVyXG4gIGlkOiBudW1iZXJcbiAgbWV0YToge2RlbGl2ZXJ5X3JlcXVlc3Q6IERlbGl2ZXJ5UmVxdWVzdFtdfVxuICBtaW5fcGllY2VfcHJpY2U6IHN0cmluZ1xuICBvYmplY3RfaWQ6IG51bWJlclxuICByZW1haW5fcGllY2VzOiBudW1iZXJcbiAgc2FsZXNfY2xvc2VkX2F0OiBzdHJpbmdcbiAgc2FsZXNfc3RhcnRfYXQ6IHN0cmluZ1xuICBzZWxsZXI6IHN0cmluZ1xuICBzdGF0dXM6IFwid2FpdGluZ1wiIHwgXCJwYXVzZVwiXG4gIHRva2VuX2NvbnRyYWN0OiBzdHJpbmdcbiAgdG90YWxfcHJpY2U6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5mdE1hcmtldFJlcXVlc3Qge1xuICBpZDogbnVtYmVyXG4gIG1hcmtldF9pZDogbnVtYmVyXG4gIGJ1eWVyOiBzdHJpbmdcbiAgc2VsbGVyOiBzdHJpbmdcbiAgbWFuYWdlcjogc3RyaW5nXG4gIHJlcXVlc3RlZF9waWVjZXM6IG51bWJlclxuICB0b3RhbF9wcmljZTogc3RyaW5nXG4gIGJhc2VfcGllY2VfcHJpY2U6IHN0cmluZ1xuICBvbmVfcGllY2VfcHJpY2U6IHN0cmluZ1xuICB0b3RhbF9wYXllZDogc3RyaW5nXG4gIHN0YXR1czogXCJ3YWl0aW5nXCIgfCBcImFjY2VwdGVkXCIgfCBcImNvbmZpcm1lZFwiIHwgXCJpc3N1ZWRcIiB8IFwiZGVjbGluZWRcIiB8IFwiY2FuY2VsbGVkXCIgfCBcImNvbXBsZXRlZFwiXG4gIGRheV9zdGFydDogbnVtYmVyXG4gIGRheV9maW5pc2g6IG51bWJlclxuICBkZWxpdmVyeV90bzogRGVsaXZlcnlSZXF1ZXN0RmlsbGVkW10gfCBEZWxpdmVyeVJlcXVlc3RQZXJzb25hbERhdGFcbiAgbWV0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj5cbn1cblxuY2xhc3MgTmZ0Q29udHJhY3QgZXh0ZW5kcyBCYXNlQ29udHJhY3Qge1xuICBjb25zdHJ1Y3RvcihhcGk6IFJlYWRBcGksIHRhYmxlQ29kZUNvbmZpZzogVGFibGVDb2RlQ29uZmlnKSB7XG4gICAgc3VwZXIoYXBpLCB0YWJsZUNvZGVDb25maWcsICduZnQnKVxuICB9XG5cbiAgYXN5bmMgZ2V0T2JqZWN0c0J5T3duZXIob3duZXI6IEFjY291bnROYW1lKSB7XG4gICAgY29uc3QgcTogVGFibGVSb3dzQXJncyA9IHtcbiAgICAgIHRhYmxlOiAncGllY2VzJyxcbiAgICAgIGxvd2VyX2JvdW5kOiBvd25lcixcbiAgICAgIHVwcGVyX2JvdW5kOiBvd25lcixcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgaW5kZXhfcG9zaXRpb246IDIsXG4gICAgICBrZXlfdHlwZTogJ2k2NCcsXG4gICAgICBnZXRBbGxSb3dzOiB0cnVlLFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRQaWVjZU9iamVjdD4ocSlcblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgYXN5bmMgZ2V0QWxsT2JqZWN0cygpIHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdvYmplY3RzJyxcbiAgICAgIGxpbWl0OiAxMDAsXG4gICAgICBsb3dlcl9ib3VuZDogMCxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgICBwYXJzZU1ldGFBc0pzb246IHRydWUsXG4gICAgICBwYXJzZUtleXNBc0pzb246IFsnaW1hZ2VzJ10sXG4gICAgICBkZWZhdWx0SnNvblZhbHVlczoge1xuICAgICAgICBpbWFnZXM6ICgpID0+IFtdLFxuICAgICAgfSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0T2JqZWN0PihxKVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBhc3luYyBnZXRPYmplY3RzQnlJZChpZDogbnVtYmVyKSB7XG4gICAgY29uc3QgcTogVGFibGVSb3dzQXJncyA9IHtcbiAgICAgIHRhYmxlOiAnb2JqZWN0cycsXG4gICAgICBsaW1pdDogMSxcbiAgICAgIGxvd2VyX2JvdW5kOiBpZCxcbiAgICAgIHVwcGVyX2JvdW5kOiBpZCxcbiAgICAgIGluZGV4X3Bvc2l0aW9uOiAwLFxuICAgICAga2V5X3R5cGU6ICdpNjQnLFxuICAgICAgcGFyc2VNZXRhQXNKc29uOiB0cnVlLFxuICAgICAgcGFyc2VLZXlzQXNKc29uOiBbJ2ltYWdlcyddLFxuICAgICAgZGVmYXVsdEpzb25WYWx1ZXM6IHtcbiAgICAgICAgaW1hZ2VzOiAoKSA9PiBbXSxcbiAgICAgIH0sXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdE9iamVjdD4ocSlcblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgYXN5bmMgZ2V0TWFya2V0KCkge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ21hcmtldCcsXG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIGxvd2VyX2JvdW5kOiAwLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICAgIHBhcnNlTWV0YUFzSnNvbjogdHJ1ZSxcbiAgICB9XG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8TmZ0TWFya2V0T2JqZWN0PihxKVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBhc3luYyBnZXRNYXJrZXRPYmplY3RzQnlJZChpZDogbnVtYmVyKSB7XG4gICAgY29uc3QgcTogVGFibGVSb3dzQXJncyA9IHtcbiAgICAgIHRhYmxlOiAnbWFya2V0JyxcbiAgICAgIGxpbWl0OiAxLFxuICAgICAgbG93ZXJfYm91bmQ6IGlkLFxuICAgICAgdXBwZXJfYm91bmQ6IGlkLFxuICAgICAgaW5kZXhfcG9zaXRpb246IDAsXG4gICAgICBrZXlfdHlwZTogJ2k2NCcsXG4gICAgICBwYXJzZU1ldGFBc0pzb246IHRydWUsXG4gICAgfVxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE5mdE1hcmtldE9iamVjdD4ocSlcblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hSZXF1ZXN0c1dpdGhJbmRleFBvc2l0aW9uKHVzZXJuYW1lOiBBY2NvdW50TmFtZSwgaW5kZXhQb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgY29uc3QgcTogVGFibGVSb3dzQXJncyA9IHtcbiAgICAgIHRhYmxlOiAncmVxdWVzdHMnLFxuICAgICAgbG93ZXJfYm91bmQ6IHVzZXJuYW1lLFxuICAgICAgdXBwZXJfYm91bmQ6IHVzZXJuYW1lLFxuICAgICAgbGltaXQ6IDEwMDAsXG4gICAgICBpbmRleF9wb3NpdGlvbjogaW5kZXhQb3NpdGlvbixcbiAgICAgIGtleV90eXBlOiAnaTY0JyxcbiAgICAgIHBhcnNlS2V5c0FzSnNvbjogWydkZWxpdmVyeV90bycsICdtZXRhJ10sXG4gICAgICBnZXRBbGxSb3dzOiB0cnVlLFxuICAgIH1cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxOZnRNYXJrZXRSZXF1ZXN0PihxKVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBhc3luYyBmZXRjaFJlcXVlc3RzKHVzZXJuYW1lOiBBY2NvdW50TmFtZSkge1xuICAgIGNvbnN0IFthc0J1eWVyLCBhc1NlbGxlcl0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLmZldGNoUmVxdWVzdHNXaXRoSW5kZXhQb3NpdGlvbih1c2VybmFtZSwgMiksXG4gICAgICB0aGlzLmZldGNoUmVxdWVzdHNXaXRoSW5kZXhQb3NpdGlvbih1c2VybmFtZSwgMyksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gWy4uLmFzQnV5ZXIsIC4uLmFzU2VsbGVyXTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOZnRDb250cmFjdFxuIl19