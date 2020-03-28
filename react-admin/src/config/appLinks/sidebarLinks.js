import {
  HOME,
  ART_GROUPS,
  ART_MAIN,
  KOM_MESTA,
  KOM_MAIN,
  MAG_MAIN,
} from '../appRoutes';

const mpArts = {
  title: 'MPArts',
  icon: 'coffee',
  links: [ART_GROUPS, ART_MAIN],
};

const mpKoms = {
  title: 'MPKoms',
  icon: 'coffee',
  links: [KOM_MESTA, KOM_MAIN],
};

const mpMags = {
  title: 'MPMags',
  icon: 'coffee',
  links: [MAG_MAIN],
};

const links = [HOME, mpArts, mpKoms, mpMags];

export const sidebarWebLinks = links;
export const sidebarAppLinks = links;
