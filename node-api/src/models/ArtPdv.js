const { body } = require('express-validator');
const Model = require('./Model');

const modelConfig = {
  tableName: 'mp_art_pdv',
  keys: [
    'id',
    'pdvStopa',
    'pdvOpis',
    'isDefault',
    'fisPdv',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class ArtPdv extends Model {
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
      body('pdvStopa')
        .exists()
        .withMessage('pdvStopa.required')
        .bail()
        .isInt()
        .withMessage('pdvStopa.invalid-format'),
      body('pdvOpis')
        .exists()
        .withMessage('pdvOpis.required')
        .bail()
        .isLength({ min: 1, max: 120 })
        .withMessage('pdvOpis.invalid-length'),
      body('isDefault')
        .optional()
        .toBoolean(),
      body('fisPdv')
        .exists()
        .withMessage('fisPdv.required')
        .bail()
        .isInt()
        .withMessage('fisPdv.invalid-format'),
    ];
  }
}

module.exports = ArtPdv;
