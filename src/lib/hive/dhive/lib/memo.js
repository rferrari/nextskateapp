"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bs58 = require("bs58");
//const ByteBuffer = require("bytebuffer");
const deserializer_1 = require("./chain/deserializer");
const serializer_1 = require("./chain/serializer");
const crypto_1 = require("./crypto");
const Aes = require("./helpers/aes");
/**
 * Memo/Any message encoding using AES (aes-cbc algorithm)
 * @param {Buffer|string} private_key Private memo key of sender
 * @param {Buffer|string} public_key public memo key of recipient
 * @param {string} memo message to be encrypted
 * @param {number} testNonce nonce with high entropy
 */
const encode = (private_key, public_key, memo, testNonce) => {
    if (!memo.startsWith('#')) {
        return memo;
    }
    memo = memo.substring(1);
    checkEncryption();
    private_key = toPrivateObj(private_key);
    public_key = toPublicObj(public_key);
    //const mbuf = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    const mbuf = Buffer.from([]);
    mbuf.writeVString(memo);
    const memoBuffer = Buffer.from(mbuf.copy(0, mbuf.offset).toBinary(), 'binary');
    const { nonce, message, checksum } = Aes.encrypt(private_key, public_key, memoBuffer, testNonce);
    //const mbuf2 = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    const mbuf2 = Buffer.from([]);
    serializer_1.Types.EncryptedMemo(mbuf2, {
        check: checksum,
        encrypted: message,
        from: private_key.createPublic(),
        nonce,
        to: public_key
    });
    mbuf2.flip();
    const data = Buffer.from(mbuf2.toBuffer());
    return '#' + bs58.encode(data);
};
/**
 * Encrypted memo/message decryption
 * @param {PrivateKey|string} private_key Private memo key of recipient
 * @param {string}memo Encrypted message/memo
 */
const decode = (private_key, memo) => {
    if (!memo.startsWith('#')) {
        return memo;
    }
    memo = memo.substring(1);
    checkEncryption();
    private_key = toPrivateObj(private_key);
    memo = bs58.decode(memo);
    let memoBuffer = deserializer_1.types.EncryptedMemoD(Buffer.from(memo, 'binary'));
    const { from, to, nonce, check, encrypted } = memoBuffer;
    const pubkey = private_key.createPublic().toString();
    const otherpub = pubkey === new crypto_1.PublicKey(from.key).toString()
        ? new crypto_1.PublicKey(to.key)
        : new crypto_1.PublicKey(from.key);
    memoBuffer = Aes.decrypt(private_key, otherpub, nonce, encrypted, check);
    //const mbuf = ByteBuffer.fromBinary(memoBuffer.toString('binary'), ByteBuffer.LITTLE_ENDIAN);
    const mbuf = Buffer.from([]);
    try {
        mbuf.mark();
        return '#' + mbuf.readVString();
    }
    catch (e) {
        mbuf.reset();
        // Sender did not length-prefix the memo
        memo = Buffer.from(mbuf.toString('binary'), 'binary').toString('utf-8');
        return '#' + memo;
    }
};
let encodeTest;
const checkEncryption = () => {
    if (encodeTest === undefined) {
        let plaintext;
        encodeTest = true; // prevent infinate looping
        try {
            const wif = '5JdeC9P7Pbd1uGdFVEsJ41EkEnADbbHGq6p1BwFxm6txNBsQnsw';
            const pubkey = 'STM8m5UgaFAAYQRuaNejYdS8FVLVp9Ss3K1qAVk5de6F8s3HnVbvA';
            const cyphertext = encode(wif, pubkey, '#memo爱');
            plaintext = decode(wif, cyphertext);
        }
        catch (e) {
            throw new Error(e);
        }
        finally {
            encodeTest = plaintext === '#memo爱';
        }
    }
    if (encodeTest === false) {
        throw new Error('This environment does not support encryption.');
    }
};
const toPrivateObj = (o) => o ? (o.key ? o : crypto_1.PrivateKey.fromString(o)) : o; /* null or undefined*/
const toPublicObj = (o) => o ? (o.key ? o : crypto_1.PublicKey.fromString(o)) : o; /* null or undefined*/
exports.Memo = {
    decode,
    encode
};
