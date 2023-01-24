import axios, { AxiosError } from "axios";

// ----------------------------------------------------------------------
const SERVER =
  process.env.NODE_ENV === "development" ? "" : process.env.API_SERVER;
const http = axios.create({
  baseURL: `${SERVER}/api`,
});

console.log(process.env.NODE_ENV);

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errRes = error.response && error.response?.data;
    return Promise.reject(
      errRes?.["message"] ||
        errRes?.["errors"][0]["message"] ||
        "Server Failure!" ||
        "Something went wrong"
    );
  }
);

export default http;
