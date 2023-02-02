import axios, { AxiosError } from "axios";

// ----------------------------------------------------------------------
export const SERVER =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_SERVER
    : process.env.NEXT_PUBLIC_API_SERVER;

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
