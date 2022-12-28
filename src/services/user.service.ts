import { ListUser, User01 } from "@/enums/mockdata";
import axios from "axios";
import { authHeader } from "./auth-header";
import { httpClient } from "./httpClient";

const API_URL = "http://localhost:8080/api/v1/";

export const UserService = () => ({
  getPublicContent: () => {
    return axios.get(API_URL + "all");
  },

  getUserBoard: () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
  },

  getModeratorBoard: () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  },

  getAdminBoard: () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
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
