import React from 'react';
import PropTypes from 'prop-types';
import "./Title.css"

export const Title = ({ title }) => {
  return (
    <div className="lend-root-div">
      <p className="lend-form-title">
        {title}
      </p>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};