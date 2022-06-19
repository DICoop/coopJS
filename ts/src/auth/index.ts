import ono from '@jsdevtools/ono'

import {UniCoreMnemonicParseError, UniCoreWifParseError} from './errors'
import { generateMnemonic, isValidMnemonic, mnemonicToSeed } from './keys/bip39'
import { hdNodeToPublicKeyBuffer, hdNodeToPrivateKeyBuffer, hdToFirstHdNode, seedToHd } from './keys/hdkey'
import {hdPublicToEccPublicKey, hdPrivateToWif, isValidWif, privateKeyToPublic, wifToPrivateKey} from './keys/ecc'
import { generateAccountName } from "./utils";

export const makeHdNodeByMnemonic = async (mnemonic: string) => {
  if (!isValidMnemonic(mnemonic)) {
    throw ono(new UniCoreMnemonicParseError('Invalid mnemonic'))
  }

  const seed = await mnemonicToSeed(mnemonic)
  const hdBase = seedToHd(seed)
  const hdFirstNode = hdToFirstHdNode(hdBase)

  return hdFirstNode
}


export const makePublicKeyByMnemonic = async (mnemonic: string) => {
  const hdFirstNode = await makeHdNodeByMnemonic(mnemonic)
  const hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode)

  return hdPublicToEccPublicKey(hdPublicKeyBuffer)
}

export interface AccountData {
  name: string
  mnemonic: string
  wif: string
  pub: string
}

export const makeAccount = (username: string, mnemonic: string, wif: string, pub: string): AccountData => {
  return {
    name: username,
    mnemonic,
    wif,
    pub,
  }
}

export const makeAccountByMnemonic = async (username: string, mnemonic: string) => {
  const hdFirstNode = await makeHdNodeByMnemonic(mnemonic)

  const hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode)
  const hdPrivateKeyBuffer = hdNodeToPrivateKeyBuffer(hdFirstNode)

  return makeAccount(username, '', hdPrivateToWif(hdPrivateKeyBuffer), hdPublicToEccPublicKey(hdPublicKeyBuffer))
}

export const makeAccountByWif = async (username: string, wif: string) => {
  if (!isValidWif(wif)) {
    throw ono(new UniCoreWifParseError('Invalid wif'))
  }

  const publicKey = privateKeyToPublic(wifToPrivateKey(wif)).toLegacyString()

  return makeAccount(username, '', wif, publicKey)
}

export const generateAccount = async (): Promise<AccountData> => {
  const name = generateAccountName()
  const mnemonic = generateMnemonic()
  const seed = await mnemonicToSeed(mnemonic)
  const hdBase = seedToHd(seed)
  const hdFirstNode = hdToFirstHdNode(hdBase)

  const hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode)
  const hdPrivateKeyBuffer = hdNodeToPrivateKeyBuffer(hdFirstNode)

  return makeAccount(name, mnemonic, hdPrivateToWif(hdPrivateKeyBuffer), hdPublicToEccPublicKey(hdPublicKeyBuffer))
}
