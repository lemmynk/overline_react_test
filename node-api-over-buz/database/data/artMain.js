const COUNT_ROBA = 10000;
const COUNT_USLUGA = 10000;

const arts = [];

for (let index = 0; index < COUNT_ROBA; index += 1) {
  const id = index + 1;
  const sifra = id.toString().padStart(5, '0');
  const art = {
    id,
    vArtikl: 'roba',
    grpId: 1,
    intSifra: `01${sifra}`,
    // "barkod": "012345678901",
    artNaziv: `Artikl ${sifra}`,
    mera: 'kom',
    pdvId: 1,
    // pdvStopa: 1800,
    // "proizvodjac": "Proizvodjac",
    // "opis": "Opis",
    // "cenaMp": 2400,
    // "cenaPopust": 0,
    // "cenaPrikaz": true,
    // "prodSuma": false,
    // "fisLocked": false,
    // "fisCena": 2400,
    // "grpNaziv": "Grupa 1",
    createdAt: '2019-07-27T12:34:56.000Z',
    updatedAt: '2019-07-27T12:34:56.000Z',
    deletedAt: null,
  };
  arts.push(art);
}

for (let index = 0; index < COUNT_USLUGA; index += 1) {
  const id = index + 1;
  const sifra = id.toString().padStart(5, '0');
  const art = {
    id: id + COUNT_ROBA,
    vArtikl: 'usluga',
    grpId: 2,
    intSifra: `02${sifra}`,
    // "barkod": "012345678901",
    artNaziv: `Usluga ${sifra}`,
    mera: 'kom',
    pdvId: 1,
    // pdvStopa: 1800,
    // "proizvodjac": "Proizvodjac",
    // "opis": "Opis",
    // "cenaMp": 2400,
    // "cenaPopust": 0,
    // "cenaPrikaz": true,
    // "prodSuma": false,
    // "fisLocked": false,
    // "fisCena": 2400,
    // "grpNaziv": "Grupa 1",
    createdAt: '2019-07-27T12:34:56.000Z',
    updatedAt: '2019-07-27T12:34:56.000Z',
    deletedAt: null,
  };
  arts.push(art);
}

module.exports = arts;
