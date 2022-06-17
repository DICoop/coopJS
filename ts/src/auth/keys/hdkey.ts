import hdkey from 'hdkey'
import { Buffer } from 'buffer'

export const seedToHd = (seed: string | Buffer) => {
  const isString = typeof seed === 'string'
  const seedBuffer = isString ? Buffer.from(seed, 'hex') : seed

  return hdkey.fromMasterSeed(seedBuffer)
}

export const hdToFirstHdNode = (hd: hdkey) => hd.derive("m/44'/194'/0'/0/0")

export const hdNodeToPublicKeyBuffer = (hd: hdkey) => hd.publicKey

// @ts-ignore
export const hdNodeToPrivateKeyBuffer = (hd: hdkey) => hd.privateKey || hd._privateKey
