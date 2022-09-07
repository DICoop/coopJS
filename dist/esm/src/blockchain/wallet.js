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
var Wallet = /** @class */ (function () {
    function Wallet(config, readApi) {
        this.symbol = config.symbol;
        this.contract = config.contract;
        this.canTransfer = config.canTransfer || false;
        this.canDeposit = config.canDeposit || false;
        this.canWithdraw = config.canWithdraw || false;
        this.readApi = readApi;
    }
    Wallet.prototype.getUserBalance = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readApi.getCurrencyBalance(this.contract, username, this.symbol)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0] ? result[0] : '0.0000 ' + this.symbol];
                }
            });
        });
    };
    return Wallet;
}());
export default Wallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vd2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBO0lBUUksZ0JBQVksTUFBb0IsRUFBRSxPQUFnQjtRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFFSywrQkFBYyxHQUFwQixVQUFxQixRQUFxQjs7Ozs7NEJBQ3ZCLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBcEYsTUFBTSxHQUFHLFNBQTJFO3dCQUUxRixzQkFBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUE7Ozs7S0FDekQ7SUFDTCxhQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQUVELGVBQWUsTUFBTSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtXYWxsZXRDb25maWd9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgUmVhZEFwaSBmcm9tIFwiLi9yZWFkQXBpXCI7XG5pbXBvcnQge0FjY291bnROYW1lfSBmcm9tIFwiLi4vZW9zL3R5cGVzXCI7XG5cbmNsYXNzIFdhbGxldCB7XG4gICAgcHJpdmF0ZSByZWFkb25seSByZWFkQXBpOiBSZWFkQXBpXG4gICAgcmVhZG9ubHkgc3ltYm9sOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgY29udHJhY3Q6IHN0cmluZztcbiAgICBjYW5UcmFuc2ZlcjogYm9vbGVhbjtcbiAgICBjYW5EZXBvc2l0OiBib29sZWFuO1xuICAgIGNhbldpdGhkcmF3OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBXYWxsZXRDb25maWcsIHJlYWRBcGk6IFJlYWRBcGkpIHtcbiAgICAgICAgdGhpcy5zeW1ib2wgPSBjb25maWcuc3ltYm9sO1xuICAgICAgICB0aGlzLmNvbnRyYWN0ID0gY29uZmlnLmNvbnRyYWN0O1xuICAgICAgICB0aGlzLmNhblRyYW5zZmVyID0gY29uZmlnLmNhblRyYW5zZmVyIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbkRlcG9zaXQgPSBjb25maWcuY2FuRGVwb3NpdCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5jYW5XaXRoZHJhdyA9IGNvbmZpZy5jYW5XaXRoZHJhdyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5yZWFkQXBpID0gcmVhZEFwaTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRVc2VyQmFsYW5jZSh1c2VybmFtZTogQWNjb3VudE5hbWUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZWFkQXBpLmdldEN1cnJlbmN5QmFsYW5jZSh0aGlzLmNvbnRyYWN0LCB1c2VybmFtZSwgdGhpcy5zeW1ib2wpXG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFswXSA/IHJlc3VsdFswXSA6ICcwLjAwMDAgJyArIHRoaXMuc3ltYm9sXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsZXQiXX0=