import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.sass';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.container_inner}>
        <Header />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
