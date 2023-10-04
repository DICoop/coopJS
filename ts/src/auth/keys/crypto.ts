export const encode_b58 = (hex_number: string): string => {
  const base58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'; // Преобразовано в строку для удобства
  let num = BigInt(`0x${hex_number}`);
  const fifty8 = BigInt(58);
  let remainder: BigInt;
  let b58_encoded_buffer = '';
  
  while (num > BigInt(0)) {
    remainder = num % fifty8;
    b58_encoded_buffer = base58[Number(remainder)] + b58_encoded_buffer; // Преобразование BigInt в number здесь допустимо, потому что remainder всегда будет меньше 58
    num = num / fifty8;
  }
  
  while (hex_number.match(/^00/)) {
    b58_encoded_buffer = '1' + b58_encoded_buffer;
    hex_number = hex_number.substring(2);
  }

  return b58_encoded_buffer;
}

export const sha256 = async (hex_str: string): Promise<string> => {
  const typedArray: Uint8Array = new Uint8Array(hex_str.match(/[\da-f]{2}/gi)!.map((h) => parseInt(h, 16)));
  const hashBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', typedArray);
  const hashArray: number[] = Array.from(new Uint8Array(hashBuffer));
  const hashHex: string = hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export const ab2b = (ab: ArrayBuffer): number[] => {
  const buffer: number[] = [];
  const view: Uint8Array = new Uint8Array(ab);
  for (let i = 0; i < ab.byteLength; i++) buffer[i] = view[i];
  return buffer;
};

export const to_hex = (bs: number[]): string => {
  const encoded: string[] = [];
  for (let i = 0; i < bs.length; i++) {
    encoded.push('0123456789abcdef'[(bs[i] >> 4) & 15]);
    encoded.push('0123456789abcdef'[bs[i] & 15]);
  }
  return encoded.join('');
};

export const base64url_decode = (value: string): ArrayBuffer => {
  const m: number = value.length % 4;
  return Uint8Array.from(atob(
    value.replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(value.length + (m === 0 ? 0 : 4 - m), '=')
  ), (c: string) => c.charCodeAt(0)).buffer;
};
