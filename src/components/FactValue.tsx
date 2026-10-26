import type { ReactNode } from 'react';
import type { Fact, LocationType, Property } from '../content/types';
import { properties } from '../content';

/** Renders a fact, or a clear "To be confirmed" when the client has not supplied it. */
export function FactValue<T>({ fact, render }: { fact: Fact<T>; render?: (v: T) => ReactNode }) {
  if (fact.value === null || fact.value === '') return <span className="tbc">To be confirmed</span>;
  return <>{render ? render(fact.value) : String(fact.value)}</>;
}

/** Plain-language label for where something happens, relative to the property being shown. */
export function locationLabel(type: LocationType, viewing: Property, host = viewing.id) {
  switch (type) {
    case 'on-site':
      return `At ${properties[host].name}`;
    case 'at-sister-property':
      return `At ${properties[host].name}, nearby`;
    case 'arranged-nearby':
      return 'Nearby in Bentota';
  }
}
