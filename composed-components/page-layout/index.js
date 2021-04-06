import React from 'react'
import Header from '../../components/header'
import Layout from '../../components/layout'
import PropTypes from 'prop-types'

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
