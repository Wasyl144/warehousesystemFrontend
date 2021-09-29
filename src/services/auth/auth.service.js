import axios from "axios";

class AuthService {
    login(user) {
        return axios.post("/login", {
            email: user.email,
            password: user.password
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
            }
            return response.data
        });
    }

    logout() {
        return axios.post('/logout').then(response => {
            if (response.data){
                localStorage.removeItem('token')
            }
        })
    }
}

export default new AuthService();
