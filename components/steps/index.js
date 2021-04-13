import React, { useContext } from 'react';

import InputsContext from '../../contexts/inputs';
import { checksum, toBN } from '../../utils';

export default function Steps() {
  const { giftingRentLength, transaction } = useContext(InputsContext);

  return (
    <>
      {/* This example requires Tailwind CSS v2.0+ */}
      <nav aria-label="Progress">
        <ol className="space-y-4 md:flex md:space-y-0 md:space-x-8">
          <li className="md:flex-1">
            <a
              href="#"
              className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
            >
              <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
                Placeholder
              </span>
              <span className="text-sm font-medium">
                Ensures that noone will be able to buy your punk
              </span>
              <span className="text-lg font-bold">0xff</span>
            </a>
          </li>
          <li className="md:flex-1">
            <a
              href="#"
              className="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
              aria-current="step"
            >
              <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">
                Checksum
              </span>
              <span className="text-sm font-medium">
                Ensures integrity of the transaction data
              </span>
              {transaction && (
                <span className="text-lg font-bold">
                  {checksum(toBN(transaction))}
                </span>
              )}
            </a>
          </li>
          <li className="md:flex-1">
            <a
              href="#"
              className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
            >
              <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                Rent Length
              </span>
              <span className="text-sm font-medium">Gifted Rent Length</span>
              {giftingRentLength && (
                <span className="text-lg font-bold">
                  {giftingRentLength} days
                </span>
              )}
            </a>
          </li>
        </ol>
      </nav>
    </>
  );
}
