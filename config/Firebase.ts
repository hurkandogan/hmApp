// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCYnYrTML1uN4e9xYkKZkxh3aWMjADwhA8',
  authDomain: 'hmapp-ca0e2.firebaseapp.com',
  projectId: 'hmapp-ca0e2',
  storageBucket: 'hmapp-ca0e2.appspot.com',
  messagingSenderId: '922288784368',
  appId: '1:922288784368:web:a2cd3f1950c07a4dbb5335',
  measurementId: 'G-M21317G88Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then((res) => (res ? getAnalytics(app) : null));

const Firebase = { app, analytics };

export default Firebase;
