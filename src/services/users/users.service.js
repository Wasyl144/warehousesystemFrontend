import axios from "axios";

class UsersService {
    getUserData(id) {
        return axios.get(`/user/${id}`).then(response => {
            console.log(response.data)
            return {
                success: true,
                response: response.data
            }
        }, error => {
            return {
                success: false,
                errors: error.response.data
            }
        });
    }

    getUsers(params) {
        const options = {
            params: params

        }
        return axios.get('/users', options).then(response => {
            return {
                success: true,
                items: response.data.data,
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


    updateUser(user) {
        const payload = {
            id: user.id,
            name: user.username,
            email: user.email
        };

        const options = {
            headers: {
                'Accept': 'application/json',
            }
        };
        return axios.put(`/user/${user.id}`, payload, options)
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                return {
                    success: true,
                }
            }, error => {
                return {
                    success: false,
                    errors: error.response.data
                }
            });
    }
}

export default new UsersService();