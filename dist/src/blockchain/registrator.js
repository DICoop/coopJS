"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ono_1 = __importDefault(require("@jsdevtools/ono"));
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("./errors");
class Registrator {
    constructor(config) {
        this.config = config;
    }
    setConfig(config) {
        this.config = config;
    }
    getUrl(path) {
        if (!this.config) {
            throw (0, ono_1.default)(new errors_1.RegistratorIsNotConfigured(`registrator config is empty`));
        }
        return `${this.config.api}${path}`.replace(/\/\/+/g, '/');
    }
    post(path, data) {
        return axios_1.default.post(this.getUrl(path), data).then(r => r.data);
    }
    get(path, params) {
        return axios_1.default.post(this.getUrl(path), params && { params }).then(r => r.data);
    }
    setAccount(username, pub, ownerpub, email, referer, callback, accountType) {
        return this.get('/set', {
            username,
            active_pub: pub,
            owner_pub: ownerpub,
            email,
            locale: 'ru',
            referer,
            callback,
            type: accountType,
            meta: {},
        });
    }
    checkEmail(email) {
        return this.get('/check', {
            email,
        });
    }
}
exports.default = Registrator;
//# sourceMappingURL=registrator.js.map