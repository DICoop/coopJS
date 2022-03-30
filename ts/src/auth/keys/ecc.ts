import { ecc } from 'eosjs/dist/eosjs-ecc-migration'
import { PrivateKey } from 'eosjs/dist/eosjs-jssig'
import Ecc from 'eosjs-ecc'

export const isValidWif = (wif: string) => ecc.isValidPrivate(wif)

export const wifToPrivateKey = (wif: string) => PrivateKey.fromString(wif)

export const privateKeyToPublic = (privateKey: PrivateKey) => privateKey.getPublicKey()

export const hdPublicToEccPublicKey = (hdPublicKey: string | Buffer) =>
  Ecc.PublicKey(hdPublicKey).toString()
