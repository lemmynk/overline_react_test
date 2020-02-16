const Model = require('./Model');
const KomMesto = require('./KomMesto');
const { validator } = require('../utils');

const modelConfig = {
  tableName: 'mp_kom_main',
  keys: [
    'id',
    'pib',
    'komime',
    'intsifra',
    'naziv',
    'adresa',
    'mestoId',
    'telefon',
    'fax',
    'vlasnik',
    'kontakt',
    'mobilni',
    'web',
    'email',
    'pdvObveznik',
    'pdvBroj',
    'maticniBroj',
    'sifraDelatnosti',
    'tracun1',
    'tracun2',
    'tracun3',
    'banka1',
    'banka2',
    'banka3',
    'napomena',
    'isKupac',
    'isDobavljac',
    'isFirma',
    'isSuspended',
    'prodValuta',
    'prodRabat',
    'prodLimit',
    'nabDpo',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

// const validateStringLength = (field, max) =>
//   body(field)
//     .exists()
//     .withMessage(`${field}.required`)
//     .bail()
//     .isLength({ min: 1, max })
//     .withMessage(`${field}.length`);

// const validateOptionalStringLength = (field, max) =>
//   body(field)
//     .optional()
//     .isLength({ min: 1, max })
//     .withMessage(`${field}.length`);

// const validateBoolean = field =>
//   body(field)
//     .optional()
//     .toBoolean();

// const validateOptionalInteger = field =>
//   body(field)
//     .optional()
//     .toInt();

// const validateOptionalText = field =>
//   body(field)
//     .optional()
//     .escape();

class KomMain extends Model {
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
      validator.validateStringLength('pib', 12),
      validator.validateStringLength('komime', 60),
      validator.validateStringLength('intsifra', 12),
      validator.validateStringLength('naziv', 120),
      validator.validateStringLength('adresa', 120),
      validator.validateStringLength('telefon', 120),
      validator.validateStringLength('fax', 120),
      validator.validateOptionalStringLength('vlasnik', 120),
      validator.validateOptionalStringLength('kontakt', 120),
      validator.validateOptionalStringLength('mobilni', 120),
      validator.validateOptionalStringLength('web', 120),
      validator.validateOptionalStringLength('email', 120),
      validator.validateBoolean('pdvObveznik'),
      validator.validateOptionalStringLength('pdvBroj', 30),
      validator.validateOptionalStringLength('maticniBroj', 30),
      validator.validateOptionalStringLength('sifraDelatnosti', 30),
      validator.validateOptionalStringLength('tracun1', 30),
      validator.validateOptionalStringLength('tracun2', 30),
      validator.validateOptionalStringLength('tracun3', 30),
      validator.validateOptionalStringLength('banka1', 120),
      validator.validateOptionalStringLength('banka2', 120),
      validator.validateOptionalStringLength('banka3', 120),
      validator.validateOptionalText('napomena'),
      validator.validateBoolean('isKupac'),
      validator.validateBoolean('isDobavljac'),
      validator.validateBoolean('isFirma'),
      validator.validateBoolean('isSuspended'),
      validator.validateOptionalInteger('prodValuta'),
      validator.validateOptionalInteger('prodRabat'),
      validator.validateOptionalInteger('prodLimit'),
      validator.validateOptionalInteger('nabDpo'),
      validator.validateParent('mestoId', KomMesto),
    ];
  }
}

module.exports = KomMain;
