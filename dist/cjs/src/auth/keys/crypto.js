"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64url_decode = exports.to_hex = exports.ab2b = exports.sha256 = exports.encode_b58 = void 0;
var encode_b58 = function (hex_number) {
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
exports.encode_b58 = encode_b58;
var sha256 = function (hex_str) { return __awaiter(void 0, void 0, void 0, function () {
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
exports.sha256 = sha256;
var ab2b = function (ab) {
    var buffer = [];
    var view = new Uint8Array(ab);
    for (var i = 0; i < ab.byteLength; i++)
        buffer[i] = view[i];
    return buffer;
};
exports.ab2b = ab2b;
var to_hex = function (bs) {
    var encoded = [];
    for (var i = 0; i < bs.length; i++) {
        encoded.push('0123456789abcdef'[(bs[i] >> 4) & 15]);
        encoded.push('0123456789abcdef'[bs[i] & 15]);
    }
    return encoded.join('');
};
exports.to_hex = to_hex;
var base64url_decode = function (value) {
    var m = value.length % 4;
    return Uint8Array.from(atob(value.replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(value.length + (m === 0 ? 0 : 4 - m), '=')), function (c) { return c.charCodeAt(0); }).buffer;
};
exports.base64url_decode = base64url_decode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdHMvc3JjL2F1dGgva2V5cy9jcnlwdG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTSxVQUFVLEdBQUcsVUFBQyxVQUFrQjtJQUMzQyxJQUFNLE1BQU0sR0FBRyw0REFBNEQsQ0FBQyxDQUFDLHNDQUFzQztJQUNuSCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBSyxVQUFVLENBQUUsQ0FBQyxDQUFDO0lBQ3BDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixJQUFJLFNBQWlCLENBQUM7SUFDdEIsSUFBSSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7SUFFNUIsT0FBTyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3RCLFNBQVMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLDhGQUE4RjtRQUNuSyxHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztLQUNwQjtJQUVELE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM5QixrQkFBa0IsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUM7UUFDOUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEM7SUFFRCxPQUFPLGtCQUFrQixDQUFDO0FBQzVCLENBQUMsQ0FBQTtBQW5CWSxRQUFBLFVBQVUsY0FtQnRCO0FBRU0sSUFBTSxNQUFNLEdBQUcsVUFBTyxPQUFlOzs7OztnQkFDcEMsVUFBVSxHQUFlLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUMxRSxxQkFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUE7O2dCQUEzRSxVQUFVLEdBQWdCLFNBQWlEO2dCQUMzRSxTQUFTLEdBQWEsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxPQUFPLEdBQVcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0Ysc0JBQU8sT0FBTyxFQUFDOzs7S0FDaEIsQ0FBQztBQU5XLFFBQUEsTUFBTSxVQU1qQjtBQUVLLElBQU0sSUFBSSxHQUFHLFVBQUMsRUFBZTtJQUNsQyxJQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDNUIsSUFBTSxJQUFJLEdBQWUsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFO1FBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFMVyxRQUFBLElBQUksUUFLZjtBQUVLLElBQU0sTUFBTSxHQUFHLFVBQUMsRUFBWTtJQUNqQyxJQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7SUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDOUM7SUFDRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBUFcsUUFBQSxNQUFNLFVBT2pCO0FBRUssSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEtBQWE7SUFDNUMsSUFBTSxDQUFDLEdBQVcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDbkMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1NBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQ3JELEVBQUUsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUM1QyxDQUFDLENBQUM7QUFQVyxRQUFBLGdCQUFnQixvQkFPM0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZW5jb2RlX2I1OCA9IChoZXhfbnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBiYXNlNTggPSAnMTIzNDU2Nzg5QUJDREVGR0hKS0xNTlBRUlNUVVZXWFlaYWJjZGVmZ2hpamttbm9wcXJzdHV2d3h5eic7IC8vINCf0YDQtdC+0LHRgNCw0LfQvtCy0LDQvdC+INCyINGB0YLRgNC+0LrRgyDQtNC70Y8g0YPQtNC+0LHRgdGC0LLQsFxuICBsZXQgbnVtID0gQmlnSW50KGAweCR7aGV4X251bWJlcn1gKTtcbiAgY29uc3QgZmlmdHk4ID0gQmlnSW50KDU4KTtcbiAgbGV0IHJlbWFpbmRlcjogQmlnSW50O1xuICBsZXQgYjU4X2VuY29kZWRfYnVmZmVyID0gJyc7XG4gIFxuICB3aGlsZSAobnVtID4gQmlnSW50KDApKSB7XG4gICAgcmVtYWluZGVyID0gbnVtICUgZmlmdHk4O1xuICAgIGI1OF9lbmNvZGVkX2J1ZmZlciA9IGJhc2U1OFtOdW1iZXIocmVtYWluZGVyKV0gKyBiNThfZW5jb2RlZF9idWZmZXI7IC8vINCf0YDQtdC+0LHRgNCw0LfQvtCy0LDQvdC40LUgQmlnSW50INCyIG51bWJlciDQt9C00LXRgdGMINC00L7Qv9GD0YHRgtC40LzQviwg0L/QvtGC0L7QvNGDINGH0YLQviByZW1haW5kZXIg0LLRgdC10LPQtNCwINCx0YPQtNC10YIg0LzQtdC90YzRiNC1IDU4XG4gICAgbnVtID0gbnVtIC8gZmlmdHk4O1xuICB9XG4gIFxuICB3aGlsZSAoaGV4X251bWJlci5tYXRjaCgvXjAwLykpIHtcbiAgICBiNThfZW5jb2RlZF9idWZmZXIgPSAnMScgKyBiNThfZW5jb2RlZF9idWZmZXI7XG4gICAgaGV4X251bWJlciA9IGhleF9udW1iZXIuc3Vic3RyaW5nKDIpO1xuICB9XG5cbiAgcmV0dXJuIGI1OF9lbmNvZGVkX2J1ZmZlcjtcbn1cblxuZXhwb3J0IGNvbnN0IHNoYTI1NiA9IGFzeW5jIChoZXhfc3RyOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBjb25zdCB0eXBlZEFycmF5OiBVaW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoaGV4X3N0ci5tYXRjaCgvW1xcZGEtZl17Mn0vZ2kpIS5tYXAoKGgpID0+IHBhcnNlSW50KGgsIDE2KSkpO1xuICBjb25zdCBoYXNoQnVmZmVyOiBBcnJheUJ1ZmZlciA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KCdTSEEtMjU2JywgdHlwZWRBcnJheSk7XG4gIGNvbnN0IGhhc2hBcnJheTogbnVtYmVyW10gPSBBcnJheS5mcm9tKG5ldyBVaW50OEFycmF5KGhhc2hCdWZmZXIpKTtcbiAgY29uc3QgaGFzaEhleDogc3RyaW5nID0gaGFzaEFycmF5Lm1hcCgoYnl0ZXMpID0+IGJ5dGVzLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpKS5qb2luKCcnKTtcbiAgcmV0dXJuIGhhc2hIZXg7XG59O1xuXG5leHBvcnQgY29uc3QgYWIyYiA9IChhYjogQXJyYXlCdWZmZXIpOiBudW1iZXJbXSA9PiB7XG4gIGNvbnN0IGJ1ZmZlcjogbnVtYmVyW10gPSBbXTtcbiAgY29uc3QgdmlldzogVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhYi5ieXRlTGVuZ3RoOyBpKyspIGJ1ZmZlcltpXSA9IHZpZXdbaV07XG4gIHJldHVybiBidWZmZXI7XG59O1xuXG5leHBvcnQgY29uc3QgdG9faGV4ID0gKGJzOiBudW1iZXJbXSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGVuY29kZWQ6IHN0cmluZ1tdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnMubGVuZ3RoOyBpKyspIHtcbiAgICBlbmNvZGVkLnB1c2goJzAxMjM0NTY3ODlhYmNkZWYnWyhic1tpXSA+PiA0KSAmIDE1XSk7XG4gICAgZW5jb2RlZC5wdXNoKCcwMTIzNDU2Nzg5YWJjZGVmJ1tic1tpXSAmIDE1XSk7XG4gIH1cbiAgcmV0dXJuIGVuY29kZWQuam9pbignJyk7XG59O1xuXG5leHBvcnQgY29uc3QgYmFzZTY0dXJsX2RlY29kZSA9ICh2YWx1ZTogc3RyaW5nKTogQXJyYXlCdWZmZXIgPT4ge1xuICBjb25zdCBtOiBudW1iZXIgPSB2YWx1ZS5sZW5ndGggJSA0O1xuICByZXR1cm4gVWludDhBcnJheS5mcm9tKGF0b2IoXG4gICAgdmFsdWUucmVwbGFjZSgvLS9nLCAnKycpXG4gICAgICAucmVwbGFjZSgvXy9nLCAnLycpXG4gICAgICAucGFkRW5kKHZhbHVlLmxlbmd0aCArIChtID09PSAwID8gMCA6IDQgLSBtKSwgJz0nKVxuICApLCAoYzogc3RyaW5nKSA9PiBjLmNoYXJDb2RlQXQoMCkpLmJ1ZmZlcjtcbn07XG4iXX0=