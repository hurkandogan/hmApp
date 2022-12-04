import { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Alert from '@mui/material/Alert';
import styles from '../styles/Layout.module.sass';
//import { useSession, signIn } from 'next-auth/react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearAlert } from '../redux/alertSlice';

const Layout = ({ children }) => {
  // const { data: session } = useSession();
  //if (session) {
  const alert = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (alert.display) {
      setTimeout(() => dispatch(clearAlert()), 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  if (true) {
    // Authentication will be added instead of true
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.container_inner}>
          <Header />
          <main className={styles.main}>{children}</main>
        </div>
        {alert.display && (
          <div className={styles.alert}>
            <Alert severity={alert.status}>{alert.msg}</Alert>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <button onClick={() => console.log('Sign in function should be added')}>
          Sign In
        </button>
      </div>
    );
  }
};

export default Layout;
