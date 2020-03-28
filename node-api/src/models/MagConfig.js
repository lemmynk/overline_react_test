const Model = require('./Model');

const modelConfig = {
  tableName: 'mp_mag_config',
  keys: [
    'id',
    'vPromet',
    'defaultMagId',
    'isDefault',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class MagConfig extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  static defaultVPromet() {
    const model = new this();
    return model
      .baseQuery()
      .select('vPromet')
      .whereNull('deletedAt')
      .where('isDefault', true)
      .then(rows => rows.shift())
      .then(row => (row && row.vPromet ? row.vPromet : 'mp'));
  }

  static vPromets() {
    const model = new this();
    return model
      .baseQuery()
      .select('vPromet')
      .whereNull('deletedAt')
      .then(rows => rows.map(row => row.vPromet));
  }
}

module.exports = MagConfig;
