import axios from "axios";
import Cookies from "js-cookie";

import { logout } from "../utility/auth";

import paths from "./endpoints";

const fetchBackend = async (
  endpoint,
  method,
  auth,
  body,
  pQuery,
  param,
  multipart
) => {
  const URL = `${localStorage.getItem("api")}/training`;
  const headers = {
    // "Content-Type": multipart ? "multipart/form-data" : "application/json",
  };
  const path = paths[endpoint] || endpoint;
  let url = `${URL}${path}`;

  if (param) {
    url += `/${param}`;
  }

  if (pQuery) {
    const paramsArray = Object.keys(pQuery).map(
      (key) =>
        pQuery[key] &&
        `${encodeURIComponent(key)}=${encodeURIComponent(pQuery[key])}`
    );

    url += `?${paramsArray.join("&")}`;
  }

  if (auth) {
    const accessToken = Cookies.get("token");

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  const options = {
    url,
    method,
    headers,
  };

  if (body) {
    options.data = body;
  }

  console.log(options);
  return axios(options).then(
    (res) => res,
    async (err) => {
      if (err && err.response && err.response.status === 401) {
        // log the user out and return
        await logout();
      }
      return err.response;
    }
  );
};

/**
 *
 * @param {string} endpoint
 * @param {object} pQuery
 * @param {string} param
 * @param {boolean} auth
 */
export const get = ({ endpoint, pQuery = null, param = null, auth = true }) =>
  fetchBackend(endpoint, "GET", auth, null, pQuery, param);

/**
 *
 * @param {string} endpoint
 * @param {object} body
 * @param {boolean} auth
 * @param {boolean} multipart
 */
export const post = ({ endpoint, body, auth = true, multipart }) =>
  fetchBackend(endpoint, "POST", auth, body, null, null, multipart);

/**
 *
 * @param {string} endpoint
 * @param {object} body
 * @param {string} param
 * @param {string} pQuery
 * @param {boolean} auth
 * @param {boolean} multipart
 */
export const patch = ({
  endpoint,
  body,
  param,
  pQuery,
  auth = true,
  multipart,
}) => fetchBackend(endpoint, "PATCH", auth, body, pQuery, param, multipart);

/**
 *
 * @param {string} endpoint
 * @param {object} body
 * @param {string} param
 * @param {string} pQuery
 * @param {boolean} auth
 * @param {boolean} multipart
 */
export const put = ({
  endpoint,
  body,
  param,
  pQuery,
  auth = true,
  multipart,
}) => fetchBackend(endpoint, "PUT", auth, body, pQuery, param, multipart);

/**
 *
 * @param {string} endpoint
 * @param {string} param
 * @param {boolean} auth
 */
export const del = ({ endpoint, param, auth = true }) =>
  fetchBackend(endpoint, "DELETE", auth, null, null, param);
