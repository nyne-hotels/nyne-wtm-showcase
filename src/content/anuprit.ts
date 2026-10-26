import type { Property } from './types';
import { fact, tbc } from './fact';

const HOME = 'https://nynehotels.com/anuprit/';
const LOCATION = 'https://nynehotels.com/anuprit/location/';
const DINING = 'https://nynehotels.com/anuprit/dining/';
const WELLNESS = 'https://nynehotels.com/anuprit/wellness-spa/';
const BRIEF = 'brief';

export const anuprit: Property = {
  id: 'anuprit',
  name: 'Anuprit',
  category: 'Nyne Exclusive',
  location: fact('Warahena, Bentota, on Galle Road', LOCATION),
  tagline: fact('An island getaway with the frills of luxury', HOME),
  intro: fact(
    'An ocean-facing hotel on a quiet stretch of beach in Warahena, Bentota, with courtyard and ocean-view rooms and Table by Nyne on site.',
    LOCATION,
  ),
  categoryNote: tbc(),
  heroAssetId: 'anuprit-hero',
  galleryAssetIds: ['anuprit-living', 'anuprit-interior', 'bentota-coast'],
  mapAssetId: 'anuprit-map',

  rooms: [
    {
      id: 'deluxe-courtyard',
      name: 'Deluxe Room with Courtyard View',
      summary: fact('A well-appointed courtyard-facing room for winding down after the beach.', HOME),
      sizeSqFt: fact(395, HOME),
      bed: fact('King-size', HOME),
      occupancy: tbc(),
      features: fact(['Courtyard view'], HOME),
      assetIds: ['anuprit-deluxe'],
    },
    {
      id: 'premier-ocean',
      name: 'Premier Room with Ocean View',
      summary: fact('Ocean-facing rooms designed to calm and relax.', HOME),
      sizeSqFt: fact(500, HOME),
      bed: fact('King-size', HOME),
      occupancy: tbc(),
      features: fact(['Ocean view'], HOME),
      assetIds: ['anuprit-premier'],
    },
    {
      id: 'junior-suite',
      name: 'Junior Suite',
      summary: fact('Oceanfront suites with a private balcony and views over the infinity pool.', HOME),
      sizeSqFt: fact(440, HOME),
      bed: fact('King-size', HOME),
      occupancy: fact('Sleeps three (per website, to confirm)', HOME),
      features: fact(['Oceanfront', 'Private balcony', 'Walk-in closet', 'En-suite bathroom', 'Infinity pool views'], HOME),
      assetIds: ['anuprit-junior'],
    },
  ],

  dining: [
    {
      id: 'table-by-nyne',
      name: 'Table by Nyne',
      hostProperty: 'anuprit',
      locationType: 'on-site',
      description: fact(
        'Colombo’s Table by Nyne, at the beach: an ocean-facing restaurant and bar welcoming resident guests and walk-ins, with handcrafted cocktails.',
        DINING,
      ),
      details: fact(['Breakfast 7:30am–11:30am', 'All-day dining 12:00pm–10:30pm', 'Open to resident guests and walk-ins'], DINING),
      assetIds: ['anuprit-table', 'anuprit-table-lounge', 'anuprit-table-dish'],
    },
  ],

  wellness: [
    {
      id: 'spa',
      name: 'Spa treatments',
      locationType: 'on-site',
      description: fact('Tailored spa treatments to calm, soothe and nourish. Treatment menu and location to be confirmed.', WELLNESS),
      assetIds: ['anuprit-spa'],
    },
    {
      id: 'pickleball',
      name: 'Pickleball',
      locationType: 'on-site',
      description: fact('Listed among Anuprit’s activities. Court location to be confirmed.', LOCATION),
      assetIds: [],
    },
  ],

  facts: [
    {
      heading: 'At a glance',
      rows: [
        { label: 'Nyne category', fact: fact('Nyne Exclusive', BRIEF) },
        { label: 'Location', fact: fact('Warahena, Bentota', LOCATION) },
        {
          label: 'Room categories',
          fact: fact('Deluxe Room with Courtyard View; Premier Room with Ocean View; Junior Suite', HOME),
        },
        { label: 'Total rooms', fact: tbc() },
      ],
    },
    {
      heading: 'Rooms',
      rows: [
        { label: 'Deluxe Room with Courtyard View', fact: fact('395 sq ft · King-size', HOME) },
        { label: 'Premier Room with Ocean View', fact: fact('500 sq ft · King-size', HOME) },
        { label: 'Junior Suite', fact: fact('440 sq ft · King-size · Oceanfront, private balcony', HOME) },
        { label: 'Occupancy', fact: tbc() },
        { label: 'Connecting rooms', fact: tbc() },
      ],
    },
    {
      heading: 'Dining',
      rows: [{ label: 'Table by Nyne', fact: fact('Breakfast 7:30–11:30 · All-day 12:00–22:30', DINING) }],
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
