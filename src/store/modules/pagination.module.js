export const pagination = {
  namespaced: true,
  state: {
    paginator: {
      perPage: 5,
      page: 1,
      currentPage: 1,
      from: 1,
      to: 1,
    },
  },
  actions: {
    setPage({ commit, dispatch }, page) {
      commit("SET_CURRENT_PAGE", page);
      dispatch("list");
    },
    set_per_page({ commit, dispatch }, perPage) {
      if (perPage > 200) {
        perPage = 200;
        dispatch(
          "alerts/warning",
          "Maksymalna ilość elementów to 200 na stronę ...",
          { root: true }
        );
      }
      commit("SET_PER_PAGE", perPage);
      commit("SET_CURRENT_PAGE", 1);
      dispatch("list");
    },
  },
  mutations: {
    SET_CURRENT_PAGE(state, page) {
      state.paginator.page = page;
    },
    SET_PER_PAGE(state, perPage) {
      state.paginator.perPage = perPage;
    },
    SET_ALL_PAGINATION(state, data) {
      state.paginator = data;
    },
  },
  getters: {
    paginator: (state) => state.paginator,
  },
};
