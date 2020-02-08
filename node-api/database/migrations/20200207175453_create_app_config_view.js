const sqlDrop = `DROP VIEW IF EXISTS vw_app_config`;
const sqlCreate = `CREATE VIEW vw_app_config AS
SELECT
  app_config.id,
  app_config.name,
  app_config.valueType,
  app_config.value,
  app_config.userSpecific,
  app_config.description,
  app_config.updatedAt,
  NOT ISNULL(app_config.deletedAt) AS isDeleted
FROM app_config
`;

exports.up = knex => {
  return knex.schema.raw(sqlDrop).then(() => knex.schema.raw(sqlCreate));
};

exports.down = knex => {
  return knex.schema.raw(sqlDrop);
};
