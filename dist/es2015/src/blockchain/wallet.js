var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Wallet {
    constructor(config, readApi) {
        this.symbol = config.symbol;
        this.contract = config.contract;
        this.canTransfer = config.canTransfer || false;
        this.canDeposit = config.canDeposit || false;
        this.canWithdraw = config.canWithdraw || false;
        this.canChange = config.canChange || false;
        this.canChangeButDisabled = config.canChangeButDisabled || false;
        this.routeForChange = config.routeForChange || "";
        this.readApi = readApi;
    }
    getUserBalance(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.readApi.getCurrencyBalance(this.contract, username, this.symbol);
            return result[0] ? result[0] : '0.0000 ' + this.symbol;
        });
    }
}
export default Wallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vd2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE1BQU0sTUFBTTtJQVdSLFlBQVksTUFBb0IsRUFBRSxPQUFnQjtRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsSUFBSSxLQUFLLENBQUM7UUFDakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUssY0FBYyxDQUFDLFFBQXFCOztZQUN0QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRTFGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO1FBQzFELENBQUM7S0FBQTtDQUNKO0FBRUQsZUFBZSxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1dhbGxldENvbmZpZ30gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCBSZWFkQXBpIGZyb20gXCIuL3JlYWRBcGlcIjtcbmltcG9ydCB7QWNjb3VudE5hbWV9IGZyb20gXCIuLi9lb3MvdHlwZXNcIjtcblxuY2xhc3MgV2FsbGV0IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlYWRBcGk6IFJlYWRBcGlcbiAgICByZWFkb25seSBzeW1ib2w6IHN0cmluZztcbiAgICByZWFkb25seSBjb250cmFjdDogc3RyaW5nO1xuICAgIGNhblRyYW5zZmVyOiBib29sZWFuO1xuICAgIGNhbkRlcG9zaXQ6IGJvb2xlYW47XG4gICAgY2FuV2l0aGRyYXc6IGJvb2xlYW47XG4gICAgY2FuQ2hhbmdlOiBib29sZWFuO1xuICAgIGNhbkNoYW5nZUJ1dERpc2FibGVkOiBib29sZWFuO1xuICAgIHJvdXRlRm9yQ2hhbmdlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IFdhbGxldENvbmZpZywgcmVhZEFwaTogUmVhZEFwaSkge1xuICAgICAgICB0aGlzLnN5bWJvbCA9IGNvbmZpZy5zeW1ib2w7XG4gICAgICAgIHRoaXMuY29udHJhY3QgPSBjb25maWcuY29udHJhY3Q7XG4gICAgICAgIHRoaXMuY2FuVHJhbnNmZXIgPSBjb25maWcuY2FuVHJhbnNmZXIgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuRGVwb3NpdCA9IGNvbmZpZy5jYW5EZXBvc2l0IHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbldpdGhkcmF3ID0gY29uZmlnLmNhbldpdGhkcmF3IHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmNhbkNoYW5nZSA9IGNvbmZpZy5jYW5DaGFuZ2UgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuQ2hhbmdlQnV0RGlzYWJsZWQgPSBjb25maWcuY2FuQ2hhbmdlQnV0RGlzYWJsZWQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMucm91dGVGb3JDaGFuZ2UgPSBjb25maWcucm91dGVGb3JDaGFuZ2UgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5yZWFkQXBpID0gcmVhZEFwaTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRVc2VyQmFsYW5jZSh1c2VybmFtZTogQWNjb3VudE5hbWUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZWFkQXBpLmdldEN1cnJlbmN5QmFsYW5jZSh0aGlzLmNvbnRyYWN0LCB1c2VybmFtZSwgdGhpcy5zeW1ib2wpXG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFswXSA/IHJlc3VsdFswXSA6ICcwLjAwMDAgJyArIHRoaXMuc3ltYm9sXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBXYWxsZXQiXX0=