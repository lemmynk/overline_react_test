const Model = require('./Model');
const KomMainView = require('./KomMainView');
const { validator } = require('../utils');

const modelConfig = {
  tableName: 'mp_kom_mesto',
  keys: [
    'id',
    'zip',
    'naziv',
    'opstina',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class KomMesto extends Model {
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
      validator.validateStringLength('zip', 6),
      validator.validateStringLength('naziv', 120),
      validator.validateStringLength('opstina', 120),
    ];
  }

  /**
   * Validate should Model be deleted
   *
   * @return {Array}
   */
  static canDelete() {
    return [validator.validateNoChildren('id', KomMainView, 'mestoId')];
  }
}

module.exports = KomMesto;
