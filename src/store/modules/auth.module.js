import AuthService from "../../services/auth/auth.service";
import routes from "@/router";
import axios from "axios";


export const auth = {
    namespaced: true,
    state: {
        status: {
          loggedIn: localStorage.getItem("token") !== null,
        },
        loading: false,
        errors : {

        }
    },
    actions: {
        logoutErase({commit}) {
            commit("logout");
            routes.push({name: "login"});
            localStorage.removeItem("permissions");
            localStorage.removeItem("token");
        },
        login({commit, dispatch}, user) {
            commit("SET_LOADING", true);
            return AuthService.login(user).then(
                ({ success, response, errors }) => {
                    if (success) {
                        commit("loginSuccess", response);
                        commit("SET_LOADING", false);
                        dispatch("alerts/add_success", response.msg, { root: true });
                    } else {
                        dispatch("alerts/add_error", errors.message, { root: true });
                        commit("SET_LOADING", false);
                        commit("loginFail", errors);
                    }
                }
            );
        },
        logout({commit}) {
            return AuthService.logout().then(() => {
                commit("logout");
                routes.push({name: "login"});
                localStorage.removeItem("permissions");
                localStorage.removeItem("token");
            });
        },
    },
    mutations: {
        SET_LOADING(state, status) {
            state.loading = status;
        },
        loginSuccess(state, response) {
            localStorage.setItem('token', response.token)
            axios.defaults.headers["Authorization"] =
                "Bearer " + localStorage.getItem("token");
            state.status.loggedIn = true;
            routes.push({name: "dashboard"});
        },
        loginFail(state, errors) {
            state.status.loggedIn = false;
            state.errors = errors.errors;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.errors = {};
        },
    },
    getters: {
        isLoading: (state) => state.loading,
        loggedIn: (state) => state.loggedIn,
        errors: (state) => state.errors,
    }
};
