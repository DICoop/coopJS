import * as bitcoin from 'bitcoinjs-lib';
import { Buffer } from 'buffer';

export const seedToHd = (seed: string | Buffer) => {
  const isString = typeof seed === 'string';
  const seedBuffer = isString ? Buffer.from(seed, 'hex') : seed;
  return bitcoin.bip32.fromSeed(seedBuffer);
};

export const hdToFirstHdNode = (hd: bitcoin.bip32.BIP32Interface) => hd.derivePath("m/44'/194'/0'/0/0");

export const hdNodeToPublicKeyBuffer = (hd: bitcoin.bip32.BIP32Interface) => Buffer.from(hd.publicKey);

export const hdNodeToPrivateKeyBuffer = (hd: bitcoin.bip32.BIP32Interface) => Buffer.from(hd.privateKey!);
