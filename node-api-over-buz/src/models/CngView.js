const { Model } = require('@newtash/node-api-core');
const { CNG_STATION } = require('../config');

const modelConfig = {
  tableName: 'vw_cngs',
  keys: [
    'id',
    'cngType',
    'logoId',
    'logoSlug',
    'logoFileName',
    'name',
    'address',
    'phone',
    'hours',
    'web',
    'isVip',
    'isLive',
    'gmLat',
    'gmLng',
    'listName',
    'listAddress',
    'townId',
    'townName',
    'countryId',
    'countryName',
    'updatedAt',
    'isDeleted',
  ],
};

class CngView extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  static transformListItem(item) {
    const {
      id,
      cngType,
      logoId,
      logoSlug,
      logoFileName,
      listName,
      listAddress,
      phone,
      hours,
      // web,
      isVip,
      isLive,
      gmLat,
      gmLng,
      townId,
      townName,
      countryId,
      countryName,
      isDeleted,
    } = item;
    return {
      id,
      cngType,
      logoId,
      logoSlug,
      logoFileName,
      listName,
      listAddress,
      listPhone: phone,
      listHours: hours,
      isVip: isVip === 1,
      isLive: isLive === 1,
      lat: gmLat,
      lon: gmLng,
      // phone,
      // hours,
      // web,
      townId,
      townName,
      countryId,
      countryName,
      isDeleted: isDeleted === 1,
    };
  }

  toApiItem() {
    return {
      name: this.name,
      town: this.townName,
      address: this.address,
      logo: this.logoSlug,
      fileName: this.logoFileName,
      phone: this.phone,
      web: this.web,
      hours: this.hours,
      lat: this.gmLat,
      lon: this.gmLng,
    };
  }

  static cngsPerCountry(cngType = CNG_STATION) {
    const model = new this();
    const query = model.baseQuery();

    return query
      .select('countryId')
      .select('countryName')
      .count({ count: 'id' })
      .where('cngType', cngType)
      .where('isDeleted', 0)
      .where('isLive', 1)
      .groupBy(['countryId', 'countryName'])
      .orderBy('count', 'desc');
  }
}

module.exports = CngView;
