const Model = require('./Model');
const KomConfig = require('./KomConfig');
const KomMesto = require('./KomMesto');
const { validator, tools } = require('../utils');

const VKOM_FIRMA = 1;
// const VKOM_KUPAC = 2;
// const VKOM_DOBAVLJAC = 4;
const VKOM_PRIVATNO = 8;

/**
 * vKom is a bit tricky one
 * For a purpose on init and nextSifra
 * we should resolve to 1|8
 */
const resolveVKom = vKom => {
  if (!vKom || parseInt(vKom, 10) === VKOM_PRIVATNO) {
    return vKom;
  }
  return VKOM_FIRMA;
};

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
      validator.validateOptionalStringLength('fax', 120),
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

  /**
   * Will return next sifra by vKom
   * @param   {Number} reqVKom
   * @return  {String}
   */
  static nextSifra(reqVKom) {
    const model = new this();
    const db = model.db();

    const vKom = resolveVKom(reqVKom);
    const configWhere = vKom ? { vKom } : { isDefault: true };

    return KomConfig.find(configWhere)
      .then(config => {
        const { vKom: configKom, pattern } = config;
        const { length, prefix } = tools.patternMetrics(pattern);

        const maxQuery = model
          .baseQuery()
          .orderBy(
            db.raw(prefix.length ? '??' : 'LPAD(??, 6, "0")', ['sifra']),
            'desc',
          )
          .limit(1)
          .whereNull('deletedAt')
          .where(db.raw(`?? & ${configKom} = ${configKom}`, ['vKom']));

        return maxQuery
          .then(rows => rows.shift())
          .then(row => ({
            prefix,
            length,
            last: row && row.sifra ? row.sifra : '0',
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
    const { vKom: reqVKom } = reqQuery;

    const vKom = resolveVKom(reqVKom);

    const configWhere = vKom ? { vKom } : { isDefault: true };

    return Promise.all([
      KomMain.nextSifra(vKom),
      KomConfig.find(configWhere),
    ]).then(([sifra, config]) => ({
      sifra,
      vKom: config.vKom,
    }));
  }
}

module.exports = KomMain;
