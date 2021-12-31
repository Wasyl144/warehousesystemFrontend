import ItemsService from "@/services/items/items.service";
import Item from "@/models/item";
import routes from "@/router";
import { pagination } from "./pagination.module";
import { search } from "./search.module";
import Category from "../../models/category";

// TODO: Refactor wszystkiego, wszedzie trzeba używać tych samych nazw metod
// pattern:
// list - index
// get - show
// create - store
// update - update
// delete - delete

export const items = {
  namespaced: true,
  state: {
    selectedItem: {
      errors: {},
    },
    qr: "",
    order: {},
    items: [],
    loading: true,
    ...pagination.state,
    ...search.state,
  },
  actions: {
    ...pagination.actions,
    ...search.actions,
    get({ commit, dispatch }, payload) {
      commit("setLoading", true);
      return ItemsService.getItemData(payload).then(
        ({ success, response, errors }) => {
          if (success) {
            commit("getItemSuccessfully", response);
            commit("setLoading", false);
          } else {
            dispatch("alerts/add_error", errors.message, { root: true });
            commit("getItemFailed", errors);
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
      return ItemsService.getItems(params).then(
        ({ success, items, paginator, errors }) => {
          if (success) {
            commit("getItemsSuccessfully", items);
            commit("SET_ALL_PAGINATION", paginator);
            commit("setLoading", false);
          } else {
            dispatch("alerts/add_error", errors.message, { root: true });
            commit("getItemsFailed");
            routes.back();
          }
        }
      );
    },

    // eslint-disable-next-line no-unused-vars
    update({ commit, dispatch }, payload) {
      commit("setLoading", true);
      // eslint-disable-next-line no-unused-vars
      return ItemsService.updateItem(payload).then(({ success, errors }) => {
        if (success) {
          dispatch("alerts/add_success", "Item updated successfully", {
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
      return ItemsService.create(payload).then(({ success, errors }) => {
        if (success) {
          dispatch("alerts/add_success", "Item created successfully", {
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
      return ItemsService.destroy(payload).then(({ success, errors }) => {
        if (success) {
          dispatch("alerts/add_success", "Item deleted successfully", {
            root: true,
          });
          routes.push("/Items");
        } else {
          dispatch("alerts/add_error", errors.message, { root: true });
        }
      });
    },
    getQr({ commit, dispatch }, payload) {
      commit("setLoading", true);
      return ItemsService.getQr(payload).then(({ success, qr, errors }) => {
        if (success) {
          console.log(qr);
          commit("getQrSuccessfully", qr);
          commit("setLoading", false);
        } else {
          dispatch("alerts/add_error", errors.message, { root: true });
          commit("getQrFailed");
          commit("setLoading", false);
        }
      });
    },

    downloadQr({ commit, dispatch }, payload) {
      commit("setLoading", true);
      return ItemsService.getQrDownload(payload).then(
        ({ success, qr, errors }) => {
          if (success) {
            commit("getQrDownloadSuccessfully", qr);
            commit("setLoading", false);
          } else {
            dispatch("alerts/add_error", errors.message, { root: true });
            commit("getQrFailed");
            commit("setLoading", false);
          }
        }
      );
    },
  },
  mutations: {
    ...pagination.mutations,
    ...search.mutations,
    getItemSuccessfully(state, response) {
      console.log("hello");
      let category = new Category(response.category.id, response.category.name);
      state.selectedItem = new Item(
        response.id,
        response.name,
        response.location,
        response.quantity,
        response.description,
        category
      );
      state.selectedItem.errors = {};
    },
    getItemFailed(state, response) {
      state.selectedItem = null;
      state.selectedItem.errors = response;
    },
    RESET_RESOURCE: (state) => {
      state.item = {
        errors: {},
      };
    },
    getQrDownloadSuccessfully(state, response) {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "qrcode.svg"); //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    getItemsSuccessfully(state, response) {
      let temp = [];
      temp = response.map((res) => {
        let category = new Category(res.category.id, res.category.name);
        return new Item(
          res.id,
          res.name,
          res.location,
          res.quantity,
          res.description,
          category
        );
      });
      console.log(temp);
      state.items = temp;
    },
    getQrSuccessfully(state, response) {
      state.qr = response;
    },
    getQrFailed(state) {
      state.qr = "";
    },
    getItemsFailed(state) {
      state.items = [];
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
      state.selectedItem.errors = transformObj(obj);
    },
    setLoading(state, status) {
      state.loading = status;
    },
  },
  getters: {
    ...pagination.getters,
    ...search.getters,
    selectedItem: (state) => state.selectedItem,
    items: (state) => state.items,
    isLoading: (state) => state.loading,
    qrCode: (state) => state.qr,
  },
};
