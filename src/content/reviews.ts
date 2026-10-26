import type { PropertyId, Review } from './types';

// Google-labelled reviews only (see brief, "Google review guidance").
// `excerpt` must be copied verbatim from Google; leave null until it is.
// displayedDate is exactly what Google showed on the checked date.
const ANUPRIT_URL = 'https://www.google.com/travel/hotels/entity/CgsI9Ou7rNG42qH1ARAB/reviews?hl=en-LK&gl=lk';
const ANUGRAH_URL = 'https://www.google.com/travel/hotels/entity/CgoIjtvJ5L3Q16FqEAE/reviews?hl=en-LK&gl=lk';
const CHECKED = '2026-10-26';

export const googleSummary: Record<PropertyId, { rating: number; count: number; checked: string; sourceUrl: string }> = {
  anuprit: { rating: 5.0, count: 8, checked: CHECKED, sourceUrl: ANUPRIT_URL },
  anugrah: { rating: 5.0, count: 21, checked: CHECKED, sourceUrl: ANUGRAH_URL },
};

const base = { rating: 5, classification: 'stay' as const, checked: CHECKED, approval: 'pending' as const };

export const reviews: Review[] = [
  {
    ...base,
    property: 'anuprit',
    reviewer: 'Meara Algama',
    displayedDate: '6 months ago',
    excerpt: 'Gorgeous villa - feels like you are stepping into a serene, magical oasis.',
    isExcerpt: true,
    focus: 'Atmosphere, food and service',
    sourceUrl: ANUPRIT_URL,
  },
  {
    ...base,
    property: 'anuprit',
    reviewer: 'Charles Gamon',
    displayedDate: '7 months ago',
    excerpt: null,
    isExcerpt: true,
    focus: 'Service, dining and room comfort',
    sourceUrl: ANUPRIT_URL,
  },
  {
    ...base,
    property: 'anuprit',
    reviewer: 'Nita Kundanmal',
    displayedDate: '5 months ago',
    excerpt: null,
    isExcerpt: true,
    focus: 'Artwork, rooms and thoughtful details',
    sourceUrl: ANUPRIT_URL,
  },
  {
    ...base,
    property: 'anugrah',
    reviewer: 'Ella',
    displayedDate: '10 months ago',
    excerpt: 'The rooms are immaculate and have amazing views of the ocean. Amazing artwork!',
    isExcerpt: true,
    focus: 'Rooms, ocean views and artwork',
    sourceUrl: ANUGRAH_URL,
  },
  {
    ...base,
    property: 'anugrah',
    reviewer: 'Christian',
    displayedDate: '8 months ago',
    excerpt: null,
    isExcerpt: true,
    focus: 'Design, privacy and staff',
    sourceUrl: ANUGRAH_URL,
  },
  {
    ...base,
    property: 'anugrah',
    reviewer: 'Isabelle de Garston',
    displayedDate: '10 months ago',
    excerpt: null,
    isExcerpt: true,
    focus: 'Group stay and personalised dining',
    sourceUrl: ANUGRAH_URL,
  },
  {
    ...base,
    property: 'anugrah',
    reviewer: 'Harry Reid',
    displayedDate: '10 months ago',
    excerpt: null,
    isExcerpt: true,
    focus: 'Personal service and cuisine',
    sourceUrl: ANUGRAH_URL,
  },
];

/** Up to three stay reviews for the iPad, preferring ones with verbatim text. */
export const reviewsFor = (id: PropertyId) =>
  reviews
    .filter((r) => r.property === id && r.classification === 'stay')
    .sort((a, b) => Number(b.excerpt !== null) - Number(a.excerpt !== null))
    .slice(0, 3);
