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
import BaseContract from './base';
var EosioContract = /** @class */ (function (_super) {
    __extends(EosioContract, _super);
    function EosioContract(api, tableCodeConfig) {
        return _super.call(this, api, tableCodeConfig, 'eosio') || this;
    }
    EosioContract.prototype.getGlobalData = function () {
        return this.getSingleTableRow({
            table: 'global',
        });
    };
    return EosioContract;
}(BaseContract));
export default EosioContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW9zaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9jb250cmFjdHMvZW9zaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxZQUFZLE1BQU0sUUFBUSxDQUFBO0FBbUNqQztJQUE0QixpQ0FBWTtJQUN0Qyx1QkFBWSxHQUFZLEVBQUUsZUFBZ0M7ZUFDeEQsa0JBQU0sR0FBRyxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUVELHFDQUFhLEdBQWI7UUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBa0I7WUFDN0MsS0FBSyxFQUFFLFFBQVE7U0FDaEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVZELENBQTRCLFlBQVksR0FVdkM7QUFFRCxlQUFlLGFBQWEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFkQXBpIGZyb20gJy4uL3JlYWRBcGknXG5pbXBvcnQgeyBUYWJsZUNvZGVDb25maWcgfSBmcm9tICcuLi90eXBlcydcbmltcG9ydCBCYXNlQ29udHJhY3QgZnJvbSAnLi9iYXNlJ1xuXG5pbnRlcmZhY2UgRW9zaW9HbG9iYWxEYXRhIHtcbiAgYmFzZV9wZXJfdHJhbnNhY3Rpb25fbmV0X3VzYWdlOiBudW1iZXJcbiAgY29udGV4dF9mcmVlX2Rpc2NvdW50X25ldF91c2FnZV9kZW46IG51bWJlclxuICBjb250ZXh0X2ZyZWVfZGlzY291bnRfbmV0X3VzYWdlX251bTogbnVtYmVyXG4gIGRlZmVycmVkX3RyeF9leHBpcmF0aW9uX3dpbmRvdzogbnVtYmVyXG4gIGxhc3RfbmFtZV9jbG9zZTogc3RyaW5nXG4gIGxhc3RfcGVydm90ZV9idWNrZXRfZmlsbDogc3RyaW5nXG4gIGxhc3RfcHJvZHVjZXJfc2NoZWR1bGVfc2l6ZTogbnVtYmVyXG4gIGxhc3RfcHJvZHVjZXJfc2NoZWR1bGVfdXBkYXRlOiBzdHJpbmdcbiAgbWF4X2F1dGhvcml0eV9kZXB0aDogbnVtYmVyXG4gIG1heF9ibG9ja19jcHVfdXNhZ2U6IG51bWJlclxuICBtYXhfYmxvY2tfbmV0X3VzYWdlOiBudW1iZXJcbiAgbWF4X2lubGluZV9hY3Rpb25fZGVwdGg6IG51bWJlclxuICBtYXhfaW5saW5lX2FjdGlvbl9zaXplOiBudW1iZXJcbiAgbWF4X3JhbV9zaXplOiBzdHJpbmdcbiAgbWF4X3RyYW5zYWN0aW9uX2NwdV91c2FnZTogbnVtYmVyXG4gIG1heF90cmFuc2FjdGlvbl9kZWxheTogbnVtYmVyXG4gIG1heF90cmFuc2FjdGlvbl9saWZldGltZTogbnVtYmVyXG4gIG1heF90cmFuc2FjdGlvbl9uZXRfdXNhZ2U6IG51bWJlclxuICBtaW5fdHJhbnNhY3Rpb25fY3B1X3VzYWdlOiBudW1iZXJcbiAgbmV0X3VzYWdlX2xlZXdheTogbnVtYmVyXG4gIHBlcmJsb2NrX2J1Y2tldDogc3RyaW5nXG4gIHBlcnZvdGVfYnVja2V0OiBzdHJpbmdcbiAgdGFyZ2V0X2Jsb2NrX2NwdV91c2FnZV9wY3Q6IG51bWJlclxuICB0YXJnZXRfYmxvY2tfbmV0X3VzYWdlX3BjdDogbnVtYmVyXG4gIHRocmVzaF9hY3RpdmF0ZWRfc3Rha2VfdGltZTogc3RyaW5nXG4gIHRvdGFsX2FjdGl2YXRlZF9zdGFrZTogbnVtYmVyXG4gIHRvdGFsX3Byb2R1Y2VyX3ZvdGVfd2VpZ2h0OiBzdHJpbmdcbiAgdG90YWxfcmFtX2J5dGVzX3Jlc2VydmVkOiBudW1iZXJcbiAgdG90YWxfcmFtX3N0YWtlOiBudW1iZXJcbiAgdG90YWxfdW5wYWlkX2Jsb2NrczogbnVtYmVyXG59XG5cbmNsYXNzIEVvc2lvQ29udHJhY3QgZXh0ZW5kcyBCYXNlQ29udHJhY3Qge1xuICBjb25zdHJ1Y3RvcihhcGk6IFJlYWRBcGksIHRhYmxlQ29kZUNvbmZpZzogVGFibGVDb2RlQ29uZmlnKSB7XG4gICAgc3VwZXIoYXBpLCB0YWJsZUNvZGVDb25maWcsICdlb3NpbycpXG4gIH1cblxuICBnZXRHbG9iYWxEYXRhKCk6IFByb21pc2U8RW9zaW9HbG9iYWxEYXRhPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2luZ2xlVGFibGVSb3c8RW9zaW9HbG9iYWxEYXRhPih7XG4gICAgICB0YWJsZTogJ2dsb2JhbCcsXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFb3Npb0NvbnRyYWN0XG4iXX0=