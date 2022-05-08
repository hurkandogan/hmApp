import '../styles/globals.css';
import Head from 'next/head';
import styles from '../styles/App.module.sass';
import Layout from '../layout/Layout';
import { AppProvider } from '../context';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>HVT</title>
        <meta name="description" content="HM App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </SessionProvider>
    </div>
  );
}

export default MyApp;
