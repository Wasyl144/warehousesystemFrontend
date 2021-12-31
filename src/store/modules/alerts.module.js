import { notify } from "@kyvg/vue3-notification";

const state = {};

const mutations = {};

const actions = {
  // eslint-disable-next-line no-unused-vars
  add_success({ commit, dispatch }, message) {
    notify({
      title: "Success",
      text: message,
      horizontalAlign: "center",
      // icon: "add_alert",
      type: "success",
    });
  },

  // eslint-disable-next-line no-unused-vars
  add_error({ commit, dispatch }, message) {
    notify({
      title: "Error",
      text: message,
      icon: "add_alert",
      type: "error",
    });
  },

  // eslint-disable-next-line no-unused-vars
  success({ commit, dispatch }, message) {
    notify({
      message: message,
      //horizontalAlign: 'center',
      icon: "done",
      type: "success",
    });
  },

  // eslint-disable-next-line no-unused-vars
  warning({ commit, dispatch }, message) {
    notify({
      message: message,
      //horizontalAlign: 'center',
      icon: "priority_high",
      type: "warning",
    });
  },

  // eslint-disable-next-line no-unused-vars
  info({ commit, dispatch }, message) {
    notify({
      message: message,
      icon: "notifications_active",
      type: "info",
      timeout: 7000,
    });
  },

  // eslint-disable-next-line no-unused-vars
  error({ commit, dispatch }, message) {
    notify({
      message: message,
      icon: "notification_important",
      type: "danger",
    });
  },
  // eslint-disable-next-line no-unused-vars
  delete({ commit, dispatch }, message) {
    notify({
      message: message,
      horizontalAlign: "center",
      icon: "delete",
      type: "danger",
    });
  },
};

const getters = {};

export const alerts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
