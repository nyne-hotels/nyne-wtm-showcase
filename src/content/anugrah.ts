import type { Property } from './types';
import { fact, tbc } from './fact';

const HOME = 'https://nynehotels.com/anugrah/';
const LOCATION = 'https://nynehotels.com/anugrah/location/';
const DINING = 'https://nynehotels.com/anugrah/dining/';
const WELLNESS = 'https://nynehotels.com/anugrah/wellness-spa/';
const BRIEF = 'brief';

export const anugrah: Property = {
  id: 'anugrah',
  name: 'Anugrah',
  category: 'Nyne Reserve',
  location: fact('Bentota coastline, where the river meets the sea', LOCATION),
  tagline: fact('Relax, move, restore on the Bentota coast', WELLNESS),
  intro: fact(
    'A low-rise beachfront retreat on golden sand along the Bentota coastline, with pool-side rooms and ocean-view suites.',
    LOCATION,
  ),
  categoryNote: tbc(),
  heroAssetId: 'anugrah-hero',
  galleryAssetIds: ['anugrah-terrace', 'anugrah-lounge', 'anugrah-interior'],
  mapAssetId: 'anugrah-map',

  rooms: [
    {
      id: 'premier-room',
      name: 'Premier Room',
      summary: fact('Ground-floor rooms with a private terrace opening onto the pool, steps from the ocean.', HOME),
      sizeSqFt: fact(420, HOME),
      bed: fact('King-size', HOME),
      occupancy: tbc(),
      features: fact(['Ground floor', 'Private terrace with pool access', 'Bathtub', 'Mini bar'], HOME),
      assetIds: ['anugrah-premier-1', 'anugrah-premier-2'],
    },
    {
      id: 'junior-suite',
      name: 'Junior Suite',
      summary: fact('Ocean views from a private terrace, with a walk-in closet and en-suite bathroom.', HOME),
      sizeSqFt: fact(535, HOME),
      bed: fact('King-size', HOME),
      occupancy: fact('Space for three (per website, to confirm)', HOME),
      features: fact(['Ocean views', 'Private terrace', 'Walk-in closet', 'En-suite bathroom'], HOME),
      assetIds: ['anugrah-junior-1', 'anugrah-junior-2'],
    },
  ],

  dining: [
    {
      id: 'anugrah-dining',
      name: 'Dining at Anugrah',
      hostProperty: 'anugrah',
      locationType: 'on-site',
      description: fact('Breakfast, lunch and dinner are served at Anugrah, with menus built around local ingredients.', DINING),
      details: fact(['Breakfast, lunch and dinner'], DINING),
      assetIds: ['anugrah-dining', 'anugrah-dish'],
    },
    {
      id: 'table-by-nyne',
      name: 'Table by Nyne',
      hostProperty: 'anuprit',
      locationType: 'at-sister-property',
      description: fact(
        'An ocean-facing restaurant and bar at nearby Anuprit, serving Sri Lankan and international cuisine.',
        DINING,
      ),
      details: fact(['Located at Anuprit', 'Sri Lankan and international cuisine'], DINING),
      assetIds: ['anuprit-table', 'anuprit-table-dish'],
    },
  ],

  wellness: [
    {
      id: 'massage',
      name: 'Massage treatments',
      locationType: 'on-site',
      description: fact(
        'Relaxation, deep tissue and hot stone massages of 30 to 90 minutes, in-room or in a dedicated wellness space.',
        WELLNESS,
      ),
      assetIds: ['anugrah-spa'],
    },
    {
      id: 'yoga-pilates',
      name: 'Private yoga and Pilates',
      locationType: 'on-site',
      description: fact('Private yoga and Pilates sessions, including beachside yoga, by arrangement.', WELLNESS),
      assetIds: [],
    },
    {
      id: 'beach-gym',
      name: 'Beach gym equipment',
      locationType: 'on-site',
      description: fact('Beach gym equipment for guests who want to keep moving.', WELLNESS),
      assetIds: [],
    },
    {
      id: 'pickleball',
      name: 'Pickleball',
      locationType: 'on-site',
      description: fact('Pickleball is listed among Anugrah’s activities. Court location to be confirmed.', WELLNESS),
      assetIds: [],
    },
  ],

  facts: [
    {
      heading: 'At a glance',
      rows: [
        { label: 'Nyne category', fact: fact('Nyne Reserve', BRIEF) },
        { label: 'Location', fact: fact('Bentota coastline', LOCATION) },
        { label: 'Room categories', fact: fact('Premier Room; Junior Suite', HOME) },
        { label: 'Total rooms', fact: tbc() },
      ],
    },
    {
      heading: 'Rooms',
      rows: [
        { label: 'Premier Room', fact: fact('420 sq ft · King-size · Ground floor, pool access', HOME) },
        { label: 'Junior Suite', fact: fact('535 sq ft · King-size · Ocean view, private terrace', HOME) },
        { label: 'Occupancy', fact: tbc() },
        { label: 'Connecting rooms', fact: tbc() },
      ],
    },
    {
      heading: 'Policies',
      rows: [
        { label: 'Children', fact: tbc() },
        { label: 'Check-in / check-out', fact: tbc() },
      ],
    },
    {
      heading: 'Accessibility',
      rows: [{ label: 'Accessible rooms and routes', fact: tbc() }],
    },
    {
      heading: 'Getting there',
      rows: [{ label: 'From Colombo / airport', fact: fact('Via the Southern Expressway (journey time to confirm)', LOCATION) }],
    },
  ],
};
