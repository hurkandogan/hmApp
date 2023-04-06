import { useState } from 'react';
import styles from '../styles/Header.module.sass';
import { useAppContext } from '../context/index';
import { logout } from '../assets/icons';
import Link from 'next/link';
import { CONFIG } from '../config';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
  const [yearValues] = useState(CONFIG.years);
  const { selectedYear, setSelectedYear } = useAppContext();
  const handleSelectedYear = (e) => setSelectedYear(e.target.value);
  const auth = getAuth();
  return (
    <div className={styles.container}>
      <select
        className={styles.selectBox}
        onChange={handleSelectedYear}
        value={selectedYear}
      >
        {yearValues.map((el) => {
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
