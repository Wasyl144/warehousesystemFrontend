import axios from "axios";

class RolesService {
    index(params) {
        const options = {
            params: params
        }
        return axios.get('/role', options).then(response => {
            return {
                success: true,
                response: response.data.data,
                paginator: {
                    perPage: response.data.per_page,
                    currentPage: response.data.current_page,
                    from: response.data.from,
                    to: response.data.last_page,
                    page: response.data.current_page
                },
            }
        }, error => {
            return {
                success: false,
                errors: error.response.data
            }
        });
    };

    show(id) {
        return axios.get(`/role/${id}`).then(response => {
            return {
                success: true,
                response: response.data
            }
        }, error => {
            return {
                success: false,
                response: error.response.data
            }
        })

    }

    create(role) {
        const payload = {
            name: role.name
        }
        return axios.post('/role', payload).then(response => {
            return {
                success: true,
                response: response.data
            }
        }, error => {
            return {
                success: false,
                response: error.response.data
            }
        })
    }

    update(data) {
        const payload = {
            name: data.name
        }
        return axios.put(`/role/${data.id}`, payload).then(response => {
            return {
                success: true,
                response: response.data
            }
        }, error => {
            return {
                success: false,
                response: error.response.data
            }
        });
    }

    delete(data) {
        return axios.delete(`/role/${data.id}`).then(response => {
            return {
                success: true,
                response: response.data
            }
        }, error => {
            return {
                success: false,
                response: error.response.data
            }
        })
    }

    getPermissions(id) {
        return axios.get(`/role/${id}/permissions`).then(response => {
            return {
                success: true,
                response: response.data
            }
        }, error => {
            return {
                success: false,
                response: error.response.data
            }
        })
    }
    setPermissions(id, payload) {
        const options = {
            permissions: payload
        }
        return axios.put(`/role/${id}/permissions`, options).then(response => {
            return {
                success: true,
                response: response.data
            }
        }, error => {
            return {
                success: false,
                response: error.response.data
            }
        })
    }

    listAll() {
        return axios.get(`/roles`).then(response => {
            return {
                success: true,
                response: response.data
            }
        }, error => {
            return {
                success: false,
                response: error.response.data
            }
        })
    }
}

export default new RolesService();