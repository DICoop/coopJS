"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var Explorer = /** @class */ (function () {
    function Explorer(baseUrl) {
        this.baseUrl = baseUrl;
    }
    Explorer.prototype.getUrl = function (path) {
        var result = this.baseUrl;
        if (result.endsWith('/')) {
            result = result.substring(0, result.length - 1);
        }
        if (path[0] === '/') {
            result = result + path;
        }
        else {
            result = result + '/' + path;
        }
        return result;
    };
    Explorer.prototype.post = function (path, data) {
        return axios_1.default.post(this.getUrl(path), data, { headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' } }).then(function (r) { return r.data; });
    };
    Explorer.prototype.get = function (path, params) {
        return axios_1.default.get(this.getUrl(path), {
            params: params || {},
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        }).then(function (r) { return r.data; });
    };
    Explorer.prototype.getHistoryActions = function (username, limit, skip) {
        return this.get('/v2/history/get_actions', {
            account: username,
            limit: limit,
            skip: skip,
            noBinary: 'true',
            simple: 'true',
        });
    };
    return Explorer;
}());
exports.default = Explorer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwbG9yZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy9zcmMvYmxvY2tjaGFpbi9leHBsb3Jlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUEwQjtBQUcxQjtJQUdJLGtCQUFZLE9BQWU7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDMUIsQ0FBQztJQUVELHlCQUFNLEdBQU4sVUFBTyxJQUFZO1FBQ2YsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUN6QixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDbEQ7UUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDakIsTUFBTSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUE7U0FDekI7YUFBTTtZQUNILE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQTtTQUMvQjtRQUNELE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7SUFFRCx1QkFBSSxHQUFKLFVBQUssSUFBWSxFQUFFLElBQVM7UUFDeEIsT0FBTyxlQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLEVBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQyxDQUFBO0lBQ3JKLENBQUM7SUFFRCxzQkFBRyxHQUFILFVBQUksSUFBWSxFQUFFLE1BQVk7UUFDMUIsT0FBTyxlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsTUFBTSxFQUFFLE1BQU0sSUFBSSxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxFQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUM7U0FDcEYsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVELG9DQUFpQixHQUFqQixVQUFrQixRQUFxQixFQUFFLEtBQWEsRUFBRSxJQUFZO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRTtZQUN2QyxPQUFPLEVBQUUsUUFBUTtZQUNqQixLQUFLLE9BQUE7WUFDTCxJQUFJLE1BQUE7WUFDSixRQUFRLEVBQUUsTUFBTTtZQUNoQixNQUFNLEVBQUUsTUFBTTtTQUNqQixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUFFRCxrQkFBZSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQge0FjY291bnROYW1lfSBmcm9tIFwiLi4vZW9zL3R5cGVzXCI7XG5cbmNsYXNzIEV4cGxvcmVyIHtcbiAgICBiYXNlVXJsOiBzdHJpbmdcblxuICAgIGNvbnN0cnVjdG9yKGJhc2VVcmw6IHN0cmluZykge1xuICAgICAgICB0aGlzLmJhc2VVcmwgPSBiYXNlVXJsXG4gICAgfVxuXG4gICAgZ2V0VXJsKHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmJhc2VVcmxcbiAgICAgICAgaWYgKHJlc3VsdC5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyaW5nKDAsIHJlc3VsdC5sZW5ndGggLSAxKVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXRoWzBdID09PSAnLycpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIHBhdGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArICcvJyArIHBhdGhcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgcG9zdChwYXRoOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdCh0aGlzLmdldFVybChwYXRoKSwgZGF0YSwge2hlYWRlcnM6IHsnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfX0pLnRoZW4ociA9PiByLmRhdGEpXG4gICAgfVxuXG4gICAgZ2V0KHBhdGg6IHN0cmluZywgcGFyYW1zPzogYW55KSB7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQodGhpcy5nZXRVcmwocGF0aCksIHtcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zIHx8IHt9LFxuICAgICAgICAgICAgaGVhZGVyczogeydBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxuICAgICAgICB9KS50aGVuKHIgPT4gci5kYXRhKVxuICAgIH1cblxuICAgIGdldEhpc3RvcnlBY3Rpb25zKHVzZXJuYW1lOiBBY2NvdW50TmFtZSwgbGltaXQ6IG51bWJlciwgc2tpcDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnL3YyL2hpc3RvcnkvZ2V0X2FjdGlvbnMnLCB7XG4gICAgICAgICAgICBhY2NvdW50OiB1c2VybmFtZSxcbiAgICAgICAgICAgIGxpbWl0LFxuICAgICAgICAgICAgc2tpcCxcbiAgICAgICAgICAgIG5vQmluYXJ5OiAndHJ1ZScsXG4gICAgICAgICAgICBzaW1wbGU6ICd0cnVlJyxcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGxvcmVyOyJdfQ==