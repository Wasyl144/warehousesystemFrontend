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

    updateProfile(user) {

        const options = {
            headers: {
                'Accept': 'application/json',
            }
        };
        return axios.post(`/profile-update`, user, options)
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

export default new ProfileService();