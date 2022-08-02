import axiosGateway from '../axiosGateway';

export default function deleteOilStatus(data) {
    return axiosGateway.post('/deleteoilstatus', data);
}