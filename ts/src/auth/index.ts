import ono from '@jsdevtools/ono'

import { UniCoreMnemonicParseError } from './errors'
import { isValidMnemonic, mnemonicToSeed } from './keys/bip39'
import { hdNodeToPublicKeyBuffer, hdToFirstHdNode, seedToHd } from './keys/hdkey'
import { hdPublicToEccPublicKey } from './keys/ecc'

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
