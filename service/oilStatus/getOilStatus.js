import axiosGateway from '../axiosGateway';

export default function getOilStatus(data) {
    return axiosGateway.post('/getoilstatus', data);
}