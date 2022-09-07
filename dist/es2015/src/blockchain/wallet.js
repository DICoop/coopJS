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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vd2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE1BQU0sTUFBTTtJQVFSLFlBQVksTUFBb0IsRUFBRSxPQUFnQjtRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFFSyxjQUFjLENBQUMsUUFBcUI7O1lBQ3RDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFMUYsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDMUQsQ0FBQztLQUFBO0NBQ0o7QUFFRCxlQUFlLE1BQU0sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7V2FsbGV0Q29uZmlnfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IFJlYWRBcGkgZnJvbSBcIi4vcmVhZEFwaVwiO1xuaW1wb3J0IHtBY2NvdW50TmFtZX0gZnJvbSBcIi4uL2Vvcy90eXBlc1wiO1xuXG5jbGFzcyBXYWxsZXQge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVhZEFwaTogUmVhZEFwaVxuICAgIHJlYWRvbmx5IHN5bWJvbDogc3RyaW5nO1xuICAgIHJlYWRvbmx5IGNvbnRyYWN0OiBzdHJpbmc7XG4gICAgY2FuVHJhbnNmZXI6IGJvb2xlYW47XG4gICAgY2FuRGVwb3NpdDogYm9vbGVhbjtcbiAgICBjYW5XaXRoZHJhdzogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogV2FsbGV0Q29uZmlnLCByZWFkQXBpOiBSZWFkQXBpKSB7XG4gICAgICAgIHRoaXMuc3ltYm9sID0gY29uZmlnLnN5bWJvbDtcbiAgICAgICAgdGhpcy5jb250cmFjdCA9IGNvbmZpZy5jb250cmFjdDtcbiAgICAgICAgdGhpcy5jYW5UcmFuc2ZlciA9IGNvbmZpZy5jYW5UcmFuc2ZlciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5jYW5EZXBvc2l0ID0gY29uZmlnLmNhbkRlcG9zaXQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuY2FuV2l0aGRyYXcgPSBjb25maWcuY2FuV2l0aGRyYXcgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMucmVhZEFwaSA9IHJlYWRBcGk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0VXNlckJhbGFuY2UodXNlcm5hbWU6IEFjY291bnROYW1lKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVhZEFwaS5nZXRDdXJyZW5jeUJhbGFuY2UodGhpcy5jb250cmFjdCwgdXNlcm5hbWUsIHRoaXMuc3ltYm9sKVxuXG4gICAgICAgIHJldHVybiByZXN1bHRbMF0gPyByZXN1bHRbMF0gOiAnMC4wMDAwICcgKyB0aGlzLnN5bWJvbFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FsbGV0Il19