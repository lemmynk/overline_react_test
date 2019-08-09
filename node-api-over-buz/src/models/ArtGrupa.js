const { Model } = require('@newtash/node-api-core');

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
   * Validate params provided
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static validate(params) {
    this.clearValidationErrors()
      .validateRequired(['vArtikl', 'grpNaziv', 'grpSifra'], params)
      .validateStringLength(params, 'grpNaziv', 120)
      .validateStringLength(params, 'grpSifra', 20);
    // .validateStringLength(params, 'redosled', 20);
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = ArtGrupa;
