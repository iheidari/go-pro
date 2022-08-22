import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: "json",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

export default instance;
