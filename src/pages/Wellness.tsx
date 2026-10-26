import { ImageButton } from '../components/ImageButton';
import { FactValue, locationLabel } from '../components/FactValue';
import { PinIcon } from '../components/icons';
import { useProperty } from '../app/sections';

export function Wellness() {
  const p = useProperty()!;
  const images = p.wellness.flatMap((e) => e.assetIds);
  return (
    <div className="page">
      <p className="eyebrow">{p.name}</p>
      <h1>Wellness &amp; leisure</h1>
      <div className="split-land">
        <ul className="experiences">
          {p.wellness.map((e) => (
            <li key={e.id} className="experience">
              <div className="block__head">
                <h2 className="experience__title">{e.name}</h2>
                <span className="badge">
                  <PinIcon /> {locationLabel(e.locationType, p)}
                </span>
              </div>
              <p>
                <FactValue fact={e.description} />
              </p>
            </li>
          ))}
        </ul>
        <div className="block__media">
          {images.map((id, i) => (
            <ImageButton key={id} ids={images} index={i} sizes="(orientation: landscape) 55vw, 100vw" className="is-lead" />
          ))}
        </div>
      </div>
    </div>
  );
}
