const Model = require('./Model');
const ArtConfig = require('./ArtConfig');
const ArtGrupa = require('./ArtGrupa');
const ArtPdv = require('./ArtPdv');
const { validator, tools } = require('../utils');

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
  }

  /**
   * Validate params provided using express-validator
   *
   * @return {Array}
   */
  static validate() {
    return [
      validator.validateVArtikl(),
      validator.validateParent('grpId', ArtGrupa),
      validator.validateParent('pdvId', ArtPdv),
      validator.validateStringLength('artNaziv', 120),
      validator.validateStringLength('intSifra', 20),
      validator.validateStringLength('mera', 20),
    ];
  }

  /**
   * Will return next sifra by vArtikl
   * @param   {String} vArtikl
   * @return  {String}
   */
  static nextSifraByVArtikl(vArtikl) {
    const model = new this();
    const db = model.db();
    const configWhere = vArtikl ? { vArtikl } : { isDefault: true };

    return ArtConfig.find(configWhere)
      .then(config => {
        const { artPattern, artSifraByVArtikl } = config;
        const { length, prefix } = tools.patternMetrics(artPattern);

        const maxQuery = model
          .baseQuery()
          .orderBy(
            db.raw(`LPAD(??, ${prefix.length > 0 ? length : 6}, "0")`, [
              'intSifra',
            ]),
            'desc',
          )
          .limit(1)
          .whereNull('deletedAt');
        if (artSifraByVArtikl) {
          maxQuery.where('vArtikl', config.vArtikl);
        }

        return maxQuery
          .then(rows => rows.shift())
          .then(row => ({
            prefix,
            length,
            last: row.intSifra || '0',
          }));
      })
      .then(({ prefix, length, last }) => {
        return tools.patternNext(prefix, length, last);
      });
  }

  /**
   * Will return next sifra by grpId
   * @param   {String} grpId
   * @return  {String}
   */
  static nextSifraByGrpId(grpId) {
    const model = new this();
    const db = model.db();

    return ArtGrupa.find({ id: grpId })
      .then(grupa =>
        Promise.all([ArtConfig.find({ vArtikl: grupa.vArtikl }), grupa]),
      )
      .then(response => response.map(item => item.attrs()))
      .then(([config, grupa]) => {
        if (!config.artSifraByGroup || !grupa.artPattern) {
          return ArtMain.nextSifraByVArtikl(grupa.vArtikl);
        }
        const { length, prefix } = tools.patternMetrics(grupa.artPattern);

        return model
          .baseQuery()
          .orderBy(
            db.raw(`LPAD(??, ${prefix.length > 0 ? length : 6}, "0")`, [
              'intSifra',
            ]),
            'desc',
          )
          .limit(1)
          .whereNull('deletedAt')
          .where('grpId', grupa.id)
          .then(rows => rows.shift())
          .then(row => tools.patternNext(prefix, length, row.intSifra || '0'));
      });
  }

  /**
   * Will return next sifra by vArtikl or grpId
   * @param   {String} vArtikl
   * @param   {String} grpId
   * @return  {String}
   */
  static nextSifra(vArtikl, grpId) {
    if (grpId) {
      return ArtMain.nextSifraByGrpId(grpId);
    }
    return ArtMain.nextSifraByVArtikl(vArtikl);
  }

  static initByVArtikl(vArtikl) {
    const configWhere = vArtikl ? { vArtikl } : { isDefault: true };

    return Promise.all([
      ArtMain.nextSifraByVArtikl(vArtikl),
      ArtConfig.find(configWhere),
    ]).then(([intSifra, config]) => ({
      intSifra,
      vArtikl: config.vArtikl,
      mera: config.defaultMera,
      pdvId: config.defaultPdvId,
    }));
  }

  static initByGrpId(grpId) {
    return ArtGrupa.find({ id: grpId })
      .then(grupa => {
        return Promise.all([
          ArtMain.nextSifraByGrpId(grpId),
          ArtConfig.find({ vArtikl: grupa.vArtikl }),
        ]);
      })
      .then(([intSifra, config]) => ({
        intSifra,
        vArtikl: config.vArtikl,
        mera: config.defaultMera,
        pdvId: config.defaultPdvId,
      }));
  }

  /**
   * Default values for new model
   *
   * @return {Promise}
   */
  static init(reqQuery) {
    const { vArtikl, grpId } = reqQuery;

    if (grpId) {
      return ArtMain.initByGrpId(grpId);
    }
    return ArtMain.initByVArtikl(vArtikl);
  }
}

module.exports = ArtMain;
