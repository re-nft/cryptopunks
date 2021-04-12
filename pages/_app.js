import React from 'react';
import 'tailwindcss/tailwind.css';

import { PunkProvider } from '../contexts/punk';
import { FiltersProvider } from '../contexts/filters';
import { UserProvider } from '../contexts/user';
import { InputsProvider } from '../contexts/inputs';

/* eslint-disable */
function MyApp({ Component, pageProps }) {
  return (
    <PunkProvider>
      <FiltersProvider>
        <UserProvider>
          <InputsProvider>
            <Component {...pageProps} />
          </InputsProvider>
        </UserProvider>
      </FiltersProvider>
    </PunkProvider>
  );
}

export default MyApp;
