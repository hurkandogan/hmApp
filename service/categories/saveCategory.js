import axiosGateway from '../axiosGateway';

export default function saveCategory(data) {
    return axiosGateway.post('/saveCategory', data);
}