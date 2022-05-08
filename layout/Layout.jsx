import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.sass';
import { useSession, signIn, signOut } from 'next-auth/react';

const Layout = ({ children }) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.container_inner}>
          <Header />
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
};

export default Layout;
