import { HOME, ART_MAIN, ART_GROUP } from '../appRoutes';

const links = [
  HOME,
  {
    title: 'ArtLinkGroup',
    icon: 'coffee',
    links: [ART_MAIN, ART_GROUP],
  },
];

export const sidebarWebLinks = [];
export const sidebarAppLinks = links;
