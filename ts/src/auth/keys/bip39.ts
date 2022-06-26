import { validateMnemonic, mnemonicToSeed as mnemonicToSeedBip39, generateMnemonic as gM } from 'bip39'
import EN from 'bip39/src/wordlists/english.json'

export const isValidMnemonic = (mnemonic: string) => validateMnemonic(mnemonic, EN)

export const mnemonicToSeed = (mnemonic: string) =>
  mnemonicToSeedBip39(mnemonic).then((seed: Buffer) => seed.toString('hex'))

export const generateMnemonic = (): string => gM(null, null, EN)
