const count = (model, params) => {
  const { primaryKey } = model;

  const query = model.baseQuery();

  if (typeof params === 'object') {
    Object.keys(params).forEach(key => {
      query.where(key, params[key]);
    });
  }

  return query
    .count(`${primaryKey} as count`)
    .then(rows => rows.shift())
    .then(row => row.count);
};

module.exports = count;
