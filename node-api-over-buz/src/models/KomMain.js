const { Model } = require('@newtash/node-api-core');

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

class KomMain extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  /**
   * Validate params provided
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static validate(params) {
    this.clearValidationErrors()
      .validateRequired(
        [
          'pib',
          'komime',
          'intsifra',
          'naziv',
          'adresa',
          'mestoId',
          'telefon',
          'fax',
          'pdvObveznik',
          'isKupac',
          'isDobavljac',
          'isFirma',
          'isSuspended',
          'prodValuta',
          'prodRabat',
          'prodLimit',
          'nabDpo',
        ],
        params,
      )
      .validateStringLength(params, 'id', 120)
      .validateStringLength(params, 'pib', 120)
      .validateStringLength(params, 'komime', 120)
      .validateStringLength(params, 'intsifra', 120)
      .validateStringLength(params, 'naziv', 120)
      .validateStringLength(params, 'adresa', 120)
      .validateStringLength(params, 'mestoId', 120)
      .validateStringLength(params, 'telefon', 120)
      .validateStringLength(params, 'fax', 120)
      .validateStringLength(params, 'vlasnik', 120)
      .validateStringLength(params, 'kontakt', 120)
      .validateStringLength(params, 'mobilni', 120)
      .validateStringLength(params, 'web', 120)
      .validateStringLength(params, 'email', 120)
      .validateStringLength(params, 'pdvObveznik', 120)
      .validateStringLength(params, 'pdvBroj', 120)
      .validateStringLength(params, 'maticniBroj', 120)
      .validateStringLength(params, 'sifraDelatnosti', 120)
      .validateStringLength(params, 'tracun1', 120)
      .validateStringLength(params, 'tracun2', 120)
      .validateStringLength(params, 'tracun3', 120)
      .validateStringLength(params, 'banka1', 120)
      .validateStringLength(params, 'banka2', 120)
      .validateStringLength(params, 'banka3', 120);
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = KomMain;
