class Challenger {
  constructor(secret, verifier) {
    this.secret = secret;
    this.initBase();
    this.verifier = verifier || this.initVerifier();
  }

  initBase() {
    let base = '';
    const bounds = [
      { from: 48, to: 57 },
      { from: 65, to: 90 },
      { from: 97, to: 122 },
    ];

    bounds.forEach(bound => {
      for (let i = bound.from; i <= bound.to; i += 1) {
        base += String.fromCharCode(i);
      }
    });

    this.base = base;
  }

  initVerifier() {
    let verifier = '';
    for (let i = 0; i < 32; i += 1) {
      const rand = Math.random() * 62;
      const char = this.base.charAt(rand);
      verifier += char;
    }
    return verifier;
  }

  challenge(verifierCode) {
    const verifier = verifierCode || this.verifier;
    let challenge = '';
    for (let counter = 0; counter < 64; counter += 1) {
      const i = counter % 32;
      const s = this.secret.charAt(i);
      const v = verifier.charAt(i);
      const sIndex = this.base.indexOf(s);
      const vIndex = this.base.indexOf(v);
      const sum = sIndex + vIndex + counter;
      const r = sum % 61;
      const c = this.base.charAt(r);
      challenge += c;
    }
    return challenge;
  }

  buildChallenge(verifierCode) {
    const verifier = verifierCode || this.verifier;
    return new Promise((resolve, reject) => {
      if (verifier) {
        const challenge = this.challenge(verifier);
        resolve({ verifier, challenge });
      } else {
        reject(new Error('Verifier could not be empty'));
      }
    });
  }

  verifyChallenge(verifierCode, challengeCode) {
    const verifier = verifierCode || this.verifier;
    return new Promise(resolve => {
      const challenge = this.challenge(verifier);
      resolve(challenge === challengeCode);
    });
  }
}

module.exports = Challenger;
