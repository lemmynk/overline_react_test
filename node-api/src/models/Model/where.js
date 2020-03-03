/* eslint func-names: ["error", "never"] */

const binRegEx = /^bin:\d+$/g;

const isPropValue = (model, key, value) =>
  typeof value !== 'undefined' && typeof value !== 'object' && model.has(key);

const baseWhereQuery = (model, whereParams) => {
  const query = model.baseQuery();
  const db = model.db();

  if (typeof whereParams === 'object') {
    Object.keys(whereParams).forEach(key => {
      const value = whereParams[key];
      // handle OR grouping; expecting array here
      if (key === 's' && model.searchFields) {
        if (model.searchFields.length === 1) {
          query.where(model.searchFields.shift(), 'like', `%${value}%`);
        } else {
          query.where(function() {
            model.searchFields.forEach(column => {
              this.orWhere(column, 'like', `%${value}%`);
            });
          });
        }
      } else if (isPropValue(model, key, value)) {
        if (value.toUpperCase && value.toUpperCase() === 'NULL') {
          query.whereNull(key);
        } else if (value.toUpperCase && value.toUpperCase() === 'NOT NULL') {
          query.whereNotNull(key);
        } else if (value.match && value.match(binRegEx)) {
          const b = parseInt(value.substr(4), 10);
          query.where(db.raw(`?? & ${b} = ${b}`, [key]));
        } else {
          query.where(key, value);
        }
      }
    });
  }
  return query;
};

module.exports = baseWhereQuery;
