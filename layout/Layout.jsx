import { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.sass';
import EditExpenseOffCanvas from '../components/expense/EditExpenseOffCanvas';
import { Button } from '@mui/material';
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
      <div className={styles.loginContainer}>
        <h1>Welcome to House Management System</h1>
        <Button variant={'contained'} onClick={() => login()}>
          Sign In with Google Account
        </Button>
      </div>
    );
  }
};

export default Layout;
