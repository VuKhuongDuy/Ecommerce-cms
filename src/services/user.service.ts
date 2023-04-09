import { ListUser, User01 } from "@/enums/mockdata";
import axios from "axios";
import { authHeader } from "./auth-header";
import { httpClient } from "./httpClient";
import { env } from '../utils/config';

export const UserService = () => ({
  getPublicContent: () => {
    return axios.get(env.apiUrl + "all");
  },

  getUserBoard: () => {
    return axios.get(env.apiUrl + "user", { headers: authHeader() });
  },

  getModeratorBoard: () => {
    return axios.get(env.apiUrl + "mod", { headers: authHeader() });
  },

  getAdminBoard: () => {
    return axios.get(env.apiUrl + "admin", { headers: authHeader() });
  },
  async createOne(data: any) {
    return await httpClient.post("/auth/register", data);
  },
  getAll() {
    return ListUser;
  },
  getOne(id: number) {
    return User01;
  },
  updateOne(data: any) {
    return User01;
  },
  deleteOne(id: number) {
    return true;
  },
});
