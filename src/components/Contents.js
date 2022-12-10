import React from 'react';
import PropTypes from 'prop-types';

function Contents({ children }) {
  return (
    <div className="contents">
      {children}
    </div>
  );
}

Contents.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
};

export default Contents;
