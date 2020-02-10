/* eslint-disable class-methods-use-this */
const { body, param } = require('express-validator');
const Model = require('./Model');

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
        .isIn(['roba', 'usluga'])
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
      param('id').custom(value => {
        // return Promise.reject(new Error('artGrupa.not.empty'));
        if (value > 200) {
          throw new Error('artGrupa.not.empty');
        }
        return true;
      }),
    ];
  }
}

module.exports = ArtGrupa;
