import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.sass';
import { signIn, signOut, getSession, useSession } from 'next-auth/react';

const Layout = ({ children }) => {
  const { data: session } = useSession();
  console.log(session);
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
        <button
          type="submit"
          className="inline-flex items-center justify-center w-1/2 mt-12 rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            signIn('cognito', {
              callbackUrl: `${window.location.origin}/client-protected`,
            })
          }
        >
          Sign In
        </button>
      </div>
    );
  }
};

export default Layout;
