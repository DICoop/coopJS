"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ono_1 = __importDefault(require("@jsdevtools/ono"));
var axios_1 = __importDefault(require("axios"));
var errors_1 = require("./errors");
var PersonalData = /** @class */ (function () {
    function PersonalData(config) {
        this.config = config;
    }
    PersonalData.prototype.setConfig = function (config) {
        this.config = config;
    };
    PersonalData.prototype.getUrl = function (path) {
        if (!this.config) {
            throw (0, ono_1.default)(new errors_1.PersonalDataIsNotConfigured("personal data config is empty"));
        }
        return "".concat(this.config.api).concat(path).replace(/\/\/+/g, '/').replace('http:/', 'http://').replace('https:/', 'https://');
    };
    PersonalData.prototype.post = function (path, data) {
        return axios_1.default.post(this.getUrl(path), data, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } }).then(function (r) { return r.data; });
    };
    PersonalData.prototype.get = function (path, params) {
        return axios_1.default.get(this.getUrl(path), {
            params: params || {},
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        }).then(function (r) { return r.data; });
    };
    PersonalData.prototype.sendPersonalData = function (dataBundle, signature) {
        return this.post('/v1/user-data/add-data', {
            data: dataBundle,
            signature: signature,
        });
    };
    PersonalData.prototype.getPersonalDataAsRecipient = function (dataBundle, signature) {
        return this.get('/v1/user-data/get-data-as-recipient', {
            data: dataBundle,
            signature: signature,
        });
    };
    PersonalData.prototype.getPersonalDataAsSender = function (dataBundle, signature) {
        return this.get('/v1/user-data/get-data-as-sender', {
            data: dataBundle,
            signature: signature,
        });
    };
    return PersonalData;
}());
exports.default = PersonalData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uYWxEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHMvc3JjL2Jsb2NrY2hhaW4vcGVyc29uYWxEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWtDO0FBQ2xDLGdEQUEwQjtBQUUxQixtQ0FBcUQ7QUFFckQ7SUFHSSxzQkFBWSxNQUFpQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBRUQsZ0NBQVMsR0FBVCxVQUFVLE1BQTBCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQU8sSUFBWTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsTUFBTSxJQUFBLGFBQUcsRUFBQyxJQUFJLG9DQUEyQixDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQTtTQUM5RTtRQUVELE9BQU8sVUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBRyxJQUFJLENBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQTtJQUN6SCxDQUFDO0lBRUQsMkJBQUksR0FBSixVQUFLLElBQVksRUFBRSxJQUFTO1FBQ3hCLE9BQU8sZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxFQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLENBQUMsQ0FBQTtJQUNySixDQUFDO0lBRUQsMEJBQUcsR0FBSCxVQUFJLElBQVksRUFBRSxNQUFZO1FBQzFCLE9BQU8sZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sRUFBRSxNQUFNLElBQUksRUFBRTtZQUNwQixPQUFPLEVBQUUsRUFBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFDO1NBQ3BGLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFFRCx1Q0FBZ0IsR0FBaEIsVUFBaUIsVUFBZ0csRUFBRSxTQUFpQjtRQUNoSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDdkMsSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxXQUFBO1NBQ1osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGlEQUEwQixHQUExQixVQUEyQixVQUFpRCxFQUFFLFNBQWlCO1FBQzNGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRTtZQUNuRCxJQUFJLEVBQUUsVUFBVTtZQUNoQixTQUFTLFdBQUE7U0FDWixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsOENBQXVCLEdBQXZCLFVBQXdCLFVBQThDLEVBQUUsU0FBaUI7UUFDckYsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFO1lBQ2hELElBQUksRUFBRSxVQUFVO1lBQ2hCLFNBQVMsV0FBQTtTQUNaLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFsREQsSUFrREM7QUFFRCxrQkFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb25vIGZyb20gXCJAanNkZXZ0b29scy9vbm9cIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7UGVyc29uYWxEYXRhQ29uZmlnfSBmcm9tIFwiLi90eXBlc1wiXG5pbXBvcnQge1BlcnNvbmFsRGF0YUlzTm90Q29uZmlndXJlZH0gZnJvbSBcIi4vZXJyb3JzXCI7XG5cbmNsYXNzIFBlcnNvbmFsRGF0YSB7XG4gICAgY29uZmlnOiBQZXJzb25hbERhdGFDb25maWcgfCBudWxsXG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IFBlcnNvbmFsRGF0YUNvbmZpZyB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWdcbiAgICB9XG5cbiAgICBzZXRDb25maWcoY29uZmlnOiBQZXJzb25hbERhdGFDb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWdcbiAgICB9XG5cbiAgICBnZXRVcmwocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZykge1xuICAgICAgICAgICAgdGhyb3cgb25vKG5ldyBQZXJzb25hbERhdGFJc05vdENvbmZpZ3VyZWQoYHBlcnNvbmFsIGRhdGEgY29uZmlnIGlzIGVtcHR5YCkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYCR7dGhpcy5jb25maWcuYXBpfSR7cGF0aH1gLnJlcGxhY2UoL1xcL1xcLysvZywgJy8nKS5yZXBsYWNlKCdodHRwOi8nLCAnaHR0cDovLycpLnJlcGxhY2UoJ2h0dHBzOi8nLCAnaHR0cHM6Ly8nKVxuICAgIH1cblxuICAgIHBvc3QocGF0aDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QodGhpcy5nZXRVcmwocGF0aCksIGRhdGEsIHtoZWFkZXJzOiB7J0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJywgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ319KS50aGVuKHIgPT4gci5kYXRhKVxuICAgIH1cblxuICAgIGdldChwYXRoOiBzdHJpbmcsIHBhcmFtcz86IGFueSkge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KHRoaXMuZ2V0VXJsKHBhdGgpLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyB8fCB7fSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcbiAgICAgICAgfSkudGhlbihyID0+IHIuZGF0YSlcbiAgICB9XG5cbiAgICBzZW5kUGVyc29uYWxEYXRhKGRhdGFCdW5kbGU6IHtzZW5kZXJQdWI6IHN0cmluZywgcmVjaXBpZW50UHViOiBzdHJpbmcsIHNlbmRlckRhdGE6IHN0cmluZywgcmVjaXBpZW50RGF0YTogc3RyaW5nfSwgc2lnbmF0dXJlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdCgnL3YxL3VzZXItZGF0YS9hZGQtZGF0YScsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGFCdW5kbGUsXG4gICAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0UGVyc29uYWxEYXRhQXNSZWNpcGllbnQoZGF0YUJ1bmRsZToge3JlY2lwaWVudFB1Yjogc3RyaW5nLCBpZHM6IHN0cmluZ1tdfSwgc2lnbmF0dXJlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCcvdjEvdXNlci1kYXRhL2dldC1kYXRhLWFzLXJlY2lwaWVudCcsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGFCdW5kbGUsXG4gICAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0UGVyc29uYWxEYXRhQXNTZW5kZXIoZGF0YUJ1bmRsZToge3NlbmRlclB1Yjogc3RyaW5nLCBpZHM6IHN0cmluZ1tdfSwgc2lnbmF0dXJlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCcvdjEvdXNlci1kYXRhL2dldC1kYXRhLWFzLXNlbmRlcicsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGFCdW5kbGUsXG4gICAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQZXJzb25hbERhdGE7Il19