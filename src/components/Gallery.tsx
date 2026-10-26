import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { mediaById } from '../content';
import { Img } from './Img';
import { BackIcon, CloseIcon, NextIcon } from './icons';

interface GalleryState {
  ids: string[];
  index: number;
}

const GalleryContext = createContext<(ids: string[], index?: number) => void>(() => {});

/** Open the full-screen gallery: `openGallery(assetIds, startIndex)`. */
export const useGallery = () => useContext(GalleryContext);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GalleryState | null>(null);
  const open = useCallback((ids: string[], index = 0) => setState({ ids, index }), []);
  return (
    <GalleryContext.Provider value={open}>
      {children}
      {state && <Lightbox {...state} onIndex={(index) => setState({ ...state, index })} onClose={() => setState(null)} />}
    </GalleryContext.Provider>
  );
}

function Lightbox({ ids, index, onIndex, onClose }: GalleryState & { onIndex: (i: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const many = ids.length > 1;
  const go = (delta: number) => onIndex((index + delta + ids.length) % ids.length);

  // <dialog> gives us a focus trap, inert background and Esc-to-close.
  useEffect(() => {
    const el = dialog.current!;
    el.showModal();
    const restore = document.activeElement as HTMLElement | null;
    return () => {
      el.close();
      restore?.focus();
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!many) return;
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const asset = mediaById[ids[index]];

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label="Image gallery"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null || !many) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="lightbox__stage">
        <Img key={ids[index]} id={ids[index]} sizes="100vw" className="lightbox__img" eager />
      </div>
      <div className="lightbox__bar">
        <p className="lightbox__label" aria-live="polite">
          {asset?.label}
          {many && (
            <span className="muted">
              {' '}
              · {index + 1} of {ids.length}
            </span>
          )}
        </p>
        <div className="lightbox__controls">
          {many && (
            <>
              <button className="btn" onClick={() => go(-1)} aria-label="Previous image">
                <BackIcon />
              </button>
              <button className="btn" onClick={() => go(1)} aria-label="Next image">
                <NextIcon />
              </button>
            </>
          )}
          <button className="btn btn--primary" onClick={onClose} autoFocus>
            <CloseIcon /> Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
