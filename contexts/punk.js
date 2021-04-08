import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// const DefaultPunkContext = {
//   activePunk: null,
//   setActivePunk: () => {
//     true;
//     // throw new Error('must be implemented');
//   },
// };

const PunkContext = createContext({
  activePunk: '',
  setActivePunk: () => {
    console.log('incorrect setactive');
  },
});

export function PunkProvider({ children }) {
  const [activePunk, _setActivePunk] = useState('');

  const setActivePunk = (punk) => {
    console.log('correct setactive');
    _setActivePunk(punk);
  };

  return (
    <PunkContext.Provider value={{ activePunk, setActivePunk }}>
      {children}
    </PunkContext.Provider>
  );
}

export default PunkContext;
