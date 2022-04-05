import ono from '@jsdevtools/ono'

import { UniCoreMnemonicParseError } from './errors'
import {generateMnemonic, isValidMnemonic, mnemonicToSeed} from './keys/bip39'
import { hdNodeToPublicKeyBuffer, hdNodeToPrivateKeyBuffer, hdToFirstHdNode, seedToHd } from './keys/hdkey'
import { hdPublicToEccPublicKey, hdPrivateToWif } from './keys/ecc'
import {generateAccountName} from "./utils";

export const makePublicKeyByMnemonic = async (mnemonic: string) => {
  if (!isValidMnemonic(mnemonic)) {
    throw ono(new UniCoreMnemonicParseError('Invalid mnemonic'))
  }

  const seed = await mnemonicToSeed(mnemonic)
  const hdBase = seedToHd(seed)
  const hdFirstNode = hdToFirstHdNode(hdBase)
  const hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode)

  return hdPublicToEccPublicKey(hdPublicKeyBuffer)
}

interface AccountData {
  name: string
  mnemonic: string
  wif: string
  pub: string
}

export const generateAccount = async (): Promise<AccountData> => {
  const name = generateAccountName()
  const mnemonic = generateMnemonic()
  const seed = await mnemonicToSeed(mnemonic)
  const hdBase = seedToHd(seed)
  const hdFirstNode = hdToFirstHdNode(hdBase)

  const hdPublicKeyBuffer = hdNodeToPublicKeyBuffer(hdFirstNode)
  const hdPrivateKeyBuffer = hdNodeToPrivateKeyBuffer(hdFirstNode)

  return {
    name,
    mnemonic,
    wif: hdPrivateToWif(hdPrivateKeyBuffer),
    pub: hdPublicToEccPublicKey(hdPublicKeyBuffer),
  }
}
