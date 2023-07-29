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
        this.getAbi = (...args) => {
            const instance = this.getInstance();
            return instance.getAbi(...args);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RzL3NyYy9ibG9ja2NoYWluL3JlYWRBcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFBO0FBQzlCLE9BQU8sR0FBRyxNQUFNLGlCQUFpQixDQUFBO0FBR2pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQU9qRCxNQUFNLE9BQU87SUFNWCxZQUFZLFNBQWlCLEVBQUUsVUFBeUIsRUFBRSxhQUE2QjtRQXFFdkYsbUJBQWMsR0FBNkIsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO1lBQ3JELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUVuQyxPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUN6QyxDQUFDLENBQUE7UUFFRCxlQUFVLEdBQXlCLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7WUFFbkMsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDckMsQ0FBQyxDQUFBO1FBRUQsV0FBTSxHQUFxQixDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7WUFDckMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBRW5DLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQ2pDLENBQUMsQ0FBQTtRQUVELHVCQUFrQixHQUFpQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7WUFDN0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBRW5DLE9BQU8sUUFBUSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDLENB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QVcsRUFBRSxDQUFBO1FBRW5DLE9BQU8sUUFBUSxDQUFDLFlBQVksQ0FDMUIsSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1IsY0FBYyxDQUNmLENBQUE7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxlQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFb3NBcGkgZnJvbSAnZW9zanMtYXBpJ1xuaW1wb3J0IG9ubyBmcm9tICdAanNkZXZ0b29scy9vbm8nXG5cbmltcG9ydCB7IFJwY0VuZHBvaW50LCBCYWxhbmNpbmdNb2RlIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7IFJwY0VuZHBvaW50c0VtcHR5RXJyb3IgfSBmcm9tICcuL2Vycm9ycydcblxuaW50ZXJmYWNlIEJhbGFuY2luZ1Jlc3VsdDxUPiB7XG4gIHJlc3VsdDogVCxcbiAgb2Zmc2V0OiBudW1iZXIsXG59XG5cbmNsYXNzIFJlYWRBcGkge1xuICBwcml2YXRlIHJlYWRvbmx5IGJhbGFuY2luZ01vZGU6IEJhbGFuY2luZ01vZGVcbiAgcHJpdmF0ZSByZWFkb25seSBhcGlzOiBFb3NBcGlbXVxuICBwcml2YXRlIHJlYWRvbmx5IGVuZHBvaW50czogc3RyaW5nW11cbiAgcHJpdmF0ZSBvZmZzZXQ6IG51bWJlclxuXG4gIGNvbnN0cnVjdG9yKGNoYWluTmFtZTogc3RyaW5nLCBhcGlDb25maWdzOiBScGNFbmRwb2ludFtdLCBiYWxhbmNpbmdNb2RlPzogQmFsYW5jaW5nTW9kZSkge1xuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMuYmFsYW5jaW5nTW9kZSA9IGJhbGFuY2luZ01vZGUgfHwgJ3JhbmRvbS1vbmNlJ1xuICAgIHRoaXMuYXBpcyA9IFtdXG4gICAgdGhpcy5lbmRwb2ludHMgPSBbXVxuXG4gICAgaWYgKCFhcGlDb25maWdzIHx8IGFwaUNvbmZpZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBvbm8obmV3IFJwY0VuZHBvaW50c0VtcHR5RXJyb3IoYHJwY0VuZHBvaW50cyBpcyBlbXB0eSAoY2hhaW49JHtjaGFpbk5hbWV9KWApKVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgeyBwcm90b2NvbCwgaG9zdCwgcG9ydCB9IG9mIGFwaUNvbmZpZ3MpIHtcbiAgICAgIGNvbnN0IHJwY0VuZHBvaW50U3RyaW5nID0gYCR7cHJvdG9jb2x9Oi8vJHtob3N0fToke3BvcnR9YFxuICAgICAgdGhpcy5lbmRwb2ludHMucHVzaChycGNFbmRwb2ludFN0cmluZylcbiAgICAgIHRoaXMuYXBpcy5wdXNoKG5ldyBFb3NBcGkoeyBodHRwRW5kcG9pbnQ6IHJwY0VuZHBvaW50U3RyaW5nIH0pKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmJhbGFuY2luZ01vZGUgPT09ICdyYW5kb20tb25jZScgJiYgdGhpcy5hcGlzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5hcGlzLmxlbmd0aClcbiAgICB9XG4gIH1cblxuICBnZXRCYWxhbmNlZEl0ZW1CeU9mZnNldDxUPihjdXJyZW50T2Zmc2V0OiBudW1iZXIsIGl0ZW1zOiBUW10sIGJhbGFuY2luZ01vZGU6IEJhbGFuY2luZ01vZGUpOiBCYWxhbmNpbmdSZXN1bHQ8VD4ge1xuICAgIGlmIChpdGVtcy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHQ6IGl0ZW1zWzBdLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG5leHRPZmZzZXQgPSBjdXJyZW50T2Zmc2V0XG4gICAgaWYgKGJhbGFuY2luZ01vZGUgPT09ICdyYW5kb20nKSB7XG4gICAgICBuZXh0T2Zmc2V0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaXRlbXMubGVuZ3RoKVxuICAgIH1cblxuICAgIGNvbnN0IGluc3RhbmNlID0gaXRlbXNbbmV4dE9mZnNldF1cblxuICAgIGlmIChiYWxhbmNpbmdNb2RlID09PSAncm91bmQtcm9iaW4nKSB7XG4gICAgICBuZXh0T2Zmc2V0KytcblxuICAgICAgaWYgKG5leHRPZmZzZXQgPj0gaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIG5leHRPZmZzZXQgPSAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3VsdDogaW5zdGFuY2UsXG4gICAgICBvZmZzZXQ6IG5leHRPZmZzZXQsXG4gICAgfVxuICB9XG5cbiAgZ2V0QmFsYW5jZWRJdGVtPFQ+KGNvbGxlY3Rpb246IFRbXSk6IFQge1xuICAgIGNvbnN0IHtcbiAgICAgIHJlc3VsdCxcbiAgICAgIG9mZnNldCxcbiAgICB9ID0gdGhpcy5nZXRCYWxhbmNlZEl0ZW1CeU9mZnNldDxUPih0aGlzLm9mZnNldCwgY29sbGVjdGlvbiwgdGhpcy5iYWxhbmNpbmdNb2RlKVxuXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXRcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGdldEluc3RhbmNlKCk6IEVvc0FwaSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QmFsYW5jZWRJdGVtPEVvc0FwaT4odGhpcy5hcGlzKVxuICB9XG5cbiAgZ2V0RW5kcG9pbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCYWxhbmNlZEl0ZW08c3RyaW5nPih0aGlzLmVuZHBvaW50cylcbiAgfVxuXG4gIGdldEtleUFjY291bnRzOiBFb3NBcGlbJ2dldEtleUFjY291bnRzJ10gPSAoLi4uYXJncykgPT4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZSgpXG5cbiAgICByZXR1cm4gaW5zdGFuY2UuZ2V0S2V5QWNjb3VudHMoLi4uYXJncylcbiAgfVxuXG4gIGdldEFjY291bnQ6IEVvc0FwaVsnZ2V0QWNjb3VudCddID0gKC4uLmFyZ3MpID0+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ2V0SW5zdGFuY2UoKVxuXG4gICAgcmV0dXJuIGluc3RhbmNlLmdldEFjY291bnQoLi4uYXJncylcbiAgfVxuXG4gIGdldEFiaTogRW9zQXBpWydnZXRBYmknXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKClcblxuICAgIHJldHVybiBpbnN0YW5jZS5nZXRBYmkoLi4uYXJncylcbiAgfVxuXG4gIGdldEN1cnJlbmN5QmFsYW5jZTogRW9zQXBpWydnZXRDdXJyZW5jeUJhbGFuY2UnXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdldEluc3RhbmNlKClcblxuICAgIHJldHVybiBpbnN0YW5jZS5nZXRDdXJyZW5jeUJhbGFuY2UoLi4uYXJncylcbiAgfVxuXG4gIGFzeW5jIGdldFVzZXJCYWxhbmNlKGFjY291bnQ6IHN0cmluZywgc3ltYm9sOiBzdHJpbmcpIHtcbiAgICBjb25zdCBbYmFsYW5jZV0gPSBhd2FpdCB0aGlzLmdldEN1cnJlbmN5QmFsYW5jZShcImVvc2lvLnRva2VuXCIsIGFjY291bnQsIHN5bWJvbClcblxuICAgIHJldHVybiBgJHsocGFyc2VGbG9hdChiYWxhbmNlIHx8ICcwJykgfHwgMCkudG9GaXhlZCg0KX0gJHtzeW1ib2x9YFxuICB9XG5cbiAgYXN5bmMgZ2V0UGVybWlzc2lvbktleUJ5TmFtZShhY2NvdW50TmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBhY2NvdW50ID0gYXdhaXQgdGhpcy5nZXRBY2NvdW50KGFjY291bnROYW1lKTtcbiAgICBjb25zdCBwZXJtaXNzaW9uID0gYWNjb3VudC5wZXJtaXNzaW9ucy5maW5kKGVsID0+IGVsLnBlcm1fbmFtZSA9PT0gbmFtZSlcblxuICAgIHJldHVybiBwZXJtaXNzaW9uPy5yZXF1aXJlZF9hdXRoLmtleXNbMF0ua2V5XG4gIH1cblxuICBhc3luYyBnZXRJbmZvKGFjY291bnROYW1lOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCB0aGlzLmdldEFjY291bnQoYWNjb3VudE5hbWUpO1xuICAgIGNvbnN0IHBlcm1pc3Npb24gPSBhY2NvdW50LnBlcm1pc3Npb25zLmZpbmQoZWwgPT4gZWwucGVybV9uYW1lID09PSBuYW1lKVxuXG4gICAgcmV0dXJuIHBlcm1pc3Npb24/LnJlcXVpcmVkX2F1dGgua2V5c1swXS5rZXlcbiAgfVxuXG5cbiAgZ2V0VGFibGVSb3dzPFJvd1R5cGU+KFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICBzY29wZTogc3RyaW5nLFxuICAgIHRhYmxlOiBzdHJpbmcsXG4gICAgdGFibGVfa2V5Pzogc3RyaW5nLFxuICAgIGxvd2VyX2JvdW5kPzogbnVtYmVyIHwgc3RyaW5nLFxuICAgIHVwcGVyX2JvdW5kPzogbnVtYmVyIHwgc3RyaW5nLFxuICAgIGxpbWl0PzogbnVtYmVyLFxuICAgIGtleV90eXBlPzogc3RyaW5nLFxuICAgIGluZGV4X3Bvc2l0aW9uPzogbnVtYmVyXG4gICkge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5nZXRJbnN0YW5jZSgpXG5cbiAgICByZXR1cm4gaW5zdGFuY2UuZ2V0VGFibGVSb3dzPFJvd1R5cGU+KFxuICAgICAgdHJ1ZSxcbiAgICAgIGNvZGUsXG4gICAgICBzY29wZSxcbiAgICAgIHRhYmxlLFxuICAgICAgdGFibGVfa2V5LFxuICAgICAgbG93ZXJfYm91bmQsXG4gICAgICB1cHBlcl9ib3VuZCxcbiAgICAgIGxpbWl0LFxuICAgICAga2V5X3R5cGUsXG4gICAgICBpbmRleF9wb3NpdGlvblxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWFkQXBpXG4iXX0=