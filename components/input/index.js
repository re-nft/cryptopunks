import React, { useContext, useCallback } from 'react';

import InputContext from '../../contexts/inputs';

export default function Input() {
  const { giftingRentLength, setGiftingRentLength, setToAddress } = useContext(
    InputContext
  );

  const handleChange = useCallback(
    (e) => {
      try {
        if (parseInt(e.target.value) > 99) {
          setGiftingRentLength(99);
          return;
        }
      } catch (e) {
        setGiftingRentLength(0);
        return;
      }
      setGiftingRentLength(e.target.value);
    },
    [giftingRentLength, setGiftingRentLength]
  );

  const handleToChange = useCallback(
    (e) => {
      // todo: no validation whatsoever
      setToAddress(e.target.value);
    },
    [setToAddress]
  );

  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          To
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="to-address"
            id="to-address"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="0x000...000"
            aria-describedby="text-description"
            onChange={handleToChange}
            onFocus={handleToChange}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500" id="rent-description">
          Gift tenancy rights to this address
        </p>
      </div>
      <div>
        <label
          htmlFor="rent-days"
          className="block text-sm font-medium text-gray-700"
        >
          Rent Length
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="rent-days"
            id="rent-days"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="14"
            min="1"
            max="99"
            aria-describedby="rent-description"
            onChange={handleChange}
            onFocus={handleChange}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500" id="rent-description">
          Tenancy rights number of days
        </p>
      </div>
    </>
  );
}
