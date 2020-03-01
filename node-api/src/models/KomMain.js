const Model = require('./Model');
const KomMesto = require('./KomMesto');
const { validator } = require('../utils');

const modelConfig = {
  tableName: 'mp_kom_main',
  keys: [
    'id',
    'vKom',
    'sifra',
    'intNaziv',
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
    'pib',
    'pdvObveznik',
    'pdvBroj',
    'maticniBroj',
    'sifraDelatnosti',
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
      validator.validateInteger('vKom'),
      validator.validateStringLength('sifra', 12),
      validator.validateStringLength('sifra', 12),
      validator.validateStringLength('intNaziv', 60),
      validator.validateStringLength('naziv', 120),
      validator.validateStringLength('adresa', 120),
      validator.validateStringLength('telefon', 120),
      validator.validateStringLength('fax', 120),
      validator.validateOptionalStringLength('vlasnik', 120),
      validator.validateOptionalStringLength('kontakt', 120),
      validator.validateOptionalStringLength('mobilni', 120),
      validator.validateOptionalStringLength('web', 120),
      validator.validateOptionalStringLength('email', 120),
      validator.validateStringLength('pib', 12),
      validator.validateBoolean('pdvObveznik'),
      validator.validateOptionalStringLength('pdvBroj', 30),
      validator.validateOptionalStringLength('maticniBroj', 30),
      validator.validateOptionalStringLength('sifraDelatnosti', 30),
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
