import React from 'react';
import 'tailwindcss/tailwind.css';

import '../public/styles/index.scss';
import { PunkProvider } from '../contexts/punk';
import { FiltersProvider } from '../contexts/filters';
import { UserProvider } from '../contexts/user';
import { InputsProvider } from '../contexts/inputs';

/* eslint-disable */
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <PunkProvider>
        <FiltersProvider>
          <InputsProvider>
            <Component {...pageProps} />
          </InputsProvider>
        </FiltersProvider>
      </PunkProvider>
    </UserProvider>
  );
}

export default MyApp;
