import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { properties, propertyIds } from '../content';
import type { PropertyId } from '../content/types';
import { Img } from '../components/Img';
import { BackIcon } from '../components/icons';
import { Logo } from '../components/Logo';
import { SECTIONS, sectionHref, switchPath, upPath, useProperty } from './sections';

/**
 * Persistent shell for a property. The header holds one place switcher —
 * Nyne (home) · Anugrah · Anuprit — plus Back on sub-pages; sections sit below.
 */
export function PropertyLayout() {
  const property = useProperty();
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const main = useRef<HTMLElement>(null);
  const [propertySlide, setPropertySlide] = useState<{
    id: PropertyId;
    href: string;
    direction: 'forward' | 'backward';
    phase: 'moving' | 'revealing';
  } | null>(null);
  const landingOnOverview = Boolean(property && pathname === `/${property.id}`);
  const transitionDirection = state?.propertyTransition === 'from-right'
    ? 'route-scene--from-right'
    : state?.propertyTransition === 'from-left'
      ? 'route-scene--from-left'
      : state?.propertyTransition === 'view'
        ? 'route-scene--property-swap'
        : landingOnOverview || navigationType === 'POP'
          ? 'route-scene--initial'
          : 'route-scene--section';

  // New view starts at the top, and focus moves to it for keyboard / VoiceOver users.
  useEffect(() => {
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  if (!property) return <Navigate to="/" replace />;

  const isOverview = pathname === `/${property.id}`;
  const slideProperty = propertySlide ? properties[propertySlide.id] : null;

  return (
    <div className={`shell shell--${property.id} ${propertySlide ? `shell--property-${propertySlide.direction} shell--property-${propertySlide.phase}` : ''}`}>
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
            const target = current ? `/${id}` : switchPath(pathname, id);
            const direction = id === 'anuprit' ? 'forward' : 'backward';
            return (
              <Link
                key={id}
                // Current property → its overview; other property → same section there.
                to={target}
                state={!current ? { propertyTransition: id === 'anuprit' ? 'from-right' : 'from-left' } : undefined}
                onClick={(event) => {
                  if (current || !isOverview || propertySlide || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  setPropertySlide({ id, href: target, direction, phase: 'moving' });
                }}
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
        <div key={pathname} className={`route-scene ${transitionDirection}`}>
          <Outlet />
        </div>
        {slideProperty && propertySlide && (
          <div
            className={`property-slide property-slide--${propertySlide.direction} property-slide--${propertySlide.phase}`}
            onAnimationEnd={(event) => {
              if (event.currentTarget !== event.target || propertySlide.phase !== 'moving') return;
              flushSync(() => navigate(propertySlide.href, { state: { propertyTransition: 'view' } }));
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setPropertySlide((current) => current ? { ...current, phase: 'revealing' } : null);
                });
              });
            }}
            onTransitionEnd={(event) => {
              if (event.currentTarget === event.target && event.propertyName === 'opacity' && propertySlide.phase === 'revealing') {
                setPropertySlide(null);
              }
            }}
          >
            <Img id={slideProperty.heroAssetId} sizes="100vw" className="property-slide__image" eager />
            <div className="property-slide__veil" />
          </div>
        )}
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
