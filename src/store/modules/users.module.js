import UsersService from "@/services/users/users.service"
import User from "@/models/user";
import routes from "@/router";


export const users = {
    namespaced: true,
    state: {
        selectedUser: {

            errors: {

            }
        },
        users: [],
    },
    actions: {
        getUserData({ commit, dispatch }, payload) {
            return UsersService.getUserData(payload).then(({success, response, errors}) => {
                if (success) {
                    commit("getUserSuccessfully", response)
                }
                else {
                    dispatch("alerts/add_error", errors.message, {root: true});
                    commit("getUsersFailed");
                    routes.back();
                }
            })
        },
        getUsers( {commit, dispatch} ) {
            return UsersService.getUsers().then(({success, response, errors}) => {
                if (success) {
                    commit("getUsersSuccessfully", response)
                }
                else {
                    dispatch("alerts/add_error", errors.message, {root: true});
                    commit("getUsersFailed");
                    routes.back();
                }
            })
        },

        // eslint-disable-next-line no-unused-vars
        updateUser( {commit, dispatch}, payload ) {
            // eslint-disable-next-line no-unused-vars
            return UsersService.updateUser(payload).then( ({ success, errors }) => {
               if (success) {
                   dispatch("alerts/add_success", "User updated successfully", {root: true});
                   routes.back();
               }
               else {
                   dispatch("alerts/add_error", errors.message, {root: true});
                   commit("serErrors", errors)
               }
            });
        }
    },
    mutations: {
        getUserSuccessfully(state, response) {
            state.selectedUser = new User(response.name, response.email, response.id)
            state.selectedUser.errors = {}
        },
        getUserFailed(state, response) {
            state.selectedUser = null
            state.selectedUser.errors = response
        },
        getUsersSuccessfully(state, response) {
            let temp = []
            temp = response.map((res) => {
                return new User(res.name, res.email, res.id)
            })
            state.users = temp
        },
        getUsersFailed(state) {
            state.users = []
        },
        serErrors(state, response) {
            state.selectedUser.errors = response
        }
    },
    getters: {
        selectedUser: (state) => state.selectedUser,
        users: (state) => state.users,
    },
}