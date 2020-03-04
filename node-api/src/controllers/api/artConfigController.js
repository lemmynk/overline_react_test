const ArtConfig = require('../../models/ArtConfig');

const artSifraByGroup = (req, res, next) => {
  ArtConfig.artSifraByGroup()
    .then(data => res.json({ data }))
    .catch(err => next(err));
};

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
  artSifraByGroup,
  vArtikli,
  defaultVArtikl,
};
