import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Inter is reserved for small interface labels; primary typography uses Georgia.
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/luxury.css';
import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
