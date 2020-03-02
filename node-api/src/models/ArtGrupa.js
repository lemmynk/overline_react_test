const Model = require('./Model');
const ArtConfig = require('./ArtConfig');
const ArtMainView = require('./ArtMainView');
const { validator, tools } = require('../utils');

const modelConfig = {
  tableName: 'mp_art_grupa',
  keys: [
    'id',
    'vArtikl',
    'grpNaziv',
    'grpSifra',
    'artPattern',
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
      validator.validateVArtikl(),
      validator.validateStringLength('grpNaziv', 120),
      validator.validateStringLength('grpSifra', 20),
      validator.validateOptionalStringLength('artPattern', 12),
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
    const configWhere = vArtikl ? { vArtikl } : { isDefault: true };

    return ArtConfig.find(configWhere)
      .then(config => {
        const { grpPattern, grpSifraByVArtikl } = config;
        const { length, prefix } = tools.patternMetrics(grpPattern);

        const maxQuery = model
          .baseQuery()
          .orderBy(
            db.raw(`LPAD(??, ${prefix.length > 0 ? length : 6}, "0")`, [
              'grpSifra',
            ]),
            'desc',
          )
          .limit(1)
          .whereNull('deletedAt');
        if (grpSifraByVArtikl) {
          maxQuery.where('vArtikl', config.vArtikl);
        }

        return maxQuery
          .then(rows => rows.shift())
          .then(row => ({
            prefix,
            length,
            last: row.grpSifra || '0',
          }));
      })
      .then(({ prefix, length, last }) =>
        tools.patternNext(prefix, length, last),
      );
  }

  /**
   * Default values for new model
   *
   * @return {Promise}
   */
  static init(reqQuery) {
    const { vArtikl } = reqQuery;
    const configWhere = vArtikl ? { vArtikl } : { isDefault: true };

    return Promise.all([
      ArtGrupa.nextSifra(vArtikl),
      ArtConfig.find(configWhere),
    ]).then(([grpSifra, config]) => ({
      grpSifra,
      vArtikl: config.vArtikl,
      grpPattern: config.artSifraByGroup ? config.grpPattern : undefined,
    }));
  }
}

module.exports = ArtGrupa;
