import axios from "axios";

const HOST = "localhost";
const PORT = "8080";

export const baseURL = `http://${HOST}:${PORT}/`;
export const wsURL = `ws://${HOST}:${"8080"}/ws/`;

const API = axios.create({
  baseURL,
  responseType: "json",
  withCredentials: true,
  headers: { "Access-Control-Allow-Origin": "http://localhost:8080" },
});

export default API;
