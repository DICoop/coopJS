import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { Buffer } from 'buffer';

const bip32 = BIP32Factory(ecc);

export const seedToHd = (seed: string | Buffer) => {
  const isString = typeof seed === 'string';
  const seedBuffer = isString ? Buffer.from(seed, 'hex') : seed;
  return bip32.fromSeed(seedBuffer);
};

export const hdToFirstHdNode = (hd: ReturnType<typeof bip32.fromSeed>) => {
  return hd.derivePath("m/44'/194'/0'/0/0");
};

export const hdNodeToPublicKeyBuffer = (hd: ReturnType<typeof bip32.fromSeed>) => {
  return Buffer.from(hd.publicKey);
};

export const hdNodeToPrivateKeyBuffer = (hd: ReturnType<typeof bip32.fromSeed>) => {
  return Buffer.from(hd.privateKey!);
};
