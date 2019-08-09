// @flow
declare type ArtPdvProps = {
  id: number,
  pdvStopa: number,
  pdvOpis: string,
  isDefault: boolean,
  fisPdv: number,
};

declare type ArtMainListProps = {
  id: number,
  vArtikl: string,
  intSifra: string,
  artNaziv: string,
  grpId: number,
  mera: string,
  pdvId: number,
};

declare type ArtGroupDashDataProps = {
  string: ArtGroupListItemProps,
};

declare type ArtGroupListItemProps = {
  id: number,
  vArtikl: string,
  grpNaziv: string,
  grpSifra: string,
  isDeleted: boolean,
};
