import User from "../../models/user";
import ProfileService from "../../services/profile/profile.service";
import Additionalinfo from "../../models/additionalinfo";
import Role from "../../models/role";


export const profile = {
    namespaced: true,
    state: {
        user: new User('', '', '', '', new Additionalinfo('','',''), new Role('', '')),
        permissions: [],
        loading: true,
    },
    actions: {
        getCurrentUserData({ commit, dispatch }) {
            commit('SET_LOADING', true);
            dispatch('getPermissions');
            return ProfileService.getCurrentUserData().then(response => {
                commit('getCurrentUserSuccessfully', response);
                commit('SET_LOADING', false);
                return Promise.resolve(response);
            }, (error) => {
                commit('getCurrentUserFailed');
                commit('SET_LOADING', false);
                return Promise.reject(error)
            })
        },
        getPermissions( {commit} ) {
            return ProfileService.getPermissions().then(response => {
                console.log(response)
                commit('SET_PERMISSIONS', response);
                commit('SET_LOADING', false);
            })
        },
    },
    mutations: {
        getCurrentUserSuccessfully(state, response) {
            let additionalInfo = new Additionalinfo(response.more_info?.phone_number, response.more_info?.address, response.more_info?.about_me);
            let roles = response.roles?.map(role => {
                return new Role(role?.id, role?.name)
            });
            state.user = new User(response.id, response.name, response.surname, response.email, additionalInfo, roles)
        },
        getCurrentUserFailed(state) {
            state.user = null
        },
        SET_PERMISSIONS(state, response) {
            localStorage.setItem("permissions", JSON.stringify(response));
            state.permissions = response
        },
        SET_LOADING(state, status) {
            state.loading = status;
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
        isLoading: (state) => state.loading,
    },


}