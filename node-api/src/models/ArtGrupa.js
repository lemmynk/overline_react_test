const { body, param } = require('express-validator');
const Model = require('./Model');
const ArtMainView = require('./ArtMainView');

const modelConfig = {
  tableName: 'mp_art_grupa',
  keys: [
    'id',
    'vArtikl',
    'grpNaziv',
    'grpSifra',
    // 'redosled',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class ArtGrupa extends Model {
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
      body('vArtikl')
        .exists()
        .withMessage('vArtikl.required')
        .bail()
        .isIn(['roba', 'repro', 'gp', 'os', 'usluga'])
        .withMessage('vArtikl.enum'),
      body('grpNaziv')
        .exists()
        .withMessage('grpNaziv.required')
        .bail()
        .isLength({ min: 1, max: 120 })
        .withMessage('grpNaziv.length'),
      body('grpSifra')
        .exists()
        .withMessage('grpSifra.required')
        .bail()
        .isLength({ min: 1, max: 20 })
        .withMessage('grpSifra.length'),
    ];
  }

  /**
   * Validate should Model be deleted
   *
   * @return {Array}
   */
  static canDelete() {
    return [
      param('id')
        .isInt()
        .withMessage('invalid-format')
        .bail()
        .toInt()
        .custom(value =>
          ArtMainView.count({ grpId: value, isDeleted: false }).then(count => {
            if (count > 0) {
              return Promise.reject(new Error('not-empty'));
            }
            return true;
          }),
        ),
    ];
  }
}

module.exports = ArtGrupa;
