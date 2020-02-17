import { HOME, ART_GROUPS, ART_MAIN, KOM_MESTA, KOM_MAIN } from '../appRoutes';

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

const links = [HOME, mpArts, mpKoms];

export const sidebarWebLinks = links;
export const sidebarAppLinks = links;
