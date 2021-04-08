import React, { useContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import PunkContext from '../../contexts/punk';

const baseClassName =
  'group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden';
const defaultClassName =
  'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500 cursor-pointer ' +
  baseClassName;
const activeClassName =
  'ring-2 ring-offset-2 ring-purple-500 cursor-not-allowed ' + baseClassName;

export default function Punk({ punk, setModalOpen }) {
  const { activePunk, setActivePunk } = useContext(PunkContext);

  const handleClick = useCallback(() => {
    setActivePunk(punk);
    setModalOpen(true);
  }, [setActivePunk]);

  return (
    <div>
      <div
        onClick={handleClick}
        className={
          activePunk && activePunk.id === punk.id
            ? activeClassName
            : defaultClassName
        }
      >
        <img
          src={punk.src}
          alt={`Punk #${punk.id}`}
          className="group-hover:opacity-75 object-cover pointer-events-none"
        />
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        #{punk.id}
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

Punk.propTypes = {
  punk: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};
