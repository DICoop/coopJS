import { validateMnemonic, mnemonicToSeed as mnemonicToSeedBip39 } from 'bip39'

export const isValidMnemonic = (mnemonic: string) => validateMnemonic(mnemonic)

export const mnemonicToSeed = (mnemonic: string) =>
  mnemonicToSeedBip39(mnemonic).then((seed: Buffer) => seed.toString('hex'))
