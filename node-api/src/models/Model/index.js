/* eslint-disable import/order */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["db", "excludeAlways"] }] */
const knexFile = require('../../../knexfile');
const dbInstance = require('knex')(knexFile);
const versionModel = require('./version');
const countModel = require('./count');
const findModel = require('./find');
const findAllModel = require('./findAll');
const validator = require('./validator');
const { doSave, doUpdate, doDelete } = require('./crud');
const { doMoveToTop, doMoveUp, doMoveDown, doMoveToBottom } = require('./move');

class Model {
  constructor(props, config) {
    const modelProps = props || {};
    const { keys, tableName, primaryKey } = config || {};
    this.keys = keys || [];
    this.tableName = tableName;
    this.primaryKey = primaryKey || 'id';
    // this.withDeleted = true;

    this.keys.forEach(key => {
      this[key] = modelProps[key];
    });
  }

  /**
   * PrimaryKey value getter
   * @return {Mixed}
   */
  primaryKeyValue() {
    const key = this.primaryKey;
    return this[key];
  }

  /**
   * Does the property exists in the model definition
   * @param  {String}  propName
   * @return {Boolean}
   */
  has(propName) {
    return this.keys.includes(propName);
  }

  /**
   * Base db instance
   * @return {Object}
   */
  db() {
    return dbInstance;
  }

  /**
   * Base query instance
   * @return {Promise}
   */
  baseQuery() {
    return dbInstance.from(this.tableName);
  }

  /**
   * Crud query instance
   * @return {Promise}
   */
  crudQuery() {
    return dbInstance(this.tableName);
  }

  /**
   * Get the list of attributes
   * @param  {Array} exclude
   * @param  {Boolean} withUndefined
   * @return {Object}
   */
  attributes(exclude = [], withUndefined = false) {
    const thisExclude = this.excludeAlways ? this.excludeAlways() : [];
    const excludeThis = [...exclude, ...thisExclude];
    const output = {};

    const intersection = this.keys.filter(item => !excludeThis.includes(item));

    intersection.forEach(key => {
      // Skip undefined values if not forced
      const isUndefined = typeof this[key] === 'undefined';
      if (!isUndefined || withUndefined) {
        output[key] = this[key];
      }
    });
    return output;
  }

  /**
   * Attributes alias
   * @param  {Array} exclude
   * @param  {Boolean} withUndefined
   * @return {Object}
   */
  attrs(exclude = [], withUndefined = false) {
    return this.attributes(exclude, withUndefined);
  }

  /**
   * Create not deleted query param
   * @return {Object}
   */
  withoutDeletedQueryParam() {
    if (this.has('deletedAt')) {
      return { deletedAt: 'NULL' };
    }
    if (this.has('isDeleted')) {
      return { isDeleted: 0 };
    }
    return {};
  }

  /**
   * Fill the model's attributes
   * @param   {Object} props
   * @return  {Object}
   */
  fill(props) {
    Object.keys(props).forEach(key => {
      if (this.has(key)) {
        this[key] = props[key];
      }
    });
    return this;
  }

  /**
   * List of attributes to be excluded always from output
   *
   * @return {Array}
   */
  // excludeAlways() {
  //   return ['createdAt', 'updatedAt'];
  // }

  /**
   * -------------------------------------------------------------------
   * CRUD FUNCTIONS
   * -------------------------------------------------------------------
   */

  /**
   * Will return current version
   * @return  {Number}
   */
  currentVersion() {
    return versionModel(this);
  }

  /**
   * Set primaryKey value
   * @param   {Mixed}   value
   * @return  {Object}
   */
  setPrimaryKeyValue(value) {
    const { primaryKey } = this;
    this[primaryKey] = value;
    return this;
  }

  /**
   * Save current model attributes
   * @return  {Promise}
   */
  save() {
    const idValue = this.primaryKeyValue();
    if (this.beforeSave) {
      const beforeSaved = this.beforeSave();
      if (beforeSaved === false) {
        // Maybe throw an error here (?!)
      }
    }
    if (idValue) {
      return doUpdate(this);
    }
    return doSave(this);
  }

  /**
   * Delete current model
   * @return {Boolean}
   */
  delete() {
    return doDelete(this);
  }
  /**
   * -------------------------------------------------------------------
   * POSITION FUNCTIONS
   * -------------------------------------------------------------------
   */

