import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import LocationIcon from "../../assets/images/location-icon-100.png";

const LocationDetails = ({ details = {} }) => {
  const [loc, setLoc] = useState("");
  const [loginTime, setLoginTime] = useState("");

  useEffect(() => {
    setLoc(Cookies.get("location"));
    setLoginTime(Cookies.get("loginTime"));
  }, []);

  return (
    <div className="location-details flex flex-v-center">
      <div className="m-r-5 right-text" style={{ paddingTop: "3px" }}>
        <p className="location" id="locationid">
          {loc || "Unknown location "}
        </p>
        <p className="login-time" id="logintimeid">
          {"Time of login:" + loginTime || "Time of login: unknown"}
        </p>
      </div>
      <div className="flex">
        <img src={LocationIcon} alt="user avater" />
      </div>
    </div>
  );
};

export default LocationDetails;
