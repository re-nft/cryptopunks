import React from 'react';

import Grid from '../../components/grid';
import ModalPunkCard from '../../components/modal-card';

export default function PunksGrid() {
  return (
    <>
      <ModalPunkCard>
        {(setModalOpen) => <Grid setModalOpen={setModalOpen} />}
      </ModalPunkCard>
    </>
  );
}
