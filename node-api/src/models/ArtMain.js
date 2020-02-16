const { body } = require('express-validator');
const Model = require('./Model');
const ArtGrupa = require('./ArtGrupa');
const ArtPdv = require('./ArtPdv');

const modelConfig = {
  tableName: 'mp_art_main',
  keys: [
    'id',
    'vArtikl',
    'grpId',
    'intSifra',
    // 'barkod',
    'artNaziv',
    'mera',
    'pdvId',
    // 'pdvStopa',
    // 'proizvodjac',
    // 'opis',
    // 'cenaMp',
    // 'cenaPopust',
    // 'cenaPrikaz',
    // 'prodSuma',
    // 'fisLocked',
    // 'fisCena',
    // 'grpNaziv',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class ArtMain extends Model {
  constructor(props) {
    super(props, modelConfig);
    // this.searchFields = ['intSifra', 'artNaziv'];
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
      body('grpId')
        .exists()
        .withMessage('grpId.required')
        .bail()
        .isInt()
        .withMessage('grpId.invalid-format')
        .bail()
        .toInt()
        .custom(value =>
          ArtGrupa.count({ id: value })
            .then(count => {
              if (count > 0) {
                return true;
              }
              return Promise.reject(new Error('grpId.invalid'));
            })
            .catch(() => Promise.reject(new Error('grpId.db-error'))),
        ),
      body('artNaziv')
        .exists()
        .withMessage('artNaziv.required')
        .bail()
        .isLength({ min: 1, max: 120 })
        .withMessage('artNaziv.length'),
      body('intSifra')
        .exists()
        .withMessage('intSifra.required')
        .bail()
        .isLength({ min: 1, max: 20 })
        .withMessage('intSifra.length'),
      body('mera')
        .exists()
        .withMessage('mera.required')
        .bail()
        .isLength({ min: 1, max: 20 })
        .withMessage('mera.length'),
      body('pdvId')
        .exists()
        .withMessage('pdvId.required')
        .bail()
        .isInt()
        .withMessage('pdvId.invalid-format')
        .bail()
        .toInt()
        .custom(value =>
          ArtPdv.count({ id: value })
            .then(count => {
              if (count > 0) {
                return true;
              }
              return Promise.reject(new Error('pdvId.invalid'));
            })
            .catch(() => Promise.reject(new Error('pdvId.db-error'))),
        ),
    ];
  }
}

module.exports = ArtMain;
