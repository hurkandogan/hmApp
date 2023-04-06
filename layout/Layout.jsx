import { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Alert from '@mui/material/Alert';
import styles from '../styles/Layout.module.sass';
import EditExpenseOffCanvas from '../components/expense/EditExpenseOffCanvas';
import { app as firebaseInstance } from '../config/Firebase';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

const Layout = ({ children }) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [loginInfo, setLoginInfo] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoginInfo(user);
    });
  }, [auth]);

  const login = async () => {
    await signInWithPopup(auth, provider).catch((err) => console.error(err));
  };

  if (loginInfo) {
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.container_inner}>
          <Header />
          <main className={styles.main}>{children}</main>
        </div>
        <EditExpenseOffCanvas />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <button onClick={() => login()}>Sign In</button>
      </div>
    );
  }
};

export default Layout;
