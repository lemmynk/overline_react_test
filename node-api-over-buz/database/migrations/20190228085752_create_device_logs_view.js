const sqlDrop = `DROP VIEW IF EXISTS vw_device_logs`;
const sqlCreate = `CREATE VIEW vw_device_logs AS
SELECT
  date,
  LOWER(platform) AS platform,
  COUNT(distinct deviceId) AS devicesCount
FROM device_logs
GROUP BY date, LOWER(platform)
`;

exports.up = knex => {
  return knex.schema.raw(sqlDrop).then(() => knex.schema.raw(sqlCreate));
};

exports.down = knex => {
  return knex.schema.raw(sqlDrop);
};
