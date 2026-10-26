# Discover Nyne in Bentota: WTM London 2026 iPad showcase

A light-mode web app that Nyne representatives use at WTM London (3–5 Nov 2026) to present **Anugrah** (Nyne Reserve) and **Anuprit** (Nyne Exclusive). The brief is in `context.docx`.

There are no rates, offers, booking controls, forms or tracking. **It needs a network connection**: there is no offline mode or service worker.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server (also reachable on your local network) |
| `npm run build` | Type-checks and produces a static build in `dist/` |
| `npm run preview` | Serves `dist/` locally |
| `npm run images:fetch` | Re-downloads the stand-in photos from nynehotels.com into `media-src/raw/` |
| `npm run images` | Builds responsive WebP files in `public/media/`, plus the app icons |
| `npm run validate` | Lists every fact, image and review still awaiting client approval |
| `npm run release-check` | Same as `validate`, but fails while anything is pending, then builds |

## Where things live

- `src/content/`: all copy and facts, separate from the layout.
  - `anugrah.ts`, `anuprit.ts`, `bentota.ts`: property and destination records. Each fact carries its source, the date it was checked and its approval status. `tbc()` marks a fact the client still needs to supply, and it shows on screen as "To be confirmed".
  - `media.ts`: one record per image, holding the property, room or venue label, alt text, credit, source and approval status.
  - `reviews.ts`: Google reviews only. `excerpt` must be copied word for word. Until then it is `null`, and the app shows a placeholder.
  - `index.ts`: `CONTENT_VERSION`. Increase it whenever you change content.
- `src/pages/`: Home, Overview, Rooms and Room detail, Dining, Wellness, Bentota, Reviews and Facts.
- `src/styles/tokens.css`: light-mode colour and type tokens (placeholders until the brand guidelines arrive).
- `scripts/`: image fetch and build scripts, and the content validator.

### Approving content
Set `approval: 'approved'` on a fact or image once the client signs it off. A category explanation (`categoryNote`) appears on screen only after it is approved.

### Replacing images
1. Put the approved file in `media-src/raw/`.
2. Point the asset's `rawFile` at it in `media.ts`.
3. Run `npm run images`.

To give an image a portrait crop for portrait screens, add a second asset with `portraitOf: '<asset id>'`.

## Using it at the stand

1. Open the app's URL in **Safari**. To get an icon, use Share → **Add to Home Screen**.
2. During a conversation:
   - The switcher at the top reads **nyne | Anugrah | Anuprit**, with the property you're viewing highlighted. Tap the other property to open the same section there, such as Rooms to Rooms. Tap **nyne** to return to the start screen.
   - **Back** (top left) goes up one level, for example from a room to the room list.
   - The bottom bar jumps straight to any section.
   - Tap any photo to open it full screen. **Close** or Esc returns you.

The brief asks that the presentation work without venue Wi-Fi. Offline mode has been removed, so the iPads need a reliable connection, such as a personal hotspot.

## Deploying a private review build

`dist/` is a static site that uses relative paths. Host it on any private HTTPS host. Examples include Cloudflare Pages with Access, Netlify with password protection, or an internal server. The page sets `noindex`.

## Status (phase 1)

- Built: the iPad app (light mode only), the content model and the validator. Offline support was removed on request.
- Not built yet: the screen loop and MP4, and the PDF backup.
- All photos are development stand-ins taken from nynehotels.com. Several room photos are only 600–785 px wide, so higher-resolution originals are needed.
- The wellness photo is identical on both property sites.
- The leisure photos on the sites (beach tennis, croquet and others) were left out. Some of those activities take place at Rock Villa, which is out of scope.
- Run `npm run validate` to see the full list of items still to be confirmed.
