import styles from '../styles/Header.module.sass';
import { logout } from '../assets/icons';

const Header = () => {
  return (
    <div className={styles.container}>
      <h1>Hausverwaltung Thönnessen</h1>
      <button onClick={() => console.log('Logout clicked')}>{logout}</button>
    </div>
  );
};

export default Header;
