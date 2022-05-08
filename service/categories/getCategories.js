import axiosGateway from '../axiosGateway';

export default function getCategories() {
    return axiosGateway.get('/getCategories');
}