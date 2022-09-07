"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var eosjs_ecc_1 = __importDefault(require("eosjs-ecc"));
var eos_encrypt_1 = require("eos-encrypt");
var BaseCrypt = /** @class */ (function () {
    function BaseCrypt() {
    }
    BaseCrypt.prototype.decrypt = function (authKey, publicKey, message, memo) {
        return Promise.resolve((0, eos_encrypt_1.encrypt)(authKey, publicKey, message, { memo: memo, maxsize: 10000 }));
    };
    BaseCrypt.prototype.encrypt = function (authKey, publicKey, message, memo) {
        return Promise.resolve((0, eos_encrypt_1.decrypt)(authKey, publicKey, message, { memo: memo }));
    };
    BaseCrypt.prototype.sign = function (privateKey, message) {
        return eosjs_ecc_1.default.sign(message, privateKey);
    };
    BaseCrypt.prototype.verify = function (publicKey, signature, message) {
        return eosjs_ecc_1.default.verify(signature, message, publicKey);
    };
    return BaseCrypt;
}());
exports.default = BaseCrypt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUNyeXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vYmFzZUNyeXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQTJCO0FBQzNCLDJDQUE0QztBQUk1QztJQUFBO0lBZ0JBLENBQUM7SUFmRywyQkFBTyxHQUFQLFVBQVEsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBZSxFQUFFLElBQWE7UUFDdEUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUEscUJBQU8sRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFDLElBQUksTUFBQSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELDJCQUFPLEdBQVAsVUFBUSxPQUFlLEVBQUUsU0FBaUIsRUFBRSxPQUFlLEVBQUUsSUFBYTtRQUN0RSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBQSxxQkFBTyxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUMsSUFBSSxNQUFBLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELHdCQUFJLEdBQUosVUFBSyxVQUFrQixFQUFFLE9BQWU7UUFDcEMsT0FBTyxtQkFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBTyxTQUFpQixFQUFFLFNBQWlCLEVBQUUsT0FBZTtRQUN4RCxPQUFPLG1CQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQUVELGtCQUFlLFNBQVMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFY2MgZnJvbSAnZW9zanMtZWNjJ1xuaW1wb3J0IHtlbmNyeXB0LCBkZWNyeXB0fSBmcm9tICdlb3MtZW5jcnlwdCdcblxuaW1wb3J0IHtDaGFpbkNyeXB0fSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jbGFzcyBCYXNlQ3J5cHQgaW1wbGVtZW50cyBDaGFpbkNyeXB0IHtcbiAgICBkZWNyeXB0KGF1dGhLZXk6IHN0cmluZywgcHVibGljS2V5OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgbWVtbz86IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZW5jcnlwdChhdXRoS2V5LCBwdWJsaWNLZXksIG1lc3NhZ2UsIHttZW1vLCBtYXhzaXplOiAxMDAwMH0pKTtcbiAgICB9XG5cbiAgICBlbmNyeXB0KGF1dGhLZXk6IHN0cmluZywgcHVibGljS2V5OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgbWVtbz86IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVjcnlwdChhdXRoS2V5LCBwdWJsaWNLZXksIG1lc3NhZ2UsIHttZW1vfSkpO1xuICAgIH1cblxuICAgIHNpZ24ocHJpdmF0ZUtleTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gRWNjLnNpZ24obWVzc2FnZSwgcHJpdmF0ZUtleSlcbiAgICB9XG5cbiAgICB2ZXJpZnkocHVibGljS2V5OiBzdHJpbmcsIHNpZ25hdHVyZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEVjYy52ZXJpZnkoc2lnbmF0dXJlLCBtZXNzYWdlLCBwdWJsaWNLZXkpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlQ3J5cHRcbiJdfQ==