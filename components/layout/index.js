import React from 'react';
import PropTypes from 'prop-types';

export default function Layout(props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {props.children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
