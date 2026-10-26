import logo from '../assets/nyne-logo.svg?raw';

/** Nyne wordmark (dev stand-in from nynehotels.com), drawn in currentColor. */
export function Logo({ className = '' }: { className?: string }) {
  return <span className={`logo ${className}`} role="img" aria-label="Nyne" dangerouslySetInnerHTML={{ __html: logo }} />;
}
