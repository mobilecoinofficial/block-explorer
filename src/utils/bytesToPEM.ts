import { Base64 } from "js-base64";

const PEM_HEADER = [48, 42, 48, 5, 6, 3, 43, 101, 112, 3, 33, 0];

export function base64PEMEncode(byteArray: number[]): string {
    return Base64.fromUint8Array(new Uint8Array(PEM_HEADER.concat(byteArray)));
}
