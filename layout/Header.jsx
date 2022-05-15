import styles from '../styles/Header.module.sass';
import { logout } from '../assets/icons';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className={styles.container}>
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
