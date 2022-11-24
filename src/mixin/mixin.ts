import { useStore } from "vuex";
import router from "@/router/index";
const store = useStore();

export const isAuthen = () => {
  if (!store.state.user) {
    router.push("/");
  }
};
