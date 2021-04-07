import React, { useEffect, useState, createRef } from 'react';
import PropTypes from 'prop-types';

// TODO: rename this
import ModalPunkCard from '../modal-card'
import { _handleClickOutside } from '../../utils'

// TODO: handleClick should be taken from context instead
export default function Punk({ punkData, isSelected, handleClick }) {
  const [localIsSelected, setLocalIsSelected] = useState(true);
  const punkRef = createRef();

  const baseClassName =
    'group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden';
  const defaultClassName =
    'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500 cursor-pointer ' +
    baseClassName;
  const activeClassName =
    'ring-2 ring-offset-2 ring-purple-500 cursor-not-allowed ' + baseClassName;

  const handleClickOutside = (e) => {
    _handleClickOutside(e, punkRef, () => {
      setLocalIsSelected(false);
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  if (isSelected && localIsSelected) {
    return <ModalPunkCard />
  }

  return (
    <div>
      <div
        ref={punkRef}
        className={
          isSelected && localIsSelected ? activeClassName : defaultClassName
        }
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
};

// TODO: punkData is required too
Punk.propTypes = {
  isSelected: PropTypes.bool.isRequired
};
