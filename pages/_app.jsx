import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Head from 'next/head';
import styles from '../styles/App.module.sass';
import Layout from '../layout/Layout';
import { AppProvider } from '../context';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// Redux
import { store } from '../redux/store';
import { Provider } from 'react-redux';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FB_DB_URL,
};

export const app = initializeApp(firebaseConfig);
export const analytics = isSupported().then((res) =>
  res ? getAnalytics(app) : null
);
export const db = getFirestore(app);

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>HVT</title>
        <meta name="description" content="HM App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </Provider>
    </div>
  );
}

export default MyApp;
