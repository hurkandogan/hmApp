import axios from 'axios';

const API = axios.create({
    baseURL: 'https://h6ruft66h1.execute-api.eu-central-1.amazonaws.com/dev',
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