import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const PunkContext = createContext({
  giftedPunks: [],
  iGiftedPunks: [],
  giftedToMePunks: [],
  activePunk: '',
  setActivePunk: () => {
    throw new Error('must be implemented');
  },
});

const mockAllGiftedPunks = [
  { id: 1138, src: 'punks/1138.PNG' },
  { id: 1357, src: 'punks/1357.PNG' },
  { id: 1701, src: 'punks/1701.PNG' },
  { id: 2009, src: 'punks/2009.PNG' },
  { id: 2214, src: 'punks/2214.PNG' },
  { id: 2345, src: 'punks/2345.PNG' },
  { id: 2468, src: 'punks/2468.PNG' },
  { id: 2499, src: 'punks/2499.PNG' },
];

const mockIGiftedPunks = [
  { id: 2009, src: 'punks/2009.PNG' },
  { id: 2499, src: 'punks/2499.PNG' },
];

const mockGiftedToMePunks = [
  { id: 2345, src: 'punks/2345.PNG' },
  { id: 1138, src: 'punks/1138.PNG' },
];

export function PunkProvider({ children }) {
  const [giftedPunks] = useState(mockAllGiftedPunks);
  const [iGiftedPunks] = useState(mockIGiftedPunks);
  const [giftedToMePunks] = useState(mockGiftedToMePunks);

  const [activePunk, _setActivePunk] = useState(null);

  const setActivePunk = (punk) => {
    _setActivePunk(punk);
  };

  return (
    <PunkContext.Provider
      value={{ giftedPunks, iGiftedPunks, giftedToMePunks, activePunk, setActivePunk }}
    >
      {children}
    </PunkContext.Provider>
  );
}

PunkProvider.propTypes = {
  children: PropTypes.node,
};

export default PunkContext;
