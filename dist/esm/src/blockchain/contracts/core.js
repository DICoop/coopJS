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
var CoreContract = /** @class */ (function (_super) {
    __extends(CoreContract, _super);
    function CoreContract(api, tableCodeConfig) {
        return _super.call(this, api, tableCodeConfig, 'core') || this;
    }
    CoreContract.prototype.getUserPower = function (username, hostname) {
        return __awaiter(this, void 0, void 0, function () {
            var powerData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleTableRow({
                            table: 'power3',
                            scope: hostname,
                            lower_bound: username,
                            upper_bound: username,
                            limit: 1,
                        })];
                    case 1:
                        powerData = _a.sent();
                        return [2 /*return*/, powerData || {
                                delegated: 0,
                                frozen: 0,
                                power: 0,
                                staked: 0,
                                username: username,
                                with_badges: 0,
                            }];
                }
            });
        });
    };
    CoreContract.prototype.getMarket = function (host, userPower) {
        return __awaiter(this, void 0, void 0, function () {
            var market, price1, price2, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleTableRow({
                            table: 'powermarket',
                            scope: host.username,
                            lower_bound: 0,
                            limit: 1,
                        })];
                    case 1:
                        market = _a.sent();
                        market.liquid = host.total_shares - Number(market.base.balance.split(' ')[0]);
                        if (market.liquid === 0) {
                            market.liquid = 1;
                        }
                        price1 = Number(market.quote.balance.split(' ')[0]);
                        price2 = Number(market.base.balance.split(' ')[0]);
                        market.price = {
                            buy: (price1 / price2).toFixed(host.quote_precision),
                            sell: (price1 / price2).toFixed(host.quote_precision),
                        };
                        market.stake = (userPower.power / market.liquid * 100).toFixed(3) || '0';
                        res = Math.max(userPower.power * price1 / (price2 + userPower.power), 0);
                        if (res) {
                            market.if_user_sell_all = res.toFixed(4);
                        }
                        return [2 /*return*/, market];
                }
            });
        });
    };
    CoreContract.prototype.getReports = function (username) {
        return this.getTableRows({
            table: 'reports3',
            scope: 'core',
            lower_bound: username,
            upper_bound: username,
            limit: 100,
            index_position: 4,
            key_type: 'i64',
            getAllRows: true,
        }).then(function (result) { return result.rows; });
    };
    CoreContract.prototype.getTasksRaw = function () {
        return this.getTableRows({
            table: 'tasks',
            scope: 'core',
            lower_bound: 0,
            limit: 100,
            getAllRows: true,
            parseMetaAsJson: true,
        }).then(function (result) { return result.rows; });
    };
    CoreContract.prototype.getBadgesRaw = function () {
        return this.getTableRows({
            table: 'badges',
            scope: 'core',
            lower_bound: 0,
            limit: 100,
            getAllRows: true,
        }).then(function (result) { return result.rows; });
    };
    CoreContract.prototype.getTasks = function (username, reports) {
        return __awaiter(this, void 0, void 0, function () {
            var tasks, badges, result, _loop_1, _i, tasks_1, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTasksRaw()];
                    case 1:
                        tasks = _a.sent();
                        return [4 /*yield*/, this.getBadgesRaw()];
                    case 2:
                        badges = _a.sent();
                        result = [];
                        _loop_1 = function (task) {
                            if (task.validated !== 1) {
                                return "continue";
                            }
                            var taskReports = reports.filter(function (report) { return report.task_id === task.task_id; });
                            var userReports = taskReports.filter(function (report) { return report.username === username; });
                            if (userReports.length > 0) {
                                return "continue";
                            }
                            var no_reports_on_check = taskReports.every(function (report) { return !report.need_check && report.approved; });
                            var badge = task.with_badge ? badges.find(function (b) { return task.badge_id == b.id; }) : undefined;
                            var taskResult = __assign(__assign({}, task), { no_reports_on_check: no_reports_on_check, has_report: false, report_approved: false, badge: badge, reports: taskReports, user_reports: userReports });
                            result.push(taskResult);
                        };
                        for (_i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                            task = tasks_1[_i];
                            _loop_1(task);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CoreContract.prototype.getHost = function (hostname) {
        return this.getSingleTableRow({
            scope: hostname,
            table: 'hosts',
            lower_bound: 0
        });
    };
    return CoreContract;
}(BaseContract));
export default CoreContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3NyYy9ibG9ja2NoYWluL2NvbnRyYWN0cy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxZQUFZLE1BQU0sUUFBUSxDQUFBO0FBMkxqQztJQUEyQixnQ0FBWTtJQUNyQyxzQkFBWSxHQUFZLEVBQUUsZUFBZ0M7ZUFDeEQsa0JBQU0sR0FBRyxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUM7SUFDckMsQ0FBQztJQUVLLG1DQUFZLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsUUFBZ0I7Ozs7OzRCQUNYLHFCQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBZ0I7NEJBQ2xGLEtBQUssRUFBRSxRQUFROzRCQUNmLEtBQUssRUFBRSxRQUFROzRCQUNmLFdBQVcsRUFBRSxRQUFROzRCQUNyQixXQUFXLEVBQUUsUUFBUTs0QkFDckIsS0FBSyxFQUFFLENBQUM7eUJBQ1QsQ0FBQyxFQUFBOzt3QkFOSSxTQUFTLEdBQXlCLFNBTXRDO3dCQUVGLHNCQUFPLFNBQVMsSUFBSTtnQ0FDbEIsU0FBUyxFQUFFLENBQUM7Z0NBQ1osTUFBTSxFQUFFLENBQUM7Z0NBQ1QsS0FBSyxFQUFFLENBQUM7Z0NBQ1IsTUFBTSxFQUFFLENBQUM7Z0NBQ1QsUUFBUSxVQUFBO2dDQUNSLFdBQVcsRUFBRSxDQUFDOzZCQUNmLEVBQUE7Ozs7S0FDRjtJQUVLLGdDQUFTLEdBQWYsVUFBZ0IsSUFBYyxFQUFFLFNBQXdCOzs7Ozs0QkFDdkMscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFhOzRCQUN0RCxLQUFLLEVBQUUsYUFBYTs0QkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFROzRCQUNwQixXQUFXLEVBQUUsQ0FBQzs0QkFDZCxLQUFLLEVBQUUsQ0FBQzt5QkFDVCxDQUFD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VSxFQUFFLEtBQUssRUFDakIsZUFBZSxFQUFFLEtBQUssRUFDdEIsS0FBSyxPQUFBLEVBQ0wsT0FBTyxFQUFFLFdBQVcsRUFDcEIsWUFBWSxFQUFFLFdBQVcsR0FDMUIsQ0FBQTs0QkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBOzt3QkExQnpCLFdBQXdCLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSzs0QkFBYixJQUFJO29DQUFKLElBQUk7eUJBMkJkO3dCQUVELHNCQUFPLE1BQU0sRUFBQTs7OztLQUNkO0lBRUQsOEJBQU8sR0FBUCxVQUFRLFFBQWdCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFXO1lBQ3RDLEtBQUssRUFBRSxRQUFRO1lBQ2YsS0FBSyxFQUFFLE9BQU87WUFDZCxXQUFXLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUF0SUQsQ0FBMkIsWUFBWSxHQXNJdEM7QUFFRCxlQUFlLFlBQVksQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFkQXBpIGZyb20gJy4uL3JlYWRBcGknXG5pbXBvcnQge1RhYmxlQ29kZUNvbmZpZ30gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgQmFzZUNvbnRyYWN0IGZyb20gJy4vYmFzZSdcblxuaW50ZXJmYWNlIFVzZXJQb3dlckRhdGEge1xuICBkZWxlZ2F0ZWQ6IG51bWJlclxuICBmcm96ZW46IG51bWJlclxuICBwb3dlcjogbnVtYmVyXG4gIHN0YWtlZDogbnVtYmVyXG4gIHVzZXJuYW1lOiBzdHJpbmdcbiAgd2l0aF9iYWRnZXM6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTWFya2V0QmFsYW5jZSB7XG4gIGJhbGFuY2U6IHN0cmluZ1xuICB3ZWlnaHQ6IHN0cmluZ1xuICBjb250cmFjdDogc3RyaW5nXG59XG5cbmludGVyZmFjZSBNYXJrZXRQcmljZSB7XG4gIGJ1eTogc3RyaW5nXG4gIHNlbGw6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgTWFya2V0RGF0YSB7XG4gIGJhc2U6IE1hcmtldEJhbGFuY2VcbiAgaWQ6IG51bWJlclxuICBuYW1lOiBzdHJpbmdcbiAgcXVvdGU6IE1hcmtldEJhbGFuY2VcbiAgc3VwcGx5OiBzdHJpbmdcbiAgdmVzdGluZ19zZWNvbmRzOiBudW1iZXJcbiAgbGlxdWlkOiBudW1iZXIgLy8gZ2VuZXJhdGVkIHByb3BlcnR5XG4gIHByaWNlOiBNYXJrZXRQcmljZSAvLyBnZW5lcmF0ZWQgcHJvcGVydHlcbiAgc3Rha2U6IHN0cmluZyAvLyBnZW5lcmF0ZWQgcHJvcGVydHlcbiAgaWZfdXNlcl9zZWxsX2FsbD86IHN0cmluZyAvLyBnZW5lcmF0ZWQgcHJvcGVydHlcbn1cblxuaW50ZXJmYWNlIFJlcG9ydERhdGEge1xuICBhcHByb3ZlZDogbnVtYmVyXG4gIGJhbGFuY2U6IHN0cmluZ1xuICBjb21tZW50OiBzdHJpbmdcbiAgY291bnQ6IG51bWJlclxuICBjcmVhdGVkX2F0OiBzdHJpbmdcbiAgY3VyYXRvcjogc3RyaW5nXG4gIGRhdGE6IHN0cmluZ1xuICBkaXN0cmlidXRlZDogbnVtYmVyXG4gIGV4cGlyZWRfYXQ6IHN0cmluZ1xuICBnb2FsX2lkOiBzdHJpbmdcbiAgbmVlZF9jaGVjazogbnVtYmVyXG4gIHJlcG9ydF9pZDogbnVtYmVyXG4gIHJlcXVlc3RlZDogc3RyaW5nXG4gIHN0YXR1czogc3RyaW5nXG4gIHRhc2tfaWQ6IHN0cmluZ1xuICB0b3RhbF92b3RlczogbnVtYmVyXG4gIHR5cGU6IG51bWJlclxuICB1c2VybmFtZTogc3RyaW5nXG4gIHZvdGVyczogYW55W11cbn1cblxuaW50ZXJmYWNlIFRhc2tEYXRhIHtcbiAgYWN0aXZlOiBudW1iZXJcbiAgYmFkZ2VfaWQ6IG51bWJlclxuICBiYXRjaDogYW55W11cbiAgYmVuZWZhY3Rvcjogc3RyaW5nXG4gIGNhbGVuZGFyOiBhbnlbXVxuICBjb21wbGV0ZWQ6IG51bWJlclxuICBjcmVhdGVkX2F0OiBzdHJpbmdcbiAgY3JlYXRvcjogc3RyaW5nXG4gIGN1cmF0b3I6IHN0cmluZ1xuICBkYXRhOiBzdHJpbmdcbiAgZG9lcjogc3RyaW5nXG4gIGR1cmF0aW9uOiBudW1iZXJcbiAgZXhwaXJlZF9hdDogc3RyaW5nXG4gIGZvcl9lYWNoOiBzdHJpbmdcbiAgZnVuZGVkOiBzdHJpbmdcbiAgZ2lmdGVkX2JhZGdlczogbnVtYmVyXG4gIGdpZnRlZF9wb3dlcjogbnVtYmVyXG4gIGdvYWxfaWQ6IHN0cmluZ1xuICBob3N0OiBzdHJpbmdcbiAgaXNfYmF0Y2g6IG51bWJlclxuICBpc19lbmNyeXB0ZWQ6IG51bWJlclxuICBpc19wdWJsaWM6IG51bWJlclxuICBpc19yZWd1bGFyOiBudW1iZXJcbiAgbGV2ZWw6IG51bWJlclxuICBtZXRhOiBhbnlcbiAgcGFyZW50X2JhdGNoX2lkOiBudW1iZXJcbiAgcGVybWxpbms6IHN0cmluZ1xuICBwcmlvcml0eTogbnVtYmVyXG4gIHB1YmxpY19rZXk6IHN0cmluZ1xuICByZW1haW46IHN0cmluZ1xuICByZXBvcnRzX2NvdW50OiBudW1iZXJcbiAgcmVxdWVzdGVkOiBzdHJpbmdcbiAgcm9sZTogc3RyaW5nXG4gIHN0YXJ0X2F0OiBzdHJpbmdcbiAgc3RhdHVzOiBzdHJpbmdcbiAgc3VnZ2VzdGVyOiBzdHJpbmdcbiAgdGFza19pZDogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgdG90YWxfdm90ZXM6IG51bWJlclxuICB0eXBlOiBzdHJpbmdcbiAgdmFsaWRhdGVkOiBudW1iZXJcbiAgdm90ZXJzOiBhbnlbXVxuICB3aXRoX2JhZGdlOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIEJhZGdlRGF0YSB7XG4gIGNhcHRpb246IHN0cmluZ1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIGlkOiBudW1iZXJcbiAgaXVybDogc3RyaW5nXG4gIHBpYzogc3RyaW5nXG4gIHBvd2VyOiBudW1iZXJcbiAgcmVtYWluOiBudW1iZXJcbiAgdG90YWw6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgVGFza0RhdGFSZXN1bHQgZXh0ZW5kcyBUYXNrRGF0YSB7XG4gIHJlcG9ydHM6IFJlcG9ydERhdGFbXVxuICB1c2VyX3JlcG9ydHM6IFJlcG9ydERhdGFbXVxuICBub19yZXBvcnRzX29uX2NoZWNrOiBib29sZWFuXG4gIGhhc19yZXBvcnQ6IGJvb2xlYW5cbiAgcmVwb3J0X2FwcHJvdmVkOiBib29sZWFuXG4gIGJhZGdlPzogQmFkZ2VEYXRhXG59XG5cblxuaW50ZXJmYWNlIEhvc3REYXRhIHtcbiAgYWNoaWV2ZWRfZ29hbHM6IG51bWJlclxuICBhY3RpdmF0ZWQ6IG51bWJlclxuICBhaG9zdDogc3RyaW5nXG4gIGFwcHJvdmVkX3JlcG9ydHM6IG51bWJlclxuICBhcmNoaXRlY3Q6IHN0cmluZ1xuICBhc3NldF9vbl9zYWxlOiBzdHJpbmdcbiAgYXNzZXRfb25fc2FsZV9wcmVjaXNpb246IG51bWJlclxuICBhc3NldF9vbl9zYWxlX3N5bWJvbDogc3RyaW5nXG4gIGNmdW5kX3BlcmNlbnQ6IG51bWJlclxuICBjaGF0X21vZGU6IHN0cmluZ1xuICBjaG9zdHM6IGFueVtdXG4gIGNvbXBsZXRlZF90YXNrczogbnVtYmVyXG4gIGNvbnNlbnN1c19wZXJjZW50OiBudW1iZXJcbiAgY3VycmVudF9jeWNsZV9udW06IG51bWJlclxuICBjdXJyZW50X3Bvb2xfaWQ6IG51bWJlclxuICBjdXJyZW50X3Bvb2xfbnVtOiBudW1iZXJcbiAgY3ljbGVfc3RhcnRfaWQ6IG51bWJlclxuICBkYWNfbW9kZTogbnVtYmVyXG4gIGRhY3NfcGVyY2VudDogbnVtYmVyXG4gIGRpcmVjdF9nb2FsX3dpdGhkcmF3OiBudW1iZXJcbiAgZmhvc3RzOiBhbnlbXVxuICBmaG9zdHNfbW9kZTogbnVtYmVyXG4gIGdzcG9uc29yX21vZGVsOiBhbnlbXVxuICBoZnVuZF9wZXJjZW50OiBudW1iZXJcbiAgaG9wZXJhdG9yOiBzdHJpbmdcbiAgbGV2ZWxzOiBudW1iZXJbXVxuICBtZXRhOiBzdHJpbmdcbiAgbmVlZF9zd2l0Y2g6IG51bWJlclxuICBub25fYWN0aXZlX2Nob3N0OiBudW1iZXJcbiAgcGFyYW1ldGVyc19zZXR0ZWQ6IG51bWJlclxuICBwYXllZDogbnVtYmVyXG4gIHBvd2VyX21hcmtldF9pZDogc3RyaW5nXG4gIHByZWNpc2lvbjogbnVtYmVyXG4gIHByaW9yaXR5X2ZsYWc6IG51bWJlclxuICBwdXJwb3NlOiBzdHJpbmdcbiAgcXVvdGVfYW1vdW50OiBzdHJpbmdcbiAgcXVvdGVfcHJlY2lzaW9uOiBudW1iZXJcbiAgcXVvdGVfc3ltYm9sOiBzdHJpbmdcbiAgcXVvdGVfdG9rZW5fY29udHJhY3Q6IHN0cmluZ1xuICByZWZlcnJhbF9wZXJjZW50OiBudW1iZXJcbiAgcmVnaXN0ZXJlZF9hdDogc3RyaW5nXG4gIHJvb3RfdG9rZW46IHN0cmluZ1xuICByb290X3Rva2VuX2NvbnRyYWN0OiBzdHJpbmdcbiAgc2FsZV9pc19lbmFibGVkOiBudW1iZXJcbiAgc2FsZV9tb2RlOiBzdHJpbmdcbiAgc2FsZV9zaGlmdDogbnVtYmVyXG4gIHNhbGVfdG9rZW5fY29udHJhY3Q6IHN0cmluZ1xuICBzeW1ib2w6IHN0cmluZ1xuICBzeXNfcGVyY2VudDogbnVtYmVyXG4gIHRpdGxlOiBzdHJpbmdcbiAgdG9fcGF5OiBzdHJpbmdcbiAgdG90YWxfZGFjc193ZWlnaHQ6IG51bWJlclxuICB0b3RhbF9nb2FsczogbnVtYmVyXG4gIHRvdGFsX3JlcG9ydHM6IG51bWJlclxuICB0b3RhbF9zaGFyZXM6IG51bWJlclxuICB0b3RhbF90YXNrczogbnVtYmVyXG4gIHR5cGU6IHN0cmluZ1xuICB1c2VybmFtZTogc3RyaW5nXG4gIHZvdGluZ19vbmx5X3VwOiBudW1iZXJcbn1cblxuXG5jbGFzcyBDb3JlQ29udHJhY3QgZXh0ZW5kcyBCYXNlQ29udHJhY3Qge1xuICBjb25zdHJ1Y3RvcihhcGk6IFJlYWRBcGksIHRhYmxlQ29kZUNvbmZpZzogVGFibGVDb2RlQ29uZmlnKSB7XG4gICAgc3VwZXIoYXBpLCB0YWJsZUNvZGVDb25maWcsICdjb3JlJylcbiAgfVxuXG4gIGFzeW5jIGdldFVzZXJQb3dlcih1c2VybmFtZTogc3RyaW5nLCBob3N0bmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcG93ZXJEYXRhOiBVc2VyUG93ZXJEYXRhIHwgbnVsbCA9IGF3YWl0IHRoaXMuZ2V0U2luZ2xlVGFibGVSb3c8VXNlclBvd2VyRGF0YT4oe1xuICAgICAgdGFibGU6ICdwb3dlcjMnLFxuICAgICAgc2NvcGU6IGhvc3RuYW1lLFxuICAgICAgbG93ZXJfYm91bmQ6IHVzZXJuYW1lLFxuICAgICAgdXBwZXJfYm91bmQ6IHVzZXJuYW1lLFxuICAgICAgbGltaXQ6IDEsXG4gICAgfSlcblxuICAgIHJldHVybiBwb3dlckRhdGEgfHwge1xuICAgICAgZGVsZWdhdGVkOiAwLFxuICAgICAgZnJvemVuOiAwLFxuICAgICAgcG93ZXI6IDAsXG4gICAgICBzdGFrZWQ6IDAsXG4gICAgICB1c2VybmFtZSxcbiAgICAgIHdpdGhfYmFkZ2VzOiAwLFxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldE1hcmtldChob3N0OiBIb3N0RGF0YSwgdXNlclBvd2VyOiBVc2VyUG93ZXJEYXRhKSB7XG4gICAgY29uc3QgbWFya2V0ID0gYXdhaXQgdGhpcy5nZXRTaW5nbGVUYWJsZVJvdzxNYXJrZXREYXRhPih7XG4gICAgICB0YWJsZTogJ3Bvd2VybWFya2V0JyxcbiAgICAgIHNjb3BlOiBob3N0LnVzZXJuYW1lLFxuICAgICAgbG93ZXJfYm91bmQ6IDAsXG4gICAgICBsaW1pdDogMSxcbiAgICB9KVxuXG4gICAgbWFya2V0LmxpcXVpZCA9IGhvc3QudG90YWxfc2hhcmVzIC0gTnVtYmVyKG1hcmtldC5iYXNlLmJhbGFuY2Uuc3BsaXQoJyAnKVswXSlcbiAgICBpZiAobWFya2V0LmxpcXVpZCA9PT0gMCkge1xuICAgICAgbWFya2V0LmxpcXVpZCA9IDFcbiAgICB9XG5cbiAgICBjb25zdCBwcmljZTEgPSBOdW1iZXIobWFya2V0LnF1b3RlLmJhbGFuY2Uuc3BsaXQoJyAnKVswXSlcbiAgICBjb25zdCBwcmljZTIgPSBOdW1iZXIobWFya2V0LmJhc2UuYmFsYW5jZS5zcGxpdCgnICcpWzBdKVxuXG4gICAgbWFya2V0LnByaWNlID0ge1xuICAgICAgYnV5OiAocHJpY2UxIC8gcHJpY2UyKS50b0ZpeGVkKGhvc3QucXVvdGVfcHJlY2lzaW9uKSxcbiAgICAgIHNlbGw6IChwcmljZTEgLyBwcmljZTIpLnRvRml4ZWQoaG9zdC5xdW90ZV9wcmVjaXNpb24pLFxuICAgIH1cblxuICAgIG1hcmtldC5zdGFrZSA9ICh1c2VyUG93ZXIucG93ZXIgLyBtYXJrZXQubGlxdWlkICogMTAwKS50b0ZpeGVkKDMpIHx8ICcwJ1xuXG4gICAgY29uc3QgcmVzID0gTWF0aC5tYXgodXNlclBvd2VyLnBvd2VyICogcHJpY2UxIC8gKCBwcmljZTIgKyB1c2VyUG93ZXIucG93ZXIpLCAwKVxuICAgIGlmIChyZXMpIHtcbiAgICAgIG1hcmtldC5pZl91c2VyX3NlbGxfYWxsID0gcmVzLnRvRml4ZWQoNClcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2V0XG4gIH1cblxuICBnZXRSZXBvcnRzKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUYWJsZVJvd3M8UmVwb3J0RGF0YT4oe1xuICAgICAgdGFibGU6ICdyZXBvcnRzMycsXG4gICAgICBzY29wZTogJ2NvcmUnLFxuICAgICAgbG93ZXJfYm91bmQ6IHVzZXJuYW1lLFxuICAgICAgdXBwZXJfYm91bmQ6IHVzZXJuYW1lLFxuICAgICAgbGltaXQ6IDEwMCxcbiAgICAgIGluZGV4X3Bvc2l0aW9uOiA0LFxuICAgICAga2V5X3R5cGU6ICdpNjQnLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQucm93cylcbiAgfVxuXG4gIGdldFRhc2tzUmF3KCkge1xuICAgIHJldHVybiB0aGlzLmdldFRhYmxlUm93czxUYXNrRGF0YT4oe1xuICAgICAgdGFibGU6ICd0YXNrcycsXG4gICAgICBzY29wZTogJ2NvcmUnLFxuICAgICAgbG93ZXJfYm91bmQ6IDAsXG4gICAgICBsaW1pdDogMTAwLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICAgIHBhcnNlTWV0YUFzSnNvbjogdHJ1ZSxcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQucm93cylcbiAgfVxuXG4gIGdldEJhZGdlc1JhdygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUYWJsZVJvd3M8QmFkZ2VEYXRhPih7XG4gICAgICB0YWJsZTogJ2JhZGdlcycsXG4gICAgICBzY29wZTogJ2NvcmUnLFxuICAgICAgbG93ZXJfYm91bmQ6IDAsXG4gICAgICBsaW1pdDogMTAwLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQucm93cylcbiAgfVxuXG4gIGFzeW5jIGdldFRhc2tzKHVzZXJuYW1lOiBzdHJpbmcsIHJlcG9ydHM6IFJlcG9ydERhdGFbXSkge1xuICAgIGNvbnN0IHRhc2tzID0gYXdhaXQgdGhpcy5nZXRUYXNrc1JhdygpXG4gICAgY29uc3QgYmFkZ2VzID0gYXdhaXQgdGhpcy5nZXRCYWRnZXNSYXcoKVxuXG4gICAgY29uc3QgcmVzdWx0OiBUYXNrRGF0YVJlc3VsdFtdID0gW11cblxuICAgIGZvciAoY29uc3QgdGFzayBvZiB0YXNrcykge1xuICAgICAgaWYgKHRhc2sudmFsaWRhdGVkICE9PSAxKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhc2tSZXBvcnRzID0gcmVwb3J0cy5maWx0ZXIocmVwb3J0ID0+IHJlcG9ydC50YXNrX2lkID09PSB0YXNrLnRhc2tfaWQpXG4gICAgICBjb25zdCB1c2VyUmVwb3J0cyA9IHRhc2tSZXBvcnRzLmZpbHRlcihyZXBvcnQgPT4gcmVwb3J0LnVzZXJuYW1lID09PSB1c2VybmFtZSlcblxuICAgICAgaWYgKHVzZXJSZXBvcnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9fcmVwb3J0c19vbl9jaGVjayA9IHRhc2tSZXBvcnRzLmV2ZXJ5KHJlcG9ydCA9PiAhcmVwb3J0Lm5lZWRfY2hlY2sgJiYgcmVwb3J0LmFwcHJvdmVkKVxuXG4gICAgICBjb25zdCBiYWRnZSA9IHRhc2sud2l0aF9iYWRnZSA/IGJhZGdlcy5maW5kKGI9PiB0YXNrLmJhZGdlX2lkID09IGIuaWQpIDogdW5kZWZpbmVkXG5cbiAgICAgIGNvbnN0IHRhc2tSZXN1bHQ6IFRhc2tEYXRhUmVzdWx0ID0ge1xuICAgICAgICAuLi50YXNrLFxuICAgICAgICBub19yZXBvcnRzX29uX2NoZWNrLFxuICAgICAgICBoYXNfcmVwb3J0OiBmYWxzZSxcbiAgICAgICAgcmVwb3J0X2FwcHJvdmVkOiBmYWxzZSxcbiAgICAgICAgYmFkZ2UsXG4gICAgICAgIHJlcG9ydHM6IHRhc2tSZXBvcnRzLFxuICAgICAgICB1c2VyX3JlcG9ydHM6IHVzZXJSZXBvcnRzLFxuICAgICAgfVxuXG4gICAgICByZXN1bHQucHVzaCh0YXNrUmVzdWx0KVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGdldEhvc3QoaG9zdG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmdldFNpbmdsZVRhYmxlUm93PEhvc3REYXRhPih7XG4gICAgICBzY29wZTogaG9zdG5hbWUsXG4gICAgICB0YWJsZTogJ2hvc3RzJyxcbiAgICAgIGxvd2VyX2JvdW5kOiAwXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb3JlQ29udHJhY3RcbiJdfQ==