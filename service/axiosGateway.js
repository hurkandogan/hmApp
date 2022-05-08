import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

async function get(route, data = "") {
    return await API.get(route);
};

const post = async (route, data) => {
    return await API.post(route, data);
};

const axiosGateway = {
    get: get,
    post: post,
}

export default axiosGateway;