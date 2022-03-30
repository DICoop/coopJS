"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
class CoreContract extends base_1.default {
    constructor(api, tableCodeConfig) {
        super(api, tableCodeConfig, 'core');
    }
}
exports.default = CoreContract;
//# sourceMappingURL=core.js.map