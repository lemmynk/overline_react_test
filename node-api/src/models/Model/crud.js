import { DbInsertError, DbUpdateError } from '../../errors';

const timestamps = ['deletedAt', 'updatedAt', 'createdAt'];

const doSave = model => {
  const { tableName } = model;
  const db = model.db();
  const data = model.attributes(timestamps);

  if (model.has('createdAt')) {
    data.createdAt = db.raw('NOW()');
  }
  if (model.has('updatedAt')) {
    data.updatedAt = db.raw('NOW()');
  }

  return db(tableName)
    .insert(data)
    .then(result => {
      if (result.length === 0) throw new DbInsertError(tableName, data);
      return result.shift();
    })
    .then(id => {
      model.setPrimaryKeyValue(id);
      return model;
    });
};

const doUpdate = model => {
  const { tableName, primaryKey } = model;
  const primaryKeyValue = model.primaryKeyValue();
  const db = model.db();
  const data = model.attributes([primaryKey, ...timestamps]);

  if (model.has('updatedAt')) data.updatedAt = db.fn.now();

  return db(tableName)
    .update(data)
    .where(primaryKey, primaryKeyValue)
    .then(result => {
      if (!result) throw new DbUpdateError(tableName, data, primaryKeyValue);
    })
    .then(() => true);
};

const doDelete = model => {
  const { tableName, primaryKey } = model;
  const primaryKeyValue = model.primaryKeyValue();
  const db = model.db();
  const data = {};

  if (model.has('deletedAt')) {
    data.deletedAt = db.fn.now();
    if (model.has('updatedAt')) {
      data.updatedAt = db.fn.now();
    }

    return db(tableName)
      .update(data)
      .where(primaryKey, primaryKeyValue)
      .then(result => {
        if (!result) throw new DbUpdateError(tableName, data, primaryKeyValue);
      })
      .then(() => true);
  }

  return db(tableName)
    .where(primaryKey, primaryKeyValue)
    .del()
    .then(() => true);
};

module.exports = {
  doSave,
  doUpdate,
  doDelete,
};
