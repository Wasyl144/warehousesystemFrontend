export const search = {
    namespaced: true,
    state: {
        searcher: {
            search: null
        }
    },
    actions: {
        setSearch({commit, dispatch}, word) {
            commit("SET_SEARCH", word);
            dispatch('list')
        },
    },
    mutations: {
        SET_SEARCH(state, word) {
            state.searcher.search = word;
        },
    },
    getters: {
        search: state => state.searcher.search
    },
}