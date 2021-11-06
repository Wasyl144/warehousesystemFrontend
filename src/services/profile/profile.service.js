import axios from "axios";

class ProfileService {
    getCurrentUserData() {
        return axios.get('/self').then(response => {
            if (response.data) {
                return response.data;
            }
        });
    }
    getPermissions() {
        return axios.get('/permissions/self').then(response => {
           return response.data
        })
    }
}

export default new ProfileService();