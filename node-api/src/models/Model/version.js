const versionModel = model => {
  const db = model.db();
  const query = model.baseQuery();

  if (model.has('updatedAt')) {
    query.select(db.raw('MAX(UNIX_TIMESTAMP(updatedAt)) AS unixVersion'));
  } else {
    query.select(db.raw('MAX(UNIX_TIMESTAMP(createdAt)) AS unixVersion'));
  }

  return query
    .then(rows => rows.shift())
    .then(version => version.unixVersion || 0);
};

module.exports = versionModel;
