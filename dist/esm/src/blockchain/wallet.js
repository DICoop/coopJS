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
        this.canChange = config.canChange || false;
        this.routeForChange = config.routeForChange || "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vd2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBO0lBVUksZ0JBQVksTUFBb0IsRUFBRSxPQUFnQjtRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUssK0JBQWMsR0FBcEIsVUFBcUIsUUFBcUI7Ozs7OzRCQUN2QixxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQXBGLE1BQU0sR0FBRyxTQUEyRTt3QkFFMUYsc0JBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFBOzs7O0tBQ3pEO0lBQ0wsYUFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUFFRCxlQUFlLE1BQU0sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7V2FsbGV0Q29uZmlnfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IFJlYWRBcGkgZnJvbSBcIi4vcmVhZEFwaVwiO1xuaW1wb3J0IHtBY2NvdW50TmFtZX0gZnJvbSBcIi4uL2Vvcy90eXBlc1wiO1xuXG5jbGFzcyBXYWxsZXQge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVhZEFwaTogUmVhZEFwaVxuICAgIHJlYWRvbmx5IHN5bWJvbDogc3RyaW5nO1xuICAgIHJlYWRvbmx5IGNvbnRyYWN0OiBzdHJpbmc7XG4gICAgY2FuVHJhbnNmZXI6IGJvb2xlYW47XG4gICAgY2FuRGVwb3NpdDogYm9vbGVhbjtcbiAgICBjYW5XaXRoZHJhdzogYm9vbGVhbjtcbiAgICBjYW5DaGFuZ2U6IGJvb2xlYW47XG4gICAgcm91dGVGb3JDaGFuZ2U6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogV2FsbGV0Q29uZmlnLCByZWFkQXBpOiBSZWFkQXBpKSB7XG4gICAgICAgIHRoaXMuc3ltYm9sID0gY29uZmlnLnN5bWJvbDtcbiAgICAgICAgdGhpcy5jb250cmFjdCA9IGNvbmZpZy5jb250cmFjdDtcbiAgICAgICAgdGhpcy5jYW5UcmFuc2ZlciA9IGNvbmZpZy5jYW5UcmFuc2ZlciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5jYW5EZXBvc2l0ID0gY29uZmlnLmNhbkRlcG9zaXQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuV2l0aGRyYXcgPSBjb25maWcuY2FuV2l0aGRyYXcgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuQ2hhbmdlID0gY29uZmlnLmNhbkNoYW5nZSB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5yb3V0ZUZvckNoYW5nZSA9IGNvbmZpZy5yb3V0ZUZvckNoYW5nZSB8fCBcIlwiO1xuICAgICAgICB0aGlzLnJlYWRBcGkgPSByZWFkQXBpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldFVzZXJCYWxhbmNlKHVzZXJuYW1lOiBBY2NvdW50TmFtZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnJlYWRBcGkuZ2V0Q3VycmVuY3lCYWxhbmNlKHRoaXMuY29udHJhY3QsIHVzZXJuYW1lLCB0aGlzLnN5bWJvbClcblxuICAgICAgICByZXR1cm4gcmVzdWx0WzBdID8gcmVzdWx0WzBdIDogJzAuMDAwMCAnICsgdGhpcy5zeW1ib2xcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhbGxldCJdfQ==