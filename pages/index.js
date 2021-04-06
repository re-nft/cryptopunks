import React from 'react';

import PageLayout from '../composed-components/page-layout';
import Pagination from '../components/pagination';
import Grid from '../components/grid';

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <PageLayout>
        <div className="p-8">
          <Grid />
        </div>
        <div className="pb-8">
          <Pagination />
        </div>
      </PageLayout>
    </>
  );
}
