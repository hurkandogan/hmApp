import { ChangeEvent } from 'react';
import styles from '../styles/Header.module.sass';
import { logout } from '../assets/icons';
import Link from 'next/link';
import { getAuth, signOut } from 'firebase/auth';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { update_year } from '../redux/selectedYear.slice';

const Header = () => {
  const auth = getAuth();
  const selectedYear = useAppSelector((state) => state.selectedYear.value);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <select
        className={styles.selectBox}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          dispatch(update_year(e.target.value))
        }
        value={selectedYear.selectedYear}
      >
        {selectedYear.years.map((el) => {
          return (
            <option key={el} value={el}>
              {el}
            </option>
          );
        })}
      </select>
      <h1>
        <Link href="/">Hausverwaltung Thönnessen</Link>
      </h1>
      <button
        onClick={() => {
          signOut(auth);
          if (window) window.location.reload();
        }}
      >
        {logout}
      </button>
    </div>
  );
};

export default Header;
