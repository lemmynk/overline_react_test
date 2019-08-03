import { HOME, ART_MAIN, ART_GROUP } from './appRoutes';

export default [
  HOME,
  {
    title: 'Artikli',
    icon: 'coffee',
    links: [ART_MAIN, ART_GROUP],
  },
];
