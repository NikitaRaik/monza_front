import axios from 'axios';
import authHeader from './auth-header';
import storage from '../utils/storage';
class MeasurementUnit {
    get = (id) => {
        return axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/measurement_unit`, {
                headers: authHeader(storage.getStorage('token')),
                params: {
                    id: id
                },
            })
            .then(response => {
                if (response.data.code === 401) {
                    storage.removeStorage('token');
                    storage.removeStorage('role');
                    return response.data;
                } else if (response.data.code === 200) {
                    return response.data;
                }
            }).catch(error => {
                return error;
            })
    }

    export = (id) => {
        return axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/measurement_unit/export`, {
                headers: authHeader(storage.getStorage('token')),
            })
            .then(response => {
                if (response.data.code === 401) {
                    storage.removeStorage('token');
                    storage.removeStorage('role');
                    return response.data;
                } else if (response.data.code === 200) {
                    return response.data;
                }
            }).catch(error => {
                return error;
            })
    }

    create = (data) => {
        return axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/measurement_unit`, {
                data: data
            }, {
                headers: authHeader(storage.getStorage('token'))
            }).then(response => {
                if (response.data.code === 401)
                    storage.removeStorage('token');
                return response.data;
            }).catch(error => {
                return error;
            })
    }

    create_list = (data) => {
        return axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/measurement_unit/list`, {
                data: data
            }, {
                headers: authHeader(storage.getStorage('token'))
            }).then(response => {
                if (response.data.code === 401)
                    storage.removeStorage('token');
                return response.data;
            }).catch(error => {
                return error;
            })
    }

    getListByOption = (sort_option, count, page, search_option) => {
        return axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/measurement_unit/filter_list`, {
                sort_option: sort_option,
                count: count,
                page: page,
                search_option: search_option
            }, {
                headers: authHeader(storage.getStorage('token'))
            })
            .then(response => {
                if (response.data.code === 401)
                    storage.removeStorage('token');
                return response.data;
            }).catch(error => {
                return error;
            })
    }

    update = (data, id) => {
        return axios
            .put(`${process.env.REACT_APP_BACKEND_URL}/measurement_unit`, {
                data: data,
                id: id
            }, {
                headers: authHeader(storage.getStorage('token'))
            })
            .then(response => {
                if (response.data.code === 401)
                    storage.removeStorage('token');
                return response.data;
            }).catch(error => {
                return error;
            })
    }

    delete = (id) => {
        return axios
            .delete(`${process.env.REACT_APP_BACKEND_URL}/measurement_unit`, {
                headers: authHeader(storage.getStorage('token')),
                params: {
                    id: id
                },
            })
            .then(response => {
                if (response.data.code === 401)
                    storage.removeStorage('token');
                return response.data;
            }).catch(error => {
                return error;
            })
    }
}
export default new MeasurementUnit();