import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import PunkContext from '../../contexts/punk';
import { short } from '../../utils';

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
          activePunk && activePunk.punkID === punk.punkID
            ? activeClassName
            : defaultClassName
        }
      >
        <img
          src={punk.src}
          alt={`Punk #${punk.punkID}`}
          className="group-hover:opacity-75 object-cover pointer-events-none"
        />
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        #{punk.punkID}
      </p>
      {punk.tenant && (
        <>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            Offered to {short(punk.tenant)} for {punk.rentLengthInDays} days
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            Tenant occupied on {String(new Date(punk.start * 1000))}
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            Lease expires on {String(new Date(punk.end * 1000))}
          </p>
        </>
      )}
    </div>
  );
}

Punk.propTypes = {
  punk: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};
