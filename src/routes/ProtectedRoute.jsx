/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
// import { location } from "../utility/Location";

const ProtectedRoute = ({ component: PureComponent, ...rest }) => {
  const il = Cookies.get("tokenExist") === "true" ? { il: true } : { il: false };

  return (
    <Route
      {...rest}
      render={(props) =>
        il && il.il ? (
          <PureComponent {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
