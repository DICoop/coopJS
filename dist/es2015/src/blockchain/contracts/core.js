var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BaseContract from './base';
class CoreContract extends BaseContract {
    constructor(api, tableCodeConfig) {
        super(api, tableCodeConfig, 'core');
    }
    getUserPower(username, hostname) {
        return __awaiter(this, void 0, void 0, function* () {
            const powerData = yield this.getSingleTableRow({
                table: 'power3',
                scope: hostname,
                lower_bound: username,
                upper_bound: username,
                limit: 1,
            });
            return powerData || {
                delegated: 0,
                frozen: 0,
                power: 0,
                staked: 0,
                username,
                with_badges: 0,
            };
        });
    }
    getMarket(host, userPower) {
        return __awaiter(this, void 0, void 0, function* () {
            const market = yield this.getSingleTableRow({
                table: 'powermarket',
                scope: host.username,
                lower_bound: 0,
                limit: 1,
            });
            market.liquid = host.total_shares - Number(market.base.balance.split(' ')[0]);
            if (market.liquid === 0) {
                market.liquid = 1;
            }
            const price1 = Number(market.quote.balance.split(' ')[0]);
            const price2 = Number(market.base.balance.split(' ')[0]);
            market.price = {
                buy: (price1 / price2).toFixed(host.quote_precision),
                sell: (price1 / price2).toFixed(host.quote_precision),
            };
            market.stake = (userPower.power / market.liquid * 100).toFixed(3) || '0';
            const res = Math.max(userPower.power * price1 / (price2 + userPower.power), 0);
            if (res) {
                market.if_user_sell_all = res.toFixed(4);
            }
            return market;
        });
    }
    getReports(username) {
        return this.getTableRows({
            table: 'reports3',
            scope: 'core',
            lower_bound: username,
            upper_bound: username,
            limit: 100,
            index_position: 4,
            key_type: 'i64',
            getAllRows: true,
        }).then(result => result.rows);
    }
    getTasksRaw() {
        return this.getTableRows({
            table: 'tasks',
            scope: 'core',
            lower_bound: 0,
            limit: 100,
            getAllRows: true,
            parseMetaAsJson: true,
        }).then(result => result.rows);
    }
    getBadgesRaw() {
        return this.getTableRows({
            table: 'badges',
            scope: 'core',
            lower_bound: 0,
            limit: 100,
            getAllRows: true,
        }).then(result => result.rows);
    }
    getTasks(username, reports) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.getTasksRaw();
            const badges = yield this.getBadgesRaw();
            const result = [];
            for (const task of tasks) {
                if (task.validated !== 1) {
                    continue;
                }
                const taskReports = reports.filter(report => report.task_id === task.task_id);
                const userReports = taskReports.filter(report => report.username === username);
                if (userReports.length > 0) {
                    continue;
                }
                const no_reports_on_check = taskReports.every(report => !report.need_check && report.approved);
                const badge = task.with_badge ? badges.find(b => task.badge_id == b.id) : undefined;
                const taskResult = Object.assign(Object.assign({}, task), { no_reports_on_check, has_report: false, report_approved: false, badge, reports: taskReports, user_reports: userReports });
                result.push(taskResult);
            }
            return result;
        });
    }
    getHost(hostname) {
        return this.getSingleTableRow({
            scope: hostname,
            table: 'hosts',
            lower_bound: 0
        });
    }
}
export default CoreContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RzL3NyYy9ibG9ja2NoYWluL2NvbnRyYWN0cy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sWUFBWSxNQUFNLFFBQVEsQ0FBQTtBQTJMakMsTUFBTSxZQUFhLFNBQVEsWUFBWTtJQUNyQyxZQUFZLEdBQVksRUFBRSxlQUFnQztRQUN4RCxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBRUssWUFBWSxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7O1lBQ25ELE1BQU0sU0FBUyxHQUF5QixNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBZ0I7Z0JBQ2xGLEtBQUssRUFBRSxRQUFRO2dCQUNmLEtBQUssRUFBRSxRQUFRO2dCQUNmLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDLENBQUE7WUFFRixPQUFPLFNBQVMsSUFBSTtnQkFDbEIsU0FBUyxFQUFFLENBQUM7Z0JBQ1osTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsUUFBUTtnQkFDUixXQUFXLEVBQUUsQ0FBQzthQUNmLENBQUE7UUFDSCxDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsSUFBYyxFQUFFLFNBQXdCOztZQUN0RCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBYTtnQkFDdEQsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDcEIsV0FBVyxFQUFFLENBQUM7Z0JBQ2QsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDLENBQUE7WUFFRixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzdFLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO2FBQ2xCO1lBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3pELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUV4RCxNQUFNLENBQUMsS0FBSyxHQUFHO2dCQUNiLEdBQUcsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDcEQsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQ3RELENBQUE7WUFFRCxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUE7WUFFeEUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxDQUFFLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDL0UsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsTUFBTSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDekM7WUFFRCxPQUFPLE1BQU0sQ0FBQTtRQUNmLENBQUM7S0FBQTtJQUVELFVBQVUsQ0FBQyxRQUFnQjtRQUN6QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQWE7WUFDbkMsS0FBSyxFQUFFLFVBQVU7WUFDakIsS0FBSyxFQUFFLE1BQU07WUFDYixXQUFXLEVBQUUsUUFBUTtZQUNyQixXQUFXLEVBQUUsUUFBUTtZQUNyQixLQUFLLEVBQUUsR0FBRztZQUNWLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBVztZQUNqQyxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxNQUFNO1lBQ2IsV0FBVyxFQUFFLENBQUM7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxZQUFZLENBQVk7WUFDbEMsS0FBSyxFQUFFLFFBQVE7WUFDZixLQUFLLEVBQUUsTUFBTTtZQUNiLFdBQVcsRUFBRSxDQUFDO1lBQ2QsS0FBSyxFQUFFLEdBQUc7WUFDVixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFSyxRQUFRLENBQUMsUUFBZ0IsRUFBRSxPQUFxQjs7WUFDcEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDdEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7WUFFeEMsTUFBTSxNQUFNLEdBQXFCLEVBQUUsQ0FBQTtZQUVuQyxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsRUFBRTtvQkFDeEIsU0FBUTtpQkFDVDtnQkFFRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzdFLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFBO2dCQUU5RSxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMxQixTQUFRO2lCQUNUO2dCQUVELE1BQU0sbUJBQW1CLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBRTlGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO2dCQUVsRixNQUFNLFVBQVUsbUNBQ1gsSUFBSSxLQUNQLG1CQUFtQixFQUNuQixVQUFVLEVBQUUsS0FBSyxFQUNqQixlQUFlLEVBQUUsS0FBSyxFQUN0QixLQUFLLEVBQ0wsT0FBTyxFQUFFLFdBQVcsRUFDcEIsWUFBWSxFQUFFLFdBQVcsR0FDMUIsQ0FBQTtnQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2FBQ3hCO1lBRUQsT0FBTyxNQUFNLENBQUE7UUFDZixDQUFDO0tBQUE7SUFFRCxPQUFPLENBQUMsUUFBZ0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQVc7WUFDdEMsS0FBSyxFQUFFLFFBQVE7WUFDZixLQUFLLEVBQUUsT0FBTztZQUNkLFdBQVcsRUFBRSxDQUFDO1NBQ2YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBRUQsZUFBZSxZQUFZLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhZEFwaSBmcm9tICcuLi9yZWFkQXBpJ1xuaW1wb3J0IHtUYWJsZUNvZGVDb25maWd9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IEJhc2VDb250cmFjdCBmcm9tICcuL2Jhc2UnXG5cbmludGVyZmFjZSBVc2VyUG93ZXJEYXRhIHtcbiAgZGVsZWdhdGVkOiBudW1iZXJcbiAgZnJvemVuOiBudW1iZXJcbiAgcG93ZXI6IG51bWJlclxuICBzdGFrZWQ6IG51bWJlclxuICB1c2VybmFtZTogc3RyaW5nXG4gIHdpdGhfYmFkZ2VzOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIE1hcmtldEJhbGFuY2Uge1xuICBiYWxhbmNlOiBzdHJpbmdcbiAgd2VpZ2h0OiBzdHJpbmdcbiAgY29udHJhY3Q6IHN0cmluZ1xufVxuXG5pbnRlcmZhY2UgTWFya2V0UHJpY2Uge1xuICBidXk6IHN0cmluZ1xuICBzZWxsOiBzdHJpbmdcbn1cblxuaW50ZXJmYWNlIE1hcmtldERhdGEge1xuICBiYXNlOiBNYXJrZXRCYWxhbmNlXG4gIGlkOiBudW1iZXJcbiAgbmFtZTogc3RyaW5nXG4gIHF1b3RlOiBNYXJrZXRCYWxhbmNlXG4gIHN1cHBseTogc3RyaW5nXG4gIHZlc3Rpbmdfc2Vjb25kczogbnVtYmVyXG4gIGxpcXVpZDogbnVtYmVyIC8vIGdlbmVyYXRlZCBwcm9wZXJ0eVxuICBwcmljZTogTWFya2V0UHJpY2UgLy8gZ2VuZXJhdGVkIHByb3BlcnR5XG4gIHN0YWtlOiBzdHJpbmcgLy8gZ2VuZXJhdGVkIHByb3BlcnR5XG4gIGlmX3VzZXJfc2VsbF9hbGw/OiBzdHJpbmcgLy8gZ2VuZXJhdGVkIHByb3BlcnR5XG59XG5cbmludGVyZmFjZSBSZXBvcnREYXRhIHtcbiAgYXBwcm92ZWQ6IG51bWJlclxuICBiYWxhbmNlOiBzdHJpbmdcbiAgY29tbWVudDogc3RyaW5nXG4gIGNvdW50OiBudW1iZXJcbiAgY3JlYXRlZF9hdDogc3RyaW5nXG4gIGN1cmF0b3I6IHN0cmluZ1xuICBkYXRhOiBzdHJpbmdcbiAgZGlzdHJpYnV0ZWQ6IG51bWJlclxuICBleHBpcmVkX2F0OiBzdHJpbmdcbiAgZ29hbF9pZDogc3RyaW5nXG4gIG5lZWRfY2hlY2s6IG51bWJlclxuICByZXBvcnRfaWQ6IG51bWJlclxuICByZXF1ZXN0ZWQ6IHN0cmluZ1xuICBzdGF0dXM6IHN0cmluZ1xuICB0YXNrX2lkOiBzdHJpbmdcbiAgdG90YWxfdm90ZXM6IG51bWJlclxuICB0eXBlOiBudW1iZXJcbiAgdXNlcm5hbWU6IHN0cmluZ1xuICB2b3RlcnM6IGFueVtdXG59XG5cbmludGVyZmFjZSBUYXNrRGF0YSB7XG4gIGFjdGl2ZTogbnVtYmVyXG4gIGJhZGdlX2lkOiBudW1iZXJcbiAgYmF0Y2g6IGFueVtdXG4gIGJlbmVmYWN0b3I6IHN0cmluZ1xuICBjYWxlbmRhcjogYW55W11cbiAgY29tcGxldGVkOiBudW1iZXJcbiAgY3JlYXRlZF9hdDogc3RyaW5nXG4gIGNyZWF0b3I6IHN0cmluZ1xuICBjdXJhdG9yOiBzdHJpbmdcbiAgZGF0YTogc3RyaW5nXG4gIGRvZXI6IHN0cmluZ1xuICBkdXJhdGlvbjogbnVtYmVyXG4gIGV4cGlyZWRfYXQ6IHN0cmluZ1xuICBmb3JfZWFjaDogc3RyaW5nXG4gIGZ1bmRlZDogc3RyaW5nXG4gIGdpZnRlZF9iYWRnZXM6IG51bWJlclxuICBnaWZ0ZWRfcG93ZXI6IG51bWJlclxuICBnb2FsX2lkOiBzdHJpbmdcbiAgaG9zdDogc3RyaW5nXG4gIGlzX2JhdGNoOiBudW1iZXJcbiAgaXNfZW5jcnlwdGVkOiBudW1iZXJcbiAgaXNfcHVibGljOiBudW1iZXJcbiAgaXNfcmVndWxhcjogbnVtYmVyXG4gIGxldmVsOiBudW1iZXJcbiAgbWV0YTogYW55XG4gIHBhcmVudF9iYXRjaF9pZDogbnVtYmVyXG4gIHBlcm1saW5rOiBzdHJpbmdcbiAgcHJpb3JpdHk6IG51bWJlclxuICBwdWJsaWNfa2V5OiBzdHJpbmdcbiAgcmVtYWluOiBzdHJpbmdcbiAgcmVwb3J0c19jb3VudDogbnVtYmVyXG4gIHJlcXVlc3RlZDogc3RyaW5nXG4gIHJvbGU6IHN0cmluZ1xuICBzdGFydF9hdDogc3RyaW5nXG4gIHN0YXR1czogc3RyaW5nXG4gIHN1Z2dlc3Rlcjogc3RyaW5nXG4gIHRhc2tfaWQ6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIHRvdGFsX3ZvdGVzOiBudW1iZXJcbiAgdHlwZTogc3RyaW5nXG4gIHZhbGlkYXRlZDogbnVtYmVyXG4gIHZvdGVyczogYW55W11cbiAgd2l0aF9iYWRnZTogbnVtYmVyXG59XG5cbmludGVyZmFjZSBCYWRnZURhdGEge1xuICBjYXB0aW9uOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICBpZDogbnVtYmVyXG4gIGl1cmw6IHN0cmluZ1xuICBwaWM6IHN0cmluZ1xuICBwb3dlcjogbnVtYmVyXG4gIHJlbWFpbjogbnVtYmVyXG4gIHRvdGFsOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFRhc2tEYXRhUmVzdWx0IGV4dGVuZHMgVGFza0RhdGEge1xuICByZXBvcnRzOiBSZXBvcnREYXRhW11cbiAgdXNlcl9yZXBvcnRzOiBSZXBvcnREYXRhW11cbiAgbm9fcmVwb3J0c19vbl9jaGVjazogYm9vbGVhblxuICBoYXNfcmVwb3J0OiBib29sZWFuXG4gIHJlcG9ydF9hcHByb3ZlZDogYm9vbGVhblxuICBiYWRnZT86IEJhZGdlRGF0YVxufVxuXG5cbmludGVyZmFjZSBIb3N0RGF0YSB7XG4gIGFjaGlldmVkX2dvYWxzOiBudW1iZXJcbiAgYWN0aXZhdGVkOiBudW1iZXJcbiAgYWhvc3Q6IHN0cmluZ1xuICBhcHByb3ZlZF9yZXBvcnRzOiBudW1iZXJcbiAgYXJjaGl0ZWN0OiBzdHJpbmdcbiAgYXNzZXRfb25fc2FsZTogc3RyaW5nXG4gIGFzc2V0X29uX3NhbGVfcHJlY2lzaW9uOiBudW1iZXJcbiAgYXNzZXRfb25fc2FsZV9zeW1ib2w6IHN0cmluZ1xuICBjZnVuZF9wZXJjZW50OiBudW1iZXJcbiAgY2hhdF9tb2RlOiBzdHJpbmdcbiAgY2hvc3RzOiBhbnlbXVxuICBjb21wbGV0ZWRfdGFza3M6IG51bWJlclxuICBjb25zZW5zdXNfcGVyY2VudDogbnVtYmVyXG4gIGN1cnJlbnRfY3ljbGVfbnVtOiBudW1iZXJcbiAgY3VycmVudF9wb29sX2lkOiBudW1iZXJcbiAgY3VycmVudF9wb29sX251bTogbnVtYmVyXG4gIGN5Y2xlX3N0YXJ0X2lkOiBudW1iZXJcbiAgZGFjX21vZGU6IG51bWJlclxuICBkYWNzX3BlcmNlbnQ6IG51bWJlclxuICBkaXJlY3RfZ29hbF93aXRoZHJhdzogbnVtYmVyXG4gIGZob3N0czogYW55W11cbiAgZmhvc3RzX21vZGU6IG51bWJlclxuICBnc3BvbnNvcl9tb2RlbDogYW55W11cbiAgaGZ1bmRfcGVyY2VudDogbnVtYmVyXG4gIGhvcGVyYXRvcjogc3RyaW5nXG4gIGxldmVsczogbnVtYmVyW11cbiAgbWV0YTogc3RyaW5nXG4gIG5lZWRfc3dpdGNoOiBudW1iZXJcbiAgbm9uX2FjdGl2ZV9jaG9zdDogbnVtYmVyXG4gIHBhcmFtZXRlcnNfc2V0dGVkOiBudW1iZXJcbiAgcGF5ZWQ6IG51bWJlclxuICBwb3dlcl9tYXJrZXRfaWQ6IHN0cmluZ1xuICBwcmVjaXNpb246IG51bWJlclxuICBwcmlvcml0eV9mbGFnOiBudW1iZXJcbiAgcHVycG9zZTogc3RyaW5nXG4gIHF1b3RlX2Ftb3VudDogc3RyaW5nXG4gIHF1b3RlX3ByZWNpc2lvbjogbnVtYmVyXG4gIHF1b3RlX3N5bWJvbDogc3RyaW5nXG4gIHF1b3RlX3Rva2VuX2NvbnRyYWN0OiBzdHJpbmdcbiAgcmVmZXJyYWxfcGVyY2VudDogbnVtYmVyXG4gIHJlZ2lzdGVyZWRfYXQ6IHN0cmluZ1xuICByb290X3Rva2VuOiBzdHJpbmdcbiAgcm9vdF90b2tlbl9jb250cmFjdDogc3RyaW5nXG4gIHNhbGVfaXNfZW5hYmxlZDogbnVtYmVyXG4gIHNhbGVfbW9kZTogc3RyaW5nXG4gIHNhbGVfc2hpZnQ6IG51bWJlclxuICBzYWxlX3Rva2VuX2NvbnRyYWN0OiBzdHJpbmdcbiAgc3ltYm9sOiBzdHJpbmdcbiAgc3lzX3BlcmNlbnQ6IG51bWJlclxuICB0aXRsZTogc3RyaW5nXG4gIHRvX3BheTogc3RyaW5nXG4gIHRvdGFsX2RhY3Nfd2VpZ2h0OiBudW1iZXJcbiAgdG90YWxfZ29hbHM6IG51bWJlclxuICB0b3RhbF9yZXBvcnRzOiBudW1iZXJcbiAgdG90YWxfc2hhcmVzOiBudW1iZXJcbiAgdG90YWxfdGFza3M6IG51bWJlclxuICB0eXBlOiBzdHJpbmdcbiAgdXNlcm5hbWU6IHN0cmluZ1xuICB2b3Rpbmdfb25seV91cDogbnVtYmVyXG59XG5cblxuY2xhc3MgQ29yZUNvbnRyYWN0IGV4dGVuZHMgQmFzZUNvbnRyYWN0IHtcbiAgY29uc3RydWN0b3IoYXBpOiBSZWFkQXBpLCB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZykge1xuICAgIHN1cGVyKGFwaSwgdGFibGVDb2RlQ29uZmlnLCAnY29yZScpXG4gIH1cblxuICBhc3luYyBnZXRVc2VyUG93ZXIodXNlcm5hbWU6IHN0cmluZywgaG9zdG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBvd2VyRGF0YTogVXNlclBvd2VyRGF0YSB8IG51bGwgPSBhd2FpdCB0aGlzLmdldFNpbmdsZVRhYmxlUm93PFVzZXJQb3dlckRhdGE+KHtcbiAgICAgIHRhYmxlOiAncG93ZXIzJyxcbiAgICAgIHNjb3BlOiBob3N0bmFtZSxcbiAgICAgIGxvd2VyX2JvdW5kOiB1c2VybmFtZSxcbiAgICAgIHVwcGVyX2JvdW5kOiB1c2VybmFtZSxcbiAgICAgIGxpbWl0OiAxLFxuICAgIH0pXG5cbiAgICByZXR1cm4gcG93ZXJEYXRhIHx8IHtcbiAgICAgIGRlbGVnYXRlZDogMCxcbiAgICAgIGZyb3plbjogMCxcbiAgICAgIHBvd2VyOiAwLFxuICAgICAgc3Rha2VkOiAwLFxuICAgICAgdXNlcm5hbWUsXG4gICAgICB3aXRoX2JhZGdlczogMCxcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRNYXJrZXQoaG9zdDogSG9zdERhdGEsIHVzZXJQb3dlcjogVXNlclBvd2VyRGF0YSkge1xuICAgIGNvbnN0IG1hcmtldCA9IGF3YWl0IHRoaXMuZ2V0U2luZ2xlVGFibGVSb3c8TWFya2V0RGF0YT4oe1xuICAgICAgdGFibGU6ICdwb3dlcm1hcmtldCcsXG4gICAgICBzY29wZTogaG9zdC51c2VybmFtZSxcbiAgICAgIGxvd2VyX2JvdW5kOiAwLFxuICAgICAgbGltaXQ6IDEsXG4gICAgfSlcblxuICAgIG1hcmtldC5saXF1aWQgPSBob3N0LnRvdGFsX3NoYXJlcyAtIE51bWJlcihtYXJrZXQuYmFzZS5iYWxhbmNlLnNwbGl0KCcgJylbMF0pXG4gICAgaWYgKG1hcmtldC5saXF1aWQgPT09IDApIHtcbiAgICAgIG1hcmtldC5saXF1aWQgPSAxXG4gICAgfVxuXG4gICAgY29uc3QgcHJpY2UxID0gTnVtYmVyKG1hcmtldC5xdW90ZS5iYWxhbmNlLnNwbGl0KCcgJylbMF0pXG4gICAgY29uc3QgcHJpY2UyID0gTnVtYmVyKG1hcmtldC5iYXNlLmJhbGFuY2Uuc3BsaXQoJyAnKVswXSlcblxuICAgIG1hcmtldC5wcmljZSA9IHtcbiAgICAgIGJ1eTogKHByaWNlMSAvIHByaWNlMikudG9GaXhlZChob3N0LnF1b3RlX3ByZWNpc2lvbiksXG4gICAgICBzZWxsOiAocHJpY2UxIC8gcHJpY2UyKS50b0ZpeGVkKGhvc3QucXVvdGVfcHJlY2lzaW9uKSxcbiAgICB9XG5cbiAgICBtYXJrZXQuc3Rha2UgPSAodXNlclBvd2VyLnBvd2VyIC8gbWFya2V0LmxpcXVpZCAqIDEwMCkudG9GaXhlZCgzKSB8fCAnMCdcblxuICAgIGNvbnN0IHJlcyA9IE1hdGgubWF4KHVzZXJQb3dlci5wb3dlciAqIHByaWNlMSAvICggcHJpY2UyICsgdXNlclBvd2VyLnBvd2VyKSwgMClcbiAgICBpZiAocmVzKSB7XG4gICAgICBtYXJrZXQuaWZfdXNlcl9zZWxsX2FsbCA9IHJlcy50b0ZpeGVkKDQpXG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtldFxuICB9XG5cbiAgZ2V0UmVwb3J0cyh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGFibGVSb3dzPFJlcG9ydERhdGE+KHtcbiAgICAgIHRhYmxlOiAncmVwb3J0czMnLFxuICAgICAgc2NvcGU6ICdjb3JlJyxcbiAgICAgIGxvd2VyX2JvdW5kOiB1c2VybmFtZSxcbiAgICAgIHVwcGVyX2JvdW5kOiB1c2VybmFtZSxcbiAgICAgIGxpbWl0OiAxMDAsXG4gICAgICBpbmRleF9wb3NpdGlvbjogNCxcbiAgICAgIGtleV90eXBlOiAnaTY0JyxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0LnJvd3MpXG4gIH1cblxuICBnZXRUYXNrc1JhdygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUYWJsZVJvd3M8VGFza0RhdGE+KHtcbiAgICAgIHRhYmxlOiAndGFza3MnLFxuICAgICAgc2NvcGU6ICdjb3JlJyxcbiAgICAgIGxvd2VyX2JvdW5kOiAwLFxuICAgICAgbGltaXQ6IDEwMCxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgICBwYXJzZU1ldGFBc0pzb246IHRydWUsXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0LnJvd3MpXG4gIH1cblxuICBnZXRCYWRnZXNSYXcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGFibGVSb3dzPEJhZGdlRGF0YT4oe1xuICAgICAgdGFibGU6ICdiYWRnZXMnLFxuICAgICAgc2NvcGU6ICdjb3JlJyxcbiAgICAgIGxvd2VyX2JvdW5kOiAwLFxuICAgICAgbGltaXQ6IDEwMCxcbiAgICAgIGdldEFsbFJvd3M6IHRydWUsXG4gICAgfSkudGhlbihyZXN1bHQgPT4gcmVzdWx0LnJvd3MpXG4gIH1cblxuICBhc3luYyBnZXRUYXNrcyh1c2VybmFtZTogc3RyaW5nLCByZXBvcnRzOiBSZXBvcnREYXRhW10pIHtcbiAgICBjb25zdCB0YXNrcyA9IGF3YWl0IHRoaXMuZ2V0VGFza3NSYXcoKVxuICAgIGNvbnN0IGJhZGdlcyA9IGF3YWl0IHRoaXMuZ2V0QmFkZ2VzUmF3KClcblxuICAgIGNvbnN0IHJlc3VsdDogVGFza0RhdGFSZXN1bHRbXSA9IFtdXG5cbiAgICBmb3IgKGNvbnN0IHRhc2sgb2YgdGFza3MpIHtcbiAgICAgIGlmICh0YXNrLnZhbGlkYXRlZCAhPT0gMSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0YXNrUmVwb3J0cyA9IHJlcG9ydHMuZmlsdGVyKHJlcG9ydCA9PiByZXBvcnQudGFza19pZCA9PT0gdGFzay50YXNrX2lkKVxuICAgICAgY29uc3QgdXNlclJlcG9ydHMgPSB0YXNrUmVwb3J0cy5maWx0ZXIocmVwb3J0ID0+IHJlcG9ydC51c2VybmFtZSA9PT0gdXNlcm5hbWUpXG5cbiAgICAgIGlmICh1c2VyUmVwb3J0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vX3JlcG9ydHNfb25fY2hlY2sgPSB0YXNrUmVwb3J0cy5ldmVyeShyZXBvcnQgPT4gIXJlcG9ydC5uZWVkX2NoZWNrICYmIHJlcG9ydC5hcHByb3ZlZClcblxuICAgICAgY29uc3QgYmFkZ2UgPSB0YXNrLndpdGhfYmFkZ2UgPyBiYWRnZXMuZmluZChiPT4gdGFzay5iYWRnZV9pZCA9PSBiLmlkKSA6IHVuZGVmaW5lZFxuXG4gICAgICBjb25zdCB0YXNrUmVzdWx0OiBUYXNrRGF0YVJlc3VsdCA9IHtcbiAgICAgICAgLi4udGFzayxcbiAgICAgICAgbm9fcmVwb3J0c19vbl9jaGVjayxcbiAgICAgICAgaGFzX3JlcG9ydDogZmFsc2UsXG4gICAgICAgIHJlcG9ydF9hcHByb3ZlZDogZmFsc2UsXG4gICAgICAgIGJhZGdlLFxuICAgICAgICByZXBvcnRzOiB0YXNrUmVwb3J0cyxcbiAgICAgICAgdXNlcl9yZXBvcnRzOiB1c2VyUmVwb3J0cyxcbiAgICAgIH1cblxuICAgICAgcmVzdWx0LnB1c2godGFza1Jlc3VsdClcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBnZXRIb3N0KGhvc3RuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTaW5nbGVUYWJsZVJvdzxIb3N0RGF0YT4oe1xuICAgICAgc2NvcGU6IGhvc3RuYW1lLFxuICAgICAgdGFibGU6ICdob3N0cycsXG4gICAgICBsb3dlcl9ib3VuZDogMFxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29yZUNvbnRyYWN0XG4iXX0=