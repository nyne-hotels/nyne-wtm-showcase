import type { Property } from './types';
import { fact } from './fact';

const HOME = 'https://nynehotels.com/anuprit/';
const DINING = 'https://nynehotels.com/anuprit/dining/';
const PDF = 'Anuprit.pdf';
const BRIEF = 'brief';
const VERIFIED = '2026-10-28';
const pdfFact = <T>(value: T) => fact(value, PDF, VERIFIED);

export const anuprit: Property = {
  id: 'anuprit',
  name: 'Anuprit',
  category: 'Nyne Exclusive',
  location: pdfFact('Warahena, Bentota'),
  tagline: fact('Your Private Villa. An Exclusive Escape.', BRIEF, VERIFIED),
  intro: fact(
    'Experience Anuprit exclusively yours - a private villa to share with your favourite people, with space to gather, unwind and reconnect. Individual rooms are also available for a more intimate stay.',
    BRIEF,
    VERIFIED,
  ),
  categoryNote: fact('Available as an exclusive-use private villa, with individual rooms also available.', BRIEF, VERIFIED),
  heroAssetId: 'anuprit-hero',
  galleryAssetIds: ['anuprit-living', 'anuprit-interior', 'bentota-coast'],
  mapAssetId: 'anuprit-map',

  rooms: [
    {
      id: 'premium-courtyard',
      name: 'Premium Courtyard Suite',
      summary: pdfFact('A serene courtyard-view suite with a king-size bed and the comforts of an intimate oceanfront stay.'),
      sizeSqFt: pdfFact(400),
      bed: pdfFact('King-size'),
      occupancy: pdfFact('2 adults'),
      features: pdfFact(['Courtyard view', 'En-suite bathroom', 'Air conditioning', 'Ceiling fan', 'Stocked mini bar']),
      assetIds: ['anuprit-deluxe', 'anuprit-deluxe-2', 'anuprit-deluxe-3', 'anuprit-deluxe-4'],
    },
    {
      id: 'premium-ocean',
      name: 'Premium Room - Ocean View',
      summary: pdfFact('An ocean-view suite with a king-size bed, designed for up to three adults.'),
      sizeSqFt: pdfFact(440),
      bed: pdfFact('King-size'),
      occupancy: pdfFact('3 adults'),
      features: pdfFact(['Ocean view', 'En-suite bathroom', 'Air conditioning', 'Ceiling fan', 'Stocked mini bar']),
      assetIds: ['anuprit-premier', 'anuprit-premier-2', 'anuprit-premier-3', 'anuprit-premier-4'],
    },
    {
      id: 'junior-suite',
      name: 'Junior Suite',
      summary: fact('An oceanfront suite with a private balcony, walk-in closet, en-suite bathroom and infinity-pool views.', HOME, VERIFIED),
      sizeSqFt: pdfFact(500),
      bed: pdfFact('King-size'),
      occupancy: pdfFact('3 adults'),
      features: fact(['Oceanfront', 'Private balcony', 'Walk-in closet', 'En-suite bathroom', 'Infinity-pool views'], HOME, VERIFIED),
      assetIds: ['anuprit-junior', 'anuprit-junior-2', 'anuprit-junior-3'],
    },
  ],

  dining: [
    {
      id: 'table-by-nyne',
      name: 'Table by Nyne',
      hostProperty: 'anuprit',
      locationType: 'on-site',
      description: pdfFact('A ground-floor restaurant and bar open to the public, with private dining for in-house guests and rooftop dining by arrangement.'),
      details: fact(['Breakfast 7:30am-11:30am', 'All-day dining 12:00pm-10:30pm', 'Private dining available'], DINING, VERIFIED),
      assetIds: ['anuprit-table', 'anuprit-table-lounge', 'anuprit-table-dish'],
    },
  ],

  wellness: [
    { id: 'spa', name: 'Spa treatments', locationType: 'on-site', description: pdfFact('Payable spa treatments are available for guests.'), assetIds: ['anuprit-spa'] },
    { id: 'pickleball', name: 'Pickleball', locationType: 'on-site', description: pdfFact('Pickleball is available as a payable leisure activity.'), assetIds: ['anuprit-pickleball'] },
    { id: 'beach-tennis', name: 'Beach tennis', locationType: 'on-site', description: pdfFact('Beach tennis is included among the villa leisure facilities.'), assetIds: ['anuprit-beach-tennis'] },
    { id: 'board-games', name: 'Board games', locationType: 'on-site', description: pdfFact('Board games are available for relaxed time together at the villa.'), assetIds: ['anuprit-board-games'] },
    { id: 'art-classes', name: 'Art classes', locationType: 'on-site', description: fact('Creative art classes are listed among Anuprit experiences.', HOME, VERIFIED), assetIds: ['anuprit-art-class'] },
  ],

  facts: [
    {
      heading: 'At a glance',
      rows: [
        { label: 'Nyne category', fact: fact('Nyne Exclusive', BRIEF, VERIFIED) },
        { label: 'Property style', fact: pdfFact('Luxury oceanfront boutique hotel and exclusive-use private villa') },
        { label: 'Location', fact: pdfFact('Warahena, Bentota') },
        { label: 'Total suites', fact: pdfFact('7') },
        { label: 'Layout', fact: pdfFact('Rooms on the first and second floors, plus one rooftop-terrace room') },
        { label: 'Pool', fact: pdfFact('50 ft x 15 ft x 4 ft infinity pool on the first floor') },
      ],
    },
    {
      heading: 'Accommodation',
      rows: [
        { label: 'Premium Courtyard Suite', fact: pdfFact('2 suites - approx. 400 sq ft - king-size - 2 adults') },
        { label: 'Premium Room - Ocean View', fact: pdfFact('3 suites - approx. 440 sq ft - king-size - 3 adults') },
        { label: 'Junior Suite', fact: pdfFact('2 suites - approx. 500 sq ft - king-size - 3 adults') },
        { label: 'Room access', fact: pdfFact('Lift access to all rooms and the pool; private guest access from the first floor upwards') },
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
        { label: 'Dining', fact: pdfFact('Public restaurant and bar, private dining room, rooftop dining and private lounges') },
        { label: 'Pool and beach', fact: pdfFact('Infinity pool, sun-beds and beachside service') },
        { label: 'Services', fact: pdfFact('Laundry and ironing on request, tea-time snacks and wireless internet in public areas') },
        { label: 'Transfers', fact: pdfFact('Payable airport transfers and shuttle service to curated excursions') },
      ],
    },
    {
      heading: 'Wellness and leisure',
      rows: [
        { label: 'Wellness', fact: pdfFact('Payable spa treatments, yoga on request and beach gym') },
        { label: 'Activities', fact: pdfFact('Board games, water sports, beach tennis and payable pickleball') },
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
