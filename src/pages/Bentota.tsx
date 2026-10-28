import { bentotaByProperty } from '../content';
import { ImageButton } from '../components/ImageButton';
import { FactValue } from '../components/FactValue';
import { SceneCarousel } from '../components/SceneCarousel';
import { PinIcon } from '../components/icons';
import { useProperty } from '../app/sections';

const MAPS_URL: Record<string, string> = {
  anugrah: 'https://www.google.com/maps/search/?api=1&query=Anugrah+Nyne+Hotels+Bentota',
  anuprit: 'https://www.google.com/maps/search/?api=1&query=Anuprit+Nyne+Hotels+Bentota',
};

export function Bentota() {
  const p = useProperty()!;
  const bentota = bentotaByProperty[p.id];
  return (
    <div className="page page--carousel page--bentota">
      <header className="page__heading">
        <div><p className="eyebrow">{p.name} · Destination</p><h1>{bentota.title}</h1></div>
      </header>
      <SceneCarousel items={bentota.experiences} label="Nearby experiences" itemLabel={(experience) => experience.name}>
        {(experience, index) => {
          const imageId = experience.assetIds[0] ?? bentota.assetIds[index % bentota.assetIds.length];
          return (
            <div className="feature-scene destination-scene">
              <div className="feature-scene__media">
                <ImageButton ids={[imageId]} sizes="65vw" className="feature-scene__lead" eager />
                <a className="map-action" href={MAPS_URL[p.id]} target="_blank" rel="noreferrer" aria-label={`Open ${p.name} in Google Maps`} title="Open villa map">
                  <PinIcon />
                </a>
              </div>
              <div className="feature-scene__copy">
                <h2>{experience.name}</h2>
                <p className="lede"><FactValue fact={experience.description} /></p>
                <p className="muted"><FactValue fact={bentota.intro} /></p>
              </div>
            </div>
          );
        }}
      </SceneCarousel>
    </div>
  );
}
