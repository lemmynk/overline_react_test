const Model = require('./Model');
const KomMainView = require('./KomMainView');
const { validator } = require('../utils');

const modelConfig = {
  tableName: 'mp_kom_tracun',
  keys: [
    'id',
    'komId',
    'tracun',
    'banka',
    'isDefault',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class KomTracun extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  /**
   * Validate params provided using express-validator
   *
   * @return {Array}
   */
  static validate() {
    return [
      validator.validateParent('komId', KomMainView),
      validator.validateStringLength('tracun', 30),
      validator.validateStringLength('banka', 120),
      validator.validateBoolean('isDefault'),
    ];
  }
}

module.exports = KomTracun;
