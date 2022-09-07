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
class P2PContract extends BaseContract {
    constructor(api, tableCodeConfig) {
        super(api, tableCodeConfig, 'p2p');
    }
    getOrders(username, parent_id, order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = {
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
            const { rows } = yield this.getTableRows(q);
            return rows.map(row => {
                const res = Object.assign({}, row);
                try {
                    res.details = JSON.parse(res.details);
                    res.root_remain_float = parseFloat(res.root_remain);
                }
                catch (e) {
                    res.details = { address: res.details };
                }
                return res;
            });
        });
    }
    getOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [order] = yield this.getOrders(undefined, undefined, order_id);
            return order;
        });
    }
    getUSDRates() {
        return this.getTableRows({
            table: 'usdrates',
            lower_bound: 0,
            limit: 100,
            getAllRows: true,
        }).then(result => result.rows);
    }
    getRateFromRates(rates, symbol, precision) {
        const filter = `${(0).toFixed(precision)} ${symbol}`;
        const rate = rates.find(el => el.out_asset === filter);
        return rate ? rate.rate : '0';
    }
    getUsdRate(symbol, precision) {
        return __awaiter(this, void 0, void 0, function* () {
            const rates = yield this.getUSDRates();
            return this.getRateFromRates(rates, symbol, precision);
        });
    }
}
export default P2PContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicDJwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vY29udHJhY3RzL3AycC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxPQUFPLFlBQTZCLE1BQU0sUUFBUSxDQUFBO0FBa0RsRCxNQUFNLFdBQVksU0FBUSxZQUFZO0lBQ3BDLFlBQVksR0FBWSxFQUFFLGVBQWdDO1FBQ3hELEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3BDLENBQUM7SUFFSyxTQUFTLENBQUMsUUFBaUIsRUFBRSxTQUEyQixFQUFFLFFBQTBCOztZQUN4RixNQUFNLENBQUMsR0FBa0I7Z0JBQ3ZCLEtBQUssRUFBRSxRQUFRO2dCQUNmLFdBQVcsRUFBRSxDQUFDO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLFVBQVUsRUFBRSxJQUFJO2FBQ2pCLENBQUE7WUFDRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsRUFBRTtnQkFDbkMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUE7Z0JBQ3hCLENBQUMsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFBO2dCQUN4QixDQUFDLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQTtnQkFDcEIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7YUFDbkI7aUJBQU0sSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLEVBQUU7Z0JBQzNDLENBQUMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFBO2dCQUN6QixDQUFDLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQTtnQkFDekIsQ0FBQyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUE7Z0JBQ3BCLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO2FBQ25CO2lCQUFNLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxFQUFFO2dCQUMxQyxDQUFDLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQTtnQkFDeEIsQ0FBQyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUE7YUFDekI7WUFFRCxNQUFNLEVBQUMsSUFBSSxFQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFhLENBQUMsQ0FBQyxDQUFBO1lBRXJELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEIsTUFBTSxHQUFHLHFCQUFPLEdBQUcsQ0FBQyxDQUFBO2dCQUVwQixJQUFJO29CQUNGLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7b0JBQ3JDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2lCQUNwRDtnQkFBQyxPQUFNLENBQUMsRUFBQztvQkFDUixHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUMsQ0FBQTtpQkFDckM7Z0JBRUQsT0FBTyxHQUFHLENBQUE7WUFDWixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxRQUFnQjs7WUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBRXBFLE9BQU8sS0FBSyxDQUFBO1FBQ2QsQ0FBQztLQUFBO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBZTtZQUNyQyxLQUFLLEVBQUUsVUFBVTtZQUNqQixXQUFXLEVBQUUsQ0FBQztZQUNkLEtBQUssRUFBRSxHQUFHO1lBQ1YsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBcUIsRUFBRSxNQUFjLEVBQUUsU0FBaUI7UUFDdkUsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQTtRQUVwRCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQTtRQUV0RCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO0lBQy9CLENBQUM7SUFFSyxVQUFVLENBQUMsTUFBYyxFQUFFLFNBQWlCOztZQUNoRCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUV0QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQ3hELENBQUM7S0FBQTtDQUNGO0FBRUQsZUFBZSxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhZEFwaSBmcm9tICcuLi9yZWFkQXBpJ1xuaW1wb3J0IHsgVGFibGVDb2RlQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgQmFzZUNvbnRyYWN0LCB7VGFibGVSb3dzQXJnc30gZnJvbSAnLi9iYXNlJ1xuXG5pbnRlcmZhY2UgT3JkZXJzRGF0YSB7XG4gIGNyZWF0ZWRfYXQ6IHN0cmluZ1xuICBjcmVhdG9yOiBzdHJpbmdcbiAgY3VyYXRvcjogc3RyaW5nXG4gIGRldGFpbHM6IGFueVxuICBleHBpcmVkX2F0OiBzdHJpbmdcbiAgaWQ6IG51bWJlclxuICBvdXRfY29tcGxldGVkOiBzdHJpbmdcbiAgb3V0X2NvbnRyYWN0OiBzdHJpbmdcbiAgb3V0X2N1cnJlbmN5X2NvZGU6IG51bWJlclxuICBvdXRfbG9ja2VkOiBzdHJpbmdcbiAgb3V0X3ByZWNpc2lvbjogbnVtYmVyXG4gIG91dF9xdWFudGl0eTogc3RyaW5nXG4gIG91dF9yYXRlOiBzdHJpbmdcbiAgb3V0X3JlbWFpbjogc3RyaW5nXG4gIG91dF9zeW1ib2w6IHN0cmluZ1xuICBvdXRfdHlwZTogc3RyaW5nXG4gIHBhcmVudF9jcmVhdG9yOiBzdHJpbmdcbiAgcGFyZW50X2lkOiBudW1iZXJcbiAgcXVvdGVfY29tcGxldGVkOiBzdHJpbmdcbiAgcXVvdGVfY29udHJhY3Q6IHN0cmluZ1xuICBxdW90ZV9sb2NrZWQ6IHN0cmluZ1xuICBxdW90ZV9wcmVjaXNpb246IG51bWJlclxuICBxdW90ZV9xdWFudGl0eTogc3RyaW5nXG4gIHF1b3RlX3JhdGU6IHN0cmluZ1xuICBxdW90ZV9yZW1haW46IHN0cmluZ1xuICBxdW90ZV9zeW1ib2w6IHN0cmluZ1xuICBxdW90ZV90eXBlOiBzdHJpbmdcbiAgcm9vdF9jb21wbGV0ZWQ6IHN0cmluZ1xuICByb290X2NvbnRyYWN0OiBzdHJpbmdcbiAgcm9vdF9sb2NrZWQ6IHN0cmluZ1xuICByb290X3ByZWNpc2lvbjogbnVtYmVyXG4gIHJvb3RfcXVhbnRpdHk6IHN0cmluZ1xuICByb290X3JlbWFpbjogc3RyaW5nXG4gIHJvb3RfcmVtYWluX2Zsb2F0PzogbnVtYmVyXG4gIHJvb3Rfc3ltYm9sOiBzdHJpbmdcbiAgc3RhdHVzOiBzdHJpbmdcbiAgdHlwZTogc3RyaW5nXG59XG5cbmludGVyZmFjZSBVc2RSYXRlc0RhdGEge1xuICBpZDogbnVtYmVyXG4gIG91dF9hc3NldDogc3RyaW5nXG4gIG91dF9jb250cmFjdDogc3RyaW5nXG4gIHJhdGU6IHN0cmluZ1xuICB1cGRhdGVkX2F0OiBzdHJpbmdcbn1cblxuY2xhc3MgUDJQQ29udHJhY3QgZXh0ZW5kcyBCYXNlQ29udHJhY3Qge1xuICBjb25zdHJ1Y3RvcihhcGk6IFJlYWRBcGksIHRhYmxlQ29kZUNvbmZpZzogVGFibGVDb2RlQ29uZmlnKSB7XG4gICAgc3VwZXIoYXBpLCB0YWJsZUNvZGVDb25maWcsICdwMnAnKVxuICB9XG5cbiAgYXN5bmMgZ2V0T3JkZXJzKHVzZXJuYW1lPzogc3RyaW5nLCBwYXJlbnRfaWQ/OiBudW1iZXIgfCBzdHJpbmcsIG9yZGVyX2lkPzogbnVtYmVyIHwgc3RyaW5nKTogUHJvbWlzZTxPcmRlcnNEYXRhW10+IHtcbiAgICBjb25zdCBxOiBUYWJsZVJvd3NBcmdzID0ge1xuICAgICAgdGFibGU6ICdvcmRlcnMnLFxuICAgICAgbG93ZXJfYm91bmQ6IDAsXG4gICAgICBsaW1pdDogMTAwLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB1c2VybmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHEubG93ZXJfYm91bmQgPSB1c2VybmFtZVxuICAgICAgcS51cHBlcl9ib3VuZCA9IHVzZXJuYW1lXG4gICAgICBxLmluZGV4X3Bvc2l0aW9uID0gNVxuICAgICAgcS5rZXlfdHlwZSA9ICdpNjQnXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyZW50X2lkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcS5sb3dlcl9ib3VuZCA9IHBhcmVudF9pZFxuICAgICAgcS51cHBlcl9ib3VuZCA9IHBhcmVudF9pZFxuICAgICAgcS5pbmRleF9wb3NpdGlvbiA9IDNcbiAgICAgIHEua2V5X3R5cGUgPSAnaTY0J1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9yZGVyX2lkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcS5sb3dlcl9ib3VuZCA9IG9yZGVyX2lkXG4gICAgICBxLnVwcGVyX2JvdW5kID0gb3JkZXJfaWRcbiAgICB9XG5cbiAgICBjb25zdCB7cm93c30gPSBhd2FpdCB0aGlzLmdldFRhYmxlUm93czxPcmRlcnNEYXRhPihxKVxuXG4gICAgcmV0dXJuIHJvd3MubWFwKHJvdyA9PiB7XG4gICAgICBjb25zdCByZXMgPSB7Li4ucm93fVxuXG4gICAgICB0cnkge1xuICAgICAgICByZXMuZGV0YWlscyA9IEpTT04ucGFyc2UocmVzLmRldGFpbHMpXG4gICAgICAgIHJlcy5yb290X3JlbWFpbl9mbG9hdCA9IHBhcnNlRmxvYXQocmVzLnJvb3RfcmVtYWluKVxuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgcmVzLmRldGFpbHMgPSB7YWRkcmVzczogcmVzLmRldGFpbHN9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNcbiAgICB9KVxuICB9XG5cbiAgYXN5bmMgZ2V0T3JkZXIob3JkZXJfaWQ6IG51bWJlcikge1xuICAgIGNvbnN0IFtvcmRlcl0gPSBhd2FpdCB0aGlzLmdldE9yZGVycyh1bmRlZmluZWQsIHVuZGVmaW5lZCwgb3JkZXJfaWQpXG5cbiAgICByZXR1cm4gb3JkZXJcbiAgfVxuXG4gIGdldFVTRFJhdGVzKCkge1xuICAgIHJldHVybiB0aGlzLmdldFRhYmxlUm93czxVc2RSYXRlc0RhdGE+KHtcbiAgICAgIHRhYmxlOiAndXNkcmF0ZXMnLFxuICAgICAgbG93ZXJfYm91bmQ6IDAsXG4gICAgICBsaW1pdDogMTAwLFxuICAgICAgZ2V0QWxsUm93czogdHJ1ZSxcbiAgICB9KS50aGVuKHJlc3VsdCA9PiByZXN1bHQucm93cylcbiAgfVxuXG4gIGdldFJhdGVGcm9tUmF0ZXMocmF0ZXM6IFVzZFJhdGVzRGF0YVtdLCBzeW1ib2w6IHN0cmluZywgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBgJHsoMCkudG9GaXhlZChwcmVjaXNpb24pfSAke3N5bWJvbH1gXG5cbiAgICBjb25zdCByYXRlID0gcmF0ZXMuZmluZChlbCA9PiBlbC5vdXRfYXNzZXQgPT09IGZpbHRlcilcblxuICAgIHJldHVybiByYXRlID8gcmF0ZS5yYXRlIDogJzAnXG4gIH1cblxuICBhc3luYyBnZXRVc2RSYXRlKHN5bWJvbDogc3RyaW5nLCBwcmVjaXNpb246IG51bWJlcikge1xuICAgIGNvbnN0IHJhdGVzID0gYXdhaXQgdGhpcy5nZXRVU0RSYXRlcygpXG5cbiAgICByZXR1cm4gdGhpcy5nZXRSYXRlRnJvbVJhdGVzKHJhdGVzLCBzeW1ib2wsIHByZWNpc2lvbilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQMlBDb250cmFjdFxuIl19