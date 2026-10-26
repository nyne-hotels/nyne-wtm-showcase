import { Link, Navigate, useParams } from 'react-router-dom';
import { Img } from '../components/Img';
import { ImageButton } from '../components/ImageButton';
import { FactValue } from '../components/FactValue';
import { NextIcon } from '../components/icons';
import { useProperty } from '../app/sections';

export function Rooms() {
  const p = useProperty()!;
  return (
    <div className="page">
      <p className="eyebrow">{p.name}</p>
      <h1>Rooms &amp; suites</h1>
      <div className="grid grid--2-port grid--2-land">
        {p.rooms.map((room) => (
          <Link key={room.id} to={`/${p.id}/rooms/${room.id}`} className="card">
            <Img id={room.assetIds[0]} sizes="(min-width: 700px) 50vw, 100vw" className="card__img" caption />
            <span className="card__body">
              <span className="card__title">{room.name}</span>
              <span className="muted">
                <FactValue fact={room.sizeSqFt} render={(v) => `${v} sq ft`} />
              </span>
              <span className="card__more">
                View details <NextIcon />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function RoomDetail() {
  const p = useProperty()!;
  const { roomId } = useParams();
  const room = p.rooms.find((r) => r.id === roomId);
  if (!room) return <Navigate to={`/${p.id}/rooms`} replace />;

  const others = p.rooms.filter((r) => r.id !== room.id);
  return (
    <div className="page">
      <p className="eyebrow">{p.name} · Rooms &amp; suites</p>
      <h1>{room.name}</h1>

      <div className="split-land">
        <div className="room__media">
          {room.assetIds.map((id, i) => (
            <ImageButton key={id} ids={room.assetIds} index={i} sizes="(orientation: landscape) 55vw, 100vw" eager={i === 0} />
          ))}
        </div>

        <div>
          {room.summary.value && <p className="lede">{room.summary.value}</p>}
          <dl className="facts">
            <div>
              <dt>Size</dt>
              <dd>
                <FactValue fact={room.sizeSqFt} render={(v) => `${v} sq ft`} />
              </dd>
            </div>
            <div>
              <dt>Bed</dt>
              <dd>
                <FactValue fact={room.bed} />
              </dd>
            </div>
            <div>
              <dt>Occupancy</dt>
              <dd>
                <FactValue fact={room.occupancy} />
              </dd>
            </div>
          </dl>
          <FactValue
            fact={room.features}
            render={(list) => (
              <ul className="chips" aria-label="Features">
                {list.map((f) => (
                  <li key={f} className="badge">
                    {f}
                  </li>
                ))}
              </ul>
            )}
          />

          {others.length > 0 && (
            <div className="room__others">
              <p className="muted">Other rooms at {p.name}</p>
              {others.map((r) => (
                <Link key={r.id} to={`/${p.id}/rooms/${r.id}`} className="btn">
                  {r.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
