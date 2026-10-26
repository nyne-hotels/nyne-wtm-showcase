// Content records for the WTM showcase. Layout code reads these; it never
// hard-codes property copy. Every fact and asset carries provenance so the
// client approver can sign it off (see scripts/validate-content.ts).

export type PropertyId = 'anugrah' | 'anuprit';
export type Approval = 'pending' | 'approved';

export interface Provenance {
  /** URL, or "client" / "brief" for information supplied directly. */
  source: string;
  /** ISO date the source was last checked. */
  verified: string;
  approval: Approval;
}

/** A single approvable fact. `value: null` means "to be confirmed". */
export interface Fact<T = string> extends Provenance {
  value: T | null;
}

export interface MediaAsset extends Provenance {
  id: string;
  /** Property the image depicts, or 'bentota' for destination imagery. */
  property: PropertyId | 'bentota';
  /** Room or venue label shown with the image. */
  label: string;
  alt: string;
  credit?: string;
  /** File in media-src/raw consumed by scripts/build-images.ts. */
  rawFile: string;
  /** Optional portrait-cropped alternative used when the screen is portrait. */
  portraitOf?: string;
  /** Approved focal point for object-position, e.g. "50% 40%". */
  focus?: string;
}

export interface RoomCategory {
  id: string;
  name: string;
  summary: Fact;
  sizeSqFt: Fact<number>;
  bed: Fact;
  occupancy: Fact;
  features: Fact<string[]>;
  assetIds: string[];
}

/** Where an experience happens relative to the property being shown. */
export type LocationType = 'on-site' | 'at-sister-property' | 'arranged-nearby';

export interface Venue {
  id: string;
  name: string;
  /** Property where the venue physically is. */
  hostProperty: PropertyId;
  locationType: LocationType;
  description: Fact;
  details: Fact<string[]>;
  assetIds: string[];
}

export interface Experience {
  id: string;
  name: string;
  locationType: LocationType;
  description: Fact;
  assetIds: string[];
}

export interface FactRow {
  label: string;
  fact: Fact;
}

export interface Property {
  id: PropertyId;
  name: string;
  category: 'Nyne Reserve' | 'Nyne Exclusive';
  location: Fact;
  tagline: Fact;
  intro: Fact;
  /** Client-approved explanation of the category. Hidden until approved. */
  categoryNote: Fact;
  heroAssetId: string;
  galleryAssetIds: string[];
  rooms: RoomCategory[];
  dining: Venue[];
  wellness: Experience[];
  mapAssetId: string;
  /** Representative reference page. */
  facts: { heading: string; rows: FactRow[] }[];
}

export interface Destination {
  title: string;
  intro: Fact;
  access: Fact;
  experiences: Experience[];
  assetIds: string[];
}

export interface Review {
  property: PropertyId;
  reviewer: string;
  rating: number;
  /** Relative date exactly as Google displayed it; never converted. */
  displayedDate: string;
  /** Verbatim wording. null until copied exactly from Google. */
  excerpt: string | null;
  isExcerpt: boolean;
  /** Editorial summary of focus — never shown in quotation marks. */
  focus: string;
  classification: 'stay' | 'dining';
  sourceUrl: string;
  checked: string;
  approval: Approval;
}
