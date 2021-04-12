import React from 'react';
import 'tailwindcss/tailwind.css';

import { PunkProvider } from '../contexts/punk';
import { FiltersProvider } from '../contexts/filters';
import { UserProvider } from '../contexts/user';

/* eslint-disable */
function MyApp({ Component, pageProps }) {
  return (
    <PunkProvider>
      <FiltersProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </FiltersProvider>
    </PunkProvider>
  );
}

export default MyApp;
