import React from 'react';

export default function Grid() {
  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {/* Current: "ring-2 ring-offset-2 ring-indigo-500", Default: "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500" */}
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/1138.PNG"
              alt="punk #1138"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #1138</span>
            </button>
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
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/1357.PNG"
              alt="punk #1357"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #1357</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #1357
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            Offered to 0x888...111 for XX days
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            No tenant right now
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2009.PNG"
              alt="punk #2009"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2009</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2009
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/1701.PNG"
              alt="punk #1701"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #1701</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #1701
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2214.PNG"
              alt="punk #2214"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2214</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2214
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2345.PNG"
              alt="punk #2345"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2345</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2345
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2468.PNG"
              alt="punk #2468"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2468</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2468
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2499.PNG"
              alt="punk #2499"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2499</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2499
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/1138.PNG"
              alt="punk #1138"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #1138</span>
            </button>
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
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/1357.PNG"
              alt="punk #1357"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #1357</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #1357
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            Offered to 0x888...111 for XX days
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            No tenant right now
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2009.PNG"
              alt="punk #2009"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2009</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2009
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/1701.PNG"
              alt="punk #1701"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #1701</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #1701
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2214.PNG"
              alt="punk #2214"
              className="punk #1357"
              e="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2214</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2214
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2345.PNG"
              alt="punk #2345"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2345</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2345
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2468.PNG"
              alt="punk #2468"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2468</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2468
          </p>
        </li>
        <li className="relative">
          <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-12 rounded-lg overflow-hidden">
            <img
              src="punks/2499.PNG"
              alt="punk #2499"
              className="group-hover:opacity-75 object-cover pointer-events-none"
            />
            <button type="button" className="absolute inset-0">
              <span className="sr-only">View details for #2499</span>
            </button>
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            #2499
          </p>
        </li>
      </ul>
    </>
  );
}
