import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.sass';
import { useAppContext } from '../context/index';
import { logout } from '../assets/icons';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { CONFIG } from '../config';

const Header = () => {
  const [yearValues] = useState(CONFIG.years);
  const { selectedYear, setSelectedYear } = useAppContext();
  const handleSelectedYear = (e) => setSelectedYear(e.target.value);
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
      <button onClick={() => console.log('Sign out function should be added!')}>
        {logout}
      </button>
    </div>
  );
};

export default Header;
