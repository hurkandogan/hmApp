import axiosGateway from '../axiosGateway';

export default function saveOilStatus(data) {
    return axiosGateway.post('/saveoilstatus', data);
}