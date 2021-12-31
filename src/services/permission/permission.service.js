import axios from "axios";

class PermissionService {
  getAllPermissions() {
    return axios.get("/permissions").then(
      (response) => {
        return {
          success: true,
          response: response.data,
        };
      },
      (error) => {
        return {
          success: false,
          errors: error.response.data,
        };
      }
    );
  }

  getUserPermissions(id) {
    return axios.get(`${id}`).then(
      (response) => {
        return {
          success: true,
          response: response.data,
        };
      },
      (error) => {
        return {
          success: false,
          errors: error.response.data,
        };
      }
    );
  }
}

export default new PermissionService();
