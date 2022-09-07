import {TextDecoder, TextEncoder} from 'text-encoding';
import {Api, JsonRpc} from 'eosjs';
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig';
import {SignatureProvider, TransactConfig, Transaction, TransactResult} from 'eosjs/dist/eosjs-api-interfaces';
import {PushTransactionArgs, ReadOnlyTransactResult} from 'eosjs/dist/eosjs-rpc-interfaces';
import fetch from 'isomorphic-fetch'
import ono from "@jsdevtools/ono";
import btoa from 'btoa';
import atob from 'atob';
import unescape from 'core-js-pure/stable/unescape'
import escape from 'core-js-pure/stable/escape'

import EosioContract from './contracts/eosio'
import CoreContract from './contracts/core'
import PartnersContract from './contracts/partners'
import P2PContract from './contracts/p2p'
import NftContract from './contracts/nft'
import {
    AuthKeySearchCallback,
    AuthKeyType,
    ChainConfig,
    ChainCrypt,
    SignatureProviderMaker,
    TableCodeConfig
} from './types'
import ReadApi from './readApi'
import BaseContract from "./contracts/base";
import {NotImplementedError} from './errors';
import BaseCrypt from "./baseCrypt";
import Wallet from "./wallet";
import Explorer from "./explorer";
import PersonalData from "./personalData";

interface RpcsByEndpoints {
    [key: string]: JsonRpc
}

const JsSignatureProviderMaker = ((wif: string) => Promise.resolve(new JsSignatureProvider([wif])))

class Chain {
    private readonly name: string
    public readApi: ReadApi
    public explorer: Explorer
    private readonly tableCodeConfig: TableCodeConfig
    private readonly rpcByEndpoint: RpcsByEndpoints
    private readonly authKeyType: AuthKeyType
    private readonly authKeySearchCallback?: AuthKeySearchCallback
    private readonly signatureProviderMaker: SignatureProviderMaker
    private readonly chainCrypt: ChainCrypt
    private textDecoder?: typeof TextDecoder
    private textEncoder?: typeof TextEncoder
    private personalData: PersonalData

    public eosioContract: EosioContract
    public coreContract: CoreContract
    public partnersContract: PartnersContract
    public p2pContract: P2PContract
    public nftContract: NftContract

    public wallets: Wallet[]
    public readonly coreSymbol?: string

    constructor(
        chainConfig: ChainConfig,
        tableCodeConfig: TableCodeConfig,
        personalData: PersonalData,
        authKeySearchCallback?: AuthKeySearchCallback,
        signatureProviderMaker?: SignatureProviderMaker,
        chainCrypt?: ChainCrypt,
        textDecoder?: typeof TextDecoder,
        textEncoder?: typeof TextEncoder,
    ) {
        this.name = chainConfig.name
        this.tableCodeConfig = {...tableCodeConfig, ...(chainConfig.tableCodeConfigOverride || {})}
        this.readApi = new ReadApi(this.name, chainConfig.rpcEndpoints, chainConfig.balancingMode)
        this.explorer = new Explorer(chainConfig.explorerApiUrl)
        this.rpcByEndpoint = {}
        this.authKeyType = chainConfig.authKeyType || 'plain-auth-key'
        this.authKeySearchCallback = authKeySearchCallback
        this.signatureProviderMaker = signatureProviderMaker || JsSignatureProviderMaker
        this.chainCrypt = chainCrypt || new BaseCrypt()
        this.textDecoder = textDecoder
        this.textEncoder = textEncoder
        this.coreSymbol = chainConfig.coreSymbol
        this.personalData = personalData

        this.eosioContract = this.applyContract(EosioContract)
        this.coreContract = this.applyContract(CoreContract)
        this.partnersContract = this.applyContract(PartnersContract)
        this.p2pContract = this.applyContract(P2PContract)
        this.nftContract = this.applyContract(NftContract)

        this.wallets = (chainConfig.wallets || []).map(walletConfig => new Wallet(walletConfig, this.readApi))
    }

    get walletsSymbols() {
        return this.wallets.map(wallet => wallet.symbol)
    }

