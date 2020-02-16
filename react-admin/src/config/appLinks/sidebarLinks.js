import { HOME, ART_GROUPS, ART_MAIN } from '../appRoutes';

const mpArts = {
  title: 'MPArts',
  icon: 'coffee',
  links: [ART_GROUPS, ART_MAIN],
};

const links = [HOME, mpArts];

export const sidebarWebLinks = links;
export const sidebarAppLinks = links;
