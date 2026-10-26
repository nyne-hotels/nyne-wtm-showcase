import { ImageButton } from '../components/ImageButton';
import { FactValue, locationLabel } from '../components/FactValue';
import { PinIcon } from '../components/icons';
import { useProperty } from '../app/sections';

export function Dining() {
  const p = useProperty()!;
  return (
    <div className="page">
      <p className="eyebrow">{p.name}</p>
      <h1>Dining</h1>
      {p.dining.map((venue) => (
        <section key={venue.id} className="block" aria-labelledby={`v-${venue.id}`}>
          <div className="block__head">
            <h2 id={`v-${venue.id}`}>{venue.name}</h2>
            <span className="badge badge--accent">
              <PinIcon /> {locationLabel(venue.locationType, p, venue.hostProperty)}
            </span>
          </div>
          <div className="split-land">
            <div>
              <p className="lede">
                <FactValue fact={venue.description} />
              </p>
              <FactValue
                fact={venue.details}
                render={(list) => (
                  <ul className="list">
                    {list.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              />
            </div>
            <div className="block__media">
              {venue.assetIds.map((id, i) => (
                <ImageButton key={id} ids={venue.assetIds} index={i} sizes="(orientation: landscape) 55vw, 100vw" className={i === 0 ? 'is-lead' : ''} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
