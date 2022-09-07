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
var RpcEndpointsEmptyError = /** @class */ (function (_super) {
    __extends(RpcEndpointsEmptyError, _super);
    function RpcEndpointsEmptyError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RpcEndpointsEmptyError;
}(Error));
export { RpcEndpointsEmptyError };
var UnknownChainError = /** @class */ (function (_super) {
    __extends(UnknownChainError, _super);
    function UnknownChainError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnknownChainError;
}(Error));
export { UnknownChainError };
var ChainsIsNotInitializedError = /** @class */ (function (_super) {
    __extends(ChainsIsNotInitializedError, _super);
    function ChainsIsNotInitializedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChainsIsNotInitializedError;
}(Error));
export { ChainsIsNotInitializedError };
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotImplementedError;
}(Error));
export { NotImplementedError };
var RegistratorIsNotConfigured = /** @class */ (function (_super) {
    __extends(RegistratorIsNotConfigured, _super);
    function RegistratorIsNotConfigured() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RegistratorIsNotConfigured;
}(Error));
export { RegistratorIsNotConfigured };
var PersonalDataIsNotConfigured = /** @class */ (function (_super) {
    __extends(PersonalDataIsNotConfigured, _super);
    function PersonalDataIsNotConfigured() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PersonalDataIsNotConfigured;
}(Error));
export { PersonalDataIsNotConfigured };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQTRDLDBDQUFLO0lBQWpEOztJQUFtRCxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBQXBELENBQTRDLEtBQUssR0FBRzs7QUFFcEQ7SUFBdUMscUNBQUs7SUFBNUM7O0lBQThDLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFBL0MsQ0FBdUMsS0FBSyxHQUFHOztBQUUvQztJQUFpRCwrQ0FBSztJQUF0RDs7SUFBd0QsQ0FBQztJQUFELGtDQUFDO0FBQUQsQ0FBQyxBQUF6RCxDQUFpRCxLQUFLLEdBQUc7O0FBRXpEO0lBQXlDLHVDQUFLO0lBQTlDOztJQUFnRCxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBQWpELENBQXlDLEtBQUssR0FBRzs7QUFFakQ7SUFBZ0QsOENBQUs7SUFBckQ7O0lBQXVELENBQUM7SUFBRCxpQ0FBQztBQUFELENBQUMsQUFBeEQsQ0FBZ0QsS0FBSyxHQUFHOztBQUV4RDtJQUFpRCwrQ0FBSztJQUF0RDs7SUFBd0QsQ0FBQztJQUFELGtDQUFDO0FBQUQsQ0FBQyxBQUF6RCxDQUFpRCxLQUFLLEdBQUciLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUnBjRW5kcG9pbnRzRW1wdHlFcnJvciBleHRlbmRzIEVycm9yIHt9XG5cbmV4cG9ydCBjbGFzcyBVbmtub3duQ2hhaW5FcnJvciBleHRlbmRzIEVycm9yIHt9XG5cbmV4cG9ydCBjbGFzcyBDaGFpbnNJc05vdEluaXRpYWxpemVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG5leHBvcnQgY2xhc3MgTm90SW1wbGVtZW50ZWRFcnJvciBleHRlbmRzIEVycm9yIHt9XG5cbmV4cG9ydCBjbGFzcyBSZWdpc3RyYXRvcklzTm90Q29uZmlndXJlZCBleHRlbmRzIEVycm9yIHt9XG5cbmV4cG9ydCBjbGFzcyBQZXJzb25hbERhdGFJc05vdENvbmZpZ3VyZWQgZXh0ZW5kcyBFcnJvciB7fVxuIl19