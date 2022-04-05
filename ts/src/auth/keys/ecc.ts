import { ecc } from 'eosjs/dist/eosjs-ecc-migration'
import { PrivateKey } from 'eosjs/dist/eosjs-jssig'
import Ecc from 'eosjs-ecc'
import wif from 'wif'

export const isValidWif = (wif: string) => ecc.isValidPrivate(wif)

export const wifToPrivateKey = (wif: string) => PrivateKey.fromString(wif)

export const privateKeyToPublic = (privateKey: PrivateKey) => privateKey.getPublicKey()

export const hdPublicToEccPublicKey = (hdPublicKey: string | Buffer) =>
  Ecc.PublicKey(hdPublicKey).toString()

export const hdPrivateToWif = (hdPrivateKey: Buffer) => wif.encode(128, hdPrivateKey, false)
