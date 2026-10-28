import type { Property } from './types';
import { fact } from './fact';

const HOME = 'https://nynehotels.com/anugrah/';
const DINING = 'https://nynehotels.com/anugrah/dining/';
const PDF = 'Anugrah.pdf';
const BRIEF = 'brief';
const VERIFIED = '2026-10-28';
const pdfFact = <T>(value: T) => fact(value, PDF, VERIFIED);

export const anugrah: Property = {
  id: 'anugrah',
  name: 'Anugrah',
  category: 'Nyne Reserve',
  location: pdfFact('Warahena, Bentota'),
  tagline: fact('Art, ocean and serenity on Bentota\'s golden coastline.', HOME, VERIFIED),
  intro: pdfFact('An intimate oceanfront retreat with eight ocean-view suites, private terraces, generous lounges and a long pool made for unhurried days.'),
  categoryNote: fact('An intimate oceanfront boutique retreat in the Nyne Reserve collection.', BRIEF, VERIFIED),
  heroAssetId: 'anugrah-hero',
  galleryAssetIds: ['anugrah-terrace', 'anugrah-lounge', 'anugrah-interior'],
  mapAssetId: 'anugrah-map',

  rooms: [
    {
      id: 'junior-suite-ocean',
      name: 'Junior Suite - Ocean View',
      summary: pdfFact('An ocean-view suite with a king-size bed and a private terrace overlooking the coast.'),
      sizeSqFt: pdfFact(405),
      bed: pdfFact('King-size'),
      occupancy: pdfFact('2 adults'),
      features: pdfFact(['Ocean view', 'Private terrace', 'En-suite bathroom', 'Air conditioning', 'Stocked mini bar']),
      assetIds: ['anugrah-junior-1', 'anugrah-junior-2'],
    },
    {
      id: 'premium-suite-ocean',
      name: 'Premium Suite - Ocean View',
      summary: pdfFact('A spacious ocean-view suite with a king-size bed and room for up to three adults.'),
      sizeSqFt: pdfFact(510),
      bed: pdfFact('King-size'),
      occupancy: pdfFact('3 adults'),
      features: pdfFact(['Ocean view', 'Private terrace', 'En-suite bathroom', 'Air conditioning', 'Stocked mini bar']),
      assetIds: ['anugrah-premier-1', 'anugrah-premier-2'],
    },
  ],

  dining: [
    {
      id: 'anugrah-dining',
      name: 'Private dining at Anugrah',
      hostProperty: 'anugrah',
      locationType: 'on-site',
      description: pdfFact('Breakfast is served at Anugrah, with lunch and dinner also available in-house from a varied menu.'),
      details: fact(['Breakfast, lunch and dinner', 'Private dining and bar facilities'], DINING, VERIFIED),
      assetIds: ['anugrah-dining', 'anugrah-dish'],
    },
    {
      id: 'table-by-nyne',
      name: 'Table by Nyne',
      hostProperty: 'anuprit',
      locationType: 'at-sister-property',
      description: pdfFact('Guests may walk to nearby Anuprit for lunch and dinner.'),
      details: pdfFact(['Located at Anuprit', 'Restaurant and bar']),
      assetIds: ['anuprit-table', 'anuprit-table-dish'],
    },
  ],

  wellness: [
    { id: 'spa', name: 'Spa treatments', locationType: 'on-site', description: pdfFact('Payable spa treatments are available for guests.'), assetIds: ['anugrah-spa'] },
    { id: 'beach-tennis', name: 'Beach tennis', locationType: 'on-site', description: pdfFact('Beach tennis is included among the hotel leisure facilities.'), assetIds: ['anugrah-beach-tennis'] },
    { id: 'board-games', name: 'Board games', locationType: 'on-site', description: fact('Board games are listed among Anugrah experiences.', HOME, VERIFIED), assetIds: ['anugrah-board-games'] },
    { id: 'bocce', name: 'Bocce on the lawn', locationType: 'on-site', description: fact('Bocce on the lawn is listed among Anugrah experiences.', HOME, VERIFIED), assetIds: ['anugrah-bocce'] },
    { id: 'croquet', name: 'Croquet on the lawn', locationType: 'on-site', description: fact('Croquet on the lawn is listed among Anugrah experiences.', HOME, VERIFIED), assetIds: ['anugrah-croquet'] },
    { id: 'art-classes', name: 'Art classes', locationType: 'on-site', description: fact('Creative art classes are listed among Anugrah experiences.', HOME, VERIFIED), assetIds: ['anugrah-art-class'] },
  ],

  facts: [
    {
      heading: 'At a glance',
      rows: [
        { label: 'Nyne category', fact: fact('Nyne Reserve', BRIEF, VERIFIED) },
        { label: 'Property style', fact: pdfFact('Luxury oceanfront boutique hotel') },
        { label: 'Location', fact: pdfFact('Warahena, Bentota') },
        { label: 'Total suites', fact: pdfFact('8 ocean-view suites') },
        { label: 'Terraces', fact: pdfFact('Every suite has a private terrace with coastal views') },
        { label: 'Pool', fact: pdfFact('100-foot pool') },
      ],
    },
    {
      heading: 'Accommodation',
      rows: [
        { label: 'Junior Suite - Ocean View', fact: pdfFact('4 suites - approx. 405 sq ft - king-size - 2 adults') },
        { label: 'Premium Suite - Ocean View', fact: pdfFact('4 suites - approx. 510 sq ft - king-size - 3 adults') },
      ],
    },
    {
      heading: 'In every room',
      rows: [
        { label: 'Comfort', fact: pdfFact('King-size bed, air conditioning, overhead ceiling fan, non-smoking room') },
        { label: 'Refreshments', fact: pdfFact('Tea and coffee facilities, stocked mini bar, complimentary bottled water') },
        { label: 'Entertainment', fact: pdfFact('UHD TV with cable channels and wireless internet') },
        { label: 'Bathroom', fact: pdfFact('En-suite bathroom, hair dryer, linen bathrobes, flip-flops and Nyne all-natural bath amenities') },
        { label: 'Conveniences', fact: pdfFact('En-suite wardrobe, electronic safe, mosquito repellent, iron and ironing board') },
      ],
    },
    {
      heading: 'Hotel facilities',
      rows: [
        { label: 'Dining', fact: pdfFact('Private dining and bar facilities with inviting lounge areas') },
        { label: 'Pool and beach', fact: pdfFact('Infinity pool, sun-beds and beachside service') },
        { label: 'Services', fact: pdfFact('Laundry and ironing on request, tea-time snacks and wireless internet in public areas') },
        { label: 'Transfers', fact: pdfFact('Payable airport transfers and shuttle service to curated excursions') },
      ],
    },
    {
      heading: 'Dining',
      rows: [
        { label: 'At Anugrah', fact: pdfFact('Breakfast is served on site; lunch and dinner are also available from a varied in-house menu') },
        { label: 'At Anuprit', fact: pdfFact('Guests may walk to Anuprit for lunch and dinner') },
      ],
    },
    {
      heading: 'Wellness and leisure',
      rows: [
        { label: 'Wellness', fact: pdfFact('Payable spa treatments, yoga on request and beach gym') },
        { label: 'Activities', fact: pdfFact('Water sports, beach tennis and payable pickleball') },
        { label: 'Experiences', fact: pdfFact('Excursion arrangements and curated dining experiences') },
      ],
    },
    {
      heading: 'Accessibility and essentials',
      rows: [
        { label: 'Accessibility', fact: pdfFact('Lift access and differently-abled access') },
        { label: 'Families', fact: pdfFact('Baby cot available') },
        { label: 'Currency', fact: pdfFact('Currency exchange available') },
        { label: 'Reservations', fact: pdfFact('+94 761 377 659 / +94 772 002 030 - reservations@nynehotels.com') },
      ],
    },
  ],
};
