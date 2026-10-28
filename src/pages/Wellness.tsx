import { ImageButton } from '../components/ImageButton';
import { FactValue } from '../components/FactValue';
import { SceneCarousel } from '../components/SceneCarousel';
import { useProperty } from '../app/sections';

export function Wellness() {
  const p = useProperty()!;
  return (
    <div className="page page--carousel page--wellness">
      <header className="page__heading">
        <div><p className="eyebrow">{p.name}</p><h1>Wellness &amp; leisure</h1></div>
      </header>
      <SceneCarousel items={p.wellness} label="Wellness experiences" itemLabel={(experience) => experience.name}>
        {(experience) => (
          <div className={`feature-scene ${!experience.assetIds[0] ? 'feature-scene--text' : ''}`}>
            {experience.assetIds[0] && (
              <div className="feature-scene__media">
                <ImageButton ids={experience.assetIds} sizes="65vw" className="feature-scene__lead" eager />
              </div>
            )}
            <div className="feature-scene__copy">
              <h2>{experience.name}</h2>
              <p className="lede"><FactValue fact={experience.description} /></p>
            </div>
          </div>
        )}
      </SceneCarousel>
    </div>
  );
}
