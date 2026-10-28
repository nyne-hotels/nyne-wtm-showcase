import type { Property, PropertyId } from './types';
import { anugrah } from './anugrah';
import { anuprit } from './anuprit';

export { bentotaByProperty } from './bentota';
export { media, mediaById } from './media';
export { reviewsFor, googleSummary } from './reviews';

/** Bump when content or media changes; shown on the prep screen. */
export const CONTENT_VERSION = '2026.10.28-things1';

export const properties: Record<PropertyId, Property> = { anugrah, anuprit };
export const propertyIds: PropertyId[] = ['anugrah', 'anuprit'];

export const isPropertyId = (v: string | undefined): v is PropertyId => v === 'anugrah' || v === 'anuprit';
export const otherProperty = (id: PropertyId): PropertyId => (id === 'anugrah' ? 'anuprit' : 'anugrah');
