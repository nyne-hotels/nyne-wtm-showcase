import { useParams } from 'react-router-dom';
import { isPropertyId, properties } from '../content';
import type { PropertyId } from '../content/types';

export const SECTIONS = [
  { path: '', label: 'Overview' },
  { path: 'rooms', label: 'Rooms' },
  { path: 'dining', label: 'Dining' },
  { path: 'wellness', label: 'Wellness' },
  { path: 'bentota', label: 'Bentota' },
  { path: 'reviews', label: 'Reviews' },
  { path: 'facts', label: 'Facts' },
] as const;

export type SectionPath = (typeof SECTIONS)[number]['path'];

export const sectionHref = (id: PropertyId, section: SectionPath) => (section ? `/${id}/${section}` : `/${id}`);

/** The property in the current route. Only valid inside the /:property layout. */
export function useProperty() {
  const { property } = useParams();
  return isPropertyId(property) ? properties[property] : null;
}

/** Same place on the other property: keeps the section, and the room when it exists there too. */
export function switchPath(pathname: string, to: PropertyId) {
  const [, , section, roomId] = pathname.split('/');
  if (section === 'rooms' && roomId && properties[to].rooms.some((r) => r.id === roomId)) {
    return `/${to}/rooms/${roomId}`;
  }
  return section ? `/${to}/${section}` : `/${to}`;
}

/** One level up: room → rooms list, section → overview, overview → home. */
export function upPath(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length <= 1) return '/';
  return '/' + parts.slice(0, -1).join('/');
}
