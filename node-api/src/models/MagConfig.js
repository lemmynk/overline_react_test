const Model = require('./Model');

const modelConfig = {
  tableName: 'mp_mag_config',
  keys: [
    'id',
    'vPromet',
    'defaultMagId',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class MagConfig extends Model {
  constructor(props) {
    super(props, modelConfig);
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
