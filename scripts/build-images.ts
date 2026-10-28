// Turn media-src/raw images into responsive WebP files in public/media and
// write src/content/media.generated.json (widths + intrinsic size per asset).
// Never upscales: widths above the source width are skipped.
import sharp from 'sharp';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { media } from '../src/content/media';

const RAW = path.resolve('media-src/raw');
const OUT = path.resolve('public/media');
const MANIFEST = path.resolve('src/content/media.generated.json');
const WIDTHS = [640, 1024, 1600];
const HIGH_QUALITY = new Set([
  'anugrah-lunuganga', 'anugrah-brief-garden', 'anugrah-madu-river', 'anugrah-water-sports',
  'anugrah-beach-tennis', 'anugrah-bocce', 'anugrah-croquet', 'anugrah-art-class',
  'anuprit-lunuganga', 'anuprit-brief-garden', 'anuprit-madu-river', 'anuprit-water-sports',
  'anuprit-pickleball', 'anuprit-beach-tennis', 'anuprit-art-class',
]);

export interface GeneratedMedia {
  width: number;
  height: number;
  widths: number[];
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const manifest: Record<string, GeneratedMedia> = {};
let missing = 0;

for (const asset of media) {
  const src = path.join(RAW, asset.rawFile);
  if (!existsSync(src)) {
    console.warn(`missing raw file for ${asset.id}: ${asset.rawFile}`);
    missing++;
    continue;
  }
  const meta = await sharp(src).metadata();
  const srcWidth = meta.width!;
  const widths = WIDTHS.filter((w) => w < srcWidth);
  widths.push(Math.min(srcWidth, WIDTHS.at(-1)!));
  const unique = [...new Set(widths)].sort((a, b) => a - b);

  for (const w of unique) {
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: HIGH_QUALITY.has(asset.id) ? 84 : 78 })
      .toFile(path.join(OUT, `${asset.id}-${w}.webp`));
  }
  manifest[asset.id] = {
    width: srcWidth,
    height: meta.height!,
    widths: unique,
  };
  console.log(`${asset.id.padEnd(24)} ${srcWidth}×${meta.height} → ${unique.join(', ')}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${Object.keys(manifest).length} assets written${missing ? `, ${missing} missing` : ''}`);
if (missing) process.exitCode = 1;

// App icons from the Nyne wordmark (dev stand-in) on the app background.
const ICONS = path.resolve('public/icons');
await mkdir(ICONS, { recursive: true });
const svg = (await readFile('src/assets/nyne-logo.svg', 'utf8')).replace('currentColor', '#1f1a15');
const logo = await sharp(Buffer.from(svg), { density: 600 }).png().toBuffer();
for (const [name, size] of [['icon-192', 192], ['apple-touch-icon', 180]] as const) {
  const inner = Math.round(size * 0.62);
  await sharp({ create: { width: size, height: size, channels: 3, background: '#faf7f2' } })
    .composite([{ input: await sharp(logo).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer(), gravity: 'center' }])
    .png()
    .toFile(path.join(ICONS, `${name}.png`));
}
console.log('icons written');
