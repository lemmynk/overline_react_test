const ArtConfig = require('../../models/ArtConfig');

const vArtikli = (req, res, next) => {
  ArtConfig.vArtikli()
    .then(data => res.json({ data }))
    .catch(err => next(err));
};

const defaultVArtikl = (req, res, next) => {
  ArtConfig.defaultVArtikl()
    .then(data => res.json({ data }))
    .catch(err => next(err));
};

module.exports = {
  vArtikli,
  defaultVArtikl,
};
