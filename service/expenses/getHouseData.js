import axiosGateway from '../axiosGateway';

export default function getHouseData(data) {
    return axiosGateway.post('/getexpensesforobject', data);
}