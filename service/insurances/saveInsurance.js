import { getDatabase, ref, push, set } from 'firebase/database';

export default function saveInsurance(data) {
  const db = getDatabase();
  const postRef = ref(db, 'insurances');
  const pushedRef = push(postRef);
  set(pushedRef, data)
    .then(() => {
      status: 'saved';
    })
    .catch(() => {
      status: 'error';
    });
}
