import { User01 } from "@/enums/mockdata";
import { RoleUser } from "@/enums/user.enum";
import axios from "axios";
import { httpClient } from "./httpClient";

export const AuthService = () => ({
  async login(user: any) {
    const response = await httpClient.post("/auth/login", {
      email: user.email,
      password: user.password,
    });
    console.log(response);
    localStorage.setItem("token", response.data.data.token);
  },

  logout() {
    localStorage.removeItem("user");
  },

  register(user: any) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  },
});
