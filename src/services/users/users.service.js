import axios from "axios";

class UsersService {
  getUserData(id) {
    return axios.get(`/user/${id}`).then(
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
          errors: error.response.data,
        };
      }
    );
  }

  destroy(params) {
    return axios.delete(`/user/${params.id}`).then(
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
          errors: error.response.data,
        };
      }
    );
  }

  getUsers(params) {
    const options = {
      params: params,
    };
    return axios.get("/users", options).then(
      (response) => {
        return {
          success: true,
          items: response.data.data,
          paginator: {
            perPage: response.data.per_page,
            currentPage: response.data.current_page,
            from: response.data.from,
            to: response.data.last_page,
            page: response.data.current_page,
          },
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

  updateUser(user) {
    // const payload = {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     surname: user.surname
    // };

    const options = {
      headers: {
        Accept: "application/json",
      },
    };
    return (
      axios
        .put(`/user/${user.id}`, user, options)
        // eslint-disable-next-line no-unused-vars
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
  create(user) {
    const options = {
      headers: {
        Accept: "application/json",
      },
    };
    return (
      axios
        .post(`/user`, user, options)
        // eslint-disable-next-line no-unused-vars
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

export default new UsersService();