    getWalletBySymbol(symbol: string) {
        return this.wallets.find(wallet => wallet.symbol === symbol)
    }

    applyContract<T extends BaseContract>(contract: { new(...args: any[]): T; }): T {
        return new contract(this.readApi, this.tableCodeConfig)
    }

    getCachedRpc() {
        const endpoint = this.readApi.getEndpoint()
        if (!this.rpcByEndpoint[endpoint]) {
            this.rpcByEndpoint[endpoint] = new JsonRpc(endpoint, {fetch});
        }

        return this.rpcByEndpoint[endpoint]
    }

    getEosInstanceBySignatureProvider(signatureProvider: SignatureProvider) {
        const rpc = this.getCachedRpc()

        return new Api({
            rpc,
            signatureProvider,
            // @ts-ignore
            textDecoder: new (this.textDecoder || TextDecoder)(),
            textEncoder: new (this.textEncoder || TextEncoder)(),
        });
    }

    /**
     * @deprecated since version 1.0.2
     */
    getEosPassInstance(wif: string) {
        const signatureProvider = new JsSignatureProvider([wif]);
        return this.getEosInstanceBySignatureProvider(signatureProvider);
    }

    async makeEosInstance(authKey: string) {
        const signatureProvider = await this.signatureProviderMaker(authKey)
        return this.getEosInstanceBySignatureProvider(signatureProvider);
    }

    getAuthKey(authKeyQuery: string, authKeyType?: AuthKeyType) {
        const localAuthKeyType = authKeyType || this.authKeyType

        if (localAuthKeyType === 'plain-auth-key') {
            return authKeyQuery
        }

        if (localAuthKeyType === 'auth-key-search-callback') {
            if (!this.authKeySearchCallback) {
                throw ono(new Error('For authKeyType=wif-search-callback wifSearchCallback need to define'))
            }
            return this.authKeySearchCallback(authKeyQuery)
        }

        throw ono(new NotImplementedError('Not implemented authKeyType'))
    }

    async transactByAuthKey(
        authKey: string,
        transaction: Transaction,
        config?: TransactConfig
    ): Promise<TransactResult | ReadOnlyTransactResult | PushTransactionArgs> {
        const eos = await this.makeEosInstance(authKey)
        return eos.transact(transaction, config)
    }

    async transact(
        authKeyQuery: string,
        transaction: Transaction,
        config?: TransactConfig,
        authKeyType?: AuthKeyType,
    ): Promise<TransactResult | ReadOnlyTransactResult | PushTransactionArgs> {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType)

        if (!authKey) {
            throw ono(new Error('authKey cannot be empty'))
        }

