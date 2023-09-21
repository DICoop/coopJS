import ono from "@jsdevtools/ono";
import axios from "axios";
import { RegistratorIsNotConfigured } from "./errors";
var Registrator = /** @class */ (function () {
    function Registrator(config) {
        this.config = config;
    }
    Registrator.prototype.setConfig = function (config) {
        this.config = config;
    };
    Registrator.prototype.getUrl = function (path) {
        if (!this.config) {
            throw ono(new RegistratorIsNotConfigured("registrator config is empty"));
        }
        return "".concat(this.config.api).concat(path).replace(/\/\/+/g, '/').replace('http:/', 'http://').replace('https:/', 'https://');
    };
    Registrator.prototype.post = function (path, data) {
        return axios.post(this.getUrl(path), data, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } }).then(function (r) { return r.data; });
    };
    Registrator.prototype.get = function (path, params) {
        return axios.get(this.getUrl(path), {
            params: params || {},
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        }).then(function (r) { return r.data; });
    };
    Registrator.prototype.setAccount = function (locale, username, pub, ownerpub, email, referer, callback, meta) {
        return this.get('/register', {
            locale: locale,
            username: username,
            active_pub: pub,
            owner_pub: ownerpub,
            email: email,
            referer: referer,
            callback: callback,
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
export default Registrator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9yZWdpc3RyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBR3BEO0lBR0kscUJBQVksTUFBZ0M7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztJQUVELCtCQUFTLEdBQVQsVUFBVSxNQUF5QjtRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN4QixDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLElBQVk7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLE1BQU0sR0FBRyxDQUFDLElBQUksMEJBQTBCLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFBO1NBQzNFO1FBRUQsT0FBTyxVQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxTQUFHLElBQUksQ0FBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ3pILENBQUM7SUFFRCwwQkFBSSxHQUFKLFVBQUssSUFBWSxFQUFFLElBQVM7UUFDeEIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQyxDQUFBO0lBQ3JKLENBQUM7SUFFRCx5QkFBRyxHQUFILFVBQUksSUFBWSxFQUFFLE1BQVk7UUFDMUIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsTUFBTSxFQUFFLE1BQU0sSUFBSSxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxFQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUM7U0FDcEYsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxNQUFjLEVBQUUsUUFBcUIsRUFBRSxHQUFXLEVBQUUsUUFBZ0IsRUFBRSxLQUFhLEVBQUUsT0FBc0IsRUFBRSxRQUFnQixFQUFFLElBQVk7UUFDbEosT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtZQUN6QixNQUFNLFFBQUE7WUFDTixRQUFRLFVBQUE7WUFDUixVQUFVLEVBQUUsR0FBRztZQUNmLFNBQVMsRUFBRSxRQUFRO1lBQ25CLEtBQUssT0FBQTtZQUNMLE9BQU8sU0FBQTtZQUNQLFFBQVEsVUFBQTtZQUNSLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxLQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDdEIsS0FBSyxPQUFBO1NBQ1IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQWhERCxJQWdEQztBQUVELGVBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9ubyBmcm9tIFwiQGpzZGV2dG9vbHMvb25vXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQge1JlZ2lzdHJhdG9yQ29uZmlnfSBmcm9tIFwiLi90eXBlc1wiXG5pbXBvcnQge1JlZ2lzdHJhdG9ySXNOb3RDb25maWd1cmVkfSBmcm9tIFwiLi9lcnJvcnNcIjtcbmltcG9ydCB7QWNjb3VudE5hbWV9IGZyb20gXCIuLi9lb3MvdHlwZXNcIjtcblxuY2xhc3MgUmVnaXN0cmF0b3Ige1xuICAgIGNvbmZpZzogUmVnaXN0cmF0b3JDb25maWcgfCBudWxsXG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IFJlZ2lzdHJhdG9yQ29uZmlnIHwgbnVsbCkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ1xuICAgIH1cblxuICAgIHNldENvbmZpZyhjb25maWc6IFJlZ2lzdHJhdG9yQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnXG4gICAgfVxuXG4gICAgZ2V0VXJsKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcpIHtcbiAgICAgICAgICAgIHRocm93IG9ubyhuZXcgUmVnaXN0cmF0b3JJc05vdENvbmZpZ3VyZWQoYHJlZ2lzdHJhdG9yIGNvbmZpZyBpcyBlbXB0eWApKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGAke3RoaXMuY29uZmlnLmFwaX0ke3BhdGh9YC5yZXBsYWNlKC9cXC9cXC8rL2csICcvJykucmVwbGFjZSgnaHR0cDovJywgJ2h0dHA6Ly8nKS5yZXBsYWNlKCdodHRwczovJywgJ2h0dHBzOi8vJylcbiAgICB9XG5cbiAgICBwb3N0KHBhdGg6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KHRoaXMuZ2V0VXJsKHBhdGgpLCBkYXRhLCB7aGVhZGVyczogeydBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9fSkudGhlbihyID0+IHIuZGF0YSlcbiAgICB9XG5cbiAgICBnZXQocGF0aDogc3RyaW5nLCBwYXJhbXM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldCh0aGlzLmdldFVybChwYXRoKSwge1xuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMgfHwge30sXG4gICAgICAgICAgICBoZWFkZXJzOiB7J0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJywgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmRhdGEpXG4gICAgfVxuXG4gICAgc2V0QWNjb3VudChsb2NhbGU6IHN0cmluZywgdXNlcm5hbWU6IEFjY291bnROYW1lLCBwdWI6IHN0cmluZywgb3duZXJwdWI6IHN0cmluZywgZW1haWw6IHN0cmluZywgcmVmZXJlcjogc3RyaW5nIHwgbnVsbCwgY2FsbGJhY2s6IHN0cmluZywgbWV0YTogU3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnL3JlZ2lzdGVyJywge1xuICAgICAgICAgICAgbG9jYWxlLFxuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICBhY3RpdmVfcHViOiBwdWIsXG4gICAgICAgICAgICBvd25lcl9wdWI6IG93bmVycHViLFxuICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICByZWZlcmVyLFxuICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICBtZXRhOiBtZXRhLFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoZWNrRW1haWwoZW1haWw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJy9jaGVjaycsIHtcbiAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0cmF0b3I7Il19