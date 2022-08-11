import axios from "axios";
import {AccountName} from "../eos/types";

class Explorer {
    baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    getUrl(path: string): string {
        let result = this.baseUrl
        if (result.endsWith('/')) {
            result = result.substring(0, result.length - 1)
        }
        if (path[0] === '/') {
            result = result + path
        } else {
            result = result + '/' + path
        }
        return result
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