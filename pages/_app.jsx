import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Head from 'next/head';
import styles from '../styles/App.module.sass';
import Layout from '../layout/Layout';
import { AppProvider } from '../context';
import { SessionProvider } from 'next-auth/react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Redux
import { store } from '../redux/store';
import { Provider } from 'react-redux';



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>HVT</title>
        <meta name="description" content="HM App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </Provider>
      </SessionProvider>
    </div>
  );
}

export default MyApp;
