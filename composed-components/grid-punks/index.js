import React from 'react';

import Filters from '../../components/filters'
import Grid from '../../components/grid';
import ModalPunkCard from '../../components/modal-card';

export default function PunksGrid() {
  return (
    <>
      <Filters />
      <ModalPunkCard>
        {(setModalOpen) => <Grid setModalOpen={setModalOpen} />}
      </ModalPunkCard>
    </>
  );
}
