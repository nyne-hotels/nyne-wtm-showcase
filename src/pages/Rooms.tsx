import { Link, Navigate, useParams } from 'react-router-dom';
import { Img } from '../components/Img';
import { ImageButton } from '../components/ImageButton';
import { FactValue } from '../components/FactValue';
import { NextIcon } from '../components/icons';
import { useProperty } from '../app/sections';

export function Rooms() {
  const p = useProperty()!;
  return (
    <div className="page page--rooms">
      <header className="page__heading">
        <div><p className="eyebrow">{p.name}</p><h1>Rooms &amp; suites</h1></div>
      </header>
      <div className={`rooms-grid rooms-grid--${p.rooms.length}`}>
        {p.rooms.map((room, index) => (
          <Link key={room.id} to={`/${p.id}/rooms/${room.id}`} className="card room-card">
            <Img id={room.assetIds[0]} sizes="(min-width: 700px) 34vw, 100vw" className="card__img" />
            <span className="room-card__number">0{index + 1}</span>
            <span className="card__body">
              <span className="card__title">{room.name}</span>
              <span className="muted"><FactValue fact={room.sizeSqFt} render={(v) => `${v} sq ft`} /></span>
              <span className="card__more">Explore room <NextIcon /></span>
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
  const roomNumber = p.rooms.findIndex((r) => r.id === room.id) + 1;
  return (
    <div className="page page--room-detail">
      <div className="room-detail">
        <div className="room-detail__visual">
          {/* The inset sits over the lead's caption corner, so only one label shows. */}
          <ImageButton
            ids={room.assetIds}
            sizes="(orientation: landscape) 62vw, 100vw"
            className="room-detail__lead"
            eager
            caption={!room.assetIds[1]}
          />
          {room.assetIds[1] && <ImageButton ids={room.assetIds} index={1} sizes="28vw" className="room-detail__inset" />}
          <span className="room-detail__folio">0{roomNumber} / 0{p.rooms.length}</span>
        </div>

        <div className="room-detail__copy">
          <div className="room-detail__kicker"><p className="eyebrow">{p.name} · Rooms &amp; suites</p><i /></div>
          <h1>{room.name}</h1>
          {room.summary.value && <p className="lede">{room.summary.value}</p>}
          <p className="room-detail__facts-label">At a glance</p>
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
              <ul className="chips room-detail__amenities" aria-label="Features">
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
