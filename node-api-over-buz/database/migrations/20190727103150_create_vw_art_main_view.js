const sqlDrop = `DROP VIEW IF EXISTS vw_art_main`;
const sqlCreate = `CREATE VIEW vw_art_main AS
SELECT
	mp_art_main.id,
	mp_art_main.vArtikl,
	mp_art_main.grpId,
	mp_art_grupa.grpNaziv,
	mp_art_main.intSifra,
	mp_art_main.artNaziv,
	mp_art_main.mera,
	mp_art_main.pdvId,
	mp_art_pdv.pdvStopa,
	mp_art_pdv.pdvOpis,
	CAST(GREATEST(
		IFNULL(mp_art_main.updatedAt, '2000-01-01'),
		IFNULL(mp_art_grupa.updatedAt, '2000-01-01'),
		IFNULL(mp_art_pdv.updatedAt, '2000-01-01')
  ) AS DATETIME) updatedAt,
  NOT ISNULL(mp_art_main.deletedAt) isDeleted

FROM mp_art_main
INNER JOIN mp_art_grupa ON mp_art_main.grpId = mp_art_grupa.id
INNER JOIN mp_art_pdv ON mp_art_main.pdvId = mp_art_pdv.id
`;

exports.up = knex => {
  return knex.schema.raw(sqlDrop).then(() => knex.schema.raw(sqlCreate));
};

exports.down = knex => {
  return knex.schema.raw(sqlDrop);
};
