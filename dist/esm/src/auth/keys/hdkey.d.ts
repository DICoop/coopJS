/// <reference types="node" />
import hdkey from 'hdkey';
import { Buffer } from 'buffer';
export declare const seedToHd: (seed: string | Buffer) => hdkey;
export declare const hdToFirstHdNode: (hd: hdkey) => hdkey;
export declare const hdNodeToPublicKeyBuffer: (hd: hdkey) => Buffer;
export declare const hdNodeToPrivateKeyBuffer: (hd: hdkey) => Buffer;
//# sourceMappingURL=hdkey.d.ts.map