import axiosGateway from '../axiosGateway';

export default function getObjects() {
    return axiosGateway.get('/objects');
}