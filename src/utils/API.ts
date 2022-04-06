import axios from "axios";

const HOST = "localhost";
const PORT = "8080";

const API = axios.create({
  baseURL: `http://${HOST}:${PORT}/`,
  responseType: "json",
  withCredentials: true,
  headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
});

export default API;