        return this.transactByAuthKey(authKey, transaction, config)
    }

    async encryptMessage(
        authKeyQuery: string,
        publicKey: string,
        message: string,
        memo?: string,
        authKeyType?: AuthKeyType,
    ) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType)

        if (!authKey) {
            throw ono(new Error('authKey cannot be empty'))
        }

        const permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "active")

        if (!permissionKey) {
            throw ono(new Error('permissionKey cannot be empty'))
        }

        const preparedMessage = btoa(unescape(encodeURIComponent(message)))
        return this.chainCrypt.encrypt(authKey, permissionKey, preparedMessage, memo)
    }

    async decryptMessage(
        authKeyQuery: string,
        publicKey: string,
        message: string,
        memo?: string,
        authKeyType?: AuthKeyType,
    ) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType)

        if (!authKey) {
            throw ono(new Error('authKey cannot be empty'))
        }

        let permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "gateway")

        if (!permissionKey) {
            permissionKey = await this.readApi.getPermissionKeyByName(publicKey, "active")
        }

        if (!permissionKey) {
            throw ono(new Error('permissionKey cannot be empty'))
        }

        const decryptedMessage = await this.chainCrypt.decrypt(authKey, permissionKey, message, memo)

        return decodeURIComponent(escape(atob(decryptedMessage)))
    }

    makeValueAsStr(value: any): string {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null || value === undefined) {
            return String(value)
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                return value.map(item => this.makeValueAsStr(item)).join(',')
            }
            const keys = Object.keys(value).sort()
            return keys.map(key => `${key}=${this.makeValueAsStr(value[key])}`).join('&')
        }

        throw ono(new Error('Unsupported value type'))
    }

    objToStableMessage(dict: Record<string, any>) {
        return this.makeValueAsStr(dict)
    }

    btoaEscape(str: string) {
        return btoa(unescape(encodeURIComponent(str)))
    }

    async signMessage(
        authKeyQuery: string,
        publicKey: string,
        message: string,
        authKeyType?: AuthKeyType,
    ) {
        const authKey = await this.getAuthKey(authKeyQuery, authKeyType)

        if (!authKey) {
            throw ono(new Error('authKey cannot be empty'))
        }

        const preparedMessage = this.btoaEscape(message)
        return this.chainCrypt.sign(authKey, preparedMessage)
    }

    async verifyMessage(
        publicKey: string,
        message: string,
        signature: string,
    ) {
        const preparedMessage = this.btoaEscape(message)
        return this.chainCrypt.verify(publicKey, preparedMessage, signature)
    }

    async signObject(
        authKeyQuery: string,
        publicKey: string,
        dict: Record<string, any>,
        authKeyType?: AuthKeyType,
    ) {
        const message = this.objToStableMessage(dict)
        return this.signMessage(authKeyQuery, publicKey, message, authKeyType)
    }

    async verifyObject(
        publicKey: string,
        dict: Record<string, any>,
        signature: string,
    ) {
        const message = this.objToStableMessage(dict)
        return this.verifyMessage(publicKey, message, signature)
    }

    async sendPersonalData(
        authKeyQuery: string,
        senderAccountName: string,
        recipientAccountName: string,
        data: any,
        authKeyType?: AuthKeyType,
    ) {
        const senderPub = await this.readApi.getPermissionKeyByName(senderAccountName, "active")
        const recipientPub = await this.readApi.getPermissionKeyByName(recipientAccountName, "active")
        if (!senderPub || !recipientPub) {
            throw ono(new Error('senderPub or recipientPub cannot be empty'))
        }
        const jsonMessage = JSON.stringify(data)
        const encryptedToSender = await this.encryptMessage(authKeyQuery, senderPub, jsonMessage, undefined, authKeyType)
        const encryptedToRecipient = await this.encryptMessage(authKeyQuery, recipientPub, jsonMessage, undefined, authKeyType)
        const dataBundle = {
            senderPub,
            recipientPub,
            senderData: encryptedToSender,
            recipientData: encryptedToRecipient,
        }

        const signature = await this.signObject(authKeyQuery, senderPub, dataBundle, authKeyType)

        return this.personalData.sendPersonalData(dataBundle, signature)
    }

    async getPersonalAsRecipient(
        authKeyQuery: string,
        recipientAccountName: string,
        ids: string[],
        authKeyType?: AuthKeyType,
    ) {
        const recipientPub = await this.readApi.getPermissionKeyByName(recipientAccountName, "active")
        if (!recipientPub) {
            throw ono(new Error('recipientPub cannot be empty'))
        }
        const dataBundle = {
            recipientPub,
            ids,
        }

        const signature = await this.signObject(authKeyQuery, recipientPub, dataBundle, authKeyType)

        const result = await this.personalData.getPersonalDataAsRecipient(dataBundle, signature)

        return JSON.parse(result)
    }

    async getPersonalAsSender(
        authKeyQuery: string,
        senderAccountName: string,
        ids: string[],
        authKeyType?: AuthKeyType,
    ) {
        const senderPub = await this.readApi.getPermissionKeyByName(senderAccountName, "active")
        if (!senderPub) {
            throw ono(new Error('senderPub cannot be empty'))
        }
        const dataBundle = {
            senderPub,
            ids,
        }

        const signature = await this.signObject(authKeyQuery, senderPub, dataBundle, authKeyType)

        const result = await this.personalData.getPersonalDataAsSender(dataBundle, signature)

        return JSON.parse(result)
    }
}

export default Chain
