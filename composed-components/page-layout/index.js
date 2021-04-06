import React from 'react'
import PropTypes from 'prop-types'

import Header from '../../components/header'
import Layout from '../../components/layout'

export default function PageLayout (props) {
  return (
    <>
      <Header />
      <Layout>
        {props.children}
      </Layout>
    </>
  )
};

PageLayout.propTypes = {
  children: PropTypes.node
}
