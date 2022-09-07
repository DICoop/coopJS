"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ono_1 = __importDefault(require("@jsdevtools/ono"));
var axios_1 = __importDefault(require("axios"));
var errors_1 = require("./errors");
var Registrator = /** @class */ (function () {
    function Registrator(config) {
        this.config = config;
    }
    Registrator.prototype.setConfig = function (config) {
        this.config = config;
    };
    Registrator.prototype.getUrl = function (path) {
        if (!this.config) {
            throw (0, ono_1.default)(new errors_1.RegistratorIsNotConfigured("registrator config is empty"));
        }
        return "".concat(this.config.api).concat(path).replace(/\/\/+/g, '/').replace('http:/', 'http://').replace('https:/', 'https://');
    };
    Registrator.prototype.post = function (path, data) {
        return axios_1.default.post(this.getUrl(path), data, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } }).then(function (r) { return r.data; });
    };
    Registrator.prototype.get = function (path, params) {
        return axios_1.default.get(this.getUrl(path), {
            params: params || {},
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        }).then(function (r) { return r.data; });
    };
    Registrator.prototype.setAccount = function (username, pub, ownerpub, email, referer, callback, accountType) {
        return this.get('/set', {
            username: username,
            active_pub: pub,
            owner_pub: ownerpub,
            email: email,
            locale: 'ru',
            referer: referer,
            callback: callback,
            type: accountType,
            meta: {},
        });
    };
    Registrator.prototype.checkEmail = function (email) {
        return this.get('/check', {
            email: email,
        });
    };
    return Registrator;
}());
exports.default = Registrator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9yZWdpc3RyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFrQztBQUNsQyxnREFBMEI7QUFFMUIsbUNBQW9EO0FBR3BEO0lBR0kscUJBQVksTUFBZ0M7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztJQUVELCtCQUFTLEdBQVQsVUFBVSxNQUF5QjtRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLElBQVk7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLE1BQU0sSUFBQSxhQUFHLEVBQUMsSUFBSSxtQ0FBMEIsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUE7U0FDM0U7UUFFRCxPQUFPLFVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQUcsSUFBSSxDQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDekgsQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxJQUFZLEVBQUUsSUFBUztRQUN4QixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUE7SUFDckosQ0FBQztJQUVELHlCQUFHLEdBQUgsVUFBSSxJQUFZLEVBQUUsTUFBWTtRQUMxQixPQUFPLGVBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLEVBQUUsTUFBTSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxFQUFFLEVBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBQztTQUNwRixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLFFBQXFCLEVBQUUsR0FBVyxFQUFFLFFBQWdCLEVBQUUsS0FBYSxFQUFFLE9BQXNCLEVBQUUsUUFBZ0IsRUFBRSxXQUFtQjtRQUN6SSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ3BCLFFBQVEsVUFBQTtZQUNSLFVBQVUsRUFBRSxHQUFHO1lBQ2YsU0FBUyxFQUFFLFFBQVE7WUFDbkIsS0FBSyxPQUFBO1lBQ0wsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLFNBQUE7WUFDUCxRQUFRLFVBQUE7WUFDUixJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxnQ0FBVSxHQUFWLFVBQVcsS0FBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ3RCLEtBQUssT0FBQTtTQUNSLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFFRCxrQkFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb25vIGZyb20gXCJAanNkZXZ0b29scy9vbm9cIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7UmVnaXN0cmF0b3JDb25maWd9IGZyb20gXCIuL3R5cGVzXCJcbmltcG9ydCB7UmVnaXN0cmF0b3JJc05vdENvbmZpZ3VyZWR9IGZyb20gXCIuL2Vycm9yc1wiO1xuaW1wb3J0IHtBY2NvdW50TmFtZX0gZnJvbSBcIi4uL2Vvcy90eXBlc1wiO1xuXG5jbGFzcyBSZWdpc3RyYXRvciB7XG4gICAgY29uZmlnOiBSZWdpc3RyYXRvckNvbmZpZyB8IG51bGxcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogUmVnaXN0cmF0b3JDb25maWcgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnXG4gICAgfVxuXG4gICAgc2V0Q29uZmlnKGNvbmZpZzogUmVnaXN0cmF0b3JDb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWdcbiAgICB9XG5cbiAgICBnZXRVcmwocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZykge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBSZWdpc3RyYXRvcklzTm90Q29uZmlndXJlZChgcmVnaXN0cmF0b3IgY29uZmlnIGlzIGVtcHR5YCkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYCR7dGhpcy5jb25maWcuYXBpfSR7cGF0aH1gLnJlcGxhY2UoL1xcL1xcLysvZywgJy8nKS5yZXBsYWNlKCdodHRwOi8nLCAnaHR0cDovLycpLnJlcGxhY2UoJ2h0dHBzOi8nLCAnaHR0cHM6Ly8nKVxuICAgIH1cblxuICAgIHBvc3QocGF0aDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QodGhpcy5nZXRVcmwocGF0aCksIGRhdGEsIHtoZWFkZXJzOiB7J0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJywgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ319KS50aGVuKHIgPT4gci5kYXRhKVxuICAgIH1cblxuICAgIGdldChwYXRoOiBzdHJpbmcsIHBhcmFtcz86IGFueSkge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KHRoaXMuZ2V0VXJsKHBhdGgpLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyB8fCB7fSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcbiAgICAgICAgfSkudGhlbihyID0+IHIuZGF0YSlcbiAgICB9XG5cbiAgICBzZXRBY2NvdW50KHVzZXJuYW1lOiBBY2NvdW50TmFtZSwgcHViOiBzdHJpbmcsIG93bmVycHViOiBzdHJpbmcsIGVtYWlsOiBzdHJpbmcsIHJlZmVyZXI6IHN0cmluZyB8IG51bGwsIGNhbGxiYWNrOiBzdHJpbmcsIGFjY291bnRUeXBlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCcvc2V0Jywge1xuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICBhY3RpdmVfcHViOiBwdWIsXG4gICAgICAgICAgICBvd25lcl9wdWI6IG93bmVycHViLFxuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICBsb2NhbGU6ICdydScsXG4gICAgICAgICAgICByZWZlcmVyLFxuICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICB0eXBlOiBhY2NvdW50VHlwZSxcbiAgICAgICAgICAgIG1ldGE6IHt9LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrRW1haWwoZW1haWw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJy9jaGVjaycsIHtcbiAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0cmF0b3I7Il19