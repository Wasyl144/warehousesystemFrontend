import UsersService from "@/services/users/users.service";
import User from "@/models/user";
import routes from "@/router";
import { pagination } from "./pagination.module";
import { search } from "./search.module";
import Additionalinfo from "../../models/additionalinfo";
import Roles from "../../models/roles";

// TODO: Refactor wszystkiego, wszedzie trzeba używać tych samych nazw metod
// pattern:
// list - index
// get - show
// create - store
// update - update
// delete - delete

export const users = {
  namespaced: true,
  state: {
    selectedUser: {
      errors: {},
    },
    order: {},
    users: [],
    loading: true,
    ...pagination.state,
    ...search.state,
  },
  actions: {
    ...pagination.actions,
    ...search.actions,
    get({ commit, dispatch }, payload) {
      commit("setLoading", true);
      return UsersService.getUserData(payload).then(
        ({ success, response, errors }) => {
          if (success) {
            commit("getUserSuccessfully", response);
            commit("setLoading", false);
          } else {
            dispatch("alerts/add_error", errors.message, { root: true });
            commit("getUserFailed", errors);
            routes.back();
          }
        }
      );
    },
    list({ commit, dispatch, state }, params) {
      commit("setLoading", true);
      params = {
        per_page: state.paginator.perPage,
        page: state.paginator.page,
        order: state.order,
        search: state?.searcher?.search,
      };
      return UsersService.getUsers(params).then(
        ({ success, items, paginator, errors }) => {
          if (success) {
            commit("getUsersSuccessfully", items);
            commit("SET_ALL_PAGINATION", paginator);
            commit("setLoading", false);
          } else {
            dispatch("alerts/add_error", errors.message, { root: true });
            commit("getUsersFailed");
            routes.back();
          }
        }
      );
    },

    // eslint-disable-next-line no-unused-vars
    update({ commit, dispatch }, payload) {
      commit("setLoading", true);
      // eslint-disable-next-line no-unused-vars
      return UsersService.updateUser(payload).then(({ success, errors }) => {
        if (success) {
          dispatch("alerts/add_success", "User updated successfully", {
            root: true,
          });
          commit("setLoading", false);
          routes.back();
        } else {
          commit("setLoading", false);
          dispatch("alerts/add_error", errors.message, { root: true });
          commit("serErrors", errors);
        }
      });
    },
    create({ commit, dispatch }, payload) {
      commit("setLoading", true);
      // eslint-disable-next-line no-unused-vars
      return UsersService.create(payload).then(({ success, errors }) => {
        if (success) {
          dispatch("alerts/add_success", "User created successfully", {
            root: true,
          });
          commit("setLoading", false);
          routes.back();
        } else {
          commit("setLoading", false);
          dispatch("alerts/add_error", errors.message, { root: true });
          commit("serErrors", errors);
        }
      });
    },
    reset({ commit }) {
      commit("RESET_RESOURCE");
    },
    destroy({ dispatch }, payload) {
      return UsersService.destroy(payload).then(({ success, errors }) => {
        if (success) {
          dispatch("alerts/add_success", "User deleted successfully", {
            root: true,
          });
          routes.push("/users");
        } else {
          dispatch("alerts/add_error", errors.message, { root: true });
        }
      });
    },
  },
  mutations: {
    ...pagination.mutations,
    ...search.mutations,
    getUserSuccessfully(state, response) {
      console.log("hello");
      let additionalInfo = new Additionalinfo(
        response.more_info?.phone_number,
        response.more_info?.address,
        response.more_info?.about_me
      );
      let roles = response.roles?.map((role) => {
        return new Roles(role?.id, role?.name);
      });
      state.selectedUser = new User(
        response.id,
        response.name,
        response.surname,
        response.email,
        additionalInfo,
        roles
      );
      state.selectedUser.errors = {};
    },
    getUserFailed(state, response) {
      state.selectedUser = null;
      state.selectedUser.errors = response;
    },
    RESET_RESOURCE: (state) => {
      state.user = {
        errors: {},
      };
    },
    getUsersSuccessfully(state, response) {
      let temp = [];
      temp = response.map((res) => {
        let additionalInfo = new Additionalinfo(
          res.more_info?.phone_number,
          res.more_info?.address,
          res.more_info?.about_me
        );
        let roles = response.roles?.map((role) => {
          return new Roles(role?.id, role?.name);
        });
        return new User(
          res.id,
          res.name,
          res.surname,
          res.email,
          additionalInfo,
          roles
        );
      });
      state.users = temp;
    },
    getUsersFailed(state) {
      state.users = [];
    },
    serErrors(state, response) {
      let obj = response.errors;
      const transformObj = (obj) => {
        return Object.keys(obj).reduce((acc, key) => {
          if (key.indexOf(".") >= 0) {
            const [parentKey, childKey] = key.split(".");
            acc[parentKey] = acc[parentKey] || {};
            acc[parentKey][childKey] = obj[key];
          } else {
            acc[key] = obj[key];
          }
          return acc;
        }, {});
      };
      state.selectedUser.errors = transformObj(obj);
    },
    setLoading(state, status) {
      state.loading = status;
    },
  },
  getters: {
    ...pagination.getters,
    ...search.getters,
    selectedUser: (state) => state.selectedUser,
    users: (state) => state.users,
    isLoading: (state) => state.loading,
  },
};
