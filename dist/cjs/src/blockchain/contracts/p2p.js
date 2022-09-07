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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("./base"));
var P2PContract = /** @class */ (function (_super) {
    __extends(P2PContract, _super);
    function P2PContract(api, tableCodeConfig) {
        return _super.call(this, api, tableCodeConfig, 'p2p') || this;
    }
    P2PContract.prototype.getOrders = function (username, parent_id, order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var q, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = {
                            table: 'orders',
                            lower_bound: 0,
                            limit: 100,
                            getAllRows: true,
                        };
                        if (typeof username !== 'undefined') {
                            q.lower_bound = username;
                            q.upper_bound = username;
                            q.index_position = 5;
                            q.key_type = 'i64';
                        }
                        else if (typeof parent_id !== 'undefined') {
                            q.lower_bound = parent_id;
                            q.upper_bound = parent_id;
                            q.index_position = 3;
                            q.key_type = 'i64';
                        }
                        else if (typeof order_id !== 'undefined') {
                            q.lower_bound = order_id;
                            q.upper_bound = order_id;
                        }
                        return [4 /*yield*/, this.getTableRows(q)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows.map(function (row) {
                                var res = __assign({}, row);
                                try {
                                    res.details = JSON.parse(res.details);
                                    res.root_remain_float = parseFloat(res.root_remain);
                                }
                                catch (e) {
                                    res.details = { address: res.details };
                                }
                                return res;
                            })];
                }
            });
        });
    };
    P2PContract.prototype.getOrder = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOrders(undefined, undefined, order_id)];
                    case 1:
                        order = (_a.sent())[0];
                        return [2 /*return*/, order];
                }
            });
        });
    };
    P2PContract.prototype.getUSDRates = function () {
        return this.getTableRows({
            table: 'usdrates',
            lower_bound: 0,
            limit: 100,
            getAllRows: true,
        }).then(function (result) { return result.rows; });
    };
    P2PContract.prototype.getRateFromRates = function (rates, symbol, precision) {
        var filter = "".concat((0).toFixed(precision), " ").concat(symbol);
        var rate = rates.find(function (el) { return el.out_asset === filter; });
        return rate ? rate.rate : '0';
    };
    P2PContract.prototype.getUsdRate = function (symbol, precision) {
        return __awaiter(this, void 0, void 0, function () {
            var rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUSDRates()];
                    case 1:
                        rates = _a.sent();
                        return [2 /*return*/, this.getRateFromRates(rates, symbol, precision)];
                }
            });
        });
    };
    return P2PContract;
}(base_1.default));
exports.default = P2PContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicDJwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vY29udHJhY3RzL3AycC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsZ0RBQWtEO0FBa0RsRDtJQUEwQiwrQkFBWTtJQUNwQyxxQkFBWSxHQUFZLEVBQUUsZUFBZ0M7ZUFDeEQsa0JBQU0sR0FBRyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVLLCtCQUFTLEdBQWYsVUFBZ0IsUUFBaUIsRUFBRSxTQUEyQixFQUFFLFFBQTBCOzs7Ozs7d0JBQ2xGLENBQUMsR0FBa0I7NEJBQ3ZCLEtBQUssRUFBRSxRQUFROzRCQUNmLFdBQVcsRUFBRSxDQUFDOzRCQUNkLEtBQUssRUFBRSxHQUFHOzRCQUNWLFVBQVUsRUFBRSxJQUFJO3lCQUNqQixDQUFBO3dCQUNELElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxFQUFFOzRCQUNuQyxDQUFDLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQTs0QkFDeEIsQ0FBQyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUE7NEJBQ3hCLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFBOzRCQUNwQixDQUFDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTt5QkFDbkI7NkJBQU0sSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLEVBQUU7NEJBQzNDLENBQUMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFBOzRCQUN6QixDQUFDLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQTs0QkFDekIsQ0FBQyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUE7NEJBQ3BCLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO3lCQUNuQjs2QkFBTSxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRTs0QkFDMUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUE7NEJBQ3hCLENBQUMsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFBO3lCQUN6Qjt3QkFFYyxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFhLENBQUMsQ0FBQyxFQUFBOzt3QkFBOUMsSUFBSSxHQUFJLENBQUEsU0FBc0MsQ0FBQSxLQUExQzt3QkFFWCxzQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztnQ0FDakIsSUFBTSxHQUFHLGdCQUFPLEdBQUcsQ0FBQyxDQUFBO2dDQUVwQixJQUFJO29DQUNGLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7b0NBQ3JDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2lDQUNwRDtnQ0FBQyxPQUFNLENBQUMsRUFBQztvQ0FDUixHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUMsQ0FBQTtpQ0FDckM7Z0NBRUQsT0FBTyxHQUFHLENBQUE7NEJBQ1osQ0FBQyxDQUFDLEVBQUE7Ozs7S0FDSDtJQUVLLDhCQUFRLEdBQWQsVUFBZSxRQUFnQjs7Ozs7NEJBQ2IscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxFQUFBOzt3QkFBN0QsS0FBSyxHQUFJLENBQUEsU0FBb0QsQ0FBQSxHQUF4RDt3QkFFWixzQkFBTyxLQUFLLEVBQUE7Ozs7S0FDYjtJQUVELGlDQUFXLEdBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQWU7WUFDckMsS0FBSyxFQUFFLFVBQVU7WUFDakIsV0FBVyxFQUFFLENBQUM7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxFQUFYLENBQVcsQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFRCxzQ0FBZ0IsR0FBaEIsVUFBaUIsS0FBcUIsRUFBRSxNQUFjLEVBQUUsU0FBaUI7UUFDdkUsSUFBTSxNQUFNLEdBQUcsVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBSSxNQUFNLENBQUUsQ0FBQTtRQUVwRCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQXZCLENBQXVCLENBQUMsQ0FBQTtRQUV0RCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO0lBQy9CLENBQUM7SUFFSyxnQ0FBVSxHQUFoQixVQUFpQixNQUFjLEVBQUUsU0FBaUI7Ozs7OzRCQUNsQyxxQkFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUE7O3dCQUFoQyxLQUFLLEdBQUcsU0FBd0I7d0JBRXRDLHNCQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFBOzs7O0tBQ3ZEO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBdkVELENBQTBCLGNBQVksR0F1RXJDO0FBRUQsa0JBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWRBcGkgZnJvbSAnLi4vcmVhZEFwaSdcbmltcG9ydCB7IFRhYmxlQ29kZUNvbmZpZyB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IEJhc2VDb250cmFjdCwge1RhYmxlUm93c0FyZ3N9IGZyb20gJy4vYmFzZSdcblxuaW50ZXJmYWNlIE9yZGVyc0RhdGEge1xuICBjcmVhdGVkX2F0OiBzdHJpbmdcbiAgY3JlYXRvcjogc3RyaW5nXG4gIGN1cmF0b3I6IHN0cmluZ1xuICBkZXRhaWxzOiBhbnlcbiAgZXhwaXJlZF9hdDogc3RyaW5nXG4gIGlkOiBudW1iZXJcbiAgb3V0X2NvbXBsZXRlZDogc3RyaW5nXG4gIG91dF9jb250cmFjdDogc3RyaW5nXG4gIG91dF9jdXJyZW5jeV9jb2RlOiBudW1iZXJcbiAgb3V0X2xvY2tlZDogc3RyaW5nXG4gIG91dF9wcmVjaXNpb246IG51bWJlclxuICBvdXRfcXVhbnRpdHk6IHN0cmluZ1xuICBvdXRfcmF0ZTogc3RyaW5nXG4gIG91dF9yZW1haW46IHN0cmluZ1xuICBvdXRfc3ltYm9sOiBzdHJpbmdcbiAgb3V0X3R5cGU6IHN0cmluZ1xuICBwYXJlbnRfY3JlYXRvcjogc3RyaW5nXG4gIHBhcmVudF9pZDogbnVtYmVyXG4gIHF1b3RlX2NvbXBsZXRlZDogc3RyaW5nXG4gIHF1b3RlX2NvbnRyYWN0OiBzdHJpbmdcbiAgcXVvdGVfbG9ja2VkOiBzdHJpbmdcbiAgcXVvdGVfcHJlY2lzaW9uOiBudW1iZXJcbiAgcXVvdGVfcXVhbnRpdHk6IHN0cmluZ1xuICBxdW90ZV9yYXRlOiBzdHJpbmdcbiAgcXVvdGVfcmVtYWluOiBzdHJpbmdcbiAgcXVvdGVfc3ltYm9sOiBzdHJpbmdcbiAgcXVvdGVfdHlwZTogc3RyaW5nXG4gIHJvb3RfY29tcGxldGVkOiBzdHJpbmdcbiAgcm9vdF9jb250cmFjdDogc3RyaW5nXG4gIHJvb3RfbG9ja2VkOiBzdHJpbmdcbiAgcm9vdF9wcmVjaXNpb246IG51bWJlclxuICByb290X3F1YW50aXR5OiBzdHJpbmdcbiAgcm9vdF9yZW1haW46IHN0cmluZ1xuICByb290X3JlbWFpbl9mbG9hdD86IG51bWJlclxuICByb290X3N5bWJvbDogc3RyaW5nXG4gIHN0YXR1czogc3RyaW5nXG4gIHR5cGU6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgVXNkUmF0ZXNEYXRhIHtcbiAgaWQ6IG51bWJlclxuICBvdXRfYXNzZXQ6IHN0cmluZ1xuICBvdXRfY29udHJhY3Q6IHN0cmluZ1xuICByYXRlOiBzdHJpbmdcbiAgdXBkYXRlZF9hdDogc3RyaW5nXG59XG5cbmNsYXNzIFAyUENvbnRyYWN0IGV4dGVuZHMgQmFzZUNvbnRyYWN0IHtcbiAgY29uc3RydWN0b3IoYXBpOiBSZWFkQXBpLCB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZykge1xuICAgIHN1cGVyKGFwaSwgdGFibGVDb2RlQ29uZmlnLCAncDJwJylcbiAgfVxuXG4gIGFzeW5jIGdldE9yZGVycyh1c2VybmFtZT86IHN0cmluZywgcGFyZW50X2lkPzogbnVtYmVyIHwgc3RyaW5nLCBvcmRlcl9pZD86IG51bWJlciB8IHN0cmluZyk6IFByb21pc2U8T3JkZXJzRGF0YVtdPiB7XG4gICAgY29uc3QgcTogVGFibGVSb3dzQXJncyA9IHtcbiAgICAgIHRhYmxlOiAnb3JkZXJzJyxcbiAgICAgIGxvd2VyX2JvdW5kOiAwLFxuICAgICAgbGltaXQ6IDEwMCxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBxLmxvd2VyX2JvdW5kID0gdXNlcm5hbWVcbiAgICAgIHEudXBwZXJfYm91bmQgPSB1c2VybmFtZVxuICAgICAgcS5pbmRleF9wb3NpdGlvbiA9IDVcbiAgICAgIHEua2V5X3R5cGUgPSAnaTY0J1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmVudF9pZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHEubG93ZXJfYm91bmQgPSBwYXJlbnRfaWRcbiAgICAgIHEudXBwZXJfYm91bmQgPSBwYXJlbnRfaWRcbiAgICAgIHEuaW5kZXhfcG9zaXRpb24gPSAzXG4gICAgICBxLmtleV90eXBlID0gJ2k2NCdcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcmRlcl9pZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHEubG93ZXJfYm91bmQgPSBvcmRlcl9pZFxuICAgICAgcS51cHBlcl9ib3VuZCA9IG9yZGVyX2lkXG4gICAgfVxuXG4gICAgY29uc3Qge3Jvd3N9ID0gYXdhaXQgdGhpcy5nZXRUYWJsZVJvd3M8T3JkZXJzRGF0YT4ocSlcblxuICAgIHJldHVybiByb3dzLm1hcChyb3cgPT4ge1xuICAgICAgY29uc3QgcmVzID0gey4uLnJvd31cblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzLmRldGFpbHMgPSBKU09OLnBhcnNlKHJlcy5kZXRhaWxzKVxuICAgICAgICByZXMucm9vdF9yZW1haW5fZmxvYXQgPSBwYXJzZUZsb2F0KHJlcy5yb290X3JlbWFpbilcbiAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHJlcy5kZXRhaWxzID0ge2FkZHJlc3M6IHJlcy5kZXRhaWxzfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzXG4gICAgfSlcbiAgfVxuXG4gIGFzeW5jIGdldE9yZGVyKG9yZGVyX2lkOiBudW1iZXIpIHtcbiAgICBjb25zdCBbb3JkZXJdID0gYXdhaXQgdGhpcy5nZXRPcmRlcnModW5kZWZpbmVkLCB1bmRlZmluZWQsIG9yZGVyX2lkKVxuXG4gICAgcmV0dXJuIG9yZGVyXG4gIH1cblxuICBnZXRVU0RSYXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUYWJsZVJvd3M8VXNkUmF0ZXNEYXRhPih7XG4gICAgICB0YWJsZTogJ3VzZHJhdGVzJyxcbiAgICAgIGxvd2VyX2JvdW5kOiAwLFxuICAgICAgbGltaXQ6IDEwMCxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0LnJvd3MpXG4gIH1cblxuICBnZXRSYXRlRnJvbVJhdGVzKHJhdGVzOiBVc2RSYXRlc0RhdGFbXSwgc3ltYm9sOiBzdHJpbmcsIHByZWNpc2lvbjogbnVtYmVyKSB7XG4gICAgY29uc3QgZmlsdGVyID0gYCR7KDApLnRvRml4ZWQocHJlY2lzaW9uKX0gJHtzeW1ib2x9YFxuXG4gICAgY29uc3QgcmF0ZSA9IHJhdGVzLmZpbmQoZWwgPT4gZWwub3V0X2Fzc2V0ID09PSBmaWx0ZXIpXG5cbiAgICByZXR1cm4gcmF0ZSA/IHJhdGUucmF0ZSA6ICcwJ1xuICB9XG5cbiAgYXN5bmMgZ2V0VXNkUmF0ZShzeW1ib2w6IHN0cmluZywgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgICBjb25zdCByYXRlcyA9IGF3YWl0IHRoaXMuZ2V0VVNEUmF0ZXMoKVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0UmF0ZUZyb21SYXRlcyhyYXRlcywgc3ltYm9sLCBwcmVjaXNpb24pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUDJQQ29udHJhY3RcbiJdfQ==