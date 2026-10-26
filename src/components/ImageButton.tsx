import { mediaById } from '../content';
import { useGallery } from './Gallery';
import { Img } from './Img';
import { ExpandIcon } from './icons';

interface Props {
  /** The gallery this image belongs to; tapping opens it at `index`. */
  ids: string[];
  index?: number;
  sizes?: string;
  className?: string;
  eager?: boolean;
}

/** A labelled image that opens the full-screen gallery when tapped. */
export function ImageButton({ ids, index = 0, sizes, className = '', eager }: Props) {
  const openGallery = useGallery();
  const id = ids[index];
  return (
    <button
      type="button"
      className={`image-button ${className}`}
      onClick={() => openGallery(ids, index)}
      aria-label={`View larger: ${mediaById[id]?.label ?? 'image'}`}
    >
      <Img id={id} sizes={sizes} caption eager={eager} />
      <span className="image-button__hint" aria-hidden="true">
        <ExpandIcon />
      </span>
    </button>
  );
}
