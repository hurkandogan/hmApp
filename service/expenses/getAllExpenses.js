import axiosGateway from '../axiosGateway';

export default function getAllExpenses() {
  return axiosGateway.post('/getallexpenses');
}
