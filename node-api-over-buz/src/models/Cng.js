const { Model } = require('@newtash/node-api-core');

const modelConfig = {
  tableName: 'cngs',
  keys: [
    'id',
    'cngType',
    'name',
    'gmLat',
    'gmLng',
    'townId',
    'logoId',
    'address',
    'phone',
    'web',
    'hours',
    'listName',
    'listAddress',
    'isVip',
    'isLive',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class Cng extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  static transformListItem(item) {
    const {
      id,
      cngType,
      listName,
      listAddress,
      phone,
      hours,
      isVip,
      isLive,
      gmLat,
      gmLng,
      townId,
      deletedAt,
    } = item;
    return {
      id,
      cngType,
      listName,
      listAddress,
      listPhone: phone,
      listHours: hours,
      isVip: isVip === 1,
      isLive: isLive === 1,
      lat: gmLat,
      lon: gmLng,
      townId,
      townName: '',
      countryId: 0,
      countryName: '',
      version: 0,
      isDeleted: deletedAt,
    };
  }

  static distances(cngType, lat, lon) {
    const model = new this();
    const { tableName } = model;

    const db = model.db();
    const query = db.from(tableName);

    return query
      .select('id')
      .select({
        distance: db.raw('fn_dist_km(`gmLat`, `gmLng`, ?, ?)', [lat, lon]),
      })
      .where('cngType', cngType)
      .where('isLive', true)
      .whereNull('deletedAt')
      .orderBy('distance');
  }

  /**
   * Validate params provided
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static validate(params) {
    this.clearValidationErrors()
      .validateRequired(
        [
          'cngType',
          'name',
          'gmLat',
          'gmLng',
          'townId',
          'listName',
          'listAddress',
        ],
        params,
      )
      .validateStringLength(params, 'name', 120)
      // .validateStringLength(params, 'address', 255)
      // .validateStringLength(params, 'phone', 255)
      // .validateStringLength(params, 'web', 255)
      // .validateStringLength(params, 'hours', 255)
      .validateStringLength(params, 'listName', 255)
      .validateStringLength(params, 'listAddress', 255);
    return Object.keys(this.validationErrors).length === 0;
  }
}

module.exports = Cng;
