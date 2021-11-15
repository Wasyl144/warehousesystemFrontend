import axios from "axios";

class RolesService {
    index() {
        return axios.get('/role').then(response => {
            return {
                success: true,
                response: response.data
            }, error => {
                return {
                    success: false,
                    response: error.response.data
                }
            }
        });
    }
    show(id) {
        return axios.get(`/role/${id}`).then(response => {
            return {
                success: true,
                response: response.data
            }, error => {
                return {
                    success: false,
                    response: error.response.data
                }
            }
        });
    }
    create(role) {
        const payload = {
            name: role.name
        }
        return axios.post('/role', payload).then(response => {
            return {
                success: true,
                response: response.data
            }, error => {
                return {
                    success: false,
                    response: error.response.data
                }
            }
        });
    }

    update(data) {
        const payload = {
            name: data.name
        }
        return axios.put(`/role/${data.id}`, payload).then(response => {
            return {
                success: true,
                response: response.data
            }, error => {
                return {
                    success: false,
                    response: error.response.data
                }
            }
        });
    }

    delete(data) {
        return axios.delete(`/role/${data.id}`).then(response => {
            return {
                success: true,
                response: response.data
            }, error => {
                return {
                    success: false,
                    response: error.response.data
                }
            }
        });
    }

}

export default new RolesService();