import {pagination} from "./pagination.module";
import {search} from "./search.module";
import RolesService from "../../services/roles/roles.service";
import routes from "@/router";
import Role from "../../models/role";
import Permission from "../../models/permission";


export const roles = {
    namespaced: true,
    state: {
        allRoles: [],
        selectedRole: {
            errors: {},
        },
        rolePermissions: [],
        allPermissions: [],
        order: {},
        users: [],
        loading: true,
        ...pagination.state,
        ...search.state,
    },
    actions: {
        ...pagination.actions,
        ...search.actions,
        get({commit, dispatch}, payload) {
            commit('SET_LOADING', true);
            return RolesService.show(payload).then(({success, response}) => {
                if (success) {
                    commit("SET_ROLE", response)
                    commit("SET_LOADING", false);
                } else {
                    dispatch("alerts/add_error", response.message, {root: true});
                    commit("FAIL_ROLE");
                    routes.back();
                }
            })
        },
        list({commit, dispatch, state}, params) {
            commit("SET_LOADING", true);
            console.log(this.state)
            params = {
                per_page: state.paginator.perPage,
                page: state.paginator.page,
                order: state.order,
                search: state?.searcher?.search
            }
            return RolesService.index(params).then(({success, response, paginator}) => {
                console.log(success)
                if (success) {
                    console.log(response)
                    commit("SET_ROLES", response);
                    commit("SET_ALL_PAGINATION", paginator);
                    commit("SET_LOADING", false);
                } else {
                    dispatch("alerts/add_error", response.message, {root: true});
                    commit("FAIL_ROLES");
                    routes.back();
                }
            })
        },
        set({commit, dispatch}, payload) {
            commit("SET_LOADING", true)
            const params = {
                name: payload.name
            };
            // eslint-disable-next-line no-unused-vars
            return RolesService.create(params).then(({success, response}) => {
                if (success) {
                    dispatch("alerts/add_success", "Role created successfully", {root: true});
                    commit("SET_LOADING", false);
                    routes.back();
                } else {
                    commit("SET_LOADING", false);
                    dispatch("alerts/add_error", response.message, {root: true});
                    commit("SET_ERRORS", response)
                }
            })
        },
        update({commit, dispatch}, payload) {
            commit("SET_LOADING", true);
            // eslint-disable-next-line no-unused-vars
            return RolesService.update(payload).then(({success, errors}) => {
                if (success) {
                    dispatch("alerts/add_success", "Role updated successfully", {root: true});
                    commit("SET_LOADING", false);
                    routes.back();
                } else {
                    commit("SET_LOADING", false);
                    dispatch("alerts/add_error", errors.message, {root: true});
                    commit("SET_ERRORS", errors)
                }
            });
        },
        destroy({commit, dispatch}, payload) {
            commit("SET_LOADING", true)
            return RolesService.delete(payload).then(({success, errors}) => {
                if (success) {
                    dispatch("alerts/add_success", "Role deleted successfully", {root: true});
                    commit("SET_LOADING", false);
                    routes.back();
                } else {
                    commit("SET_LOADING", false);
                    dispatch("alerts/add_error", errors.message, {root: true});
                }
            });
        },
        getPermissions({commit, dispatch}, payload) {
            commit("SET_LOADING", true)
            return RolesService.getPermissions(payload).then(({success, response}) => {
                if (success) {
                    commit("SET_ROLES_WITH_PERMISSIONS", response)
                    commit("SET_LOADING", false);
                } else {
                    commit("SET_LOADING", false);
                    dispatch("alerts/add_error", response.message, {root: true});
                }
            });
        },
        setPermissions({commit, dispatch}, payload) {
            commit("SET_LOADING", true);
            return RolesService.setPermissions(payload.id, payload.permissions).then(({success, response}) => {
                if (success) {
                    commit("SET_LOADING", false);
                    dispatch("alerts/add_success", "Permissions has been updated", {root: true});
                    routes.back();
                } else {
                    commit("SET_LOADING", false);
                    dispatch("alerts/add_error", response.message, {root: true});
                }
            });
        },
        getAllRoles({commit, dispatch}) {
            commit("SET_LOADING", true)
            return RolesService.listAll().then(({success, response}) => {
                if (success) {
                    commit("SET_ROLES", response)
                    commit("SET_LOADING", false);
                } else {
                    commit("SET_LOADING", false);
                    dispatch("alerts/add_error", response.message, {root: true});
                }
            });
        }
    },
    mutations: {
        ...pagination.mutations,
        ...search.mutations,
        SET_LOADING(state, status) {
            state.loading = status;
        },
        SET_ROLE(state, role) {
            state.selectedRole = new Role(role.id, role.name);
        },
        SET_ROLES(state, response) {
            let temp = []
            temp = response.map((res) => {
                return new Role(res.id, res.name)
            });
            console.log(temp)
            state.allRoles = temp;
        },
        SET_ROLES_WITH_PERMISSIONS(state, response) {
            state.rolePermissions = response.rolePermissions.map(permission => {
                return new Permission(permission.id, permission.name)
            });
            state.allPermissions = response.allPermissions.map(permission => {
                return new Permission(permission.id, permission.name)
            });
        },
        FAIL_ROLE(state) {
            state.selectedRole = null;
        },
        FAIL_ROLES(state) {
            state.allRoles = null;
        },
        SET_ERRORS(state, response) {
            state.selectedRole.errors = response;
        }

    },
    getters: {
        ...pagination.getters,
        ...search.getters,
        role: (state) => state.selectedRole,
        roles: (state) => state.allRoles,
        isLoading: (state) => state.loading,
        allPermissions: (state) => state.allPermissions,
        rolePermissions: (state) => state.rolePermissions.map(role => {
            return role.name
        }),
    }

}