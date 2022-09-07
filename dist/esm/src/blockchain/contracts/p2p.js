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
import BaseContract from './base';
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
}(BaseContract));
export default P2PContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicDJwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vY29udHJhY3RzL3AycC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sWUFBNkIsTUFBTSxRQUFRLENBQUE7QUFrRGxEO0lBQTBCLCtCQUFZO0lBQ3BDLHFCQUFZLEdBQVksRUFBRSxlQUFnQztlQUN4RCxrQkFBTSxHQUFHLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRUssK0JBQVMsR0FBZixVQUFnQixRQUFpQixFQUFFLFNBQTJCLEVBQUUsUUFBMEI7Ozs7Ozt3QkFDbEYsQ0FBQyxHQUFrQjs0QkFDdkIsS0FBSyxFQUFFLFFBQVE7NEJBQ2YsV0FBVyxFQUFFLENBQUM7NEJBQ2QsS0FBSyxFQUFFLEdBQUc7NEJBQ1YsVUFBVSxFQUFFLElBQUk7eUJBQ2pCLENBQUE7d0JBQ0QsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLEVBQUU7NEJBQ25DLENBQUMsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFBOzRCQUN4QixDQUFDLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQTs0QkFDeEIsQ0FBQyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUE7NEJBQ3BCLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO3lCQUNuQjs2QkFBTSxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsRUFBRTs0QkFDM0MsQ0FBQyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUE7NEJBQ3pCLENBQUMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFBOzRCQUN6QixDQUFDLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQTs0QkFDcEIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7eUJBQ25COzZCQUFNLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxFQUFFOzRCQUMxQyxDQUFDLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQTs0QkFDeEIsQ0FBQyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUE7eUJBQ3pCO3dCQUVjLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQWEsQ0FBQyxDQUFDLEVBQUE7O3dCQUE5QyxJQUFJLEdBQUksQ0FBQSxTQUFzQyxDQUFBLEtBQTFDO3dCQUVYLHNCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHO2dDQUNqQixJQUFNLEdBQUcsZ0JBQU8sR0FBRyxDQUFDLENBQUE7Z0NBRXBCLElBQUk7b0NBQ0YsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtvQ0FDckMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7aUNBQ3BEO2dDQUFDLE9BQU0sQ0FBQyxFQUFDO29DQUNSLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBQyxDQUFBO2lDQUNyQztnQ0FFRCxPQUFPLEdBQUcsQ0FBQTs0QkFDWixDQUFDLENBQUMsRUFBQTs7OztLQUNIO0lBRUssOEJBQVEsR0FBZCxVQUFlLFFBQWdCOzs7Ozs0QkFDYixxQkFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUE7O3dCQUE3RCxLQUFLLEdBQUksQ0FBQSxTQUFvRCxDQUFBLEdBQXhEO3dCQUVaLHNCQUFPLEtBQUssRUFBQTs7OztLQUNiO0lBRUQsaUNBQVcsR0FBWDtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBZTtZQUNyQyxLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQUUsQ0FBQztZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLEVBQVgsQ0FBVyxDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUVELHNDQUFnQixHQUFoQixVQUFpQixLQUFxQixFQUFFLE1BQWMsRUFBRSxTQUFpQjtRQUN2RSxJQUFNLE1BQU0sR0FBRyxVQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFJLE1BQU0sQ0FBRSxDQUFBO1FBRXBELElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBdkIsQ0FBdUIsQ0FBQyxDQUFBO1FBRXRELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7SUFDL0IsQ0FBQztJQUVLLGdDQUFVLEdBQWhCLFVBQWlCLE1BQWMsRUFBRSxTQUFpQjs7Ozs7NEJBQ2xDLHFCQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBQTs7d0JBQWhDLEtBQUssR0FBRyxTQUF3Qjt3QkFFdEMsc0JBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUE7Ozs7S0FDdkQ7SUFDSCxrQkFBQztBQUFELENBQUMsQUF2RUQsQ0FBMEIsWUFBWSxHQXVFckM7QUFFRCxlQUFlLFdBQVcsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFkQXBpIGZyb20gJy4uL3JlYWRBcGknXG5pbXBvcnQgeyBUYWJsZUNvZGVDb25maWcgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCBCYXNlQ29udHJhY3QsIHtUYWJsZVJvd3NBcmdzfSBmcm9tICcuL2Jhc2UnXG5cbmludGVyZmFjZSBPcmRlcnNEYXRhIHtcbiAgY3JlYXRlZF9hdDogc3RyaW5nXG4gIGNyZWF0b3I6IHN0cmluZ1xuICBjdXJhdG9yOiBzdHJpbmdcbiAgZGV0YWlsczogYW55XG4gIGV4cGlyZWRfYXQ6IHN0cmluZ1xuICBpZDogbnVtYmVyXG4gIG91dF9jb21wbGV0ZWQ6IHN0cmluZ1xuICBvdXRfY29udHJhY3Q6IHN0cmluZ1xuICBvdXRfY3VycmVuY3lfY29kZTogbnVtYmVyXG4gIG91dF9sb2NrZWQ6IHN0cmluZ1xuICBvdXRfcHJlY2lzaW9uOiBudW1iZXJcbiAgb3V0X3F1YW50aXR5OiBzdHJpbmdcbiAgb3V0X3JhdGU6IHN0cmluZ1xuICBvdXRfcmVtYWluOiBzdHJpbmdcbiAgb3V0X3N5bWJvbDogc3RyaW5nXG4gIG91dF90eXBlOiBzdHJpbmdcbiAgcGFyZW50X2NyZWF0b3I6IHN0cmluZ1xuICBwYXJlbnRfaWQ6IG51bWJlclxuICBxdW90ZV9jb21wbGV0ZWQ6IHN0cmluZ1xuICBxdW90ZV9jb250cmFjdDogc3RyaW5nXG4gIHF1b3RlX2xvY2tlZDogc3RyaW5nXG4gIHF1b3RlX3ByZWNpc2lvbjogbnVtYmVyXG4gIHF1b3RlX3F1YW50aXR5OiBzdHJpbmdcbiAgcXVvdGVfcmF0ZTogc3RyaW5nXG4gIHF1b3RlX3JlbWFpbjogc3RyaW5nXG4gIHF1b3RlX3N5bWJvbDogc3RyaW5nXG4gIHF1b3RlX3R5cGU6IHN0cmluZ1xuICByb290X2NvbXBsZXRlZDogc3RyaW5nXG4gIHJvb3RfY29udHJhY3Q6IHN0cmluZ1xuICByb290X2xvY2tlZDogc3RyaW5nXG4gIHJvb3RfcHJlY2lzaW9uOiBudW1iZXJcbiAgcm9vdF9xdWFudGl0eTogc3RyaW5nXG4gIHJvb3RfcmVtYWluOiBzdHJpbmdcbiAgcm9vdF9yZW1haW5fZmxvYXQ/OiBudW1iZXJcbiAgcm9vdF9zeW1ib2w6IHN0cmluZ1xuICBzdGF0dXM6IHN0cmluZ1xuICB0eXBlOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIFVzZFJhdGVzRGF0YSB7XG4gIGlkOiBudW1iZXJcbiAgb3V0X2Fzc2V0OiBzdHJpbmdcbiAgb3V0X2NvbnRyYWN0OiBzdHJpbmdcbiAgcmF0ZTogc3RyaW5nXG4gIHVwZGF0ZWRfYXQ6IHN0cmluZ1xufVxuXG5jbGFzcyBQMlBDb250cmFjdCBleHRlbmRzIEJhc2VDb250cmFjdCB7XG4gIGNvbnN0cnVjdG9yKGFwaTogUmVhZEFwaSwgdGFibGVDb2RlQ29uZmlnOiBUYWJsZUNvZGVDb25maWcpIHtcbiAgICBzdXBlcihhcGksIHRhYmxlQ29kZUNvbmZpZywgJ3AycCcpXG4gIH1cblxuICBhc3luYyBnZXRPcmRlcnModXNlcm5hbWU/OiBzdHJpbmcsIHBhcmVudF9pZD86IG51bWJlciB8IHN0cmluZywgb3JkZXJfaWQ/OiBudW1iZXIgfCBzdHJpbmcpOiBQcm9taXNlPE9yZGVyc0RhdGFbXT4ge1xuICAgIGNvbnN0IHE6IFRhYmxlUm93c0FyZ3MgPSB7XG4gICAgICB0YWJsZTogJ29yZGVycycsXG4gICAgICBsb3dlcl9ib3VuZDogMCxcbiAgICAgIGxpbWl0OiAxMDAsXG4gICAgICBnZXRBbGxSb3dzOiB0cnVlLFxuICAgIH1cbiAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcS5sb3dlcl9ib3VuZCA9IHVzZXJuYW1lXG4gICAgICBxLnVwcGVyX2JvdW5kID0gdXNlcm5hbWVcbiAgICAgIHEuaW5kZXhfcG9zaXRpb24gPSA1XG4gICAgICBxLmtleV90eXBlID0gJ2k2NCdcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJlbnRfaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBxLmxvd2VyX2JvdW5kID0gcGFyZW50X2lkXG4gICAgICBxLnVwcGVyX2JvdW5kID0gcGFyZW50X2lkXG4gICAgICBxLmluZGV4X3Bvc2l0aW9uID0gM1xuICAgICAgcS5rZXlfdHlwZSA9ICdpNjQnXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3JkZXJfaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBxLmxvd2VyX2JvdW5kID0gb3JkZXJfaWRcbiAgICAgIHEudXBwZXJfYm91bmQgPSBvcmRlcl9pZFxuICAgIH1cblxuICAgIGNvbnN0IHtyb3dzfSA9IGF3YWl0IHRoaXMuZ2V0VGFibGVSb3dzPE9yZGVyc0RhdGE+KHEpXG5cbiAgICByZXR1cm4gcm93cy5tYXAocm93ID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IHsuLi5yb3d9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcy5kZXRhaWxzID0gSlNPTi5wYXJzZShyZXMuZGV0YWlscylcbiAgICAgICAgcmVzLnJvb3RfcmVtYWluX2Zsb2F0ID0gcGFyc2VGbG9hdChyZXMucm9vdF9yZW1haW4pXG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICByZXMuZGV0YWlscyA9IHthZGRyZXNzOiByZXMuZGV0YWlsc31cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0pXG4gIH1cblxuICBhc3luYyBnZXRPcmRlcihvcmRlcl9pZDogbnVtYmVyKSB7XG4gICAgY29uc3QgW29yZGVyXSA9IGF3YWl0IHRoaXMuZ2V0T3JkZXJzKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBvcmRlcl9pZClcblxuICAgIHJldHVybiBvcmRlclxuICB9XG5cbiAgZ2V0VVNEUmF0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGFibGVSb3dzPFVzZFJhdGVzRGF0YT4oe1xuICAgICAgdGFibGU6ICd1c2RyYXRlcycsXG4gICAgICBsb3dlcl9ib3VuZDogMCxcbiAgICAgIGxpbWl0OiAxMDAsXG4gICAgICBnZXRBbGxSb3dzOiB0cnVlLFxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5yb3dzKVxuICB9XG5cbiAgZ2V0UmF0ZUZyb21SYXRlcyhyYXRlczogVXNkUmF0ZXNEYXRhW10sIHN5bWJvbDogc3RyaW5nLCBwcmVjaXNpb246IG51bWJlcikge1xuICAgIGNvbnN0IGZpbHRlciA9IGAkeygwKS50b0ZpeGVkKHByZWNpc2lvbil9ICR7c3ltYm9sfWBcblxuICAgIGNvbnN0IHJhdGUgPSByYXRlcy5maW5kKGVsID0+IGVsLm91dF9hc3NldCA9PT0gZmlsdGVyKVxuXG4gICAgcmV0dXJuIHJhdGUgPyByYXRlLnJhdGUgOiAnMCdcbiAgfVxuXG4gIGFzeW5jIGdldFVzZFJhdGUoc3ltYm9sOiBzdHJpbmcsIHByZWNpc2lvbjogbnVtYmVyKSB7XG4gICAgY29uc3QgcmF0ZXMgPSBhd2FpdCB0aGlzLmdldFVTRFJhdGVzKClcblxuICAgIHJldHVybiB0aGlzLmdldFJhdGVGcm9tUmF0ZXMocmF0ZXMsIHN5bWJvbCwgcHJlY2lzaW9uKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFAyUENvbnRyYWN0XG4iXX0=