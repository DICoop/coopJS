"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
class CoreContract extends base_1.default {
    constructor(api, tableCodeConfig) {
        super(api, tableCodeConfig, 'core');
    }
    async getUserPower(username, hostname) {
        const powerData = await this.getSingleTableRow({
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
    }
    async getMarket(host, userPower) {
        const market = await this.getSingleTableRow({
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
    async getTasks(username, reports) {
        const tasks = await this.getTasksRaw();
        const badges = await this.getBadgesRaw();
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
            const taskResult = {
                ...task,
                no_reports_on_check,
                has_report: false,
                report_approved: false,
                badge,
                reports: taskReports,
                user_reports: userReports,
            };
            result.push(taskResult);
        }
        return result;
    }
    getHost(hostname) {
        return this.getSingleTableRow({
            scope: hostname,
            table: 'hosts',
            lower_bound: 0
        });
    }
}
exports.default = CoreContract;
//# sourceMappingURL=core.js.map