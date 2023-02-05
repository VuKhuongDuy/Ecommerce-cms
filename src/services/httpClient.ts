import axios from "axios";
const token = localStorage.getItem("token");

export const httpClient = axios.create({
  baseURL: "http://localhost:3005/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
