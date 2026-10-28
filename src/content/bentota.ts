import type { Destination, PropertyId } from './types';
import { fact } from './fact';

const VERIFIED = '2026-10-28';
const SOURCES: Record<PropertyId, string> = {
  anugrah: 'https://nynehotels.com/anugrah/things-to-do/',
  anuprit: 'https://nynehotels.com/anuprit/things-to-do/',
};

const destination = (property: PropertyId): Destination => {
  const source = SOURCES[property];
  return {
    title: 'Discover Bentota',
    intro: fact('Beyond the stay, discover gardens, waterways and active experiences around Bentota.', source, VERIFIED),
    access: fact('A curated selection of nearby things to do in Bentota.', source, VERIFIED),
    assetIds: [
      `${property}-lunuganga`,
      `${property}-brief-garden`,
      `${property}-madu-river`,
      `${property}-water-sports`,
    ],
    experiences: [
      {
        id: 'lunuganga',
        name: 'Lunuganga',
        locationType: 'arranged-nearby',
        description: fact('Geoffrey Bawa\'s celebrated Bentota estate, conceived as a garden within a larger garden.', source, VERIFIED),
        assetIds: [`${property}-lunuganga`],
      },
      {
        id: 'brief-garden',
        name: 'Brief Garden',
        locationType: 'arranged-nearby',
        description: fact('A beautifully landscaped estate near Bentota, created by renowned Sri Lankan artist Bevis Bawa.', source, VERIFIED),
        assetIds: [`${property}-brief-garden`],
      },
      {
        id: 'madu-river',
        name: 'Madu River Safari',
        locationType: 'arranged-nearby',
        description: fact('A boat safari through tranquil waterways, winding channels and lush mangrove marshes.', source, VERIFIED),
        assetIds: [`${property}-madu-river`],
      },
      {
        id: 'water-sports',
        name: 'Water Sports',
        locationType: 'arranged-nearby',
        description: fact('An exciting variety of water sports in Bentota, with options suitable for all abilities.', source, VERIFIED),
        assetIds: [`${property}-water-sports`],
      },
    ],
  };
};

export const bentotaByProperty: Record<PropertyId, Destination> = {
  anugrah: destination('anugrah'),
  anuprit: destination('anuprit'),
};
