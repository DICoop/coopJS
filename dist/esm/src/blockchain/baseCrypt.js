import Ecc from 'eosjs-ecc';
import { encrypt, decrypt } from 'eos-encrypt';
var BaseCrypt = /** @class */ (function () {
    function BaseCrypt() {
    }
    BaseCrypt.prototype.decrypt = function (authKey, publicKey, message, memo) {
        return Promise.resolve(encrypt(authKey, publicKey, message, { memo: memo, maxsize: 10000 }));
    };
    BaseCrypt.prototype.encrypt = function (authKey, publicKey, message, memo) {
        return Promise.resolve(decrypt(authKey, publicKey, message, { memo: memo }));
    };
    BaseCrypt.prototype.sign = function (privateKey, message) {
        return Ecc.sign(message, privateKey);
    };
    BaseCrypt.prototype.verify = function (publicKey, signature, message) {
        return Ecc.verify(signature, message, publicKey);
    };
    return BaseCrypt;
}());
export default BaseCrypt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUNyeXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vYmFzZUNyeXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQTtBQUMzQixPQUFPLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUk1QztJQUFBO0lBZ0JBLENBQUM7SUFmRywyQkFBTyxHQUFQLFVBQVEsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBZSxFQUFFLElBQWE7UUFDdEUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFDLElBQUksTUFBQSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVELDJCQUFPLEdBQVAsVUFBUSxPQUFlLEVBQUUsU0FBaUIsRUFBRSxPQUFlLEVBQUUsSUFBYTtRQUN0RSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUMsSUFBSSxNQUFBLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELHdCQUFJLEdBQUosVUFBSyxVQUFrQixFQUFFLE9BQWU7UUFDcEMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQsMEJBQU0sR0FBTixVQUFPLFNBQWlCLEVBQUUsU0FBaUIsRUFBRSxPQUFlO1FBQ3hELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3BELENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFFRCxlQUFlLFNBQVMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFY2MgZnJvbSAnZW9zanMtZWNjJ1xuaW1wb3J0IHtlbmNyeXB0LCBkZWNyeXB0fSBmcm9tICdlb3MtZW5jcnlwdCdcblxuaW1wb3J0IHtDaGFpbkNyeXB0fSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jbGFzcyBCYXNlQ3J5cHQgaW1wbGVtZW50cyBDaGFpbkNyeXB0IHtcbiAgICBkZWNyeXB0KGF1dGhLZXk6IHN0cmluZywgcHVibGljS2V5OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgbWVtbz86IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZW5jcnlwdChhdXRoS2V5LCBwdWJsaWNLZXksIG1lc3NhZ2UsIHttZW1vLCBtYXhzaXplOiAxMDAwMH0pKTtcbiAgICB9XG5cbiAgICBlbmNyeXB0KGF1dGhLZXk6IHN0cmluZywgcHVibGljS2V5OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgbWVtbz86IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVjcnlwdChhdXRoS2V5LCBwdWJsaWNLZXksIG1lc3NhZ2UsIHttZW1vfSkpO1xuICAgIH1cblxuICAgIHNpZ24ocHJpdmF0ZUtleTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gRWNjLnNpZ24obWVzc2FnZSwgcHJpdmF0ZUtleSlcbiAgICB9XG5cbiAgICB2ZXJpZnkocHVibGljS2V5OiBzdHJpbmcsIHNpZ25hdHVyZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIEVjYy52ZXJpZnkoc2lnbmF0dXJlLCBtZXNzYWdlLCBwdWJsaWNLZXkpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlQ3J5cHRcbiJdfQ==