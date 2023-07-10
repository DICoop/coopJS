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
import EosApi from 'eosjs-api';
import ono from '@jsdevtools/ono';
import { RpcEndpointsEmptyError } from './errors';
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
            throw ono(new RpcEndpointsEmptyError("rpcEndpoints is empty (chain=".concat(chainName, ")")));
        }
        for (var _i = 0, apiConfigs_1 = apiConfigs; _i < apiConfigs_1.length; _i++) {
            var _a = apiConfigs_1[_i], protocol = _a.protocol, host = _a.host, port = _a.port;
            var rpcEndpointString = "".concat(protocol, "://").concat(host, ":").concat(port);
            this.endpoints.push(rpcEndpointString);
            this.apis.push(new EosApi({ httpEndpoint: rpcEndpointString }));
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
export default ReadApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RzL3NyYy9ibG9ja2NoYWluL3JlYWRBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBQzlCLE9BQU8sR0FBRyxNQUFNLGlCQUFpQixDQUFBO0FBR2pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQU9qRDtJQU1FLGlCQUFZLFNBQWlCLEVBQUUsVUFBeUIsRUFBRSxhQUE2QjtRQUF2RixpQkFtQkM7UUFrREQsbUJBQWMsR0FBNkI7WUFBQyxjQUFPO2lCQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87Z0JBQVAseUJBQU87O1lBQ2pELElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUVuQyxPQUFPLFFBQVEsQ0FBQyxjQUFjLE9BQXZCLFFBQVEsRUFBbUIsSUFBSSxFQUFDO1FBQ3pDLENBQUMsQ0FBQTtRQUVELGVBQVUsR0FBeUI7WUFBQyxjQUFPO2lCQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87Z0JBQVAseUJBQU87O1lBQ3pDLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUVuQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLE9BQW5CLFFBQVEsRUFBZSxJQUFJLEVBQUM7UUFDckMsQ0FBQyxDQUFBO1FBRUQsdUJBQWtCLEdBQWlDO1lBQUMsY0FBTztpQkFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO2dCQUFQLHlCQUFPOztZQUN6RCxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFbkMsT0FBTyxRQUFRLENBQUMsa0JBQWtCLE9BQTNCLFFBQVEsRUFBdUIsSUFBSSxFQUFDO1FBQzdDLENBQUMsQ0FBQTtRQXBGQyxJQUFJ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VUFDRSxJQUFZLEVBQ1osS0FBYSxFQUNiLEtBQWEsRUFDYixTQUFrQixFQUNsQixXQUE2QixFQUM3QixXQUE2QixFQUM3QixLQUFjLEVBQ2QsUUFBaUIsRUFDakIsY0FBdUI7UUFFdkIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBRW5DLE9BQU8sUUFBUSxDQUFDLFlBQVksQ0FDMUIsSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1IsY0FBYyxDQUNmLENBQUE7SUFDSCxDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUE1SUQsSUE0SUM7QUFFRCxlQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFb3NBcGkgZnJvbSAnZW9zanMtYXBpJ1xuaW1wb3J0IG9ubyBmcm9tICdAanNkZXZ0b29scy9vbm8nXG5cbmltcG9ydCB7IFJwY0VuZHBvaW50LCBCYWxhbmNpbmdNb2RlIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7IFJwY0VuZHBvaW50c0VtcHR5RXJyb3IgfSBmcm9tICcuL2Vycm9ycydcblxuaW50ZXJmYWNlIEJhbGFuY2luZ1Jlc3VsdDxUPiB7XG4gIHJlc3VsdDogVCxcbiAgb2Zmc2V0OiBudW1iZXIsXG59XG5cbmNsYXNzIFJlYWRBcGkge1xuICBwcml2YXRlIHJlYWRvbmx5IGJhbGFuY2luZ01vZGU6IEJhbGFuY2luZ01vZGVcbiAgcHJpdmF0ZSByZWFkb25seSBhcGlzOiBFb3NBcGlbXVxuICBwcml2YXRlIHJlYWRvbmx5IGVuZHBvaW50czogc3RyaW5nW11cbiAgcHJpdmF0ZSBvZmZzZXQ6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKGNoYWluTmFtZTogc3RyaW5nLCBhcGlDb25maWdzOiBScGNFbmRwb2ludFtdLCBiYWxhbmNpbmdNb2RlPzogQmFsYW5jaW5nTW9kZSkge1xuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMuYmFsYW5jaW5nTW9kZSA9IGJhbGFuY2luZ01vZGUgfHwgJ3JhbmRvbS1vbmNlJ1xuICAgIHRoaXMuYXBpcyA9IFtdXG4gICAgdGhpcy5lbmRwb2ludHMgPSBbXVxuXG4gICAgaWYgKCFhcGlDb25maWdzIHx8IGFwaUNvbmZpZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBvbm8obmV3IFJwY0VuZHBvaW50c0VtcHR5RXJyb3IoYHJwY0VuZHBvaW50cyBpcyBlbXB0eSAoY2hhaW49JHtjaGFpbk5hbWV9KWApKVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgeyBwcm90b2NvbCwgaG9zdCwgcG9ydCB9IG9mIGFwaUNvbmZpZ3MpIHtcbiAgICAgIGNvbnN0IHJwY0VuZHBvaW50U3RyaW5nID0gYCR7cHJvdG9jb2x9Oi8vJHtob3N0fToke3BvcnR9YFxuICAgICAgdGhpcy5lbmRwb2ludHMucHVzaChycGNFbmRwb2ludFN0cmluZylcbiAgICAgIHRoaXMuYXBpcy5wdXNoKG5ldyBFb3NBcGkoeyBodHRwRW5kcG9pbnQ6IHJwY0VuZHBvaW50U3RyaW5nIH0pKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmJhbGFuY2luZ01vZGUgPT09ICdyYW5kb20tb25jZScgJiYgdGhpcy5hcGlzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5hcGlzLmxlbmd0aClcbiAgICB9XG4gIH1cblxuICBnZXRCYWxhbmNlZEl0ZW1CeU9mZnNldDxUPihjdXJyZW50T2Zmc2V0OiBudW1iZXIsIGl0ZW1zOiBUW10sIGJhbGFuY2luZ01vZGU6IEJhbGFuY2luZ01vZGUpOiBCYWxhbmNpbmdSZXN1bHQ8VD4ge1xuICAgIGlmIChpdGVtcy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHQ6IGl0ZW1zWzBdLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG5leHRPZmZzZXQgPSBjdXJyZW50T2Zmc2V0XG4gICAgaWYgKGJhbGFuY2luZ01vZGUgPT09ICdyYW5kb20nKSB7XG4gICAgICBuZXh0T2Zmc2V0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaXRlbXMubGVuZ3RoKVxuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gaXRlbXNbbmV4dE9mZnNldF1cblxuICAgIGlmIChiYWxhbmNpbmdNb2RlID09PSAncm91bmQtcm9iaW4nKSB7XG4gICAgICBuZXh0T2Zmc2V0KytcblxuICAgICAgaWYgKG5leHRPZmZzZXQgPj0gaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIG5leHRPZmZzZXQgPSAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3VsdDogaW5zdGFuY2UsXG4gICAgICBvZmZzZXQ6IG5leHRPZmZzZXQsXG4gICAgfVxuICB9XG5cbiAgZ2V0QmFsYW5jZWRJdGVtPFQ+KGNvbGxlY3Rpb246IFRbXSk6IFQge1xuICAgIGNvbnN0IHtcbiAgICAgIHJlc3VsdCxcbiAgICAgIG9mZnNldCxcbiAgICB9ID0gdGhpcy5nZXRCYWxhbmNlZEl0ZW1CeU9mZnNldDxUPih0aGlzLm9mZnNldCwgY29sbGVjdGlvbiwgdGhpcy5iYWxhbmNpbmdNb2RlKVxuXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXRcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGdldEluc3RhbmNlKCk6IEVvc0FwaSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QmFsYW5jZWRJdGVtPEVvc0FwaT4odGhpcy5hcGlzKVxuICB9XG5cbiAgZ2V0RW5kcG9pbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCYWxhbmNlZEl0ZW08c3RyaW5nPih0aGlzLmVuZHBvaW50cylcbiAgfVxuXG4gIGdldEtleUFjY291bnRzOiBFb3NBcGlbJ2dldEtleUFjY291bnRzJ10gPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZSgpXG5cbiAgICByZXR1cm4gaW5zdGFuY2UuZ2V0S2V5QWNjb3VudHMoLi4uYXJncylcbiAgfVxuXG4gIGdldEFjY291bnQ6IEVvc0FwaVsnZ2V0QWNjb3VudCddID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoKVxuXG4gICAgcmV0dXJuIGluc3RhbmNlLmdldEFjY291bnQoLi4uYXJncylcbiAgfVxuXG4gIGdldEN1cnJlbmN5QmFsYW5jZTogRW9zQXBpWydnZXRDdXJyZW5jeUJhbGFuY2UnXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKClcblxuICAgIHJldHVybiBpbnN0YW5jZS5nZXRDdXJyZW5jeUJhbGFuY2UoLi4uYXJncylcbiAgfVxuXG4gIGFzeW5jIGdldFVzZXJCYWxhbmNlKGFjY291bnQ6IHN0cmluZywgc3ltYm9sOiBzdHJpbmcpIHtcbiAgICBjb25zdCBbYmFsYW5jZV0gPSBhd2FpdCB0aGlzLmdldEN1cnJlbmN5QmFsYW5jZShcImVvc2lvLnRva2VuXCIsIGFjY291bnQsIHN5bWJvbClcblxuICAgIHJldHVybiBgJHsocGFyc2VGbG9hdChiYWxhbmNlIHx8ICcwJykgfHwgMCkudG9GaXhlZCg0KX0gJHtzeW1ib2x9YFxuICB9XG5cbiAgYXN5bmMgZ2V0UGVybWlzc2lvbktleUJ5TmFtZShhY2NvdW50TmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgdGhpcy5nZXRBY2NvdW50KGFjY291bnROYW1lKTtcbiAgICBjb25zdCBwZXJtaXNzaW9uID0gYWNjb3VudC5wZXJtaXNzaW9ucy5maW5kKGVsID0+IGVsLnBlcm1fbmFtZSA9PT0gbmFtZSlcblxuICAgIHJldHVybiBwZXJtaXNzaW9uPy5yZXF1aXJlZF9hdXRoLmtleXNbMF0ua2V5XG4gIH1cblxuICBhc3luYyBnZXRJbmZvKGFjY291bnROYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCB0aGlzLmdldEFjY291bnQoYWNjb3VudE5hbWUpO1xuICAgIGNvbnN0IHBlcm1pc3Npb24gPSBhY2NvdW50LnBlcm1pc3Npb25zLmZpbmQoZWwgPT4gZWwucGVybV9uYW1lID09PSBuYW1lKVxuXG4gICAgcmV0dXJuIHBlcm1pc3Npb24/LnJlcXVpcmVkX2F1dGgua2V5c1swXS5rZXlcbiAgfVxuXG5cbiAgZ2V0VGFibGVSb3dzPFJvd1R5cGU+KFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICBzY29wZTogc3RyaW5nLFxuICAgIHRhYmxlOiBzdHJpbmcsXG4gICAgdGFibGVfa2V5Pzogc3RyaW5nLFxuICAgIGxvd2VyX2JvdW5kPzogbnVtYmVyIHwgc3RyaW5nLFxuICAgIHVwcGVyX2JvdW5kPzogbnVtYmVyIHwgc3RyaW5nLFxuICAgIGxpbWl0PzogbnVtYmVyLFxuICAgIGtleV90eXBlPzogc3RyaW5nLFxuICAgIGluZGV4X3Bvc2l0aW9uPzogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZSgpXG5cbiAgICByZXR1cm4gaW5zdGFuY2UuZ2V0VGFibGVSb3dzPFJvd1R5cGU+KFxuICAgICAgdHJ1ZSxcbiAgICAgIGNvZGUsXG4gICAgICBzY29wZSxcbiAgICAgIHRhYmxlLFxuICAgICAgdGFibGVfa2V5LFxuICAgICAgbG93ZXJfYm91bmQsXG4gICAgICB1cHBlcl9ib3VuZCxcbiAgICAgIGxpbWl0LFxuICAgICAga2V5X3R5cGUsXG4gICAgICBpbmRleF9wb3NpdGlvblxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWFkQXBpXG4iXX0=