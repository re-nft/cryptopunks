import React, { useContext } from 'react';

import FilterContext, { FILTERS } from '../../contexts/filters';

export default function Filters() {
  const { activeFilter, setActiveFilter } = useContext(FilterContext);
  const baseClassName = 'border-transparent';
  const defaultClassName =
    'text-gray-500 hover:text-gray-700 hover:border-gray-300' + baseClassName;
  const activeClassName = 'border-indigo-500 text-indigo-600' + baseClassName;

  return (
    <>
      <div>
        <div className="sm:hidden mb-8">
          <label htmlFor="tabs" className="sr-only">
            Select a filter
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option
              onClick={() => setActiveFilter(FILTERS.ALL_EVER_GIFTED)}
              defaultValue
            >
              All Ever Gifted
            </option>
            <option onClick={() => setActiveFilter(FILTERS.GIFTED_TO_ME)}>
              Gifted To Me
            </option>
            <option
              onClick={() => setActiveFilter(FILTERS.I_GIFTED_TENANT_RIGHTS)}
            >
              I Gifted
            </option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200 mb-8 pb-4">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <a
                href="#"
                className={
                  activeFilter === FILTERS.ALL_EVER_GIFTED
                    ? activeClassName
                    : defaultClassName
                }
                onClick={() => setActiveFilter(FILTERS.ALL_EVER_GIFTED)}
              >
                All Ever Gifted
              </a>
              <a
                href="#"
                className={
                  activeFilter === FILTERS.GIFTED_TO_ME
                    ? activeClassName
                    : defaultClassName
                }
                onClick={() => setActiveFilter(FILTERS.GIFTED_TO_ME)}
              >
                Gifted To Me
              </a>
              <a
                href="#"
                className={
                  activeFilter === FILTERS.I_GIFTED_TENANT_RIGHTS
                    ? activeClassName
                    : defaultClassName
                }
                onClick={() => setActiveFilter(FILTERS.I_GIFTED_TENANT_RIGHTS)}
              >
                I Gifted
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
