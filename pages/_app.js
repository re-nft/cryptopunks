import React from 'react';
import 'tailwindcss/tailwind.css';

import { PunkProvider } from '../contexts/punk';
import { FiltersProvider } from '../contexts/filters';

/* eslint-disable */
function MyApp({ Component, pageProps }) {
  return (
    <PunkProvider>
      <FiltersProvider>
        <Component {...pageProps} />
      </FiltersProvider>
    </PunkProvider>
  );
}

export default MyApp;
