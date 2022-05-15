import axiosGateway from '../axiosGateway';

export default function getDashboardTotals() {
    return axiosGateway.get('/dashboard');
}