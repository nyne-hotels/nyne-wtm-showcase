import type { Destination } from './types';
import { fact } from './fact';

const ANUGRAH_LOC = 'https://nynehotels.com/anugrah/location/';
const ANUPRIT_LOC = 'https://nynehotels.com/anuprit/location/';

// Selective destination chapter. No fixed travel times or transfer promises;
// availability and map positions need client confirmation.
export const bentota: Destination = {
  title: 'Discover Bentota',
  intro: fact(
    'Bentota sits where the Bentota River meets the Indian Ocean on Sri Lanka’s south-west coast, and is one of the island’s first beach resort destinations and a watersports hub.',
    ANUPRIT_LOC,
  ),
  access: fact('Reached from Colombo and Bandaranaike International Airport via the Southern Expressway.', ANUPRIT_LOC),
  assetIds: ['bentota-coast', 'bentota-river'],
  experiences: [
    {
      id: 'lunuganga',
      name: 'Lunuganga',
      locationType: 'arranged-nearby',
      description: fact('Garden estate near Bentota, listed among nearby things to do.', ANUGRAH_LOC),
      assetIds: [],
    },
    {
      id: 'brief-garden',
      name: 'Brief Garden (Bevis Bawa)',
      locationType: 'arranged-nearby',
      description: fact('Garden listed among nearby things to do.', ANUGRAH_LOC),
      assetIds: [],
    },
    {
      id: 'river',
      name: 'River outings',
      locationType: 'arranged-nearby',
      description: fact('Drift through mangrove-lined waterways on the Bentota River; Madu River outings also listed.', ANUGRAH_LOC),
      assetIds: ['bentota-river'],
    },
    {
      id: 'water-sports',
      name: 'Water sports',
      locationType: 'arranged-nearby',
      description: fact('Jet skiing, windsurfing, diving and boat trips can be arranged.', ANUGRAH_LOC),
      assetIds: [],
    },
  ],
};
