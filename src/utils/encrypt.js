import CryptoJS from 'crypto-js'

export function encrypt(toEncrypt, key, useHashing = true) {
    try {
        let finalKey;

        if (useHashing) {
            // Băm key bằng MD5 (giống C#)
            finalKey = CryptoJS.MD5(key);
        } else {
            // Dùng trực tiếp chuỗi key
            finalKey = CryptoJS.enc.Utf8.parse(key);
        }

        const encrypted = CryptoJS.TripleDES.encrypt(
            toEncrypt,
            finalKey,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
        );

        return encrypted.toString(); // Base64 string giống C#
    } catch (e) {
        return null;
    }
}
