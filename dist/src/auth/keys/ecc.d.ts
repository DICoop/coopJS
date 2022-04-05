/// <reference types="node" />
import { PrivateKey } from 'eosjs/dist/eosjs-jssig';
export declare const isValidWif: (wif: string) => boolean;
export declare const wifToPrivateKey: (wif: string) => PrivateKey;
export declare const privateKeyToPublic: (privateKey: PrivateKey) => import("eosjs/dist/PublicKey").PublicKey;
export declare const hdPublicToEccPublicKey: (hdPublicKey: string | Buffer) => any;
export declare const hdPrivateToWif: (hdPrivateKey: Buffer) => any;
