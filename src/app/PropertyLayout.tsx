import { useEffect, useRef } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { properties, propertyIds } from '../content';
import { BackIcon } from '../components/icons';
import { Logo } from '../components/Logo';
import { SECTIONS, sectionHref, switchPath, upPath, useProperty } from './sections';

/**
 * Persistent shell for a property. The header holds one place switcher —
 * Nyne (home) · Anugrah · Anuprit — plus Back on sub-pages; sections sit below.
 */
export function PropertyLayout() {
  const property = useProperty();
  const { pathname } = useLocation();
  const main = useRef<HTMLElement>(null);

  // New view starts at the top, and focus moves to it for keyboard / VoiceOver users.
  useEffect(() => {
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  if (!property) return <Navigate to="/" replace />;

  const isOverview = pathname === `/${property.id}`;

  return (
    <div className={`shell shell--${property.id}`}>
      <header className="topbar">
        <div className="topbar__left">
          {!isOverview && (
            <Link to={upPath(pathname)} className="btn btn--ghost">
              <BackIcon />
              <span className="topbar__label">Back</span>
            </Link>
          )}
        </div>

        {/* One control for "where am I": the current property is highlighted; the other is one tap away. */}
        <nav className="switcher" aria-label="Choose property">
          <Link to="/" className="switcher__item switcher__item--home" aria-label="Nyne home">
            <Logo className="switcher__logo" />
          </Link>
          {propertyIds.map((id) => {
            const p = properties[id];
            const current = id === property.id;
            return (
              <Link
                key={id}
                // Current property → its overview; other property → same section there.
                to={current ? `/${id}` : switchPath(pathname, id)}
                className={`switcher__item ${current ? 'is-current' : ''}`}
                aria-current={current ? 'page' : undefined}
              >
                <span className="switcher__name">{p.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="topbar__right" />
      </header>
      <main ref={main} tabIndex={-1} className="shell__main">
        <Outlet />
      </main>

      <nav className="section-nav" aria-label={`${property.name} sections`}>
        {SECTIONS.map((s) => (
          <NavLink key={s.path} to={sectionHref(property.id, s.path)} end={s.path === ''} className="section-nav__item">
            {s.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
