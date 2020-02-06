const Model = require('./Model');
const { decoder, Challenger } = require('../utils');
const { ValidationError } = require('../errors');

const modelConfig = {
  tableName: 'auth_flows',
  keys: [
    'id',
    'authCode',
    'handshakeCode',
    'challengeCode',
    'challengeVerified',
    'userUuid',
    'createdAt',
    'updatedAt',
  ],
};

class AuthFlow extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  /**
   * Resolve decoder to be used to verify challenge
   *
   * @param  {String}  verifier
   * @param  {Boolean} useChallenger
   * @return {Promise}
   */
  resolveDecoder(verifier, useChallenger) {
    if (useChallenger) {
      const secret = process.env.SCRYPTIFY_SECRET;
      const challenger = new Challenger(secret);
      return challenger.verifyChallenge(verifier, this.challengeCode);
    }

    return decoder
      .decrypt(verifier)
      .then(codeVerifier =>
        decoder.verifyChallenge(codeVerifier, this.challengeCode),
      );
  }

  /**
   * Verify earlier set challenge
   *
   * set useChallenger if Challenger method ti be used
   *
   * @param  {String} codeVerifier
   * @param  {Boolean} useChallenger
   * @return {Promise}
   */
  verifyChallenge(verifier, useChallenger = false) {
    const errors = [];

    if (this.challengeVerified)
      throw new ValidationError('Code challenge is already verified');

    return this.resolveDecoder(verifier, useChallenger).then(success => {
      if (success) {
        this.challengeVerified = true;
        return this.save().then(() => this);
      }

      if (process.env.ENVIRONMENT === 'development') {
        errors.push('Challenge code does not match');
        errors.push(`Use Challenger: ${useChallenger}`);
        errors.push(`Verifier: ${verifier}`);
        errors.push(`Challenge: ${this.challengeCode}`);
        errors.push(`AuthFlowId: ${this.id}`);

        throw new ValidationError(errors);
      } else {
        throw new ValidationError('Challenge code does not match');
      }
    });
  }

  /**
   * Validate params provided
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static validate() {
    this.clearValidationErrors();
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = AuthFlow;
