import axios from "axios";

class AuthService {
    login(user) {
        return axios
            .post("/login", {
                email: user.email,
                password: user.password,
            }, {
                validateStatus: status => status >= 200 && status < 300 || status === 422
            })
            .then(
                (response) => {
                    console.log(response);
                    if (response.status === 422) {
                        return {
                            success: false,
                            errors: response.data,
                        };
                    }
                    return {
                        success: true,
                        response: response.data,
                    };
                },
                (error) => {
                    return {
                        success: false,
                        errors: error.response,
                    };
                }
            );
    }

    logout() {
        return axios.post("/logout").then((response) => {
            if (response.data) {
                localStorage.removeItem("token");
            }
        });
    }
}

export default new AuthService();
