import axios from "axios";
import { createBrowserHistory } from 'history';

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../config/storage_key";
import { ENDPOINT } from "../../config/end_point";
import store from '../../store';
import { requestLogout } from "../../app_state/login";

export const history = createBrowserHistory();

const request = axios.create({
  baseURL: ENDPOINT.BASE,
  timeout: 25000,
});

// Add a request interceptor
request.interceptors.request.use(
  async (config) => {
    console.log("request interceptor ==== ", config);
    const access_token = await localStorage.getItem(ACCESS_TOKEN);
    if (access_token)
      config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    // console.log("err_response_interceptor_account", error);
    const originalRequest = error.response.config;
    // refresh token expired
    if (
      error.response.status === 401 &&
      originalRequest.url === `refresh_token`
    ) {
      store.dispatch(requestLogout())
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await localStorage.getItem(REFRESH_TOKEN);
      return (
        axios({
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          url: ENDPOINT.REFRESH_TOKEN,
          // url: `http://${host}:5001/refresh_token`,
          data: {
            refresh_token: refreshToken,
          },
        }).then(async (res) => {
          //   console.log("create new access token", res);
          if (res.status === 200) {
            await localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
            request.defaults.headers.common["Authorization"] = `Bearer ${
              res.data.access_token
              }`;
            return request(originalRequest);
          }
        })
      );
    }
    // 402 => log out
    // history.push({
    //   pathname: "/signin",
    //   state: { token_broken: true },
    // });
    // localStorage.clear();
    return Promise.reject(error);
  }
);

const apiClient = {
  get: (url, data = {}) => {
    // console.log('url get: ', url, data);
    return request({
      method: "get",
      url,
      params: data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  post: (url, data) => {
    // console.log('post ', { url }, { data });
    return request({
      method: "post",
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  delete: (url, data, headers = {}) =>
    request({
      method: "delete",
      url,
      data,
      headers,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
  put: (url, data) =>
    request({
      method: "put",
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
  patch: (url, data) =>
    request({
      method: "patch",
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
};

export { apiClient };
