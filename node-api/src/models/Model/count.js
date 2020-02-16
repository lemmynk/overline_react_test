const baseWhereQuery = require('./where');

const count = (model, params) => {
  const { primaryKey } = model;

  return baseWhereQuery(model, params)
    .count(`${primaryKey} as count`)
    .then(rows => rows.shift())
    .then(row => row.count);
};

module.exports = count;
