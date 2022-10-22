import axiosGateway from '../axiosGateway';

export default function saveInsurance(data) {
    return axiosGateway.post('/saveinsurance', data);
}