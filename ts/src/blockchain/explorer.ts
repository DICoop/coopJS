import axios from "axios";
import {AccountName} from "../eos/types";

class Explorer {
    baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    getUrl(path: string): string {
        return `${this.baseUrl}${path}`.replace(/\/\/+/g, '/')
    }

    post(path: string, data: any) {
        return axios.post(this.getUrl(path), data, {headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}}).then(r => r.data)
    }

    get(path: string, params?: any) {
        return axios.get(this.getUrl(path), {
            params: params || {},
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        }).then(r => r.data)
    }

    getHistoryActions(username: AccountName, limit: number, skip: number) {
        return this.get('/v2/history/get_actions', {
            account: username,
            limit,
            skip,
            noBinary: 'true',
            simple: 'true',
        })
    }
}

export default Explorer;