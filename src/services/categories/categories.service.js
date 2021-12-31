import axios from "axios";

class CategoriesService {
  index(params) {
    const options = {
      params: params,
    };
    return axios.get("/categories", options).then(
      (response) => {
        return {
          success: true,
          response: response.data.data,
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

  show(id) {
    return axios.get(`/categories/${id}`).then(
      (response) => {
        return {
          success: true,
          response: response.data,
        };
      },
      (error) => {
        return {
          success: false,
          response: error.response.data,
        };
      }
    );
  }

  create(role) {
    const payload = {
      name: role.name,
    };
    return axios.post("/categories", payload).then(
      (response) => {
        return {
          success: true,
          response: response.data,
        };
      },
      (error) => {
        return {
          success: false,
          response: error.response.data,
        };
      }
    );
  }

  update(data) {
    const payload = {
      name: data.name,
    };
    return axios.put(`/categories/${data.id}`, payload).then(
      (response) => {
        return {
          success: true,
          response: response.data,
        };
      },
      (error) => {
        return {
          success: false,
          response: error.response.data,
        };
      }
    );
  }

  delete(data) {
    return axios.delete(`/categories/${data.id}`).then(
      (response) => {
        return {
          success: true,
          response: response.data,
        };
      },
      (error) => {
        return {
          success: false,
          response: error.response.data,
        };
      }
    );
  }

  listAll() {
    return axios.get(`/all-categories`).then(
      (response) => {
        return {
          success: true,
          response: response.data,
        };
      },
      (error) => {
        return {
          success: false,
          response: error.response.data,
        };
      }
    );
  }
}

export default new CategoriesService();
