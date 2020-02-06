const doMoveToTop = (model, positionAttributeName) => {
  const { tableName, primaryKey } = model;
  const primaryKeyValue = model.primaryKeyValue();
  const db = model.db();
  const currentPosition = model[positionAttributeName];
  const data = {};
  if (model.has('updatedAt')) data.updatedAt = db.fn.now();

  return db(tableName)
    .increment(positionAttributeName, 1)
    .update(data)
    .where(positionAttributeName, '<', currentPosition)
    .whereNull('deletedAt')
    .then(() =>
      db(tableName)
        .update({ ...data, [positionAttributeName]: 1 })
        .where(primaryKey, primaryKeyValue),
    )
    .then(() => true);
};

const doMoveUp = (model, positionAttributeName) => {
  const { tableName, primaryKey } = model;
  const primaryKeyValue = model.primaryKeyValue();
  const db = model.db();
  const currentPosition = model[positionAttributeName];
  let newPosition;
  const data = {};
  if (model.has('updatedAt')) data.updatedAt = db.fn.now();

  return db(tableName)
    .max({ last: positionAttributeName })
    .whereNull('deletedAt')
    .where(positionAttributeName, '<', currentPosition)
    .then(response => response.shift())
    .then(response => response.last)
    .then(lastPosition => {
      newPosition = lastPosition;
      return lastPosition;
    })
    .then(lastPosition =>
      db(tableName)
        .update({ ...data, [positionAttributeName]: currentPosition })
        .where(positionAttributeName, lastPosition)
        .whereNull('deletedAt'),
    )
    .then(() =>
      db(tableName)
        .update({ ...data, [positionAttributeName]: newPosition })
        .where(primaryKey, primaryKeyValue),
    );
};

const doMoveDown = (model, positionAttributeName) => {
  const { tableName, primaryKey } = model;
  const primaryKeyValue = model.primaryKeyValue();
  const db = model.db();
  const currentPosition = model[positionAttributeName];
  let newPosition;
  const data = {};
  if (model.has('updatedAt')) data.updatedAt = db.fn.now();

  return db(tableName)
    .min({ next: positionAttributeName })
    .whereNull('deletedAt')
    .where(positionAttributeName, '>', currentPosition)
    .then(response => response.shift())
    .then(response => response.next)
    .then(nextPosition => {
      newPosition = nextPosition;
      return nextPosition;
    })
    .then(nextPosition =>
      db(tableName)
        .update({ ...data, [positionAttributeName]: currentPosition })
        .where(positionAttributeName, nextPosition)
        .whereNull('deletedAt'),
    )
    .then(() =>
      db(tableName)
        .update({ ...data, [positionAttributeName]: newPosition })
        .where(primaryKey, primaryKeyValue),
    );
};

const doMoveToBottom = (model, positionAttributeName) => {
  const { tableName, primaryKey } = model;
  const primaryKeyValue = model.primaryKeyValue();
  const db = model.db();
  const currentPosition = model[positionAttributeName];
  const data = {};
  if (model.has('updatedAt')) data.updatedAt = db.fn.now();

  return db(tableName)
    .decrement(positionAttributeName, 1)
    .update(data)
    .where(positionAttributeName, '>', currentPosition)
    .whereNull('deletedAt')
    .then(() =>
      db(tableName)
        .max({ last: positionAttributeName })
        .whereNull('deletedAt'),
    )
    .then(response => response.shift())
    .then(response => response.last + 1)
    .then(lastPosition =>
      db(tableName)
        .update({ ...data, [positionAttributeName]: lastPosition })
        .where(primaryKey, primaryKeyValue),
    )
    .then(() => true);
};

module.exports = {
  doMoveToTop,
  doMoveUp,
  doMoveDown,
  doMoveToBottom,
};
