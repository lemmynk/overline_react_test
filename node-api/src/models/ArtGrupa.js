const Model = require('./Model');
const ArtConfig = require('./ArtConfig');
const ArtMainView = require('./ArtMainView');
const { validator } = require('../utils');

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
   * Default values for new model
   *
   * @return {Promise}
   */
  static init(reqQuery) {
    return Promise.resolve({ vArtikl: process.env.ARTIKL_ROBA, ...reqQuery });
  }

  /**
   * Validate params provided using express-validator
   *
   * @return {Array}
   */
  static validate() {
    return [
      validator.validateVArtikl(),
      validator.validateStringLength('grpNaziv', 120),
      validator.validateStringLength('grpSifra', 20),
    ];
  }

  /**
   * Validate should Model be deleted
   *
   * @return {Array}
   */
  static canDelete() {
    return [validator.validateNoChildren('id', ArtMainView, 'grpId')];
  }

  /**
   * Will return next sifra by vArtikl
   * @param   {String} vArtikl
   * @return  {String}
   */
  static nextSifra(vArtikl) {
    const model = new this();

    const db = model.db();

    const configQuery = ArtConfig.find({ vArtikl }).then(row => row.grpPattern);
    const maxGrpQuery = model
      .baseQuery()
      .max({ last: db.raw('LPAD(??, 2, "0")', ['grpSifra']) })
      .whereNull('deletedAt')
      .where('vArtikl', vArtikl)
      .then(rows => rows.shift())
      .then(row => row.last);

    return Promise.all([configQuery, maxGrpQuery]).then(([pattern, last]) => {
      console.log('pattern:', pattern);
      console.log('last:', last);
      return last;
    });
  }
}

module.exports = ArtGrupa;
