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
        <div className="home__intro">
          <span>Bentota, Sri Lanka</span>
        </div>
      </header>

      <div className="home__props">
        {propertyIds.map((id) => {
          const p = properties[id];
          return (
            <Link key={id} to={`/${id}`} className="home__card">
              <Img id={p.heroAssetId} sizes="(orientation: portrait) 100vw, 50vw" eager />
              <span className="home__shade" />
              <span className="home__card-body">
                <span className="home__number">0{propertyIds.indexOf(id) + 1}</span>
                <span className="eyebrow">{p.category}</span>
                <span className="home__card-name">{p.name}</span>
                <span className="home__cta">
                  Enter the villa <NextIcon />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
