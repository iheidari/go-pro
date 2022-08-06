import axios from "axios";

const instance = axios.create({
  // baseURL: apiBaseUrl,
  responseType: "json",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default instance;
