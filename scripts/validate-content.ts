// Content gate for release. Prints every item still awaiting client approval
// and fails on hard errors (missing assets, scope breaches, review rule breaks).
//   npm run validate            → report; exit 1 only on errors
//   npm run validate -- --release → also exit 1 if anything is still pending
import { existsSync } from 'node:fs';
import path from 'node:path';
import { properties, bentota, media, mediaById } from '../src/content';
import { reviews } from '../src/content/reviews';
import type { Fact } from '../src/content/types';
import generated from '../src/content/media.generated.json';

const release = process.argv.includes('--release');
const errors: string[] = [];
const pending: string[] = [];
const tbc: string[] = [];

// Words that would breach the brief's scope if they appeared in shown copy.
const BANNED = [/\brates?\b/i, /\boffers?\b/i, /discount/i, /commission/i, /\bbook(ing)?\b/i, /rock villa/i, /\byala\b/i, /stafford/i, /anupreet|anuprith/i, /sole use|private beach/i];

const isFact = (v: unknown): v is Fact<unknown> =>
  !!v && typeof v === 'object' && 'approval' in v && 'source' in v && 'value' in v;

function walk(where: string, node: unknown) {
  if (isFact(node)) {
    where = where.replace(/\.fact$/, '');
    if (node.value === null) tbc.push(where);
    else if (node.approval !== 'approved') pending.push(where);
    if (node.value !== null && !node.source) errors.push(`${where}: fact has no source`);
    if (node.value !== null && !node.verified) errors.push(`${where}: fact has no verification date`);
    scan(where, node.value);
    return;
  }
  if (Array.isArray(node)) node.forEach((n, i) => walk(`${where}[${keyOf(n) ?? i}]`, n));
  else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(`${where}.${k}`, v);
  }
}

// Readable paths: anugrah.rooms[premier-room].occupancy rather than rooms[0].
const keyOf = (n: unknown) => {
  if (!n || typeof n !== 'object') return undefined;
  const o = n as Record<string, unknown>;
  return (o.id ?? o.heading ?? o.label) as string | undefined;
};

function scan(where: string, value: unknown) {
  const text = JSON.stringify(value);
  for (const re of BANNED) if (re.test(text)) errors.push(`${where}: out-of-scope wording ${re}`);
}

function checkAsset(where: string, id: string) {
  if (!mediaById[id]) errors.push(`${where}: unknown asset "${id}"`);
}

for (const p of Object.values(properties)) {
  walk(p.id, p);
  [p.heroAssetId, p.mapAssetId, ...p.galleryAssetIds].forEach((id) => checkAsset(p.id, id));
  p.rooms.forEach((r) => r.assetIds.forEach((id) => checkAsset(`${p.id}.rooms.${r.id}`, id)));
  p.dining.forEach((v) => v.assetIds.forEach((id) => checkAsset(`${p.id}.dining.${v.id}`, id)));
  p.wellness.forEach((e) => e.assetIds.forEach((id) => checkAsset(`${p.id}.wellness.${e.id}`, id)));
}
walk('bentota', bentota);
bentota.assetIds.forEach((id) => checkAsset('bentota', id));

const built = generated as Record<string, unknown>;
for (const m of media) {
  if (!m.alt) errors.push(`media ${m.id}: missing alt text`);
  if (!m.label) errors.push(`media ${m.id}: missing room/venue label`);
  if (!built[m.id]) errors.push(`media ${m.id}: not built (run npm run images)`);
  if (!existsSync(path.join('media-src/raw', m.rawFile))) errors.push(`media ${m.id}: raw file missing`);
  if (m.approval !== 'approved') pending.push(`media ${m.id} (${m.label})`);
  scan(`media ${m.id}`, m.label);
}

for (const r of reviews) {
  const where = `review ${r.property}/${r.reviewer}`;
  if (!r.sourceUrl.includes('google.')) errors.push(`${where}: not a Google source`);
  if (!r.displayedDate) errors.push(`${where}: missing displayed date`);
  if (r.excerpt === null) tbc.push(`${where}: verbatim excerpt`);
  else if (r.approval !== 'approved') pending.push(where);
}
for (const id of Object.keys(properties)) {
  const n = reviews.filter((r) => r.property === id && r.classification === 'stay' && r.excerpt).length;
  if (n < 2) tbc.push(`reviews ${id}: only ${n} verbatim stay excerpt(s); brief asks for 2–3`);
}

const section = (title: string, items: string[]) => {
  if (!items.length) return;
  console.log(`\n${title} (${items.length})`);
  items.forEach((i) => console.log(`  • ${i}`));
};

section('ERRORS', errors);
section('To be confirmed by client', tbc);
section('Awaiting approval', pending);
console.log(`\n${errors.length} errors · ${tbc.length} to confirm · ${pending.length} awaiting approval`);

if (errors.length || (release && (pending.length || tbc.length))) process.exitCode = 1;
