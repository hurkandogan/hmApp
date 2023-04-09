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
import { db } from '../config/Firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { useState } from 'react';

// Redux
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [data, setData] = useState({});
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getDocs(collection(db, 'properties')).then((res) => {
      console.log(res);
      res.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().sub_properties}`);
      });
    });
  };
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
