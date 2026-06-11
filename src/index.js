import React from 'react';
import ReactDOM from 'react-dom/client';

// Self-hosted fonts (bundled, no external requests)
import '@fontsource-variable/schibsted-grotesk';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';

// Tailwind CSS is compiled to public/tw.css and linked in public/index.html —
// it must NOT go through webpack (CRA's CSS minifier mangles Tailwind 4 output)

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
