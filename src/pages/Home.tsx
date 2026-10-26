import { Link } from 'react-router-dom';
import { properties, propertyIds } from '../content';
import { Img } from '../components/Img';
import { Logo } from '../components/Logo';
import { NextIcon } from '../components/icons';

export function Home() {
  return (
    <div className="home">
      <header className="home__head">
        <Logo className="home__logo" />
        <h1>Discover Nyne in Bentota</h1>
      </header>

      <div className="home__props">
        {propertyIds.map((id) => {
          const p = properties[id];
          return (
            <Link key={id} to={`/${id}`} className="home__card">
              <Img id={p.heroAssetId} sizes="(orientation: portrait) 100vw, 50vw" caption eager />
              <span className="home__card-body">
                <span className="eyebrow">{p.category}</span>
                <span className="home__card-name">{p.name}</span>
                <span className="btn btn--primary home__cta">
                  Explore {p.name} <NextIcon />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
