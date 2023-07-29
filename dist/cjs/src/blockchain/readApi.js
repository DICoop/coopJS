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
        this.getAbi = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var instance = _this.getInstance();
            return instance.getAbi.apply(instance, args);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RzL3NyYy9ibG9ja2NoYWluL3JlYWRBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBOEI7QUFDOUIsd0RBQWlDO0FBR2pDLG1DQUFpRDtBQU9qRDtJQU1FLGlCQUFZLFNBQWlCLEVBQUUsVUFBeUIsRUFBRSxhQUE2QjtRQUF2RixpQkFtQkM7UUFrREQsbUJBQWMsR0FBNkI7WUFBQyxjQUFPO2lCQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87Z0JBQVAseUJBQU87O1lBQ2pELElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUVuQyxPQUFPLFFBQVEsQ0FBQyxjQUFjLE9BQXZCLFFBQVEsRUFBbUIsSUFBSSxFQUFDO1FBQ3pDLENBQUMsQ0FBQTtRQUVELGVBQVUsR0FBeUI7WUFBQyxjQUFPO2lCQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87Z0JBQVAseUJBQU87O1lBQ3pDLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUVuQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLE9BQW5CLFFBQVEsRUFBZSxJQUFJLEVBQUM7UUFDckMsQ0FBQyxDQUFBO1FBRUQsV0FBTSxHQUFxQjtZQUFDLGNBQU87aUJBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztnQkFBUCx5QkFBTzs7WUFDakMsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBRW5DLE9BQU8sUUFBUSxDQUFDLE1BQU0sT0FBZixRQUFRLEVBQVcsSUFBSSxFQUFDO1FBQ2pDLENBQUMsQ0FBQTtRQUVELHVCQUFrQixHQUFpQztZQUFDLGNBQU87aUJBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztnQkFBUCx5QkFBTzs7WUFDekQs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QixDQUFxQixDQUFDLENBQUE7d0JBRXhFLHNCQUFPLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUE7Ozs7S0FDN0M7SUFHRCw4QkFBWSxHQUFaLFVBQ0UsSUFBWSxFQUNaLEtBQWEsRUFDYixLQUFhLEVBQ2IsU0FBa0IsRUFDbEIsV0FBNkIsRUFDN0IsV0FBNkIsRUFDN0IsS0FBYyxFQUNkLFFBQWlCLEVBQ2pCLGNBQXVCO1FBRXZCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUVuQyxPQUFPLFFBQVEsQ0FBQyxZQUFZLENBQzFCLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxFQUNMLEtBQUssRUFDTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFdBQVcsRUFDWCxLQUFLLEVBQ0wsUUFBUSxFQUNSLGNBQWMsQ0FDZixDQUFBO0lBQ0gsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBbEpELElBa0pDO0FBRUQsa0JBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVvc0FwaSBmcm9tICdlb3Nqcy1hcGknXG5pbXBvcnQgb25vIGZyb20gJ0Bqc2RldnRvb2xzL29ubydcblxuaW1wb3J0IHsgUnBjRW5kcG9pbnQsIEJhbGFuY2luZ01vZGUgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHsgUnBjRW5kcG9pbnRzRW1wdHlFcnJvciB9IGZyb20gJy4vZXJyb3JzJ1xuXG5pbnRlcmZhY2UgQmFsYW5jaW5nUmVzdWx0PFQ+IHtcbiAgcmVzdWx0OiBULFxuICBvZmZzZXQ6IG51bWJlcixcbn1cblxuY2xhc3MgUmVhZEFwaSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgYmFsYW5jaW5nTW9kZTogQmFsYW5jaW5nTW9kZVxuICBwcml2YXRlIHJlYWRvbmx5IGFwaXM6IEVvc0FwaVtdXG4gIHByaXZhdGUgcmVhZG9ubHkgZW5kcG9pbnRzOiBzdHJpbmdbXVxuICBwcml2YXRlIG9mZnNldDogbnVtYmVyXG5cbiAgY29uc3RydWN0b3IoY2hhaW5OYW1lOiBzdHJpbmcsIGFwaUNvbmZpZ3M6IFJwY0VuZHBvaW50W10sIGJhbGFuY2luZ01vZGU/OiBCYWxhbmNpbmdNb2RlKSB7XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5iYWxhbmNpbmdNb2RlID0gYmFsYW5jaW5nTW9kZSB8fCAncmFuZG9tLW9uY2UnXG4gICAgdGhpcy5hcGlzID0gW11cbiAgICB0aGlzLmVuZHBvaW50cyA9IFtdXG5cbiAgICBpZiAoIWFwaUNvbmZpZ3MgfHwgYXBpQ29uZmlncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG9ubyhuZXcgUnBjRW5kcG9pbnRzRW1wdHlFcnJvcihgcnBjRW5kcG9pbnRzIGlzIGVtcHR5IChjaGFpbj0ke2NoYWluTmFtZX0pYCkpXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB7IHByb3RvY29sLCBob3N0LCBwb3J0IH0gb2YgYXBpQ29uZmlncykge1xuICAgICAgY29uc3QgcnBjRW5kcG9pbnRTdHJpbmcgPSBgJHtwcm90b2NvbH06Ly8ke2hvc3R9OiR7cG9ydH1gXG4gICAgICB0aGlzLmVuZHBvaW50cy5wdXNoKHJwY0VuZHBvaW50U3RyaW5nKVxuICAgICAgdGhpcy5hcGlzLnB1c2gobmV3IEVvc0FwaSh7IGh0dHBFbmRwb2ludDogcnBjRW5kcG9pbnRTdHJpbmcgfSkpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmFsYW5jaW5nTW9kZSA9PT0gJ3JhbmRvbS1vbmNlJyAmJiB0aGlzLmFwaXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5vZmZzZXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFwaXMubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIGdldEJhbGFuY2VkSXRlbUJ5T2Zmc2V0PFQ+KGN1cnJlbnRPZmZzZXQ6IG51bWJlciwgaXRlbXM6IFRbXSwgYmFsYW5jaW5nTW9kZTogQmFsYW5jaW5nTW9kZSk6IEJhbGFuY2luZ1Jlc3VsdDxUPiB7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdDogaXRlbXNbMF0sXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbmV4dE9mZnNldCA9IGN1cnJlbnRPZmZzZXRcbiAgICBpZiAoYmFsYW5jaW5nTW9kZSA9PT0gJ3JhbmRvbScpIHtcbiAgICAgIG5leHRPZmZzZXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtcy5sZW5ndGgpXG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBpdGVtc1tuZXh0T2Zmc2V0XVxuXG4gICAgaWYgKGJhbGFuY2luZ01vZGUgPT09ICdyb3VuZC1yb2JpbicpIHtcbiAgICAgIG5leHRPZmZzZXQrK1xuXG4gICAgICBpZiAobmV4dE9mZnNldCA+PSBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgbmV4dE9mZnNldCA9IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0OiBpbnN0YW5jZSxcbiAgICAgIG9mZnNldDogbmV4dE9mZnNldCxcbiAgICB9XG4gIH1cblxuICBnZXRCYWxhbmNlZEl0ZW08VD4oY29sbGVjdGlvbjogVFtdKTogVCB7XG4gICAgY29uc3Qge1xuICAgICAgcmVzdWx0LFxuICAgICAgb2Zmc2V0LFxuICAgIH0gPSB0aGlzLmdldEJhbGFuY2VkSXRlbUJ5T2Zmc2V0PFQ+KHRoaXMub2Zmc2V0LCBjb2xsZWN0aW9uLCB0aGlzLmJhbGFuY2luZ01vZGUpXG5cbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldFxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZ2V0SW5zdGFuY2UoKTogRW9zQXBpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCYWxhbmNlZEl0ZW08RW9zQXBpPih0aGlzLmFwaXMpXG4gIH1cblxuICBnZXRFbmRwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEJhbGFuY2VkSXRlbTxzdHJpbmc+KHRoaXMuZW5kcG9pbnRzKVxuICB9XG5cbiAgZ2V0S2V5QWNjb3VudHM6IEVvc0FwaVsnZ2V0S2V5QWNjb3VudHMnXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKClcblxuICAgIHJldHVybiBpbnN0YW5jZS5nZXRLZXlBY2NvdW50cyguLi5hcmdzKVxuICB9XG5cbiAgZ2V0QWNjb3VudDogRW9zQXBpWydnZXRBY2NvdW50J10gPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZSgpXG5cbiAgICByZXR1cm4gaW5zdGFuY2UuZ2V0QWNjb3VudCguLi5hcmdzKVxuICB9XG5cbiAgZ2V0QWJpOiBFb3NBcGlbJ2dldEFiaSddID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoKVxuXG4gICAgcmV0dXJuIGluc3RhbmNlLmdldEFiaSguLi5hcmdzKVxuICB9XG5cbiAgZ2V0Q3VycmVuY3lCYWxhbmNlOiBFb3NBcGlbJ2dldEN1cnJlbmN5QmFsYW5jZSddID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoKVxuXG4gICAgcmV0dXJuIGluc3RhbmNlLmdldEN1cnJlbmN5QmFsYW5jZSguLi5hcmdzKVxuICB9XG5cbiAgYXN5bmMgZ2V0VXNlckJhbGFuY2UoYWNjb3VudDogc3RyaW5nLCBzeW1ib2w6IHN0cmluZykge1xuICAgIGNvbnN0IFtiYWxhbmNlXSA9IGF3YWl0IHRoaXMuZ2V0Q3VycmVuY3lCYWxhbmNlKFwiZW9zaW8udG9rZW5cIiwgYWNjb3VudCwgc3ltYm9sKVxuXG4gICAgcmV0dXJuIGAkeyhwYXJzZUZsb2F0KGJhbGFuY2UgfHwgJzAnKSB8fCAwKS50b0ZpeGVkKDQpfSAke3N5bWJvbH1gXG4gIH1cblxuICBhc3luYyBnZXRQZXJtaXNzaW9uS2V5QnlOYW1lKGFjY291bnROYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCB0aGlzLmdldEFjY291bnQoYWNjb3VudE5hbWUpO1xuICAgIGNvbnN0IHBlcm1pc3Npb24gPSBhY2NvdW50LnBlcm1pc3Npb25zLmZpbmQoZWwgPT4gZWwucGVybV9uYW1lID09PSBuYW1lKVxuXG4gICAgcmV0dXJuIHBlcm1pc3Npb24/LnJlcXVpcmVkX2F1dGgua2V5c1swXS5rZXlcbiAgfVxuXG4gIGFzeW5jIGdldEluZm8oYWNjb3VudE5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IHRoaXMuZ2V0QWNjb3VudChhY2NvdW50TmFtZSk7XG4gICAgY29uc3QgcGVybWlzc2lvbiA9IGFjY291bnQucGVybWlzc2lvbnMuZmluZChlbCA9PiBlbC5wZXJtX25hbWUgPT09IG5hbWUpXG5cbiAgICByZXR1cm4gcGVybWlzc2lvbj8ucmVxdWlyZWRfYXV0aC5rZXlzWzBdLmtleVxuICB9XG5cblxuICBnZXRUYWJsZVJvd3M8Um93VHlwZT4oXG4gICAgY29kZTogc3RyaW5nLFxuICAgIHNjb3BlOiBzdHJpbmcsXG4gICAgdGFibGU6IHN0cmluZyxcbiAgICB0YWJsZV9rZXk/OiBzdHJpbmcsXG4gICAgbG93ZXJfYm91bmQ/OiBudW1iZXIgfCBzdHJpbmcsXG4gICAgdXBwZXJfYm91bmQ/OiBudW1iZXIgfCBzdHJpbmcsXG4gICAgbGltaXQ/OiBudW1iZXIsXG4gICAga2V5X3R5cGU/OiBzdHJpbmcsXG4gICAgaW5kZXhfcG9zaXRpb24/OiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKClcblxuICAgIHJldHVybiBpbnN0YW5jZS5nZXRUYWJsZVJvd3M8Um93VHlwZT4oXG4gICAgICB0cnVlLFxuICAgICAgY29kZSxcbiAgICAgIHNjb3BlLFxuICAgICAgdGFibGUsXG4gICAgICB0YWJsZV9rZXksXG4gICAgICBsb3dlcl9ib3VuZCxcbiAgICAgIHVwcGVyX2JvdW5kLFxuICAgICAgbGltaXQsXG4gICAgICBrZXlfdHlwZSxcbiAgICAgIGluZGV4X3Bvc2l0aW9uXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWRBcGlcbiJdfQ==