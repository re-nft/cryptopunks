import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Punk from '../punk-item'

export default function Grid({ punksData }) {
  const [activePunk, setActivePunk] = useState();

  // TODO: limit number of punks per page
  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        <li onClick={() => setActivePunk(1)} className="relative">
          <Punk isSelected={false} />
        </li>
        <li onClick={() => setActivePunk(1)} className="relative">
          <Punk isSelected={false} />
        </li>
      </ul>
    </>
  );
}

// handleClick takes one argument, the id of the punk. Will open the modal for that punk
// punksData, gives all the punk data, we then filter this data
Grid.propTypes = {
  handleClick: PropTypes.func,
  punksData: PropTypes.object
};
