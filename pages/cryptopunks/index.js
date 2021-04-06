import React from 'react';

import PageLayout from '../../composed-components/page-layout';
import Pagination from '../../components/pagination';
import Grid from '../../components/grid';

export default function Legal() {
  return (
    <PageLayout>
      <div className="p-8">
        <Grid />
      </div>
      <div className="pb-8">
        <Pagination />
      </div>
    </PageLayout>
  );
}
