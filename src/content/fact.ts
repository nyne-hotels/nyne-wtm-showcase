import type { Fact } from './types';

export const CHECKED = '2026-10-26';

/** A fact taken from a web source, pending client approval. */
export const fact = <T>(value: T, source: string, verified = CHECKED): Fact<T> => ({
  value,
  source,
  verified,
  approval: 'pending',
});

/** A required fact the client has not yet supplied. Renders as "To be confirmed". */
export const tbc = <T = string>(): Fact<T> => ({
  value: null,
  source: 'client',
  verified: '',
  approval: 'pending',
});
