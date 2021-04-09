import React, { useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Punk from '../punk-item';
import PunkContext from '../../contexts/punk';

const ListItemPunk = ({ punk, setModalOpen }) => {
  return (
    <li className="relative">
      <Punk punk={punk} setModalOpen={setModalOpen} />
    </li>
  );
};

ListItemPunk.propTypes = {
  punk: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

const PUNKS_FILTER = {
  i_gifted: 0,
  gifted_to_me: 1,
  gifted: 2
}

export default function Grid({ setModalOpen }) {
  const { iGiftedPunks, giftedToMePunks, giftedPunks } = useContext(PunkContext);

  const punksModeList = [iGiftedPunks, giftedToMePunks, giftedPunks]

  const [punksFilter, setPunksFilter] = useState(PUNKS_FILTER.gifted)

  const handleFilterChanged = useCallback(e => {
    setPunksFilter(e.target.value)
  }, [])

  // TODO: limit number of punks per page
  return (
    <>
      <div className="mb-4">
        <label htmlFor='cryptopunks-filter'>View all cryptopunks&nbsp;</label>
        <select
          id='cryptopunks-filter'
          onChange={handleFilterChanged}
          className='inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
        >
          <option value={PUNKS_FILTER.gifted}>gifted</option>
          <option value={PUNKS_FILTER.i_gifted}>I gifted</option>
          <option value={PUNKS_FILTER.gifted_to_me}>gifted to me</option>
        </select>
      </div>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {punksModeList[punksFilter].map((punk) => (
          <ListItemPunk
            key={punk.id}
            punk={punk}
            setModalOpen={setModalOpen}
          />
        ))}
      </ul>
    </>
  );
}

// handleClick takes one argument, the id of the punk. Will open the modal for that punk
// punksData, gives all the punk data, we then filter this data
Grid.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};
