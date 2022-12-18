import axiosGateway from '../axiosGateway';

export default function getAllInsurances() {
  return axiosGateway.post('/getinsurances');
}
