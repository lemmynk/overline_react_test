const Model = require('./Model');

const modelConfig = {
  tableName: 'mp_kom_config',
  keys: [
    'id',
    'vKom',
    'isDefault',
    'pattern',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class KomConfig extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  static vKoms() {
    const model = new this();
    return model
      .baseQuery()
      .select('vKom')
      .whereNull('deletedAt')
      .then(rows => rows.map(row => row.vKom));
  }
}

module.exports = KomConfig;
