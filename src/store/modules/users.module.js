import UsersService from "@/services/users/users.service"
import User from "@/models/user";


export const users = {
    namespaced: true,
    state: {
        selectedUser: new User('', '', ''),
        users: [],
    },
    actions: {
        getUserData({ commit }, payload) {
            return UsersService.getUserData(payload).then(response => {
                commit('getUserSuccessfully', response);
                return Promise.resolve(response);
            }, (error) => {
                commit('getUserFailed');
                return Promise.reject(error)
            })
        },
        getUsers( {commit} ) {
            return UsersService.getUsers().then(response => {
                commit('getUsersSuccessfully', response);
                return Promise.resolve(response);
            }, (error) => {
                commit('getUsersFailed');
                return Promise.reject(error)
            })
        }
    },
    mutations: {
        getUserSuccessfully(state, response) {
            state.selectedUser = new User(response.name, response.email, response.id)
        },
        getUserFailed(state) {
            state.selectedUser = null
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
        }
    },
    getters: {
        selectedUser: (state) => state.selectedUser,
        users: (state) => state.users,
    },
}