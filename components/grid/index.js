import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Punk = ({ punkData, isSelected, handleClick }) => {
  const baseClassName =
    'group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden';
  const defaultClassName =
    'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500 ' +
    baseClassName;
  const activeClassName =
    'ring-2 ring-offset-2 ring-purple-500' + baseClassName;

  return (
    <>
      <div className={isSelected ? activeClassName : defaultClassName}>
        <img
          src="punks/1138.PNG"
          alt="punk #1138"
          className="group-hover:opacity-75 object-cover pointer-events-none"
        />
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        #1138
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
        Offered to 0x000...000 for XX days
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
        Tenant occupied on XX/YY/ZZZZ
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
        Lease expires on XX/YY/ZZZZ
      </p>
    </>
  );
};

export default function Grid({ handleClick, punksData }) {
  const [activePunk, setActivePunk] = useState();

  // TODO: limit number of punks per page
  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        <li onClick={() => setActivePunk(1)} className="relative">
          <Punk isSelected={true} handleClick={handleClick} />
        </li>
        <li onClick={() => setActivePunk(1)} className="relative">
          <Punk isSelected={false} handleClick={handleClick} />
        </li>
      </ul>
    </>
  );
}

// TODO: punkData is required too
Punk.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

// handleClick takes one argument, the id of the punk. Will open the modal for that punk
// punksData, gives all the punk data, we then filter this data
Grid.propTypes = {
  handleClick: PropTypes.func,
  punksData: PropTypes.object,
};
