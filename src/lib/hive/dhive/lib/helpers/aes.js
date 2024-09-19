"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const crypto_1 = require("crypto");
// const ByteBuffer = require('bytebuffer');
const ByteBuffer = Buffer.from([]);
const Long = ByteBuffer.Long;
exports.encrypt = (private_key, public_key, message, nonce = uniqueNonce()) => crypt(private_key, public_key, nonce, message);
exports.decrypt = (private_key, public_key, nonce, message, checksum) => crypt(private_key, public_key, nonce, message, checksum).message;
/**
 * @arg {Buffer} message - Encrypted or plain text message (see checksum)
 * @arg {number} checksum - shared secret checksum (null to encrypt, non-null to decrypt)
 */
const crypt = (private_key, public_key, nonce, message, checksum) => {
    const nonceL = toLongObj(nonce);
    //   const bufferMessage = Buffer.from(messageString, 'binary')
    const S = private_key.get_shared_secret(public_key);
    let ebuf = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    ebuf.writeUint64(nonceL);
    ebuf.append(S.toString('binary'), 'binary');
    ebuf = Buffer.from(ebuf.copy(0, ebuf.offset).toBinary(), 'binary');
    const encryption_key = crypto_1.createHash('sha512').update(ebuf).digest();
    const iv = encryption_key.slice(32, 48);
    const tag = encryption_key.slice(0, 32);
    // check if first 64 bit of sha256 hash treated as uint64_t truncated to 32 bits.
    const check = crypto_1.createHash('sha256').update(encryption_key).digest().slice(0, 4);
    const cbuf = ByteBuffer.fromBinary(check.toString('binary'), ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    ByteBuffer.fromBinary(check.toString('binary'), ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    const check32 = cbuf.readUint32();
    if (checksum) {
        if (check32 !== checksum) {
            throw new Error('Invalid key');
        }
        message = exports.cryptoJsDecrypt(message, tag, iv);
    }
    else {
        message = exports.cryptoJsEncrypt(message, tag, iv);
    }
    return { nonce: nonceL, message, checksum: check32 };
};
/**
 * This method does not use a checksum, the returned data must be validated some other way.
 * @arg {string|Buffer} ciphertext - binary format
 * @return {Buffer} the decrypted message
 */
exports.cryptoJsDecrypt = (message, tag, iv) => {
    assert(message, 'Missing cipher text');
    let messageBuffer = message;
    const decipher = crypto_1.createDecipheriv('aes-256-cbc', tag, iv);
    messageBuffer = Buffer.concat([decipher.update(messageBuffer), decipher.final()]);
    return messageBuffer;
};
/**
 * This method does not use a checksum, the returned data must be validated some other way.
 * @arg {string|Buffer} plaintext - binary format
 * @return {Buffer} binary
 */
exports.cryptoJsEncrypt = (message, tag, iv) => {
    assert(message, 'Missing plain text');
    let messageBuffer = message;
    const cipher = crypto_1.createCipheriv('aes-256-cbc', tag, iv);
    messageBuffer = Buffer.concat([cipher.update(messageBuffer), cipher.final()]);
    return messageBuffer;
};
/** @return {string} unique 64 bit unsigned number string.  Being time based,
 * this is careful to never choose the same nonce twice.  This value could
 * clsbe recorded in the blockchain for a long time.
 */
let unique_nonce_entropy = null;
const uniqueNonce = () => {
    if (unique_nonce_entropy === null) {
        const uint8randomArr = new Uint8Array(2);
        for (let i = 0; i < 2; ++i) {
            uint8randomArr[i] = crypto_1.randomBytes(2).readUInt8(i);
        }
        unique_nonce_entropy = Math.round((uint8randomArr[0] << 8) | uint8randomArr[1]);
    }
    let long = Long.fromNumber(Date.now());
    const entropy = ++unique_nonce_entropy % 0xffff;
    long = long.shiftLeft(16).or(Long.fromNumber(entropy));
    return long.toString();
};
const toLongObj = (o) => (o ? (Long.isLong(o) ? o : Long.fromString(o)) : o);
