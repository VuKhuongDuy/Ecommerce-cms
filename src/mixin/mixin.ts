import { useStore } from "vuex";
import router from "@/router/index";
import {
  GenderUser,
  GenderUserString,
  RoleUser,
  RoleUserString,
} from "@/enums/user.enum";
const store = useStore();

export const isAuthen = () => {
  if (!store.state.user) {
    router.push("/");
  }
};

export const getRoleString = (role: number) => {
  switch (role) {
    case RoleUser.ADMIN:
      return RoleUserString.ADMIN;
    case RoleUser.NORMAL:
      return RoleUserString.NORMAL;
  }
};

export const getGenderString = (gender: number) => {
  switch (gender) {
    case GenderUser.MALE:
      return GenderUserString.MALE;
    case GenderUser.FEMALE:
      return GenderUserString.FEMALE;
    case GenderUser.OTHER:
      return GenderUserString.OTHER;
  }
};

export const getBirthdayFormat = (date: string) => {
  const rDate = new Date(date);
  const day = rDate.getDate();
  const month = rDate.getMonth() + 1;
  const year = rDate.getFullYear();

  return `${year}/${month}/${day}`;
};

export const delayTime = (time?: number) => {
  if (!time) time = 1;
  return new Promise((resolve) => setTimeout(resolve, time * 1000));
};
