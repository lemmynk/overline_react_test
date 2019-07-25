const formatDates = data =>
  data.map(item => {
    const { createdAt: c, updatedAt: u, deletedAt: d } = item;
    const createdAt = c ? new Date(c) : null;
    const updatedAt = u ? new Date(u) : null;
    const deletedAt = d ? new Date(d) : null;
    return {
      ...item,
      createdAt,
      updatedAt,
      deletedAt,
    };
  });

const insert = (knex, table, data) =>
  knex(table)
    .truncate()
    .then(() => knex(table).insert(formatDates(data)));

module.exports = insert;
