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
      body('grpId').custom(value => {
        return ArtGrupa.find({ id: value }).then(() => {
          return Promise.reject(new Error('whatever grp'));
        });
      }),
      body('pdvId')
        .exists()
        .withMessage('pdvId.required')
        .bail()
        .custom(value =>
          ArtPdv.find({ id: value })
            .then(() => true)
            .catch(() => Promise.reject(new Error('whatever pdv'))),
        ),
    ];
  }

  /**
   * Validate params provided using express-validator
   *
   * @return {Array}
   */
  static validates() {
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
        .toInt(),
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
        .toInt(),
    ];
  }
}

module.exports = ArtMain;
