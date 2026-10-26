import { bentota } from '../content';
import { ImageButton } from '../components/ImageButton';
import { FactValue } from '../components/FactValue';
import { useProperty } from '../app/sections';

const MAPS_URL: Record<string, string> = {
  anugrah: 'https://www.google.com/maps/search/?api=1&query=Anugrah+Nyne+Hotels+Bentota',
  anuprit: 'https://www.google.com/maps/search/?api=1&query=Anuprit+Nyne+Hotels+Bentota',
};

export function Bentota() {
  const p = useProperty()!;
  const destImages = bentota.assetIds;
  return (
    <div className="page">
      <p className="eyebrow">{p.name} · Destination</p>
      <h1>{bentota.title}</h1>

      <div className="split-land">
        <div>
          <ImageButton ids={[p.mapAssetId]} sizes="(orientation: landscape) 55vw, 100vw" className="map" eager />
          <a className="btn map__link" href={MAPS_URL[p.id]} target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
        </div>
        <div>
          <p className="lede">
            <FactValue fact={bentota.intro} />
          </p>
          <p className="muted">
            <FactValue fact={bentota.access} />
          </p>
        </div>
      </div>

      <h2 className="section-title">Nearby experiences</h2>
      <div className="grid grid--2-port grid--2-land">
        {bentota.experiences.map((e) => (
          <section key={e.id} className="card card--static">
            {e.assetIds[0] && <ImageButton ids={e.assetIds} sizes="(min-width: 700px) 50vw, 100vw" className="card__img" />}
            <div className="card__body">
              <h3 className="card__title">{e.name}</h3>
              <p className="muted">
                <FactValue fact={e.description} />
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="strip strip--wide">
        {destImages
          .filter((id) => !bentota.experiences.some((e) => e.assetIds.includes(id)))
          .map((id) => (
            <ImageButton key={id} ids={[id]} sizes="100vw" className="strip__item" />
          ))}
      </div>
    </div>
  );
}
