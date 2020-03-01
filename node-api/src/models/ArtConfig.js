const Model = require('./Model');

const modelConfig = {
  tableName: 'mp_art_config',
  keys: [
    'id',
    'vArtikl',
    'isDefault',
    'grpPattern',
    'artPattern',
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
}

module.exports = ArtConfig;
