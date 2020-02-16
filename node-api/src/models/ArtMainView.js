const Model = require('./Model');

const modelConfig = {
  tableName: 'vw_art_main',
  keys: [
    'id',
    'vArtikl',
    'grpId',
    'grpNaziv',
    'intsifra',
    'artNaziv',
    'mera',
    'pdvId',
    'pdvStopa',
    'pdvOpis',
    'updatedAt',
    'isDeleted',
  ],
};

class ArtMainView extends Model {
  constructor(props) {
    super(props, modelConfig);
    this.searchFields = ['intSifra', 'artNaziv'];
  }
}

module.exports = ArtMainView;
