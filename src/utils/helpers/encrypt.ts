// @ts-ignore
import { TOTP } from 'jsotp';

export const getOtpToken = (otpSeed: string) => {
  const totp = TOTP(otpSeed, 60);
  return totp.now();
};

const encodeStr = (str: string) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

const getHash = async (str: string) => crypto.subtle.digest('SHA-256', encodeStr(str));

const getHashHex = async (str: string) => {
  const hashBuffer = await getHash(str);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

const bytesToString = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return binary;
};

const bufferToB64 = (buffer: ArrayBuffer) => window.btoa(bytesToString(buffer));

const aesEncrypt = async (dataStr: any, key: any) => {
  const iv = new Uint8Array(16);
  const encodedKey = encodeStr(key);

  const aesKey = await crypto.subtle.importKey('raw', encodedKey, 'AES-CBC', true, ['encrypt', 'decrypt']);

  try {
    const encrypted = await window.crypto.subtle.encrypt({ name: 'AES-CBC', iv }, aesKey, encodeStr(dataStr));

    return {
      aesKey,
      iv,
      encrypted,
    };
  } catch (error) {
    console.log('AES encryption error', error);
    return { error };
  }
};

export const getRequestChecksum = async (otpSeed: string, url: string, body: any = null) => {
  const otp = getOtpToken(otpSeed);
  const keyStr = `${otp}${otp}${otp}${otp}${otp}${otp[0]}${otp[1]}`;
  const bodyStr = body ? JSON.stringify(body) : '';
  const dataStr = `${url};${bodyStr};`;
  const dataHashStr = await getHashHex(dataStr);
  const { encrypted } = await aesEncrypt(dataHashStr, keyStr);

  return encrypted ? bufferToB64(encrypted) : undefined;
};
