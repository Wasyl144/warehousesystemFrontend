import AuthService from "../../services/auth/auth.service";
import routes from "@/router";

const user = localStorage.getItem("token");
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit, dispatch }, user) {
      dispatch("profile/getPermissions");
      return AuthService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          routes.push({ name: "dashboard" });
          return Promise.resolve(user);
        },
        (error) => {
          commit("loginFail", user);
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      return AuthService.logout().then(() => {
        commit("logout");
        routes.push({ name: "login" });
        localStorage.removeItem("permissions");
      });
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.status.user = user;
    },
    loginFail(state) {
      state.status.loggedIn = false;
      state.status.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
  },
};
