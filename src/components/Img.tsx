import { mediaById, media } from '../content';
import generated from '../content/media.generated.json';

type Generated = Record<string, { width: number; height: number; widths: number[] }>;
const built = generated as Generated;

const url = (id: string, w: number) => `${import.meta.env.BASE_URL}media/${id}-${w}.webp`;
const srcSet = (id: string) => built[id].widths.map((w) => `${url(id, w)} ${w}w`).join(', ');
const portraitFor = (id: string) => media.find((m) => m.portraitOf === id)?.id;

interface ImgProps {
  id: string;
  sizes?: string;
  className?: string;
  /** Show the property/room/venue label over the image. */
  caption?: boolean;
  eager?: boolean;
}

/**
 * Responsive, labelled image. Uses an approved portrait crop when one exists
 * and the screen is portrait. Falls back to a labelled placeholder if the
 * asset has not been built.
 */
export function Img({ id, sizes = '100vw', className = '', caption = false, eager = false }: ImgProps) {
  const asset = mediaById[id];
  if (!asset || !built[id]) return <PlaceholderImage label={asset?.label ?? id} className={className} />;

  const portrait = portraitFor(id);
  const g = built[id];
  return (
    <figure className={`img ${className}`}>
      <picture>
        {portrait && built[portrait] && (
          <source media="(orientation: portrait)" srcSet={srcSet(portrait)} sizes={sizes} />
        )}
        <img
          src={url(id, g.widths.at(-1)!)}
          srcSet={srcSet(id)}
          sizes={sizes}
          width={g.width}
          height={g.height}
          alt={asset.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={asset.focus ? { objectPosition: asset.focus } : undefined}
        />
      </picture>
      {caption && <figcaption className="img__caption">{asset.label}</figcaption>}
    </figure>
  );
}

export function PlaceholderImage({ label, className = '' }: { label: string; className?: string }) {
  return (
    <figure className={`img img--placeholder ${className}`} role="img" aria-label={`Placeholder image: ${label}`}>
      <span>Placeholder · {label}</span>
    </figure>
  );
}
