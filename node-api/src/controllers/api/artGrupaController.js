const ArtGrupa = require('../../models/ArtGrupa');

const nextSifra = (req, res) => {
  const { params } = req;
  const { vArtikl } = params;
  ArtGrupa.nextSifra(vArtikl).then(response => {
    console.log('response:', response);
    res.send('OK');
  });
};

module.exports = {
  nextSifra,
};
