import {
  encryptSync as scryptifyEncryptSync,
  decryptSync as scryptifyDecryptSync,
} from 'nodemod/dist/scryptify';
import uuid from 'uuid4';

const secret = process.env.REACT_APP_SCRYPTIFY_SECRET;

export const encryptSync = str => scryptifyEncryptSync(str, secret);
export const decryptSync = str => scryptifyDecryptSync(str, secret);
// const encrypt = str => scryptify.encrypt(str, secret)
// const decrypt = str => scryptify.decrypt(str, secret)

export const buildChallenge = verifierCode => {
  const verifier = verifierCode || uuid();
  const hash = verifier.toUpperCase();
  const challenge = encryptSync(hash);

  return { verifier, challenge };
};

export const verifyChallenge = (verifierCode, challengeCode) => {
  try {
    // decrypt throws error if something wrong
    const hash = decryptSync(challengeCode);
    const verifier = verifierCode.toUpperCase();

    return hash === verifier;
  } catch (err) {
    // console.error(err.message);
    return false;
  }
};
