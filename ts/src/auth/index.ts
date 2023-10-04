import ono from '@jsdevtools/ono'

import {UniCoreMnemonicParseError, UniCoreWifParseError} from './errors'
import { generateMnemonic, isValidMnemonic, mnemonicToSeed } from './keys/bip39'
import { hdNodeToPublicKeyBuffer, hdNodeToPrivateKeyBuffer, hdToFirstHdNode, seedToHd } from './keys/hdkey'
import {hdPublicToEccPublicKey, hdPrivateToWif, isValidWif, privateKeyToPublic, wifToPrivateKey} from './keys/ecc'
import { generateAccountName } from "./utils";

import {to_hex, ab2b, sha256, encode_b58, base64url_decode} from "./keys/crypto";

const { subtle } = globalThis.crypto;

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


export const generateKeyPair = async() => {
  const { privateKey, publicKey } = await subtle.generateKey(
  {
    name: "ECDSA",
    namedCurve: "P-256",
  },
  true,
  ["sign", "verify"]
  );

  let private_jwk = await subtle.exportKey("jwk", privateKey)
  
  let private_hex = to_hex(ab2b(base64url_decode(private_jwk.d!)))
  
  // //SHA-256 hash with a 0x80 byte in front
  let private_m256  = await sha256('80'+ private_hex )

  //SHA-256 hash of the private key
  let private_sha256  = await sha256(private_m256)

  //first 4 bytes of the second SHA-256 hash
  let private_four = private_sha256.substr(0,8);

  //Base58 encode the binary data to get EOS private key
  let private_wif = encode_b58('80'+ private_hex + private_four)
  
  return {private_wif, publicKey}
}
