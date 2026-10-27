import { useState, type ReactNode } from 'react';
import { BackIcon, NextIcon } from './icons';

interface SceneCarouselProps<T> {
  items: T[];
  label: string;
  itemLabel: (item: T, index: number) => string;
  children: (item: T, index: number) => ReactNode;
  className?: string;
  controls?: 'subnav' | 'slider';
}

export function SceneCarousel<T>({ items, label, itemLabel, children, className = '', controls = 'subnav' }: SceneCarouselProps<T>) {
  const [index, setIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (!items.length) return null;

  const select = (nextIndex: number) => {
    if (nextIndex === index) return;
    setHasInteracted(true);
    setIndex(nextIndex);
  };
  const move = (delta: number) => {
    setHasInteracted(true);
    setIndex((current) => (current + delta + items.length) % items.length);
  };

  return (
    <section
      className={`scene-carousel ${className}`}
      aria-label={label}
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = event.changedTouches[0].clientX - touchStart;
        if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1);
        setTouchStart(null);
      }}
    >
      <div key={index} className={`scene-carousel__scene ${hasInteracted ? 'is-changing' : ''}`}>
        {children(items[index], index)}
      </div>
      {items.length > 1 && controls === 'subnav' && (
        <div className="scene-carousel__controls" role="tablist" aria-label={label}>
          {items.map((item, itemIndex) => (
            <button
              key={itemLabel(item, itemIndex)}
              className={itemIndex === index ? 'is-active' : ''}
              onClick={() => select(itemIndex)}
              role="tab"
              aria-selected={itemIndex === index}
            >
              <span>{itemLabel(item, itemIndex)}</span>
            </button>
          ))}
        </div>
      )}
      {items.length > 1 && controls === 'slider' && (
        <div className="scene-carousel__slider-controls" aria-label={`${label} controls`}>
          <button onClick={() => move(-1)} aria-label={`Previous ${label}`}><BackIcon /></button>
          <span aria-live="polite">{String(index + 1).padStart(2, '0')} <i /> {String(items.length).padStart(2, '0')}</span>
          <button onClick={() => move(1)} aria-label={`Next ${label}`}><NextIcon /></button>
        </div>
      )}
    </section>
  );
}
