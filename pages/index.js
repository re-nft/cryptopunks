import React from 'react';

import PageLayout from '../composed-components/page-layout';
import Main from '../components/main';

export default function Home() {
  return (
    <div className="h-full">
      <PageLayout>
        <Main />
      </PageLayout>
    </div>
  );
}
