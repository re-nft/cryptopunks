import React, { useContext, useCallback } from 'react';

import InputContext from '../../contexts/inputs'

export default function Input() {
  const { giftintRentLength, setGiftingRentLength } = useContext(InputContext);

  const handleChange = useCallback((e) => {
    // TODO: no validation whatsoever
    setGiftingRentLength(e.target.value);
  }, [giftintRentLength, setGiftingRentLength]);

  return (
    <>
      <div>
        <label
          htmlFor="email"
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
