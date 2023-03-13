import axios from "axios";
import { env } from '../utils/config';
const token = localStorage.getItem("token");

export const httpClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
