import User from "../../models/user";
import ProfileService from "../../services/profile/profile.service";


export const profile = {
    namespaced: true,
    state: {
        user: new User('', '', ''),
        permissions: [],
    },
    actions: {
        getCurrentUserData({ commit, dispatch }) {
            dispatch('getPermissions')
            return ProfileService.getCurrentUserData().then(response => {
                commit('getCurrentUserSuccessfully', response);
                return Promise.resolve(response);
            }, (error) => {
                commit('getCurrentUserFailed');
                return Promise.reject(error)
            })
        },
        getPermissions( {commit} ) {
            return ProfileService.getPermissions().then(response => {
                console.log(response)
                commit('SET_PERMISSIONS', response);
            })
        },
    },
    mutations: {
        getCurrentUserSuccessfully(state, response) {
            state.user = new User(response.name, response.email, response.id)
        },
        getCurrentUserFailed(state) {
            state.user = null
        },
        SET_PERMISSIONS(state, response) {
            localStorage.setItem("permissions",JSON.stringify(response));
            state.permissions = response
        },
    },
    getters: {
        currentUser: (state) => state.user,
        userPermissions: (state) => state.permissions,
        permissionCan: (state) => (permission) => {
            return state.permissions?.includes(permission);
        },
        permissionCanAny: (state) => (permission) => {
            let result = false;
            let permissions = state.permissions;
            permission.forEach(function (single_action) {
                if (permissions.includes(single_action)) {
                    console.log('tak', single_action);
                    result = true;
                }
            });
            return result;
        },
    },


}