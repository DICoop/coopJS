var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
export var encode_b58 = function (hex_number) {
    var base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'; // Преобразовано в строку для удобства
    var num = BigInt("0x".concat(hex_number));
    var fifty8 = BigInt(58);
    var remainder;
    var b58_encoded_buffer = '';
    while (num > BigInt(0)) {
        remainder = num % fifty8;
        b58_encoded_buffer = base58[Number(remainder)] + b58_encoded_buffer; // Преобразование BigInt в number здесь допустимо, потому что remainder всегда будет меньше 58
        num = num / fifty8;
    }
    while (hex_number.match(/^00/)) {
        b58_encoded_buffer = '1' + b58_encoded_buffer;
        hex_number = hex_number.substring(2);
    }
    return b58_encoded_buffer;
};
export var sha256 = function (hex_str) { return __awaiter(void 0, void 0, void 0, function () {
    var typedArray, hashBuffer, hashArray, hashHex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                typedArray = new Uint8Array(hex_str.match(/[\da-f]{2}/gi).map(function (h) { return parseInt(h, 16); }));
                return [4 /*yield*/, crypto.subtle.digest('SHA-256', typedArray)];
            case 1:
                hashBuffer = _a.sent();
                hashArray = Array.from(new Uint8Array(hashBuffer));
                hashHex = hashArray.map(function (bytes) { return bytes.toString(16).padStart(2, '0'); }).join('');
                return [2 /*return*/, hashHex];
        }
    });
}); };
export var ab2b = function (ab) {
    var buffer = [];
    var view = new Uint8Array(ab);
    for (var i = 0; i < ab.byteLength; i++)
        buffer[i] = view[i];
    return buffer;
};
export var to_hex = function (bs) {
    var encoded = [];
    for (var i = 0; i < bs.length; i++) {
        encoded.push('0123456789abcdef'[(bs[i] >> 4) & 15]);
        encoded.push('0123456789abcdef'[bs[i] & 15]);
    }
    return encoded.join('');
};
export var base64url_decode = function (value) {
    var m = value.length % 4;
    return Uint8Array.from(atob(value.replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(value.length + (m === 0 ? 0 : 4 - m), '=')), function (c) { return c.charCodeAt(0); }).buffer;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2F1dGgva2V5cy9jcnlwdG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLFVBQUMsVUFBa0I7SUFDM0MsSUFBTSxNQUFNLEdBQUcsNERBQTRELENBQUMsQ0FBQyxzQ0FBc0M7SUFDbkgsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQUssVUFBVSxDQUFFLENBQUMsQ0FBQztJQUNwQyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUIsSUFBSSxTQUFpQixDQUFDO0lBQ3RCLElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0lBRTVCLE9BQU8sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN0QixTQUFTLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN6QixrQkFBa0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyw4RkFBOEY7UUFDbkssR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7S0FDcEI7SUFFRCxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDOUIsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDO1FBQzlDLFVBQVUsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsT0FBTyxrQkFBa0IsQ0FBQztBQUM1QixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsSUFBTSxNQUFNLEdBQUcsVUFBTyxPQUFlOzs7OztnQkFDcEMsVUFBVSxHQUFlLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxxQkFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUE7O2dCQUEzRSxVQUFVLEdBQWdCLFNBQWlEO2dCQUMzRSxTQUFTLEdBQWEsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxPQUFPLEdBQVcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0Ysc0JBQU8sT0FBTyxFQUFDOzs7S0FDaEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRyxVQUFDLEVBQWU7SUFDbEMsSUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBQzVCLElBQU0sSUFBSSxHQUFlLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRTtRQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFHLFVBQUMsRUFBWTtJQUNqQyxJQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDOUM7SUFDRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxLQUFhO0lBQzVDLElBQU0sQ0FBQyxHQUFXLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztTQUNyQixPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztTQUNsQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUNyRCxFQUFFLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDNUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGVuY29kZV9iNTggPSAoaGV4X251bWJlcjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYmFzZTU4ID0gJzEyMzQ1Njc4OUFCQ0RFRkdISktMTU5QUVJTVFVWV1hZWmFiY2RlZmdoaWprbW5vcHFyc3R1dnd4eXonOyAvLyDQn9GA0LXQvtCx0YDQsNC30L7QstCw0L3QviDQsiDRgdGC0YDQvtC60YMg0LTQu9GPINGD0LTQvtCx0YHRgtCy0LBcbiAgbGV0IG51bSA9IEJpZ0ludChgMHgke2hleF9udW1iZXJ9YCk7XG4gIGNvbnN0IGZpZnR5OCA9IEJpZ0ludCg1OCk7XG4gIGxldCByZW1haW5kZXI6IEJpZ0ludDtcbiAgbGV0IGI1OF9lbmNvZGVkX2J1ZmZlciA9ICcnO1xuICBcbiAgd2hpbGUgKG51bSA+IEJpZ0ludCgwKSkge1xuICAgIHJlbWFpbmRlciA9IG51bSAlIGZpZnR5ODtcbiAgICBiNThfZW5jb2RlZF9idWZmZXIgPSBiYXNlNThbTnVtYmVyKHJlbWFpbmRlcildICsgYjU4X2VuY29kZWRfYnVmZmVyOyAvLyDQn9GA0LXQvtCx0YDQsNC30L7QstCw0L3QuNC1IEJpZ0ludCDQsiBudW1iZXIg0LfQtNC10YHRjCDQtNC+0L/Rg9GB0YLQuNC80L4sINC/0L7RgtC+0LzRgyDRh9GC0L4gcmVtYWluZGVyINCy0YHQtdCz0LTQsCDQsdGD0LTQtdGCINC80LXQvdGM0YjQtSA1OFxuICAgIG51bSA9IG51bSAvIGZpZnR5ODtcbiAgfVxuICBcbiAgd2hpbGUgKGhleF9udW1iZXIubWF0Y2goL14wMC8pKSB7XG4gICAgYjU4X2VuY29kZWRfYnVmZmVyID0gJzEnICsgYjU4X2VuY29kZWRfYnVmZmVyO1xuICAgIGhleF9udW1iZXIgPSBoZXhfbnVtYmVyLnN1YnN0cmluZygyKTtcbiAgfVxuXG4gIHJldHVybiBiNThfZW5jb2RlZF9idWZmZXI7XG59XG5cbmV4cG9ydCBjb25zdCBzaGEyNTYgPSBhc3luYyAoaGV4X3N0cjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgY29uc3QgdHlwZWRBcnJheTogVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGhleF9zdHIubWF0Y2goL1tcXGRhLWZdezJ9L2dpKSEubWFwKChoKSA9PiBwYXJzZUludChoLCAxNikpKTtcbiAgY29uc3QgaGFzaEJ1ZmZlcjogQXJyYXlCdWZmZXIgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdCgnU0hBLTI1NicsIHR5cGVkQXJyYXkpO1xuICBjb25zdCBoYXNoQXJyYXk6IG51bWJlcltdID0gQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShoYXNoQnVmZmVyKSk7XG4gIGNvbnN0IGhhc2hIZXg6IHN0cmluZyA9IGhhc2hBcnJheS5tYXAoKGJ5dGVzKSA9PiBieXRlcy50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSkuam9pbignJyk7XG4gIHJldHVybiBoYXNoSGV4O1xufTtcblxuZXhwb3J0IGNvbnN0IGFiMmIgPSAoYWI6IEFycmF5QnVmZmVyKTogbnVtYmVyW10gPT4ge1xuICBjb25zdCBidWZmZXI6IG51bWJlcltdID0gW107XG4gIGNvbnN0IHZpZXc6IFVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShhYik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWIuYnl0ZUxlbmd0aDsgaSsrKSBidWZmZXJbaV0gPSB2aWV3W2ldO1xuICByZXR1cm4gYnVmZmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvX2hleCA9IChiczogbnVtYmVyW10pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBlbmNvZGVkOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJzLmxlbmd0aDsgaSsrKSB7XG4gICAgZW5jb2RlZC5wdXNoKCcwMTIzNDU2Nzg5YWJjZGVmJ1soYnNbaV0gPj4gNCkgJiAxNV0pO1xuICAgIGVuY29kZWQucHVzaCgnMDEyMzQ1Njc4OWFiY2RlZidbYnNbaV0gJiAxNV0pO1xuICB9XG4gIHJldHVybiBlbmNvZGVkLmpvaW4oJycpO1xufTtcblxuZXhwb3J0IGNvbnN0IGJhc2U2NHVybF9kZWNvZGUgPSAodmFsdWU6IHN0cmluZyk6IEFycmF5QnVmZmVyID0+IHtcbiAgY29uc3QgbTogbnVtYmVyID0gdmFsdWUubGVuZ3RoICUgNDtcbiAgcmV0dXJuIFVpbnQ4QXJyYXkuZnJvbShhdG9iKFxuICAgIHZhbHVlLnJlcGxhY2UoLy0vZywgJysnKVxuICAgICAgLnJlcGxhY2UoL18vZywgJy8nKVxuICAgICAgLnBhZEVuZCh2YWx1ZS5sZW5ndGggKyAobSA9PT0gMCA/IDAgOiA0IC0gbSksICc9JylcbiAgKSwgKGM6IHN0cmluZykgPT4gYy5jaGFyQ29kZUF0KDApKS5idWZmZXI7XG59O1xuIl19