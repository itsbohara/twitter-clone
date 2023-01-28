import axios, { AxiosError } from "axios";

// ----------------------------------------------------------------------

export const SERVER = "https://twitter-clone-api.itsbohara.com";
// export const SERVER = process.env.API_SERVER;
// export const SERVER = process.env.DEV_API_SERVER;
// const SERVER =
//   process.env.NODE_ENV === "development" ? "" : process.env.API_SERVER;
const http = axios.create({
  baseURL: `${SERVER}/api`,
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errRes: any = error.response && error.response?.data;

    return Promise.reject(
      errRes?.["message"] || errRes?.error?.message || "Server Failure!"
    );
  }
);

export default http;
