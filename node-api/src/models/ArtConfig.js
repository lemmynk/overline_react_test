const Model = require('./Model');

const modelConfig = {
  tableName: 'mp_art_config',
  keys: [
    'id',
    'vArtikl',
    'isDefault',
    'grpPattern',
    'artPattern',
    'grpSifraByVArtikl',
    'artSifraByVArtikl',
    'artSifraByGroup',
    'defaultMera',
    'defaultPdvId',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class ArtConfig extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  static artSifraByGroup() {
    const model = new this();
    return model
      .baseQuery()
      .select('vArtikl')
      .select('artSifraByGroup')
      .whereNull('deletedAt')
      .then(rows =>
        rows.reduce(
          (acc, row) => ({ ...acc, [row.vArtikl]: !!row.artSifraByGroup }),
          {},
        ),
      );
  }

  static vArtikli() {
    const model = new this();
    return model
      .baseQuery()
      .select('vArtikl')
      .whereNull('deletedAt')
      .then(rows => rows.map(row => row.vArtikl));
  }

  static defaultVArtikl() {
    const model = new this();
    return model
      .baseQuery()
      .select('vArtikl')
      .whereNull('deletedAt')
      .where('isDefault', true)
      .then(rows => rows.shift())
      .then(row => (row && row.vArtikl ? row.vArtikl : 'roba'));
  }
}

module.exports = ArtConfig;
