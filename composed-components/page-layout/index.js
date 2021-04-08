import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { ROUTE_NAME } from '../../utils/consts';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Footer from '../../components/footer';

export default function PageLayout(props) {
  const router = useRouter();
  let activeTab = ROUTE_NAME.HOME;

  console.log(router.pathname);

  switch (router.pathname.toLowerCase().slice(1)) {
    case ROUTE_NAME.CRYPTOPUNKS.toLowerCase():
      activeTab = ROUTE_NAME.CRYPTOPUNKS;
      break;
    case ROUTE_NAME.FAQ.toLowerCase():
      activeTab = ROUTE_NAME.FAQ;
      break;
    default:
      break;
  }

  return (
    <>
      <Header activeTab={activeTab} />
      <Layout>{props.children}</Layout>
      <Footer />
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};
