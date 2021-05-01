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

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export default function Punk({ punk, setModalOpen }) {
  const { activePunk, setActivePunk } = useContext(PunkContext);

  const handleClick = useCallback(() => {
    setActivePunk(punk);
    setModalOpen(true);
  }, [setActivePunk]);
  const startDate = new Date(punk.start * 1000);
  const endDate = new Date(punk.end * 1000);
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
          imageRendering="pixelated"
          src={punk.src}
          alt={`Punk #${punk.punkID}`}
          className="group-hover:opacity-75 object-cover pointer-events-none"
        />
      </div>
      <p className="mt-4 pb-2 mb-4 block text-2xl font-medium text-gray-900 truncate pointer-events-none flex justify-center border-b-2 border-gray-500">
        #{punk.punkID}
      </p>
      {punk.tenant && (
        <>
          <p className="block text-sm font-medium pointer-events-none lg:grid grid-cols-2">
            <span className="cols-1 text-gray-500  text-sm lg:flex items-center justify-start">
              Offered to{' '}
            </span>
            <span className="cols-1 text-sm lg:flex items-center justify-end font-bold">
              {short(punk.tenant)}
            </span>
          </p>
          <div className="mt-4 grid grid-cols-3 gap-1">
            <p className="cols-1 pointer-events-none">
              <span className="flex items-start justify-start flex-col">
                <span className="font-semibold">
                  {monthNames[startDate.getMonth()]}
                </span>
                <span className="text-xl font-bold">
                  {startDate.getFullYear()}
                </span>
                <span className="font-medium">{formatAMPM(startDate)}</span>
              </span>
            </p>
            <p className="cols-1 flex justify-center items-center pointer-events-none">
              -
            </p>
            <p className="cols-1 pointer-events-none">
              <span className="flex items-end justify-end flex-col">
                <span className="font-semibold">
                  {monthNames[endDate.getMonth()]}
                </span>
                <span className="text-xl font-bold">
                  {endDate.getFullYear()}
                </span>
                <span className="font-medium">{formatAMPM(endDate)}</span>
              </span>
            </p>
          </div>
          <div className="flex justify-center items-center mt-2 font-medium flex-col">
            <p className="pointer-events-none">{punk.rentLengthInDays} days</p>
          </div>
        </>
      )}
    </div>
  );
}

Punk.propTypes = {
  punk: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};
