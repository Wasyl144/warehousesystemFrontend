import axios from "axios";

class UsersService {
    getUserData(id) {
        return axios.get(`/user/${id}`).then(response => {
            if (response.data) {
                return response.data;
            }
        })
    }

    getUsers() {
        return axios.get('/users').then(response => {
            if (response.data) {
                return response.data;
            }
        });
    }
}

export default new UsersService();