import { Link } from 'react-router-dom';
import { Img } from '../components/Img';
import { ImageButton } from '../components/ImageButton';
import { NextIcon, PinIcon } from '../components/icons';
import { SECTIONS, sectionHref, useProperty } from '../app/sections';

export function Overview() {
  const p = useProperty()!;
  const gallery = [p.heroAssetId, ...p.galleryAssetIds];
  return (
    <article>
      <div className="hero">
        <Img id={p.heroAssetId} sizes="100vw" className="hero__img" caption eager />
        <div className="hero__text">
          <p className="eyebrow">{p.category}</p>
          <h1>{p.name}</h1>
          {p.location.value && (
            <p className="hero__loc">
              <PinIcon /> {p.location.value}
            </p>
          )}
        </div>
      </div>

      <div className="page">
        <div className="split-land">
          <div>
            {p.tagline.value && <h2>{p.tagline.value}</h2>}
            {p.intro.value && <p className="lede">{p.intro.value}</p>}
            {/* Category explanation is shown only once the client has approved wording. */}
            {p.categoryNote.approval === 'approved' && p.categoryNote.value && (
              <p className="muted">{p.categoryNote.value}</p>
            )}
          </div>

          <nav className="quick-links" aria-label="Explore">
            {SECTIONS.filter((s) => s.path).map((s) => (
              <Link key={s.path} to={sectionHref(p.id, s.path)} className="quick-links__item">
                {s.label}
                <NextIcon />
              </Link>
            ))}
          </nav>
        </div>

        <h2 className="section-title">Gallery</h2>
        <div className="strip">
          {gallery.map((id, i) => (
            <ImageButton key={id} ids={gallery} index={i} sizes="(orientation: portrait) 45vw, 30vw" className="strip__item" />
          ))}
        </div>
      </div>
    </article>
  );
}
