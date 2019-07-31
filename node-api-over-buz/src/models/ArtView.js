/* eslint-disable func-names */
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

  static search(vArtikl, reqQuery) {
    const query = { page: 1, ...reqQuery };
    const { search: searchStr, page, perPage: queryPerPage } = query;
    const currentPage = parseInt(page, 10);
    const perPage = parseInt(queryPerPage || process.env.DB_PAGINATION, 10);
    const pagination = {
      currentPage,
      perPage,
    };
    const offset = (currentPage - 1) * perPage;
    const model = new this();

    const countQuery = model
      .baseQuery()
      .count({ c: 'id' })
      .where('vArtikl', vArtikl)
      .where('isDeleted', 0)
      .where(function() {
        this.where('artNaziv', 'LIKE', `%${searchStr}%`).orWhere(
          'intSifra',
          'LIKE',
          `%${searchStr}%`,
        );
      });

    const dataSql = model
      .baseQuery()
      .where('vArtikl', vArtikl)
      .where('isDeleted', 0)
      .where(function() {
        this.where('artNaziv', 'LIKE', `%${searchStr}%`).orWhere(
          'intSifra',
          'LIKE',
          `%${searchStr}%`,
        );
      })
      .orderBy('artNaziv')
      .limit(perPage)
      .offset(offset);

    return countQuery
      .then(response => response.shift())
      .then(response => {
        pagination.total = response.c;
      })
      .then(() => dataSql)
      .then(data => ({ data, pagination }));
  }
}

module.exports = ArtView;
