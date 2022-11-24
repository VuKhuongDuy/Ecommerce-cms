import { User } from "@/enums/mockdata";
import { RoleUser } from "@/enums/user.enum";
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export const AuthService = () => ({
  login(user: any) {
    localStorage.setItem("user", JSON.stringify(User));
    return {
      user: User,
      token: "token",
    };
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
