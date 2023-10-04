/// <reference types="node" />
import { Buffer } from 'buffer';
declare const bip32: import("bip32").BIP32API;
export declare const seedToHd: (seed: string | Buffer) => import("bip32").BIP32Interface;
export declare const hdToFirstHdNode: (hd: ReturnType<typeof bip32.fromSeed>) => import("bip32").BIP32Interface;
export declare const hdNodeToPublicKeyBuffer: (hd: ReturnType<typeof bip32.fromSeed>) => Buffer;
export declare const hdNodeToPrivateKeyBuffer: (hd: ReturnType<typeof bip32.fromSeed>) => Buffer;
export {};
//# sourceMappingURL=hdkey.d.ts.map