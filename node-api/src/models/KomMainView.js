const Model = require('./Model');

const modelConfig = {
  tableName: 'vw_kom_main',
  keys: [
    'id',
    'vKom',
    'sifra',
    'intNaziv',
    'naziv',
    'adresa',
    'mestoId',
    'zip',
    'mesto',
    'telefon',
    'pib',
    'pdvObveznik',
    'isKupac',
    'isDobavljac',
    'isFirma',
    'isSuspended',
    'prodValuta',
    'prodRabat',
    'prodLimit',
    'nabDpo',
    'updatedAt',
    'isDeleted',
  ],
};

class KomView extends Model {
  constructor(props) {
    super(props, modelConfig);
    this.searchFields = ['sifra', 'intNaziv', 'naziv'];
  }
}

module.exports = KomView;
