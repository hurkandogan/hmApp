import { getDatabase, query, ref, onValue } from 'firebase/database';
import { Insurance } from '../../types/Insurance';

export default function getAllInsurances() {
  const db = getDatabase();

  const insuranceRef = query(ref(db, 'insurances/'));
  let data;
  onValue(insuranceRef, (snapshot) => {
    data = snapshot.val();
  });
  if (data) {
    const mappedData = Object.entries(data).map(([id, insurance]) => ({
      ...(insurance as Insurance),
      id,
    }));
    return mappedData;
  }
}
