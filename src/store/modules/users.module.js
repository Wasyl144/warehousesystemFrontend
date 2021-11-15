import UsersService from "@/services/users/users.service"
import User from "@/models/user";
import routes from "@/router";
import { pagination } from "./pagination.module";

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

            errors: {

            }
        },
        order: {},
        users: [],
        loading: true,
        ...pagination.state
    },
    actions: {
        ...pagination.actions,
        get({ commit, dispatch }, payload) {
            commit("setLoading", true);
            console.log('dupa')
            return UsersService.getUserData(payload).then(({success, response, errors}) => {
                if (success) {
                    commit("getUserSuccessfully", response)
                    commit("setLoading", false);
                }
                else {
                    dispatch("alerts/add_error", errors.message, {root: true});
                    commit("getUsersFailed");
                    routes.back();
                }
            })
        },
        list( {commit, dispatch, state}, params ) {
            commit("setLoading", true);
            console.log(this.state)
            params = {
                per_page: state.paginator.perPage,
                page: state.paginator.currentPage,
                order: state.order,
            }
            return UsersService.getUsers(params).then(({success, items, paginator, errors}) => {
                if (success) {
                    commit("getUsersSuccessfully", items);
                    commit("SET_ALL", paginator);
                    commit("setLoading", false);
                }
                else {
                    dispatch("alerts/add_error", errors.message, {root: true});
                    commit("getUsersFailed");
                    routes.back();
                }
            })
        },

        // eslint-disable-next-line no-unused-vars
        update( {commit, dispatch}, payload ) {
            commit("setLoading", true);
            // eslint-disable-next-line no-unused-vars
            return UsersService.updateUser(payload).then( ({ success, errors }) => {
               if (success) {
                   dispatch("alerts/add_success", "User updated successfully", {root: true});
                   commit("setLoading", false);
                   routes.back();
               }
               else {
                   commit("setLoading", false);
                   dispatch("alerts/add_error", errors.message, {root: true});
                   commit("serErrors", errors)
               }
            });
        }
    },
    mutations: {
        ...pagination.mutations,
        getUserSuccessfully(state, response) {
            console.log('hello')
            state.selectedUser = new User(response.id, response.name, response.surname, response.email)
            state.selectedUser.errors = {}
        },
        getUserFailed(state, response) {
            state.selectedUser = null
            state.selectedUser.errors = response
        },
        getUsersSuccessfully(state, response) {
            let temp = []
            temp = response.map((res) => {
                return new User(res.id, res.name, res.surname, res.email)
            })
            state.users = temp
        },
        getUsersFailed(state) {
            state.users = []
        },
        serErrors(state, response) {
            state.selectedUser.errors = response
        },
        setLoading(state, status) {
            state.loading = status
        }
    },
    getters: {
        ...pagination.getters,
        selectedUser: (state) => state.selectedUser,
        users: (state) => state.users,
        isLoading: (state) => state.loading,
    },
}