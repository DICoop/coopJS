import ono from "@jsdevtools/ono";
import axios from "axios";
import {RegistratorConfig} from "./types"
import {RegistratorIsNotConfigured} from "./errors";
import {AccountName} from "../eos/types";

class Registrator {
    config: RegistratorConfig | null

    constructor(config: RegistratorConfig | null) {
        this.config = config
    }

    setConfig(config: RegistratorConfig) {
        this.config = config
    }

    getUrl(path: string): string {
        if (!this.config) {
            throw ono(new RegistratorIsNotConfigured(`registrator config is empty`))
        }

        return `${this.config.api}${path}`.replace(/\/\/+/g, '/')
    }

    post(path: string, data: any) {
        return axios.post(this.getUrl(path), data).then(r => r.data)
    }

    get(path: string, params?: any) {
        return axios.post(this.getUrl(path), params && {params}).then(r => r.data)
    }

    setAccount(username: AccountName, pub: string, ownerpub: string, email: string, referer: string | null, callback: string, accountType: string) {
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
        })
    }

    checkEmail(email: string) {
        return this.get('/check', {
            email,
        })
    }
}

export default Registrator;