  /**
   * Move item position to top
   * @param   {String}  positionAttributeName
   * @return  {Promise}
   */
  moveToTop(positionAttributeName = 'position') {
    return doMoveToTop(this, positionAttributeName);
  }

  /**
   * Move item position to top
   * @param   {String}  positionAttributeName
   * @return  {Promise}
   */
  moveUp(positionAttributeName = 'position') {
    return doMoveUp(this, positionAttributeName);
  }

  /**
   * Move item position to top
   * @param   {String}  positionAttributeName
   * @return  {Promise}
   */
  moveDown(positionAttributeName = 'position') {
    return doMoveDown(this, positionAttributeName);
  }

  /**
   * Move item position to bottom
   * @param   {String}  positionAttributeName
   * @return  {Promise}
   */
  moveToBottom(positionAttributeName = 'position') {
    return doMoveToBottom(this, positionAttributeName);
  }

  /**
   * -------------------------------------------------------------------
   * STATIC FUNCTIONS
   * -------------------------------------------------------------------
   */

  /**
   * Create pre-populated model
   * @param   {Object}  props
   * @return  {Object}
   */
  static count(params) {
    const model = new this();
    return countModel(model, params);
  }

  /**
   * Create pre-populated model
   * @param   {Object}  props
   * @return  {Object}
   */
  static create(props) {
    const model = new this(props);
    return model.save().then(response => response);
  }

  /**
   * Bulk insert items
   *
   * @param  {Array} items
   * @return {Boolean}
   */
  static insert(items) {
    const model = new this();
    return model
      .crudQuery()
      .insert(items)
      .then(() => true);
  }

  /**
   * Find model
   * @param   {Object}  params
   * @return  {Object}
   */
  static find(params) {
    const model = new this();
    return findModel(model, params);
  }

  /**
   * Find all model(s)
   * @param   {Object}  req
   * @param   {Object}  queryParams
   * @return  {Promise}
   */
  static findAll(req, queryParams = {}) {
    const model = new this();
    return findAllModel(model, req, queryParams);
  }

  /**
   * Find the model
   * If exists return it, otherwise create new one
   *
   * @param  {Object} findParams
   * @param  {Object} createParams
   * @return {self}
   */
  static findOrCreate(findParams, createParams) {
    return this.find(findParams).catch(() => this.create(createParams));
  }

  /**
   * Do pagination
   *
   * @todo Attach pagination params
   *
   * @param   {Object}  params
   * @param   {Number}  page
   * @param   {String}  orderByField
   * @param   {Number}  pageLength
   * @return  {Promise}
   */
  static paginate(params, page = 1, orderByField, pageLength = 2) {
    const model = new this();
    const { primaryKey } = model;
    const offsetSize = (page - 1) * pageLength;
    return findAllModel(model, params)
      .orderBy(orderByField || primaryKey)
      .limit(pageLength)
      .offset(offsetSize);
  }

  /**
   * -------------------------------------------------------------------
   * VALIDATION
   * -------------------------------------------------------------------
   */

  /**
   * Clear all recent validation errors
   * @return {self}
   */
  static clearValidationErrors() {
    this.validationErrors = {};
    return this;
  }

  /**
   * Add validation error message
   * @param {String} key
   * @param {String} message
   * @return {self}
   */
  static addValidationError(key, message) {
    this.validationErrors[key] = message;
    return this;
  }

  /**
   * Validate required params
   *
   * @param {Array}   props   List of required props
   * @param {Object}  params  Params to validate
   * @return {self}
   */
  static validateRequired(props, params) {
    validator.validateRequired(this, props, params);
    return this;
  }

  /**
   * Validate string length
   *
   * @param {Object}  params    Params to validate
   * @param {String}  prop      Prop name to validate
   * @param {Number}  maxLength Max length allowed
   * @return {self}
   */
  static validateStringLength(params, prop, maxLength) {
    validator.validateStringLength(this, params, prop, maxLength);
    return this;
  }

  /**
   * Validate params provided for adding to Model
   * Should be overridden in child Model
   *
   * @param {Object} params
   * @return {Boolean}
   */
  static validate(params) {
    const { nonExistingProp } = params;
    if (!nonExistingProp) {
      this.addValidationError(
        'exampleProp',
        'Example validation error message',
      );
    }
    return Object.keys(this.validationErrors).length === 0;
  }
}

Model.validationErrors = {};

module.exports = Model;
