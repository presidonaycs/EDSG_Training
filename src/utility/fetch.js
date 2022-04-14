/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import Cookies from "js-cookie";

// const URL = "http://18.225.15.178/leave";
// password = DuVZKH%_:qyr=+q1
const URL = `${localStorage.getItem("api")}/training`;

export let Access_token = Cookies.get("token");

console.log("logging Token in the fetch file", Access_token);

export const NewLogin = async (method, data, callbackfunction) => {
  const { urltoken } = data;
  const response = axios.post(`${URL}${method}/${urltoken}`, {
  // const response = axios.post(`${URL}/api/Auth/signin?id=3`, {
    headers: {
      "Access-Control-Allow-Credentials": true,
      crossorigin: true,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Origin": "*",
    },
  });
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((error) => {
      callbackfunction(error);
    });
};

export const GetwithQueryString = async (method, data, callbackfunction) => {
  const { name, value } = data;

  const response = axios.get(`${URL}${method}?${name}=${value}`, {
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Access-Control-Allow-Credentials": true,
      crossorigin: true,
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Origin": "*",
    },
  });

  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((error) => {
      callbackfunction(error);
    });
};

export const PostWithNoToken = async (data, method, callbackfunction) => {
  const response = axios.post(URL + method, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
      crossorigin: true,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Origin": "*",
    },
  });
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((err) => {
      callbackfunction(err);
    });
};

export const GetWithoutToken = async (data, method, callbackfunction) => {
  const response = axios.get(URL + method, data);
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((err) => {
      callbackfunction(err);
    });
};

export const GetWithData = async (method, data, callbackfunction) => {
  const response = axios.get(URL + method, data, {
    headers: {
      Authorization: `Bearer ${Access_token}`,
    },
  });
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((err) => {
      callbackfunction(err);
    });
};

export const GetWithoutData = async (method, callbackfunction) => {
  const response = axios.get(URL + method, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      withCredentials: true,
      "Access-Control-Allow-Credentials": true,
      crossorigin: true,
      "Access-Control-Allow-Methods": "GET",
      "content-type": "application/json",
    },
  });
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((err) => {
      callbackfunction(err);
    });
};

export const Post = async (data, method, callbackfunction) => {
  Access_token = Cookies.get("token");
  const response = axios.post(URL + method, data, {
    headers: {
      Authorization: `Bearer ${Access_token}`,
      "Access-Control-Allow-Credentials": true,
      crossorigin: true,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Origin": "*",
    },
  });
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((error) => {
      callbackfunction(error);
    });
};

export const FileUpload = async (data, callbackfunction) => {
  Access_token = Cookies.get("token");
  const response = axios.post(
    `${localStorage.getItem("api")}/services/api/documents/leave`,
    data,
    {
      headers: {
        // Authorization: `Bearer ${Access_token}`,
        // "content-type": "multipart/form-data",
        "content-type": undefined,
      },
    }
  );
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((error) => {
      callbackfunction(error);
    });
};

export const PostWithoutData = async (method, callbackfunction) => {
  const response = axios.post(URL + method);
  console.log("Logging response", response);
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((error) => {
      callbackfunction(error);
    });
};

export const Get = async (method, callbackfunction) => {
  Access_token = Cookies.get("token");
  const response = axios.get(`${URL}${method}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${Access_token}`,
      withCredentials: true,
      "Access-Control-Allow-Credentials": true,
      crossorigin: true,
      "Access-Control-Allow-Methods": "GET",
      "content-type": "application/json",
    },
  });
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((error) => {
      callbackfunction(error);
    });
};

export const Put = async (data, method, callbackfunction) => {
  Access_token = Cookies.get("token");
  const response = axios.put(`${URL}${method}`, data, {
    headers: { Authorization: `Bearer ${Access_token}` },
  });
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((error) => {
      callbackfunction(error);
    });
};

export const Delete = async (method, callbackfunction) => {
  Access_token = Cookies.get("token");
  const response = axios.delete(URL + method, {
    headers: { Authorization: `Bearer ${Access_token}` },
  });
  await response
    .then((response) => {
      let result = response.data;
      callbackfunction(result);
    })
    .catch((error) => {
      callbackfunction(error);
    });
};

export default {
  Post,
  Get,
  Put,
  Delete,
  URL,
  PostWithoutData,
  PostWithNoToken,
  Access_token,
  GetWithoutToken,
  GetwithQueryString,
  GetWithData,
  FileUpload,
};
