import axios from "axios";

class UsersService {
    getUserData(id) {
        return axios.get(`/user/${id}`).then(response => {
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

    getUsers() {
        return axios.get('/users').then(response => {
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