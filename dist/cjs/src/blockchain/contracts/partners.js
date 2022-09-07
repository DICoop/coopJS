"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("./base"));
var PartnersContract = /** @class */ (function (_super) {
    __extends(PartnersContract, _super);
    function PartnersContract(api, tableCodeConfig) {
        return _super.call(this, api, tableCodeConfig, 'part') || this;
    }
    PartnersContract.prototype.getAccountPartner = function (accountName) {
        return this.getSingleTableRow({
            table: 'partners2',
            lower_bound: accountName,
            upper_bound: accountName,
            limit: 1,
            parseMetaAsJson: true,
        });
    };
    return PartnersContract;
}(base_1.default));
exports.default = PartnersContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydG5lcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9jb250cmFjdHMvcGFydG5lcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxnREFBaUM7QUFLakM7SUFBK0Isb0NBQVk7SUFDekMsMEJBQVksR0FBWSxFQUFFLGVBQWdDO2VBQ3hELGtCQUFNLEdBQUcsRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDO0lBQ3JDLENBQUM7SUFFRCw0Q0FBaUIsR0FBakIsVUFBa0IsV0FBd0I7UUFDeEMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQWE7WUFDeEMsS0FBSyxFQUFFLFdBQVc7WUFDbEIsV0FBVyxFQUFFLFdBQVc7WUFDeEIsV0FBVyxFQUFFLFdBQVc7WUFDeEIsS0FBSyxFQUFFLENBQUM7WUFDUixlQUFlLEVBQUUsSUFBSTtTQUN0QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBZEQsQ0FBK0IsY0FBWSxHQWMxQztBQUVELGtCQUFlLGdCQUFnQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3VudE5hbWUgfSBmcm9tICcuLi8uLi9lb3MvdHlwZXMnXG5pbXBvcnQgUmVhZEFwaSBmcm9tICcuLi9yZWFkQXBpJ1xuaW1wb3J0IHsgVGFibGVDb2RlQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnXG5pbXBvcnQgQmFzZUNvbnRyYWN0IGZyb20gJy4vYmFzZSdcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbnR5cGUgUGFydG5lclJvdyA9IGFueVxuXG5jbGFzcyBQYXJ0bmVyc0NvbnRyYWN0IGV4dGVuZHMgQmFzZUNvbnRyYWN0IHtcbiAgY29uc3RydWN0b3IoYXBpOiBSZWFkQXBpLCB0YWJsZUNvZGVDb25maWc6IFRhYmxlQ29kZUNvbmZpZykge1xuICAgIHN1cGVyKGFwaSwgdGFibGVDb2RlQ29uZmlnLCAncGFydCcpXG4gIH1cblxuICBnZXRBY2NvdW50UGFydG5lcihhY2NvdW50TmFtZTogQWNjb3VudE5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTaW5nbGVUYWJsZVJvdzxQYXJ0bmVyUm93Pih7XG4gICAgICB0YWJsZTogJ3BhcnRuZXJzMicsXG4gICAgICBsb3dlcl9ib3VuZDogYWNjb3VudE5hbWUsXG4gICAgICB1cHBlcl9ib3VuZDogYWNjb3VudE5hbWUsXG4gICAgICBsaW1pdDogMSxcbiAgICAgIHBhcnNlTWV0YUFzSnNvbjogdHJ1ZSxcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhcnRuZXJzQ29udHJhY3RcbiJdfQ==