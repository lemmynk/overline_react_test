const sqlDrop = `DROP VIEW IF EXISTS vw_kom_main`;
const sqlCreate = `CREATE VIEW vw_kom_main AS
SELECT
	mp_kom_main.id,
	mp_kom_main.pib,
	mp_kom_main.komime,
	mp_kom_main.intsifra,
	mp_kom_main.naziv,
	mp_kom_main.adresa,
	mp_kom_main.mestoId,
	mp_kom_mesto.zip,
	mp_kom_mesto.naziv AS mesto,
	mp_kom_main.telefon,
	mp_kom_main.pdvObveznik,
	mp_kom_main.isKupac,
	mp_kom_main.isDobavljac,
	mp_kom_main.isFirma,
	mp_kom_main.isSuspended,
	mp_kom_main.prodValuta,
	mp_kom_main.prodRabat,
	mp_kom_main.prodLimit,
	mp_kom_main.nabDpo,
	CAST(GREATEST(
		IFNULL(mp_kom_main.updatedAt, '2000-01-01'),
		IFNULL(mp_kom_mesto.updatedAt, '2000-01-01')
  ) AS DATETIME) updatedAt,
  NOT ISNULL(mp_kom_main.deletedAt) isDeleted

FROM mp_kom_main
LEFT JOIN mp_kom_mesto ON mp_kom_main.mestoId = mp_kom_mesto.id
`;

exports.up = knex => {
  return knex.schema.raw(sqlDrop).then(() => knex.schema.raw(sqlCreate));
};

exports.down = knex => {
  return knex.schema.raw(sqlDrop);
};
