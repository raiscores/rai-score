import React from 'react';
import ReactDOM from 'react-dom/client';

// Self-hosted fonts (bundled, no external requests)
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';

// Compiled Tailwind output — generated from src/index.css by `npm run tailwind:build`
import './tailwind-output.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
