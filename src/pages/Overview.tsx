import { Img } from '../components/Img';
import { PinIcon } from '../components/icons';
import { useProperty } from '../app/sections';

export function Overview() {
  const p = useProperty()!;
  const folio = p.id === 'anugrah' ? '01' : '02';
  return (
    <article className="overview-scene">
      <Img id={p.heroAssetId} sizes="100vw" className="overview-scene__image" eager />
      <div className="overview-scene__veil" />
      <div className="overview-scene__folio" aria-hidden="true">
        <span>Nyne · Bentota</span>
        <span>Residence {folio} / 02</span>
      </div>
      <div className="overview-scene__content">
        <div className="overview-scene__copy">
          <div className="overview-scene__kicker">
            <span className="eyebrow">{p.category}</span>
            <i />
          </div>
          <h1>{p.name}</h1>
          {p.location.value && (
            <p className="hero__loc">
              <PinIcon /> {p.location.value}
            </p>
          )}
          {p.tagline.value && <div className="overview-scene__statement"><h2>{p.tagline.value}</h2></div>}
          {p.intro.value && <p className="lede">{p.intro.value}</p>}
        </div>
      </div>
    </article>
  );
}
