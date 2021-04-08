import React, { useContext } from 'react';
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

export default function Grid({ setModalOpen }) {
  const { allPunks } = useContext(PunkContext);

  // TODO: limit number of punks per page
  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        <>
          {allPunks.map((punk) => (
            <ListItemPunk
              key={punk.id}
              punk={punk}
              setModalOpen={setModalOpen}
            />
          ))}
        </>
      </ul>
    </>
  );
}

// handleClick takes one argument, the id of the punk. Will open the modal for that punk
// punksData, gives all the punk data, we then filter this data
Grid.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};
