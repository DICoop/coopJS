import ono from "@jsdevtools/ono";
import axios from "axios";
import {PersonalDataConfig} from "./types"
import {PersonalDataIsNotConfigured} from "./errors";

class PersonalData {
    config: PersonalDataConfig | null

    constructor(config: PersonalDataConfig | null) {
        this.config = config
    }

    setConfig(config: PersonalDataConfig) {
        this.config = config
    }

    getUrl(path: string): string {
        if (!this.config) {
            throw ono(new PersonalDataIsNotConfigured(`personal data config is empty`))
        }

        return `${this.config.api}${path}`.replace(/\/\/+/g, '/').replace('http:/', 'http://').replace('https:/', 'https://')
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

    sendPersonalData(dataBundle: {senderPub: string, recipientPub: string, senderData: string, recipientData: string}, signature: string) {
        return this.post('/add-data', {
            data: dataBundle,
            signature,
        })
    }

    getPersonalDataAsRecipient(dataBundle: {recipientPub: string, ids: string[]}, signature: string) {
        return this.get('/get-data-as-recipient', {
            data: dataBundle,
            signature,
        })
    }

    getPersonalDataAsSender(dataBundle: {senderPub: string, ids: string[]}, signature: string) {
        return this.get('/get-data-as-sender', {
            data: dataBundle,
            signature,
        })
    }
}

export default PersonalData;