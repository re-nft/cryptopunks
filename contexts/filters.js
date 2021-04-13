import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FILTERS = {
  ALL_EVER_GIFTED: 'ALL_EVER_GIFTED',
  I_GIFTED_TENANT_RIGHTS: 'I_GIFTED_TENANT_RIGHTS',
  GIFTED_TO_ME: 'GIFTED_TO_ME',
  OWNED_BY_ME: 'OWNED_BY_ME',
};

const DefaultFilters = {
  activeFilter: FILTERS.ALL_EVER_GIFTED,
};

const FiltersContext = createContext(DefaultFilters);

export const FiltersProvider = ({ children }) => {
  const [activeFilter, setActiveFilter] = useState(DefaultFilters.activeFilter);

  return (
    <FiltersContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </FiltersContext.Provider>
  );
};

FiltersProvider.propTypes = {
  children: PropTypes.node,
};

export default FiltersContext;
