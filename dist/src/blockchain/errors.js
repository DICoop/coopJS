"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistratorIsNotConfigured = exports.NotImplementedError = exports.ChainsIsNotInitializedError = exports.UnknownChainError = exports.RpcEndpointsEmptyError = void 0;
class RpcEndpointsEmptyError extends Error {
}
exports.RpcEndpointsEmptyError = RpcEndpointsEmptyError;
class UnknownChainError extends Error {
}
exports.UnknownChainError = UnknownChainError;
class ChainsIsNotInitializedError extends Error {
}
exports.ChainsIsNotInitializedError = ChainsIsNotInitializedError;
class NotImplementedError extends Error {
}
exports.NotImplementedError = NotImplementedError;
class RegistratorIsNotConfigured extends Error {
}
exports.RegistratorIsNotConfigured = RegistratorIsNotConfigured;
//# sourceMappingURL=errors.js.map