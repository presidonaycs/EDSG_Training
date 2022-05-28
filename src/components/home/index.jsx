/* eslint-disable max-len */
import React, { Component } from "react";
import Cookies from "js-cookie";
// import { location } from "../../utility/Location";
import querySearch from "stringquery";
import moment from "moment";

// Api Methods
import { NewLogin } from "../../utility/fetch";
import { URLAPI } from "../../utility/ApiMethods";
import LoadingSpinner from "../../resources/loadingSpinner";
import notification from "../../utility/notification";

class Home extends Component {
  componentDidMount() {
    let qs = querySearch(this.props.location.search);
    localStorage.setItem("helpLink", qs?.help);
    localStorage.setItem("api", qs?.base);
    setTimeout(() => {
      // location();
      Cookies.set("loginTime", moment().format("HH:mm a"));
      this.handleSignin();
    }, 2000);
  }

  getToken = async (res) => {
    const { history } = this.props;
    console.log("token", res);

    if (res) {
      if (res.code === 1) {
        Cookies.set("token", res.token, { expires: 0.0416665 });
        Cookies.set("tokenExist", true, { expires: 0.0416665 });
        Cookies.set("fullname", `${res.data.firstName} ${res.data.lastName}`, {
          expires: 0.0416665,
        });
        Cookies.set("role", res.data.role, { expires: 0.0416665 });
        Cookies.set("homeLink", res.data.homeLink, { expires: 0.0416665 });
        Cookies.set("userId", res.data.userID, { expires: 0.0416665 });
        Cookies.set("mdaAddress", res.data.mdaAddress, { expires: 0.0416665 });
        Cookies.set("mdaName", res.data.mdaName, { expires: 0.0416665 });

        setTimeout(() => {
          history.push("/training-manager");
          notification({
            title: "",
            message: "Welcome to Training Management",
            type: "success",
          });
        }, 2000);
      } else {
        Cookies.set("token", null);
        Cookies.set("tokenExist", false);
        Cookies.set("fullname", null);
        Cookies.set("role", null);
        notification({
          title: "Error!",
          message: res.message,
          type: "danger",
        });
      }
    } else {
      notification({
        title: "Network Error",
        message: "Something has gone wrong. Please, try again.",
        type: "danger",
      });
    }
  };

  handleSignin = () => {
    let queryString = querySearch(this.props.location.search);

    const urltoken = queryString.emp;
    console.log("Logging QueryId", urltoken);

    NewLogin(URLAPI.Auth.Post, { urltoken }, this.getToken);
  };

  render() {
    return (
      <div
        className="w-100 flex flex-v-center flex-h-center"
        style={{ minHeight: "100vh" }}
      >
        <LoadingSpinner />
      </div>
    );
  }
}

export default Home;
