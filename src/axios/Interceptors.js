import axios from "axios";

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

export const BASE_URL = "https://orca-app-4n9ni.ondigitalocean.app";
// export const BASE_URL = "http://127.0.0.1:8000";
export const REDIRECT_URL = "https://mavenfinance.com";
// export const REDIRECT_URL = "http://localhost:3000";

const authFetch = axios.create({
  baseURL: BASE_URL,
  // timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

authFetch.interceptors.request.use(
  (request) => {
    request.headers.common["Accept"] = "application/json";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authFetch;
