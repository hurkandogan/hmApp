import axiosGateway from '../axiosGateway';

export default function getDashboardTotals(data) {
    return axiosGateway.post('/dashboard', data);
}