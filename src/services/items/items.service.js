import axios from "axios";

class ItemsService {
    getItemData(id) {
        return axios.get(`/items/${id}`).then(response => {
            console.log(response.data)
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

    destroy(params) {
        return axios.delete(`/items/${params.id}`).then(response => {
            console.log(response.data)
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

    getItems(params) {
        const options = {
            params: params
        }
        return axios.get('/items', options).then(response => {
            return {
                success: true,
                items: response.data.data,
                paginator: {
                    perPage: response.data.per_page,
                    currentPage: response.data.current_page,
                    from: response.data.from,
                    to: response.data.last_page,
                    page: response.data.current_page
                },
            }
        }, error => {
            return {
                success: false,
                errors: error.response.data
            }
        });
    };


    updateItem(item) {
        // const payload = {
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     surname: user.surname
        // };

        const options = {
            headers: {
                'Accept': 'application/json',
            }
        };
        return axios.put(`/items/${item.id}`, item, options)
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
    create(item) {
        const options = {
            headers: {
                'Accept': 'application/json',
            }
        };
        return axios.post(`/items`, item, options)
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

    getQr(id) {
        const options = {
            params: {
                itemId: id,
            }
        }
        return axios.get('/generate/qr', options).then(response => {
            return {
                success: true,
                qr: response.data,
            }
        }, error => {
            return {
                success: false,
                errors: error.response.data
            }
        });
    }

    getQrDownload(id) {
        const options = {
            params: {
                itemId: id,
                forceDownload: 1,
            },
            responseType: 'blob'
        }
        return axios.get('/generate/qr', options).then(response => {
            return {
                success: true,
                qr: response.data,
            }
        }, error => {
            return {
                success: false,
                errors: error.response.data
            }
        });
    }
}

export default new ItemsService();