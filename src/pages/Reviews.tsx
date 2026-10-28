import { reviewsFor } from '../content';
import { StarIcon } from '../components/icons';
import { SceneCarousel } from '../components/SceneCarousel';
import { useProperty } from '../app/sections';

export function Reviews() {
  const p = useProperty()!;
  const list = reviewsFor(p.id);
  return (
    <div className="page page--carousel page--reviews page--review-section">
      <header className="page__heading">
        <div><p className="eyebrow">{p.name}</p><h1>Guest impressions</h1></div>
      </header>
      <SceneCarousel items={list} label="Guest reviews" itemLabel={(review) => review.reviewer} className="reviews-carousel" controls="slider">
        {(r) => (
          <figure className="review">
            {r.excerpt ? (
              <blockquote className="review__quote">
                <p>“{r.excerpt}”</p>
              </blockquote>
            ) : (
              // No verbatim text yet: show the editorial focus, never in quotation marks.
              <p className="review__pending">
                <span className="tbc">Excerpt to be copied verbatim from Google.</span>
                <br />
                Review focus: {r.focus}
              </p>
            )}
            <figcaption className="review__by">
              <span className="review__name">{r.reviewer}</span>
              <span className="review__meta">
                <span className="review__stars" aria-label={`${r.rating} out of 5`}>
                  {Array.from({ length: r.rating }, (_, i) => (
                    <StarIcon key={i} />
                  ))}
                </span>
                Google · {r.displayedDate}
                {r.excerpt && r.isExcerpt && ' · Excerpt'}
              </span>
            </figcaption>
          </figure>
        )}
      </SceneCarousel>
    </div>
  );
}
