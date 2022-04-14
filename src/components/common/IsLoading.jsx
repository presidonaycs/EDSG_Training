/* eslint-disable react/destructuring-assignment */
import React from 'react';

import EdsgLogo from '../../assets/images/edsg-logo-250.png';

const IsLoading = (props) => (
  <div className="loading-overlay">
    <div className="loading-inner-box">
      <img src={EdsgLogo} alt="Edo State Logo" />
      {props.message ? `${props.message}` : 'Loading...'}
    </div>
  </div>
);

export default IsLoading;
