import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Self-hosted fonts, bundled with the app.
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import { App } from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
