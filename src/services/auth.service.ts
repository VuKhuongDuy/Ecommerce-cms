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

  async register(user: any) {
    const response = await httpClient.post("/auth/register", user);
    console.log(response);
  },
  
});
