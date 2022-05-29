import axiosGateway from '../axiosGateway';

export default function editExpense(data) {
    return axiosGateway.put('/editexpense', data);
}