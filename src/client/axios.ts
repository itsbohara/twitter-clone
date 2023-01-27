import axios, { AxiosError } from "axios";

// ----------------------------------------------------------------------
const SERVER =
  process.env.NODE_ENV === "development" ? "" : process.env.API_SERVER;
const http = axios.create({
  // baseURL: `${SERVER}/api`,
  baseURL: `https://twitter-clone-api.itsbohara.com/api`,
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errRes: any = error.response && error.response?.data;

    return Promise.reject(
      errRes?.["message"] ||
        errRes?.error?.message ||
        "Server Failure!" ||
        "Something went wrong"
    );
  }
);

export default http;
