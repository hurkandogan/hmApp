import styles from '../styles/Header.module.sass';
import { logout } from '../assets/icons';
import { signOut } from 'next-auth/react';

const Header = () => {
  return (
    <div className={styles.container}>
      <h1>Hausverwaltung Thönnessen</h1>
      <button onClick={() => signOut()}>{logout}</button>
    </div>
  );
};

export default Header;
