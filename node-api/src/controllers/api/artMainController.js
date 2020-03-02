const ArtMain = require('../../models/ArtMain');

const nextSifra = (req, res, next) => {
  const { query } = req;
  const { vArtikl, grpId } = query;
  ArtMain.nextSifra(vArtikl, grpId)
    .then(data => res.json({ data }))
    .catch(err => next(err));
};

module.exports = {
  nextSifra,
};
