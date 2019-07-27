const { Model } = require('@newtash/node-api-core');

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

class ArtView extends Model {
  constructor(props) {
    super(props, modelConfig);
  }
}

module.exports = ArtView;
