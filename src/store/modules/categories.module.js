import { pagination } from "./pagination.module";
import { search } from "./search.module";
import CategoriesService from "../../services/categories/categories.service";
import routes from "@/router";
import Category from "../../models/category";

export const categories = {
  namespaced: true,
  state: {
    allCategories: [],
    selectedCategory: {
      errors: {},
    },
    order: {},
    loading: true,
    ...pagination.state,
    ...search.state,
  },
  actions: {
    ...pagination.actions,
    ...search.actions,
    get({ commit, dispatch }, payload) {
      commit("SET_LOADING", true);
      return CategoriesService.show(payload).then(({ success, response }) => {
        if (success) {
          commit("SET_CATEGORY", response);
          commit("SET_LOADING", false);
        } else {
          dispatch("alerts/add_error", response.message, { root: true });
          commit("FAIL_CATEGORY");
          routes.back();
        }
      });
    },
    list({ commit, dispatch, state }, params) {
      commit("SET_LOADING", true);
      params = {
        per_page: state.paginator.perPage,
        page: state.paginator.page,
        order: state.order,
        search: state?.searcher?.search,
      };
      return CategoriesService.index(params).then(
        ({ success, response, paginator }) => {
          if (success) {
            console.log(response);
            commit("SET_CATEGORIES", response);
            commit("SET_ALL_PAGINATION", paginator);
            commit("SET_LOADING", false);
          } else {
            dispatch("alerts/add_error", response.message, { root: true });
            commit("FAIL_CATEGORY");
            routes.back();
          }
        }
      );
    },
    set({ commit, dispatch }, payload) {
      commit("SET_LOADING", true);
      const params = {
        name: payload.name,
      };
      // eslint-disable-next-line no-unused-vars
      return CategoriesService.create(params).then(({ success, response }) => {
        if (success) {
          dispatch("alerts/add_success", "Category created successfully", {
            root: true,
          });
          commit("SET_LOADING", false);
          routes.back();
        } else {
          commit("SET_LOADING", false);
          dispatch("alerts/add_error", response.message, { root: true });
          commit("SET_ERRORS", response);
        }
      });
    },
    update({ commit, dispatch }, payload) {
      commit("SET_LOADING", true);
      // eslint-disable-next-line no-unused-vars
      return CategoriesService.update(payload).then(({ success, errors }) => {
        if (success) {
          dispatch("alerts/add_success", "Category updated successfully", {
            root: true,
          });
          commit("SET_LOADING", false);
          routes.back();
        } else {
          commit("SET_LOADING", false);
          dispatch("alerts/add_error", errors.message, { root: true });
          commit("SET_ERRORS", errors);
        }
      });
    },
    destroy({ commit, dispatch }, payload) {
      commit("SET_LOADING", true);
      return CategoriesService.delete(payload).then(({ success, errors }) => {
        if (success) {
          dispatch("alerts/add_success", "Category deleted successfully", {
            root: true,
          });
          commit("SET_LOADING", false);
          routes.back();
        } else {
          commit("SET_LOADING", false);
          dispatch("alerts/add_error", errors.message, { root: true });
        }
      });
    },

    reset({ commit }) {
      commit("RESET_RESOURCE");
    },

    getAllCategories({ commit, dispatch }) {
      commit("SET_LOADING", true);
      return CategoriesService.listAll().then(({ success, response }) => {
        if (success) {
          commit("SET_CATEGORIES", response);
          commit("SET_LOADING", false);
        } else {
          commit("SET_LOADING", false);
          dispatch("alerts/add_error", response.message, { root: true });
        }
      });
    },
  },
  mutations: {
    ...pagination.mutations,
    ...search.mutations,
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_CATEGORY(state, category) {
      state.selectedCategory = new Category(
        category.data.id,
        category.data.name
      );
    },
    RESET_RESOURCE: (state) => {
      state.selectedCategory = {
        errors: {},
      };
    },
    SET_CATEGORIES(state, response) {
      let temp = [];
      temp = response.map((res) => {
        return new Category(res.id, res.name);
      });
      console.log(temp);
      state.allCategories = temp;
    },
    FAIL_CATEGORY(state) {
      state.selectedCategory = null;
    },
    SET_ERRORS(state, response) {
      state.selectedCategory.errors = response;
    },
  },
  getters: {
    ...pagination.getters,
    ...search.getters,
    categories: (state) => state.allCategories,
    category: (state) => state.selectedCategory,
    isLoading: (state) => state.loading,
  },
};
