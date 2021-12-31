import axios from "axios";

class ProfileService {
  getCurrentUserData() {
    return axios.get("/self").then(
      (response) => {
        console.log(response.data);
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

  getPermissions() {
    return axios.get("/permissions/self").then((response) => {
      return response.data;
    });
  }

  updateProfile(user) {
    const options = {
      headers: {
        Accept: "application/json",
      },
    };
    return (
      axios
        .post(`/profile-update`, user, options)
        .then(
            // eslint-disable-next-line no-unused-vars
            (response) => {
            return {
              success: true,
            };
          },
          (error) => {
            return {
              success: false,
              errors: error.response.data,
            };
          }
        )
    );
  }
}

export default new ProfileService();
