import React from 'react';
import Cookies from "js-cookie";

const Greeting = ({ details = {} }) => {
  return (
    <div className="greeting">
      <p className="m-b-5">Good Day</p>
      <h3 className="m-b-5">{Cookies.get("fullname") || 'N/A'}</h3>
      <p className="" style={{ fontSize: '0.75rem' }}>
        {Cookies.get("role") || 'N/A'}
        ,
      </p>
    </div>
  );
};

export default Greeting;
