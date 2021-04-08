import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

// TODO: handleClick should be taken from context instead
export default function Punk({ punkData, isSelected, handleClick }) {
  const [_isSelected, setIsSelected] = useState(false);

  const baseClassName =
    'group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden';
  const defaultClassName =
    'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500 cursor-pointer ' +
    baseClassName;
  const activeClassName =
    'ring-2 ring-offset-2 ring-purple-500 cursor-not-allowed ' + baseClassName;
  // detects click outside of this component (to close the modal)
  // // TODO: this is a general func that may be used elsewhere, extract it from here
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     console.log('event.target')
  //     console.log(event.target);
  //     console.log('punkCardRef')
  //     console.log(punkCardRef.current);
  //     if (event.target !== punkCardRef.current) {
  //       setIsSelected(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // });

  return (
    <div>
      <div
        onClick={() => setIsSelected(true)}
        className={isSelected ? activeClassName : defaultClassName}
      >
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
    </div>
  );
}

// TODO: punkData is required too
Punk.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};
