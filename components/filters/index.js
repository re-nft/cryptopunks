import React from 'react';
import PropTypes from 'prop-types';

export const FILTERS = {
  ALL_EVER_GIFTED: 'ALL_EVER_GIFTED',
  I_GIFTED_TENANT_RIGHTS: 'I_GIFTED_TENANT_RIGHTS',
  GIFTED_TO_ME: 'GIFTED_TO_ME',
};

export default function Filters({ filter }) {
  const baseClassName = 'border-transparent';
  const defaultClassName =
    'text-gray-500 hover:text-gray-700 hover:border-gray-300' + baseClassName;
  const activeClassName = 'border-indigo-500 text-indigo-600' + baseClassName;

  return (
    <>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>All Ever Gifted</option>
            <option>I Gifted Tenant Rights</option>
            <option selected>Gifted To Me</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <a
                href="#"
                className={filter === FILTERS.ALL_EVER_GIFTED ? activeClassName : defaultClassName}
              >
                All Ever Gifted
              </a>
              <a
                href="#"
                className={filter === FILTERS.I_GIFTED_TENANT_RIGHTS ? activeClassName : defaultClassName}
              >
                I Gifted Tenant Rights
              </a>
              <a
                href="#"
                className={filter === FILTERS.GIFTED_TO_ME ? activeClassName : defaultClassName}
              >
                Gifted To Me
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

Filters.propTypes = {
  filter: PropTypes.string.isRequired
}
