import React from 'react';
import 'tailwindcss/tailwind.css';
import PropTypes from 'prop-types';

import { PunkProvider } from '../contexts/punk';

function MyApp({ Component, pageProps }) {
  return (
    <PunkProvider>
      <Component {...pageProps} />
    </PunkProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;
