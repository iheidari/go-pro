import axios from "axios";

//disable the cache
axios.defaults.headers.options = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: "json",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default instance;
