const { Model } = require('@newtash/node-api-core');

const modelConfig = {
  tableName: 'vw_kom_main',
  keys: [
    'id',
    'pib',
    'komime',
    'intsifra',
    'naziv',
    'adresa',
    'zip',
    'mesto',
    'telefon',
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
  }
}

module.exports = KomView;
