const ArtGrupa = require('../../models/ArtGrupa');

const nextSifra = (req, res, next) => {
  const { query } = req;
  const { vArtikl } = query;
  ArtGrupa.nextSifra(vArtikl)
    .then(data => res.json({ data }))
    .catch(err => next(err));
};

module.exports = {
  nextSifra,
};