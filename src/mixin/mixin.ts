import { useStore } from "vuex";
import router from "@/router/index";
import { Toast } from "bootstrap";
import {
  GenderUser,
  GenderUserString,
  RoleUser,
  RoleUserString,
} from "@/enums/user.enum";
import moment from "moment";
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

export const formatFullDatetime = (time: Date) => {
  return moment(time).format("YYYY/MM/DD h:mm:ss");
};

export function previewImage(event?: any) {
  const input = event.target;
  if (input.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.preview = e.target.result;
    };
    this.image = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
}

export function previewMultiImage(event?: any) {
  const input = event.target;
  let count = input.files.length;
  let index = 0;
  if (input.files) {
    while (count--) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.preview_list.push(e.target.result);
      };
      this.image_list.push(input.files[index]);
      reader.readAsDataURL(input.files[index]);
      index++;
    }
  }
}

export function closeSearchResult() {
  this.$store.commit("setShowSearchResult", false);
}

export function toastSuccess(message: string) {
  this.success_message = message;
  const toast = new Toast(document.getElementById("toast-success"));
  toast.show();
}

export function toastError(message: string) {
  this.error_message = message;
  const toast = new Toast(document.getElementById("toast-error"));
  toast.show();
}

export function checkRowEdit(index: number) {
  console.log("here");
  this.listEditted[index] = true;
}

export function getClassEditted(index: number) {
  return this.listEditted[index] ? ["row-editted"] : [];
}

export function formatCurrenct(amount){
  return 
}