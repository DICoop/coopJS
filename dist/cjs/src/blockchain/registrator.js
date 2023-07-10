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
    Registrator.prototype.setAccount = function (username, pub, ownerpub, email, referer, callback, accountType, meta) {
        return this.get('/set', {
            username: username,
            active_pub: pub,
            owner_pub: ownerpub,
            email: email,
            locale: 'ru',
            referer: referer,
            callback: callback,
            type: accountType,
            meta: meta,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9yZWdpc3RyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFrQztBQUNsQyxnREFBMEI7QUFFMUIsbUNBQW9EO0FBR3BEO0lBR0kscUJBQVksTUFBZ0M7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztJQUVELCtCQUFTLEdBQVQsVUFBVSxNQUF5QjtRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLElBQVk7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLE1BQU0sSUFBQSxhQUFHLEVBQUMsSUFBSSxtQ0FBMEIsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUE7U0FDM0U7UUFFRCxPQUFPLFVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQUcsSUFBSSxDQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDekgsQ0FBQztJQUVELDBCQUFJLEdBQUosVUFBSyxJQUFZLEVBQUUsSUFBUztRQUN4QixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsRUFBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUE7SUFDckosQ0FBQztJQUVELHlCQUFHLEdBQUgsVUFBSSxJQUFZLEVBQUUsTUFBWTtRQUMxQixPQUFPLGVBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxNQUFNLEVBQUUsTUFBTSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxFQUFFLEVBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBQztTQUNwRixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLFFBQXFCLEVBQUUsR0FBVyxFQUFFLFFBQWdCLEVBQUUsS0FBYSxFQUFFLE9BQXNCLEVBQUUsUUFBZ0IsRUFBRSxXQUFtQixFQUFFLElBQVk7UUFDdkosT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNwQixRQUFRLFVBQUE7WUFDUixVQUFVLEVBQUUsR0FBRztZQUNmLFNBQVMsRUFBRSxRQUFRO1lBQ25CLEtBQUssT0FBQTtZQUNMLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxTQUFBO1lBQ1AsUUFBUSxVQUFBO1lBQ1IsSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLEtBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUN0QixLQUFLLE9BQUE7U0FDUixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBakRELElBaURDO0FBRUQsa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9ubyBmcm9tIFwiQGpzZGV2dG9vbHMvb25vXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQge1JlZ2lzdHJhdG9yQ29uZmlnfSBmcm9tIFwiLi90eXBlc1wiXG5pbXBvcnQge1JlZ2lzdHJhdG9ySXNOb3RDb25maWd1cmVkfSBmcm9tIFwiLi9lcnJvcnNcIjtcbmltcG9ydCB7QWNjb3VudE5hbWV9IGZyb20gXCIuLi9lb3MvdHlwZXNcIjtcblxuY2xhc3MgUmVnaXN0cmF0b3Ige1xuICAgIGNvbmZpZzogUmVnaXN0cmF0b3JDb25maWcgfCBudWxsXG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IFJlZ2lzdHJhdG9yQ29uZmlnIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ1xuICAgIH1cblxuICAgIHNldENvbmZpZyhjb25maWc6IFJlZ2lzdHJhdG9yQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnXG4gICAgfVxuXG4gICAgZ2V0VXJsKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgUmVnaXN0cmF0b3JJc05vdENvbmZpZ3VyZWQoYHJlZ2lzdHJhdG9yIGNvbmZpZyBpcyBlbXB0eWApKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29uZmlnLmFwaX0ke3BhdGh9YC5yZXBsYWNlKC9cXC9cXC8rL2csICcvJykucmVwbGFjZSgnaHR0cDovJywgJ2h0dHA6Ly8nKS5yZXBsYWNlKCdodHRwczovJywgJ2h0dHBzOi8vJylcbiAgICB9XG5cbiAgICBwb3N0KHBhdGg6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KHRoaXMuZ2V0VXJsKHBhdGgpLCBkYXRhLCB7aGVhZGVyczogeydBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9fSkudGhlbihyID0+IHIuZGF0YSlcbiAgICB9XG5cbiAgICBnZXQocGF0aDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldCh0aGlzLmdldFVybChwYXRoKSwge1xuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMgfHwge30sXG4gICAgICAgICAgICBoZWFkZXJzOiB7J0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJywgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmRhdGEpXG4gICAgfVxuXG4gICAgc2V0QWNjb3VudCh1c2VybmFtZTogQWNjb3VudE5hbWUsIHB1Yjogc3RyaW5nLCBvd25lcnB1Yjogc3RyaW5nLCBlbWFpbDogc3RyaW5nLCByZWZlcmVyOiBzdHJpbmcgfCBudWxsLCBjYWxsYmFjazogc3RyaW5nLCBhY2NvdW50VHlwZTogc3RyaW5nLCBtZXRhOiBTdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCcvc2V0Jywge1xuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICBhY3RpdmVfcHViOiBwdWIsXG4gICAgICAgICAgICBvd25lcl9wdWI6IG93bmVycHViLFxuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICBsb2NhbGU6ICdydScsXG4gICAgICAgICAgICByZWZlcmVyLFxuICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICB0eXBlOiBhY2NvdW50VHlwZSxcbiAgICAgICAgICAgIG1ldGE6IG1ldGEsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2hlY2tFbWFpbChlbWFpbDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnL2NoZWNrJywge1xuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWdpc3RyYXRvcjsiXX0=