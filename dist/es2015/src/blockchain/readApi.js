var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EosApi from 'eosjs-api';
import ono from '@jsdevtools/ono';
import { RpcEndpointsEmptyError } from './errors';
class ReadApi {
    constructor(chainName, apiConfigs, balancingMode) {
        this.getKeyAccounts = (...args) => {
            const instance = this.getInstance();
            return instance.getKeyAccounts(...args);
        };
        this.getAccount = (...args) => {
            const instance = this.getInstance();
            return instance.getAccount(...args);
        };
        this.getCurrencyBalance = (...args) => {
            const instance = this.getInstance();
            return instance.getCurrencyBalance(...args);
        };
        this.offset = 0;
        this.balancingMode = balancingMode || 'random-once';
        this.apis = [];
        this.endpoints = [];
        if (!apiConfigs || apiConfigs.length === 0) {
            throw ono(new RpcEndpointsEmptyError(`rpcEndpoints is empty (chain=${chainName})`));
        }
        for (const { protocol, host, port } of apiConfigs) {
            const rpcEndpointString = `${protocol}://${host}:${port}`;
            this.endpoints.push(rpcEndpointString);
            this.apis.push(new EosApi({ httpEndpoint: rpcEndpointString }));
        }
        if (this.balancingMode === 'random-once' && this.apis.length > 1) {
            this.offset = Math.floor(Math.random() * this.apis.length);
        }
    }
    getBalancedItemByOffset(currentOffset, items, balancingMode) {
        if (items.length < 2) {
            return {
                result: items[0],
                offset: 0,
            };
        }
        let nextOffset = currentOffset;
        if (balancingMode === 'random') {
            nextOffset = Math.floor(Math.random() * items.length);
        }
        const instance = items[nextOffset];
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
    }
    getBalancedItem(collection) {
        const { result, offset, } = this.getBalancedItemByOffset(this.offset, collection, this.balancingMode);
        this.offset = offset;
        return result;
    }
    getInstance() {
        return this.getBalancedItem(this.apis);
    }
    getEndpoint() {
        return this.getBalancedItem(this.endpoints);
    }
    getUserBalance(account, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const [balance] = yield this.getCurrencyBalance("eosio.token", account, symbol);
            return `${(parseFloat(balance || '0') || 0).toFixed(4)} ${symbol}`;
        });
    }
    getPermissionKeyByName(accountName, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.getAccount(accountName);
            const permission = account.permissions.find(el => el.perm_name === name);
            return permission === null || permission === void 0 ? void 0 : permission.required_auth.keys[0].key;
        });
    }
    getInfo(accountName, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.getAccount(accountName);
            const permission = account.permissions.find(el => el.perm_name === name);
            return permission === null || permission === void 0 ? void 0 : permission.required_auth.keys[0].key;
        });
    }
    getTableRows(code, scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position) {
        const instance = this.getInstance();
        return instance.getTableRows(true, code, scope, table, table_key, lower_bound, upper_bound, limit, key_type, index_position);
    }
}
export default ReadApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RzL3NyYy9ibG9ja2NoYWluL3JlYWRBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBQzlCLE9BQU8sR0FBRyxNQUFNLGlCQUFpQixDQUFBO0FBR2pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQU9qRCxNQUFNLE9BQU87SUFNWCxZQUFZLFNBQWlCLEVBQUUsVUFBeUIsRUFBRSxhQUE2QjtRQXFFdkYsbUJBQWMsR0FBNkIsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO1lBQ3JELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUVuQyxPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUN6QyxDQUFDLENBQUE7UUFFRCxlQUFVLEdBQXlCLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFbkMsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDckMsQ0FBQyxDQUFBO1FBRUQsdUJBQWtCLEdBQWlDLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUM3RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFbkMsT0FBTyxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUM3QyxDQUFDLENBQUE7UUFwRkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsSUFBSSxhQUFhLENBQUE7UUFDbkQsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUE7UUFDZCxJQUFJLENBQUMsU0FB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LENBQUM7Q0FDRjtBQUVELGVBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVvc0FwaSBmcm9tICdlb3Nqcy1hcGknXG5pbXBvcnQgb25vIGZyb20gJ0Bqc2RldnRvb2xzL29ubydcblxuaW1wb3J0IHsgUnBjRW5kcG9pbnQsIEJhbGFuY2luZ01vZGUgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHsgUnBjRW5kcG9pbnRzRW1wdHlFcnJvciB9IGZyb20gJy4vZXJyb3JzJ1xuXG5pbnRlcmZhY2UgQmFsYW5jaW5nUmVzdWx0PFQ+IHtcbiAgcmVzdWx0OiBULFxuICBvZmZzZXQ6IG51bWJlcixcbn1cblxuY2xhc3MgUmVhZEFwaSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgYmFsYW5jaW5nTW9kZTogQmFsYW5jaW5nTW9kZVxuICBwcml2YXRlIHJlYWRvbmx5IGFwaXM6IEVvc0FwaVtdXG4gIHByaXZhdGUgcmVhZG9ubHkgZW5kcG9pbnRzOiBzdHJpbmdbXVxuICBwcml2YXRlIG9mZnNldDogbnVtYmVyXG5cbiAgY29uc3RydWN0b3IoY2hhaW5OYW1lOiBzdHJpbmcsIGFwaUNvbmZpZ3M6IFJwY0VuZHBvaW50W10sIGJhbGFuY2luZ01vZGU/OiBCYWxhbmNpbmdNb2RlKSB7XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5iYWxhbmNpbmdNb2RlID0gYmFsYW5jaW5nTW9kZSB8fCAncmFuZG9tLW9uY2UnXG4gICAgdGhpcy5hcGlzID0gW11cbiAgICB0aGlzLmVuZHBvaW50cyA9IFtdXG5cbiAgICBpZiAoIWFwaUNvbmZpZ3MgfHwgYXBpQ29uZmlncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG9ubyhuZXcgUnBjRW5kcG9pbnRzRW1wdHlFcnJvcihgcnBjRW5kcG9pbnRzIGlzIGVtcHR5IChjaGFpbj0ke2NoYWluTmFtZX0pYCkpXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB7IHByb3RvY29sLCBob3N0LCBwb3J0IH0gb2YgYXBpQ29uZmlncykge1xuICAgICAgY29uc3QgcnBjRW5kcG9pbnRTdHJpbmcgPSBgJHtwcm90b2NvbH06Ly8ke2hvc3R9OiR7cG9ydH1gXG4gICAgICB0aGlzLmVuZHBvaW50cy5wdXNoKHJwY0VuZHBvaW50U3RyaW5nKVxuICAgICAgdGhpcy5hcGlzLnB1c2gobmV3IEVvc0FwaSh7IGh0dHBFbmRwb2ludDogcnBjRW5kcG9pbnRTdHJpbmcgfSkpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmFsYW5jaW5nTW9kZSA9PT0gJ3JhbmRvbS1vbmNlJyAmJiB0aGlzLmFwaXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5vZmZzZXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFwaXMubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIGdldEJhbGFuY2VkSXRlbUJ5T2Zmc2V0PFQ+KGN1cnJlbnRPZmZzZXQ6IG51bWJlciwgaXRlbXM6IFRbXSwgYmFsYW5jaW5nTW9kZTogQmFsYW5jaW5nTW9kZSk6IEJhbGFuY2luZ1Jlc3VsdDxUPiB7XG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdDogaXRlbXNbMF0sXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbmV4dE9mZnNldCA9IGN1cnJlbnRPZmZzZXRcbiAgICBpZiAoYmFsYW5jaW5nTW9kZSA9PT0gJ3JhbmRvbScpIHtcbiAgICAgIG5leHRPZmZzZXQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpdGVtcy5sZW5ndGgpXG4gICAgfVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSBpdGVtc1tuZXh0T2Zmc2V0XVxuXG4gICAgaWYgKGJhbGFuY2luZ01vZGUgPT09ICdyb3VuZC1yb2JpbicpIHtcbiAgICAgIG5leHRPZmZzZXQrK1xuXG4gICAgICBpZiAobmV4dE9mZnNldCA+PSBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgbmV4dE9mZnNldCA9IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdWx0OiBpbnN0YW5jZSxcbiAgICAgIG9mZnNldDogbmV4dE9mZnNldCxcbiAgICB9XG4gIH1cblxuICBnZXRCYWxhbmNlZEl0ZW08VD4oY29sbGVjdGlvbjogVFtdKTogVCB7XG4gICAgY29uc3Qge1xuICAgICAgcmVzdWx0LFxuICAgICAgb2Zmc2V0LFxuICAgIH0gPSB0aGlzLmdldEJhbGFuY2VkSXRlbUJ5T2Zmc2V0PFQ+KHRoaXMub2Zmc2V0LCBjb2xsZWN0aW9uLCB0aGlzLmJhbGFuY2luZ01vZGUpXG5cbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldFxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZ2V0SW5zdGFuY2UoKTogRW9zQXBpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCYWxhbmNlZEl0ZW08RW9zQXBpPih0aGlzLmFwaXMpXG4gIH1cblxuICBnZXRFbmRwb2ludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmdldEJhbGFuY2VkSXRlbTxzdHJpbmc+KHRoaXMuZW5kcG9pbnRzKVxuICB9XG5cbiAgZ2V0S2V5QWNjb3VudHM6IEVvc0FwaVsnZ2V0S2V5QWNjb3VudHMnXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKClcblxuICAgIHJldHVybiBpbnN0YW5jZS5nZXRLZXlBY2NvdW50cyguLi5hcmdzKVxuICB9XG5cbiAgZ2V0QWNjb3VudDogRW9zQXBpWydnZXRBY2NvdW50J10gPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZSgpXG5cbiAgICByZXR1cm4gaW5zdGFuY2UuZ2V0QWNjb3VudCguLi5hcmdzKVxuICB9XG5cbiAgZ2V0Q3VycmVuY3lCYWxhbmNlOiBFb3NBcGlbJ2dldEN1cnJlbmN5QmFsYW5jZSddID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoKVxuXG4gICAgcmV0dXJuIGluc3RhbmNlLmdldEN1cnJlbmN5QmFsYW5jZSguLi5hcmdzKVxuICB9XG5cbiAgYXN5bmMgZ2V0VXNlckJhbGFuY2UoYWNjb3VudDogc3RyaW5nLCBzeW1ib2w6IHN0cmluZykge1xuICAgIGNvbnN0IFtiYWxhbmNlXSA9IGF3YWl0IHRoaXMuZ2V0Q3VycmVuY3lCYWxhbmNlKFwiZW9zaW8udG9rZW5cIiwgYWNjb3VudCwgc3ltYm9sKVxuXG4gICAgcmV0dXJuIGAkeyhwYXJzZUZsb2F0KGJhbGFuY2UgfHwgJzAnKSB8fCAwKS50b0ZpeGVkKDQpfSAke3N5bWJvbH1gXG4gIH1cblxuICBhc3luYyBnZXRQZXJtaXNzaW9uS2V5QnlOYW1lKGFjY291bnROYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCB0aGlzLmdldEFjY291bnQoYWNjb3VudE5hbWUpO1xuICAgIGNvbnN0IHBlcm1pc3Npb24gPSBhY2NvdW50LnBlcm1pc3Npb25zLmZpbmQoZWwgPT4gZWwucGVybV9uYW1lID09PSBuYW1lKVxuXG4gICAgcmV0dXJuIHBlcm1pc3Npb24/LnJlcXVpcmVkX2F1dGgua2V5c1swXS5rZXlcbiAgfVxuXG4gIGFzeW5jIGdldEluZm8oYWNjb3VudE5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgYWNjb3VudCA9IGF3YWl0IHRoaXMuZ2V0QWNjb3VudChhY2NvdW50TmFtZSk7XG4gICAgY29uc3QgcGVybWlzc2lvbiA9IGFjY291bnQucGVybWlzc2lvbnMuZmluZChlbCA9PiBlbC5wZXJtX25hbWUgPT09IG5hbWUpXG5cbiAgICByZXR1cm4gcGVybWlzc2lvbj8ucmVxdWlyZWRfYXV0aC5rZXlzWzBdLmtleVxuICB9XG5cblxuICBnZXRUYWJsZVJvd3M8Um93VHlwZT4oXG4gICAgY29kZTogc3RyaW5nLFxuICAgIHNjb3BlOiBzdHJpbmcsXG4gICAgdGFibGU6IHN0cmluZyxcbiAgICB0YWJsZV9rZXk/OiBzdHJpbmcsXG4gICAgbG93ZXJfYm91bmQ/OiBudW1iZXIgfCBzdHJpbmcsXG4gICAgdXBwZXJfYm91bmQ/OiBudW1iZXIgfCBzdHJpbmcsXG4gICAgbGltaXQ/OiBudW1iZXIsXG4gICAga2V5X3R5cGU/OiBzdHJpbmcsXG4gICAgaW5kZXhfcG9zaXRpb24/OiBudW1iZXJcbiAgKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKClcblxuICAgIHJldHVybiBpbnN0YW5jZS5nZXRUYWJsZVJvd3M8Um93VHlwZT4oXG4gICAgICB0cnVlLFxuICAgICAgY29kZSxcbiAgICAgIHNjb3BlLFxuICAgICAgdGFibGUsXG4gICAgICB0YWJsZV9rZXksXG4gICAgICBsb3dlcl9ib3VuZCxcbiAgICAgIHVwcGVyX2JvdW5kLFxuICAgICAgbGltaXQsXG4gICAgICBrZXlfdHlwZSxcbiAgICAgIGluZGV4X3Bvc2l0aW9uXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlYWRBcGlcbiJdfQ==