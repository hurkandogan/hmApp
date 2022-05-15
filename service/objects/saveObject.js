import axiosGateway from '../axiosGateway';

export default function saveObject(data) {
    return axiosGateway.post('/objects', data);
}