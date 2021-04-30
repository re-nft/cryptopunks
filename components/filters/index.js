import React, { useContext, useCallback } from 'react';

import FilterContext, { FILTERS } from '../../contexts/filters';

export default function Filters() {
  const { activeFilter, setActiveFilter } = useContext(FilterContext);
  const baseClassName = 'border-transparent';
  const defaultClassName =
    'text-gray-500 hover:text-gray-700 hover:border-gray-300' + baseClassName;
  const activeClassName = 'border-indigo-500 text-indigo-600' + baseClassName;

  const onChange = useCallback((e) => {
    switch (e.target.value.toLowerCase()) {
      case 'all ever gifted':
        return FILTERS.ALL_CURRENTLY_GIFTED;
      case 'gifted to me':
        return FILTERS.GIFTED_TO_ME;
      case 'gifted by me':
        return FILTERS.I_GIFTED_TENANT_RIGHTS;
      case 'owned by me':
        return FILTERS.OWNED_BY_ME;
    }
  }, []);

  return (
    <>
      <div>
        <div className="sm:hidden mb-8">
          <label htmlFor="tabs" className="sr-only">
            Select a filter
          </label>
          <select
            onChange={(e) => {
              setActiveFilter(onChange(e));
            }}
            onFocus={(e) => {
              setActiveFilter(onChange(e));
            }}
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option defaultValue>All Ever Gifted</option>
            <option>Gifted To Me</option>
            <option>Gifted By Me</option>
            <option>Owned By Me</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200 mb-8 pb-4">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <span
                className={`cursor-pointer ${
                  activeFilter === FILTERS.ALL_CURRENTLY_GIFTED
                    ? activeClassName
                    : defaultClassName
                }`}
                onClick={() => setActiveFilter(FILTERS.ALL_CURRENTLY_GIFTED)}
              >
                All Currently Gifted
              </span>
              <span
                className={`cursor-pointer ${
                  activeFilter === FILTERS.ALL_EVER_GIFTED
                    ? activeClassName
                    : defaultClassName
                }`}
                onClick={() => setActiveFilter(FILTERS.ALL_EVER_GIFTED)}
              >
                All Ever Gifted
              </span>
              <span
                className={`cursor-pointer ${
                  activeFilter === FILTERS.GIFTED_TO_ME
                    ? activeClassName
                    : defaultClassName
                }`}
                onClick={() => setActiveFilter(FILTERS.GIFTED_TO_ME)}
              >
                Gifted To Me
              </span>
              <span
                className={`cursor-pointer ${
                  activeFilter === FILTERS.I_GIFTED_TENANT_RIGHTS
                    ? activeClassName
                    : defaultClassName
                }`}
                onClick={() => setActiveFilter(FILTERS.I_GIFTED_TENANT_RIGHTS)}
              >
                Gifted By Me
              </span>
              <span
                className={`cursor-pointer ${
                  activeFilter === FILTERS.OWNED_BY_ME
                    ? activeClassName
                    : defaultClassName
                }`}
                onClick={() => setActiveFilter(FILTERS.OWNED_BY_ME)}
              >
                Owned By Me
              </span>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
