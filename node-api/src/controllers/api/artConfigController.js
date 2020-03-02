const ArtConfig = require('../../models/ArtConfig');

const vArtikli = (req, res, next) => {
  ArtConfig.vArtikli()
    .then(rows => res.json(rows))
    .catch(err => next(err));
};

const defaultVArtikl = (req, res, next) => {
  ArtConfig.defaultVArtikl()
    .then(item => res.json(item))
    .catch(err => next(err));
};

module.exports = {
  vArtikli,
  defaultVArtikl,
};
