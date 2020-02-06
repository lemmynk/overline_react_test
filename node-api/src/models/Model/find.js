import { NoRecordsFoundError } from '../../errors';

const find = (model, params) => {
  const { tableName, primaryKey } = model;

  const query = model.baseQuery();

  if (typeof params === 'object') {
    Object.keys(params).forEach(key => {
      query.where(key, params[key]);
    });
  } else if (typeof params !== 'undefined') {
    query.where(primaryKey, params);
  }

  return (
    query
      .then(rows => rows.shift())
      .then(props => {
        if (!props) {
          throw new NoRecordsFoundError(tableName, params);
        }
        return props;
      })
      // .then(props => {
      //   db.destroy()
      //   return props;
      // })
      .then(props => model.fill(props))
  );
};

module.exports = find;
