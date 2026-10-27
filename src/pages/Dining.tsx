import { ImageButton } from '../components/ImageButton';
import { FactValue } from '../components/FactValue';
import { SceneCarousel } from '../components/SceneCarousel';
import { useProperty } from '../app/sections';

export function Dining() {
  const p = useProperty()!;
  return (
    <div className="page page--carousel page--dining">
      <header className="page__heading">
        <div><p className="eyebrow">{p.name}</p><h1>Dining</h1></div>
        <p className="page__aside">Intimate tables, thoughtful produce and the easy rhythm of the coast.</p>
      </header>
      <SceneCarousel items={p.dining} label="Dining venues" itemLabel={(venue) => venue.name}>
        {(venue) => (
          <div className="feature-scene">
            <div className="feature-scene__media">
              {venue.assetIds[0] && <ImageButton ids={venue.assetIds} sizes="65vw" className="feature-scene__lead" eager />}
              {venue.assetIds[1] && <ImageButton ids={venue.assetIds} index={1} sizes="30vw" className="feature-scene__inset" />}
            </div>
            <div className="feature-scene__copy">
              <h2>{venue.name}</h2>
              <p className="lede"><FactValue fact={venue.description} /></p>
              <FactValue fact={venue.details} render={(list) => (
                <ul className="list">{list.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              )} />
            </div>
          </div>
        )}
      </SceneCarousel>
    </div>
  );
}
