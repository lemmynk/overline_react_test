const COUNT_KUPAC = 1000;
const COUNT_DOBAVLJAC = 1000;

const koms = [];

for (let index = 0; index < COUNT_KUPAC; index += 1) {
  const id = index + 1;
  const pib = id.toString().padStart(9, '0');
  const sifra = id.toString().padStart(5, '0');
  const kom = {
    id,
    pib,
    komime: `kom${id}`,
    intsifra: `01${sifra}`,
    naziv: `Kupac ${id}`,
    adresa: 'Nepoznata bb',
    mestoId: 1,
    telefon: '555555',
    fax: '',
    // vlasnik: '',
    // kontakt: '',
    // mobilni: '',
    // web: '',
    // email: '',
    pdvObveznik: true,
    // pdvBroj: '',
    // maticniBroj: '',
    // sifraDelatnosti: '',
    // tracun1: '',
    // tracun2: '',
    // tracun3: '',
    // banka1: '',
    // banka2: '',
    // banka3: '',
    // napomena: '',
    isKupac: true,
    isDobavljac: false,
    isFirma: true,
    isSuspended: false,
    // prodValuta: 0,
    // prodRabat: 0,
    // prodLimit: 0,
    // nabDpo: 0,
    createdAt: '2019-07-27T12:34:56.000Z',
    updatedAt: '2019-07-27T12:34:56.000Z',
    deletedAt: null,
  };
  koms.push(kom);
}

for (let index = 0; index < COUNT_DOBAVLJAC; index += 1) {
  const id = index + 1;
  const pib = `9${id.toString().padStart(8, '0')}`;
  const sifra = id.toString().padStart(5, '0');
  const kom = {
    id: id + COUNT_DOBAVLJAC,
    pib,
    komime: `kom${id + COUNT_DOBAVLJAC}`,
    intsifra: `02${sifra}`,
    naziv: `Dobavljac ${id}`,
    adresa: 'Nepoznata bb',
    mestoId: 1,
    telefon: '555555',
    fax: '',
    // vlasnik: '',
    // kontakt: '',
    // mobilni: '',
    // web: '',
    // email: '',
    pdvObveznik: true,
    // pdvBroj: '',
    // maticniBroj: '',
    // sifraDelatnosti: '',
    // tracun1: '',
    // tracun2: '',
    // tracun3: '',
    // banka1: '',
    // banka2: '',
    // banka3: '',
    // napomena: '',
    isKupac: false,
    isDobavljac: true,
    isFirma: true,
    isSuspended: false,
    // prodValuta: 0,
    // prodRabat: 0,
    // prodLimit: 0,
    // nabDpo: 0,
    createdAt: '2019-07-27T12:34:56.000Z',
    updatedAt: '2019-07-27T12:34:56.000Z',
    deletedAt: null,
  };
  koms.push(kom);
}

module.exports = koms;
/*
module.exports = [
  {
    id: 1,
    pib: '123456789',
    komime: 'kom1',
    intsifra: '01001',
    naziv: 'Kom 1',
    adresa: 'Nepoznata bb',
    mestoId: 1,
    telefon: '555555',
    fax: '',
    vlasnik: '',
    kontakt: '',
    mobilni: '',
    web: '',
    email: '',
    pdvObveznik: true,
    pdvBroj: '',
    maticniBroj: '',
    sifraDelatnosti: '',
    tracun1: '',
    tracun2: '',
    tracun3: '',
    banka1: '',
    banka2: '',
    banka3: '',
    napomena: '',
    isKupac: true,
    isDobavljac: true,
    isFirma: true,
    isSuspended: false,
    prodValuta: 0,
    prodRabat: 0,
    prodLimit: 0,
    nabDpo: 0,
    createdAt: '2019-07-27T12:34:56.000Z',
    updatedAt: '2019-07-27T12:34:56.000Z',
    deletedAt: null,
  },
];
*/
