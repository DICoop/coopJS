"use strict";
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
var eosjs_api_1 = __importDefault(require("eosjs-api"));
var ono_1 = __importDefault(require("@jsdevtools/ono"));
var errors_1 = require("./errors");
var ReadApi = /** @class */ (function () {
    function ReadApi(chainName, apiConfigs, balancingMode) {
        var _this = this;
        this.getKeyAccounts = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var instance = _this.getInstance();
            return instance.getKeyAccounts.apply(instance, args);
        };
        this.getAccount = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var instance = _this.getInstance();
            return instance.getAccount.apply(instance, args);
        };
        this.getCurrencyBalance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var instance = _this.getInstance();
            return instance.getCurrencyBalance.apply(instance, args);
        };
        this.offset = 0;
        this.balancingMode = balancingMode || 'random-once';
        this.apis = [];
        this.endpoints = [];
        if (!apiConfigs || apiConfigs.length === 0) {
            throw (0, ono_1.default)(new errors_1.RpcEndpointsEmptyError("rpcEndpoints is empty (chain=".concat(chainName, ")")));
        }
        for (var _i = 0, apiConfigs_1 = apiConfigs; _i < apiConfigs_1.length; _i++) {
            var _a = apiConfigs_1[_i], protocol = _a.protocol, host = _a.host, port = _a.port;
            var rpcEndpointString = "".concat(protocol, "://").concat(host, ":").concat(port);
            this.endpoints.push(rpcEndpointString);
            this.apis.push(new eosjs_api_1.default({ httpEndpoint: rpcEndpointString }));
        }
        if (this.balancingMode === 'random-once' && this.apis.length > 1) {
            this.offset = Math.floor(Math.random() * this.apis.length);
        }
    }
    ReadApi.prototype.getBalancedItemByOffset = function (currentOffset, items, balancingMode) {
        if (items.length < 2) {
            return {
                result: items[0],
                offset: 0,
            };
        }
        var nextOffset = currentOffset;
        if (balancingMode === 'random') {
            nextOffset = Math.floor(Math.random() * items.length);
        }
        var instance = items[nextOffset];
        if (balancingMode === 'round-robin') {
            nextOffset++;
            if (nextOffset >= items.length) {
                nextOffset = 0;
            }
        }
        return {
            result: instance,
            offset: nextOffset,
        };
    };
    ReadApi.prototype.getBalancedItem = function (collection) {
        var _a = this.getBalancedItemByOffset(this.offset, collection, this.balancingMode), result = _a.result, offset = _a.offset;
        this.offset = offset;
        return result;
    };
    ReadApi.prototype.getInstance = function () {
        return this.getBalancedItem(this.apis);
    };
    ReadApi.prototype.getEndpoint = function () {
        return this.getBalancedItem(this.endpoints);
    };
    ReadApi.prototype.getUserBalance = function (account, symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrencyBalance("eosio.token", account, symbol)];
                    case 1:
                        balance = (_a.sent())[0];
                        return [2 /*return*/, "".concat((parseFloat(balance || '0') || 0).toFixed(4), " ").concat(symbol)];
                }
            });
        });
    };
    ReadApi.prototype.getPermissionKeyByName = function (accountName, name) {
        return __awaiter(this, void 0, void 0, function () {
            var account, permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccount(accountName)];
                    case 1:
                        account = _a.sent();
                        permission = account.permissions.find(function (el) { return el.perm_name === name; });
                        return [2 /*return*/, permission === null || permission === void 0 ? void 0 : permission.required_auth.keys[0].key];
                }
            });
        });
    };
    ReadApi.prototype.getInfo = function (accountName, name) {
        return __awaiter(this, void 0, void 0, function () {
            var account, permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccount(accountName)];
                    case 1:
                        account = _a.sent();
                        permission = account.permissions.find(function (el) { return el.perm_name === name; });
                        return [2 /*return*/, permission === null || permission === void 0 ? void 0 : permission.required_auth.keys[0].key];
                }
            });
        });
    };
    ReadApi.prototype.getTableRows = function (code, scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position) {
        var instance = this.getInstance();
        return instance.getTableRows(true, code, scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position);
    };
    return ReadApi;
}());
exports.default = ReadApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RzL3NyYy9ibG9ja2NoYWluL3JlYWRBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBOEI7QUFDOUIsd0RBQWlDO0FBR2pDLG1DQUFpRDtBQU9qRDtJQU1FLGlCQUFZLFNBQWlCLEVBQUUsVUFBeUIsRUFBRSxhQUE2QjtRQUF2RixpQkFtQkM7UUFrREQsbUJBQWMsR0FBNkI7WUFBQyxjQUFPO2lCQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87Z0JBQVAseUJBQU87O1lBQ2pELElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUVuQyxPQUFPLFFBQVEsQ0FBQyxjQUFjLE9BQXZCLFFBQVEsRUFBbUIsSUFBSSxFQUFDO1FBQ3pDLENBQUMsQ0FBQTtRQUVELGVBQVUsR0FBeUI7WUFBQyxjQUFPO2lCQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87Z0JBQVAseUJBQU87O1lBQ3pDLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUVuQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLE9BQW5CLFFBQVEsRUFBZSxJQUFJLEVBQUM7UUFDckMsQ0FBQyxDQUFBO1FBRUQsdUJBQWtCLEdBQWlDO1lBQUMsY0FBTztpQkFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO2dCQUFQLHlCQUFPOztZQUN6RCxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFbkMsT0FBTyxRQUFRLENBQUMsa0JBQWtCLE9BQTNCLFFBQVEsRUFBdUIsSUFBSSxFQUFDO1FBQzdDLENBQUMsQ0FBQTtRQXBGQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxJQUFJLGFB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QixXQUE2QixFQUM3QixLQUFjLEVBQ2QsUUFBaUIsRUFDakIsY0FBdUI7UUFFdkIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBRW5DLE9BQU8sUUFBUSxDQUFDLFlBQVksQ0FDMUIsSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1IsY0FBYyxDQUNmLENBQUE7SUFDSCxDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUE1SUQsSUE0SUM7QUFFRCxrQkFBZSxPQUFPLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW9zQXBpIGZyb20gJ2Vvc2pzLWFwaSdcbmltcG9ydCBvbm8gZnJvbSAnQGpzZGV2dG9vbHMvb25vJ1xuXG5pbXBvcnQgeyBScGNFbmRwb2ludCwgQmFsYW5jaW5nTW9kZSB9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgeyBScGNFbmRwb2ludHNFbXB0eUVycm9yIH0gZnJvbSAnLi9lcnJvcnMnXG5cbmludGVyZmFjZSBCYWxhbmNpbmdSZXN1bHQ8VD4ge1xuICByZXN1bHQ6IFQsXG4gIG9mZnNldDogbnVtYmVyLFxufVxuXG5jbGFzcyBSZWFkQXBpIHtcbiAgcHJpdmF0ZSByZWFkb25seSBiYWxhbmNpbmdNb2RlOiBCYWxhbmNpbmdNb2RlXG4gIHByaXZhdGUgcmVhZG9ubHkgYXBpczogRW9zQXBpW11cbiAgcHJpdmF0ZSByZWFkb25seSBlbmRwb2ludHM6IHN0cmluZ1tdXG4gIHByaXZhdGUgb2Zmc2V0OiBudW1iZXJcblxuICBjb25zdHJ1Y3RvcihjaGFpbk5hbWU6IHN0cmluZywgYXBpQ29uZmlnczogUnBjRW5kcG9pbnRbXSwgYmFsYW5jaW5nTW9kZT86IEJhbGFuY2luZ01vZGUpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLmJhbGFuY2luZ01vZGUgPSBiYWxhbmNpbmdNb2RlIHx8ICdyYW5kb20tb25jZSdcbiAgICB0aGlzLmFwaXMgPSBbXVxuICAgIHRoaXMuZW5kcG9pbnRzID0gW11cblxuICAgIGlmICghYXBpQ29uZmlncyB8fCBhcGlDb25maWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgb25vKG5ldyBScGNFbmRwb2ludHNFbXB0eUVycm9yKGBycGNFbmRwb2ludHMgaXMgZW1wdHkgKGNoYWluPSR7Y2hhaW5OYW1lfSlgKSlcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHsgcHJvdG9jb2wsIGhvc3QsIHBvcnQgfSBvZiBhcGlDb25maWdzKSB7XG4gICAgICBjb25zdCBycGNFbmRwb2ludFN0cmluZyA9IGAke3Byb3RvY29sfTovLyR7aG9zdH06JHtwb3J0fWBcbiAgICAgIHRoaXMuZW5kcG9pbnRzLnB1c2gocnBjRW5kcG9pbnRTdHJpbmcpXG4gICAgICB0aGlzLmFwaXMucHVzaChuZXcgRW9zQXBpKHsgaHR0cEVuZHBvaW50OiBycGNFbmRwb2ludFN0cmluZyB9KSlcbiAgICB9XG5cbiAgICBpZiAodGhpcy5iYWxhbmNpbmdNb2RlID09PSAncmFuZG9tLW9uY2UnICYmIHRoaXMuYXBpcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLm9mZnNldCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYXBpcy5sZW5ndGgpXG4gICAgfVxuICB9XG5cbiAgZ2V0QmFsYW5jZWRJdGVtQnlPZmZzZXQ8VD4oY3VycmVudE9mZnNldDogbnVtYmVyLCBpdGVtczogVFtdLCBiYWxhbmNpbmdNb2RlOiBCYWxhbmNpbmdNb2RlKTogQmFsYW5jaW5nUmVzdWx0PFQ+IHtcbiAgICBpZiAoaXRlbXMubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdWx0OiBpdGVtc1swXSxcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBuZXh0T2Zmc2V0ID0gY3VycmVudE9mZnNldFxuICAgIGlmIChiYWxhbmNpbmdNb2RlID09PSAncmFuZG9tJykge1xuICAgICAgbmV4dE9mZnNldCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGl0ZW1zLmxlbmd0aClcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IGl0ZW1zW25leHRPZmZzZXRdXG5cbiAgICBpZiAoYmFsYW5jaW5nTW9kZSA9PT0gJ3JvdW5kLXJvYmluJykge1xuICAgICAgbmV4dE9mZnNldCsrXG5cbiAgICAgIGlmIChuZXh0T2Zmc2V0ID49IGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBuZXh0T2Zmc2V0ID0gMFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICByZXN1bHQ6IGluc3RhbmNlLFxuICAgICAgb2Zmc2V0OiBuZXh0T2Zmc2V0LFxuICAgIH1cbiAgfVxuXG4gIGdldEJhbGFuY2VkSXRlbTxUPihjb2xsZWN0aW9uOiBUW10pOiBUIHtcbiAgICBjb25zdCB7XG4gICAgICByZXN1bHQsXG4gICAgICBvZmZzZXQsXG4gICAgfSA9IHRoaXMuZ2V0QmFsYW5jZWRJdGVtQnlPZmZzZXQ8VD4odGhpcy5vZmZzZXQsIGNvbGxlY3Rpb24sIHRoaXMuYmFsYW5jaW5nTW9kZSlcblxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBnZXRJbnN0YW5jZSgpOiBFb3NBcGkge1xuICAgIHJldHVybiB0aGlzLmdldEJhbGFuY2VkSXRlbTxFb3NBcGk+KHRoaXMuYXBpcylcbiAgfVxuXG4gIGdldEVuZHBvaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QmFsYW5jZWRJdGVtPHN0cmluZz4odGhpcy5lbmRwb2ludHMpXG4gIH1cblxuICBnZXRLZXlBY2NvdW50czogRW9zQXBpWydnZXRLZXlBY2NvdW50cyddID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoKVxuXG4gICAgcmV0dXJuIGluc3RhbmNlLmdldEtleUFjY291bnRzKC4uLmFyZ3MpXG4gIH1cblxuICBnZXRBY2NvdW50OiBFb3NBcGlbJ2dldEFjY291bnQnXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKClcblxuICAgIHJldHVybiBpbnN0YW5jZS5nZXRBY2NvdW50KC4uLmFyZ3MpXG4gIH1cblxuICBnZXRDdXJyZW5jeUJhbGFuY2U6IEVvc0FwaVsnZ2V0Q3VycmVuY3lCYWxhbmNlJ10gPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZSgpXG5cbiAgICByZXR1cm4gaW5zdGFuY2UuZ2V0Q3VycmVuY3lCYWxhbmNlKC4uLmFyZ3MpXG4gIH1cblxuICBhc3luYyBnZXRVc2VyQmFsYW5jZShhY2NvdW50OiBzdHJpbmcsIHN5bWJvbDogc3RyaW5nKSB7XG4gICAgY29uc3QgW2JhbGFuY2VdID0gYXdhaXQgdGhpcy5nZXRDdXJyZW5jeUJhbGFuY2UoXCJlb3Npby50b2tlblwiLCBhY2NvdW50LCBzeW1ib2wpXG5cbiAgICByZXR1cm4gYCR7KHBhcnNlRmxvYXQoYmFsYW5jZSB8fCAnMCcpIHx8IDApLnRvRml4ZWQoNCl9ICR7c3ltYm9sfWBcbiAgfVxuXG4gIGFzeW5jIGdldFBlcm1pc3Npb25LZXlCeU5hbWUoYWNjb3VudE5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IHRoaXMuZ2V0QWNjb3VudChhY2NvdW50TmFtZSk7XG4gICAgY29uc3QgcGVybWlzc2lvbiA9IGFjY291bnQucGVybWlzc2lvbnMuZmluZChlbCA9PiBlbC5wZXJtX25hbWUgPT09IG5hbWUpXG5cbiAgICByZXR1cm4gcGVybWlzc2lvbj8ucmVxdWlyZWRfYXV0aC5rZXlzWzBdLmtleVxuICB9XG5cbiAgYXN5bmMgZ2V0SW5mbyhhY2NvdW50TmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgdGhpcy5nZXRBY2NvdW50KGFjY291bnROYW1lKTtcbiAgICBjb25zdCBwZXJtaXNzaW9uID0gYWNjb3VudC5wZXJtaXNzaW9ucy5maW5kKGVsID0+IGVsLnBlcm1fbmFtZSA9PT0gbmFtZSlcblxuICAgIHJldHVybiBwZXJtaXNzaW9uPy5yZXF1aXJlZF9hdXRoLmtleXNbMF0ua2V5XG4gIH1cblxuXG4gIGdldFRhYmxlUm93czxSb3dUeXBlPihcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgc2NvcGU6IHN0cmluZyxcbiAgICB0YWJsZTogc3RyaW5nLFxuICAgIHRhYmxlX2tleT86IHN0cmluZyxcbiAgICBsb3dlcl9ib3VuZD86IG51bWJlciB8IHN0cmluZyxcbiAgICB1cHBlcl9ib3VuZD86IG51bWJlciB8IHN0cmluZyxcbiAgICBsaW1pdD86IG51bWJlcixcbiAgICBrZXlfdHlwZT86IHN0cmluZyxcbiAgICBpbmRleF9wb3NpdGlvbj86IG51bWJlclxuICApIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoKVxuXG4gICAgcmV0dXJuIGluc3RhbmNlLmdldFRhYmxlUm93czxSb3dUeXBlPihcbiAgICAgIHRydWUsXG4gICAgICBjb2RlLFxuICAgICAgc2NvcGUsXG4gICAgICB0YWJsZSxcbiAgICAgIHRhYmxlX2tleSxcbiAgICAgIGxvd2VyX2JvdW5kLFxuICAgICAgdXBwZXJfYm91bmQsXG4gICAgICBsaW1pdCxcbiAgICAgIGtleV90eXBlLFxuICAgICAgaW5kZXhfcG9zaXRpb25cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVhZEFwaVxuIl19