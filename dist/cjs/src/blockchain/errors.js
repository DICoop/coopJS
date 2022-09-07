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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalDataIsNotConfigured = exports.RegistratorIsNotConfigured = exports.NotImplementedError = exports.ChainsIsNotInitializedError = exports.UnknownChainError = exports.RpcEndpointsEmptyError = void 0;
var RpcEndpointsEmptyError = /** @class */ (function (_super) {
    __extends(RpcEndpointsEmptyError, _super);
    function RpcEndpointsEmptyError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RpcEndpointsEmptyError;
}(Error));
exports.RpcEndpointsEmptyError = RpcEndpointsEmptyError;
var UnknownChainError = /** @class */ (function (_super) {
    __extends(UnknownChainError, _super);
    function UnknownChainError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnknownChainError;
}(Error));
exports.UnknownChainError = UnknownChainError;
var ChainsIsNotInitializedError = /** @class */ (function (_super) {
    __extends(ChainsIsNotInitializedError, _super);
    function ChainsIsNotInitializedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChainsIsNotInitializedError;
}(Error));
exports.ChainsIsNotInitializedError = ChainsIsNotInitializedError;
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotImplementedError;
}(Error));
exports.NotImplementedError = NotImplementedError;
var RegistratorIsNotConfigured = /** @class */ (function (_super) {
    __extends(RegistratorIsNotConfigured, _super);
    function RegistratorIsNotConfigured() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RegistratorIsNotConfigured;
}(Error));
exports.RegistratorIsNotConfigured = RegistratorIsNotConfigured;
var PersonalDataIsNotConfigured = /** @class */ (function (_super) {
    __extends(PersonalDataIsNotConfigured, _super);
    function PersonalDataIsNotConfigured() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PersonalDataIsNotConfigured;
}(Error));
exports.PersonalDataIsNotConfigured = PersonalDataIsNotConfigured;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQTRDLDBDQUFLO0lBQWpEOztJQUFtRCxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBQXBELENBQTRDLEtBQUssR0FBRztBQUF2Qyx3REFBc0I7QUFFbkM7SUFBdUMscUNBQUs7SUFBNUM7O0lBQThDLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFBL0MsQ0FBdUMsS0FBSyxHQUFHO0FBQWxDLDhDQUFpQjtBQUU5QjtJQUFpRCwrQ0FBSztJQUF0RDs7SUFBd0QsQ0FBQztJQUFELGtDQUFDO0FBQUQsQ0FBQyxBQUF6RCxDQUFpRCxLQUFLLEdBQUc7QUFBNUMsa0VBQTJCO0FBRXhDO0lBQXlDLHVDQUFLO0lBQTlDOztJQUFnRCxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBQWpELENBQXlDLEtBQUssR0FBRztBQUFwQyxrREFBbUI7QUFFaEM7SUFBZ0QsOENBQUs7SUFBckQ7O0lBQXVELENBQUM7SUFBRCxpQ0FBQztBQUFELENBQUMsQUFBeEQsQ0FBZ0QsS0FBSyxHQUFHO0FBQTNDLGdFQUEwQjtBQUV2QztJQUFpRCwrQ0FBSztJQUF0RDs7SUFBd0QsQ0FBQztJQUFELGtDQUFDO0FBQUQsQ0FBQyxBQUF6RCxDQUFpRCxLQUFLLEdBQUc7QUFBNUMsa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFJwY0VuZHBvaW50c0VtcHR5RXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG5leHBvcnQgY2xhc3MgVW5rbm93bkNoYWluRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG5leHBvcnQgY2xhc3MgQ2hhaW5zSXNOb3RJbml0aWFsaXplZEVycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuZXhwb3J0IGNsYXNzIE5vdEltcGxlbWVudGVkRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxuXG5leHBvcnQgY2xhc3MgUmVnaXN0cmF0b3JJc05vdENvbmZpZ3VyZWQgZXh0ZW5kcyBFcnJvciB7fVxuXG5leHBvcnQgY2xhc3MgUGVyc29uYWxEYXRhSXNOb3RDb25maWd1cmVkIGV4dGVuZHMgRXJyb3Ige31cbiJdfQ==