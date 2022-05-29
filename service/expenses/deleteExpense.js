import axiosGateway from '../axiosGateway';

export default function deleteExpense(data) {
    return axiosGateway.delete('/deleteexpense', data);
}