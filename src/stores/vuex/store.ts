import { createStore } from "vuex";
import { actions } from "./actions";
import { getters } from "./getter";
import { mutations } from "./mutations";
import { state } from "./state";

export const store = createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
});
