// Dev-only: download stand-in imagery from nynehotels.com property pages.
// Images on the site lazy-load via data-img / data-src, so we scan the raw HTML
// for any wp-content/uploads image URL rather than <img src>.
// Output: media-src/raw/<file> + media-src/raw/index.json (url, page, file).
// Every image fetched here is a development stand-in and must be replaced or
// approved by the client before release.
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const PAGES = [
  'https://nynehotels.com/anugrah/',
  'https://nynehotels.com/anugrah/location/',
  'https://nynehotels.com/anugrah/dining/',
  'https://nynehotels.com/anugrah/wellness-spa/',
  'https://nynehotels.com/anugrah/things-to-do/',
  'https://nynehotels.com/anugrah/things-to-do/brief-gardens-bevis-bawa/',
  'https://nynehotels.com/anugrah/things-to-do/lunuganga/',
  'https://nynehotels.com/anugrah/things-to-do/madu-river-safari/',
  'https://nynehotels.com/anugrah/things-to-do/water-sports/',
  'https://nynehotels.com/anugrah/experiences/art-classes/',
  'https://nynehotels.com/anugrah/experiences/beach-tennis/',
  'https://nynehotels.com/anuprit/',
  'https://nynehotels.com/anuprit/location/',
  'https://nynehotels.com/anuprit/dining/',
  'https://nynehotels.com/anuprit/wellness-spa/',
  'https://nynehotels.com/anuprit/things-to-do/',
  'https://nynehotels.com/anuprit/things-to-do/brief-gardens-bevis-bawa/',
  'https://nynehotels.com/anuprit/things-to-do/lunuganga/',
  'https://nynehotels.com/anuprit/things-to-do/madu-river-safari/',
  'https://nynehotels.com/anuprit/things-to-do/water-sports/',
  'https://nynehotels.com/anuprit/experiences/pickleball/',
  'https://nynehotels.com/anuprit/experiences/art-classes/',
  'https://nynehotels.com/anuprit/experiences/beach-tennis/',
  'https://nynehotels.com/experiences/bocce-on-the-lawn/',
  'https://nynehotels.com/experiences/croquet-on-the-lawn/',
];

// Out of scope per the brief: offers, blog cards, Yala, other properties, logos.
const EXCLUDE = [
  /Booking|Savings|Extended-Stay|Last-Minute|Offer/i,
  /Yala|Surf|Things-to-Know|Your-Guide|Stafford|Rock-Villa/i,
  /logo|icon|favicon|blank-image/i,
  /-\d{2,3}x\d{2,3}\.(png)$/i,
];

const OUT = path.resolve('media-src/raw');
const IMG_RE = /https:\/\/nynehotels\.com\/[^"'\s()]*wp-content\/uploads\/[^"'\s()]+\.(?:webp|jpe?g|png)/gi;

await mkdir(OUT, { recursive: true });
const index = [];
const seen = new Set();

for (const page of PAGES) {
  const html = await (await fetch(page)).text();
  const urls = [...new Set(html.match(IMG_RE) ?? [])];
  for (const url of urls) {
    if (seen.has(url) || EXCLUDE.some((re) => re.test(url))) continue;
    seen.add(url);
    // Both sites reuse filenames (e.g. Wellness-Spa-750x790-1.jpg), so prefix with the property slug.
    const property = new URL(url).pathname.split('/')[1];
    const file = `${property}--${path.basename(new URL(url).pathname)}`;
    const dest = path.join(OUT, file);
    if (!existsSync(dest)) {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`skip ${res.status} ${url}`);
        continue;
      }
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    }
    index.push({ url, page, property, file });
    console.log(`${file}  ←  ${page}`);
  }
}

await writeFile(path.join(OUT, 'index.json'), JSON.stringify(index, null, 2));
console.log(`\n${index.length} images → ${OUT}`);
