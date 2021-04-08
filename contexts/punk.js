import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PunkContext = createContext({
  allPunks: [],
  activePunk: '',
  setActivePunk: () => {
    throw new Error('must be implemented');
  },
});

const mockAllPunks = [
  { id: 1138, src: 'punks/1138.PNG' },
  { id: 1701, src: 'punks/1701.PNG' },
];

export function PunkProvider({ children }) {
  const [allPunks] = useState(mockAllPunks);
  const [activePunk, _setActivePunk] = useState(null);

  const setActivePunk = (punk) => {
    _setActivePunk(punk);
  };

  return (
    <PunkContext.Provider value={{ activePunk, allPunks, setActivePunk }}>
      {children}
    </PunkContext.Provider>
  );
}

PunkProvider.propTypes = {
  children: PropTypes.node,
};

export default PunkContext;
