const Model = require('./Model');
const { validator } = require('../utils');
const { NoRecordsFoundError } = require('../errors');

const modelConfig = {
  tableName: 'mp_period',
  keys: [
    'id',
    'name',
    'dateFrom',
    'dateTo',
    'isDefault',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ],
};

class Period extends Model {
  constructor(props) {
    super(props, modelConfig);
  }

  /**
   * Validate params provided using express-validator
   *
   * @return {Array}
   */
  static validate() {
    return [
      validator.validateStringLength('name', 60),
      validator.validateDate('dateFrom'),
      validator.validateDate('dateTo'),
      validator.validateBoolean('isDefault'),
    ];
  }

  /**
   * Validate should Model be deleted
   *
   * @return {Array}
   */
  static canDelete() {
    return [new Error('Action is not available')];
  }

  /**
   * Will return default period
   * Just return the last one for now
   *
   * @return {Object}
   */
  static getDefault() {
    const model = new this();

    return model
      .baseQuery()
      .orderBy('id', 'desc')
      .whereNull('deletedAt')
      .limit(1)
      .then(rows => rows.shift())
      .then(response => {
        if (!response) {
          throw new NoRecordsFoundError(model.tableName, { default: true });
        }
        return response;
      });
  }
}

module.exports = Period;
